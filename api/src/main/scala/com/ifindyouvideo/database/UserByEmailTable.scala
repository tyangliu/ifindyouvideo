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

class UserByEmailTable extends CassandraTable[UserByEmailTable, User] {

  implicit val serialization = Serialization
  implicit val formats = DefaultFormats

  object email extends StringColumn(this) with PartitionKey[String]
  object id extends StringColumn(this)
  object favoriteCities extends ListColumn[UserByEmailTable, User, String](this)
  object roles extends ListColumn[UserByEmailTable, User, String](this)

  def fromRow(row: Row): User = {
    User(
      id(row),
      email(row),
      favoriteCities(row),
      roles(row)
    )
  }

}

abstract class ConcreteUserByEmailTable extends UserByEmailTable with RootConnector {

  def getByEmail(email: String): Future[Option[User]] = {
    if (email.length == 0) Future { None }
    else select.where(_.email eqs email).one()
  }

  def store(user: User): Future[ResultSet] = {
    insert
      .value(_.email, user.email)
      .value(_.id, user.id)
      .value(_.favoriteCities, user.favoriteCities)
      .value(_.roles, user.roles)
      .future
  }
}
