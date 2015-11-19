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

class UserTable extends CassandraTable[UserTable, User] {

  implicit val serialization = Serialization
  implicit val formats = DefaultFormats

  object id extends StringColumn(this) with PartitionKey[String]
  object email extends StringColumn(this)
  object favoriteCities extends ListColumn[UserTable, User, String](this)

  def fromRow(row: Row): User = {
    User(
      id(row),
      email(row),
      favoriteCities(row)
    )
  }

}

abstract class ConcreteUserTable extends UserTable with RootConnector {

  def getById(id: String): Future[Option[User]] = {
    if (id.length == 0) Future { None }
    else select.where(_.id eqs id).one()
  }

  def store(user: User): Future[ResultSet] = {
    insert
      .value(_.id, user.id)
      .value(_.email, user.email)
      .value(_.favoriteCities, user.favoriteCities)
      .future
  }

}
