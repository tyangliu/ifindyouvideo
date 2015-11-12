package com.ifindyouvideo.database

import com.websudos.phantom.db.DatabaseImpl
import com.websudos.phantom.connectors._

class Database(val keyspace: KeySpaceDef) extends DatabaseImpl(keyspace) {
  object videos extends ConcreteVideoTable with keyspace.Connector
  object videosByGeohash extends ConcreteVideoByGeohashTable with keyspace.Connector
}

object Connector {
  val hosts = Seq("159.23.23.129")
  val connector = ContactPoints(hosts).keySpace("ifindyouvideo")
}

object Database extends Database(Connector.connector)
