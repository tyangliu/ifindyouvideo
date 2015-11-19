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

class CityByRegionTable extends CassandraTable[CityByRegionTable, City] {

  implicit val serialization = Serialization
  implicit val formats = DefaultFormats

  object region extends StringColumn(this) with PartitionKey[String]
  object name extends StringColumn(this) with ClusteringOrder[String] with Ascending
  object bounds extends JsonColumn[CityByRegionTable, City, Bounds](this) {
    override def fromJson(obj: String): Bounds = read[Bounds](obj)
    override def toJson(obj: Bounds): String = write(obj)
  }

  def fromRow(row: Row): City = {
    City(name(row), region(row), bounds(row))
  }

}

abstract class ConcreteCityByRegionTable extends CityByRegionTable with RootConnector {

  def getByRegion(region: String): Future[List[City]] = {
    if (region.length == 0) Future { Nil }
    else select.where(_.region eqs region).fetch map {_.toList}
  }

  def store(city: City): Future[ResultSet] = {
    insert
      .value(_.region, city.region)
      .value(_.name, city.name)
      .value(_.bounds, city.bounds)
      .future
  }

  def multiStore(cities: List[City]): Future[List[ResultSet]] = {
    Future.sequence(cities map {store(_)})
  }

}
