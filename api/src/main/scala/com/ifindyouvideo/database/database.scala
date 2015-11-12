package com.ifindyouvideo.database

import scala.concurrent.Await
import scala.concurrent.duration._
import com.websudos.phantom.db.DatabaseImpl
import com.websudos.phantom.connectors._

class Database(val keyspace: KeySpaceDef) extends DatabaseImpl(keyspace) {

  object videos extends ConcreteVideoTable with keyspace.Connector
  object videosByGeohash extends ConcreteVideoByGeohashTable with keyspace.Connector

  def createTables = {
    Await.result(videos.create.ifNotExists().future(), 5000 millis)
    Await.result(videosByGeohash.create.ifNotExists().future(), 5000 millis)
  }

}

object Connector {
  val hosts = Seq("162.243.198.248")
  val connector = ContactPoints(hosts).keySpace("ifindyouvideo")
}

object Database extends Database(Connector.connector)
