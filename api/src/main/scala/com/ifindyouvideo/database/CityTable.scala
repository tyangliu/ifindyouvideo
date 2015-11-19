package com.ifindyouvideo.database

import scala.concurrent.Future
import com.websudos.phantom.dsl._
import com.websudos.phantom.connectors._
import org.json4s.native.JsonMethods._
import org.json4s.native.Serialization
import org.json4s.native.Serialization.{read, write}
import org.json4s._
import scala.concurrent.ExecutionContext.Implicits.global

import com.ifindyouvideo.videos._

class CityTable extends CassandraTable[CityTable, City] {

  implicit val serialization = Serialization
  implicit val formats = DefaultFormats

  object name extends StringColumn(this) with PartitionKey[String]
  object region extends StringColumn(this)

  object bounds extends JsonColumn[CityTable, City, Bounds](this) {
    override def fromJson(obj: String): Bounds = read[Bounds](obj)
    override def toJson(obj: Bounds): String = write(obj)
  }

  def fromRow(row: Row): City = {
    City(name(row), region(row), bounds(row))
  }

}

abstract class ConcreteCityTable extends CityTable with RootConnector {

  def getByName(name: String): Future[Option[City]] = {
    if (name.length == 0) Future { None }
    else select.where(_.name eqs name).one()
  }

  def store(city: City): Future[ResultSet] = {
    insert
      .value(_.name, city.name)
      .value(_.region, city.region)
      .value(_.bounds, city.bounds)
      .future
  }

  def multiStore(cities: List[City]): Future[List[ResultSet]] = {
    Future.sequence(cities map {store(_)})
  }

}
