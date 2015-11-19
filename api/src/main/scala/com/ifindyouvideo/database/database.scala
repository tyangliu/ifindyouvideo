package com.ifindyouvideo.database

import scala.language.postfixOps
import scala.concurrent.Future
import scala.concurrent.Await
import scala.concurrent.duration._
import com.websudos.phantom.db.DatabaseImpl
import com.websudos.phantom.connectors._
import scala.concurrent.ExecutionContext.Implicits.global

class Database(val keyspace: KeySpaceDef) extends DatabaseImpl(keyspace) {

  object videos extends ConcreteVideoTable with keyspace.Connector
  object videosByGeohash extends ConcreteVideoByGeohashTable with keyspace.Connector

  object cities extends ConcreteCityTable with keyspace.Connector
  object citiesByRegion extends ConcreteCityByRegionTable with keyspace.Connector

  object users extends ConcreteUserTable with keyspace.Connector
  object usersByEmail extends ConcreteUserByEmailTable with keyspace.Connector

  def createTables = {
    val tables = List(
      videos,
      videosByGeohash,
      cities,
      citiesByRegion,
      users,
      usersByEmail
    )

    Await.result(
      Future.sequence(tables map {_.create.ifNotExists.future}),
      10000 millis
    )
  }

}

object Connector {
  val hosts = Seq("162.243.198.248")
  val connector = ContactPoints(hosts).keySpace("ifindyouvideo")
}

object Database extends Database(Connector.connector)
