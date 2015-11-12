package com.ifindyouvideo.database

import scala.concurrent.Future
import com.websudos.phantom.builder.query.InsertQuery
import com.websudos.phantom.dsl._
import com.websudos.phantom.db.DatabaseImpl
import com.websudos.phantom.connectors._
import org.json4s.native.JsonMethods._
import org.json4s.native.Serialization
import org.json4s.native.Serialization.{read, write}
import org.json4s._
import org.json4s.ext.JodaTimeSerializers
import com.github.davidmoten.geo.GeoHash
import org.joda.time.DateTime

import com.ifindyouvideo.videos._

class VideoTable extends CassandraTable[VideoTable, Video] {

  implicit val serialization = Serialization
  implicit val formats = DefaultFormats ++ JodaTimeSerializers.all

  object id extends StringColumn(this) with PartitionKey[String]
  object title extends StringColumn(this)
  object description extends StringColumn(this)
  object publishedAt extends DateTimeColumn(this)
  object tags extends ListColumn[VideoTable, Video, String](this)

  object location extends JsonColumn[VideoTable, Video, Location](this) {
    override def fromJson(obj: String): Location = read[Location](obj)
    override def toJson(obj: Location): String = write(obj)
  }

  object channel extends JsonColumn[VideoTable, Video, Channel](this) {
    override def fromJson(obj: String): Channel = read[Channel](obj)
    override def toJson(obj: Channel): String = write(obj)
  }

  object thumbnails extends JsonColumn[VideoTable, Video, Thumbnails](this) {
    override def fromJson(obj: String): Thumbnails = read[Thumbnails](obj)
    override def toJson(obj: Thumbnails): String = write(obj)
  }

  object statistics extends JsonColumn[VideoTable, Video, Statistics](this) {
    override def fromJson(obj: String): Statistics = read[Statistics](obj)
    override def toJson(obj: Statistics): String = write(obj)
  }

  def fromRow(row: Row): Video = {
    Video(
      id(row),
      title(row),
      description(row),
      publishedAt(row),
      tags(row),
      location(row),
      channel(row),
      thumbnails(row),
      statistics(row)
    )
  }

}

abstract class ConcreteVideoTable extends VideoTable with RootConnector {

  def store(video: Video): Future[ResultSet] = {
    insert
      .value(_.id, video.id)
      .value(_.title, video.title)
      .value(_.description, video.description)
      .value(_.publishedAt, video.publishedAt)
      .value(_.tags, video.tags)
      .value(_.location, video.location)
      .value(_.channel, video.channel)
      .value(_.thumbnails, video.thumbnails)
      .value(_.statistics, video.statistics)
      .future
  }

  def getById(id: String): Future[Option[Video]] = {
    select.where(_.id eqs id).one()
  }

}

class VideoByGeohashTable extends CassandraTable[VideoByGeohashTable, Video] {

  implicit val serialization = Serialization
  implicit val formats = DefaultFormats

  object geoCharA extends StringColumn(this) with PartitionKey[String]
  object geoCharB extends StringColumn(this) with ClusteringOrder[String] with Ascending
  object geoCharC extends StringColumn(this) with ClusteringOrder[String] with Ascending
  object geoCharD extends StringColumn(this) with ClusteringOrder[String] with Ascending

  object geoCharE extends StringColumn(this) with ClusteringOrder[String] with Ascending
  object geoCharF extends StringColumn(this) with ClusteringOrder[String] with Ascending
  object geoCharG extends StringColumn(this) with ClusteringOrder[String] with Ascending
  object geoCharH extends StringColumn(this) with ClusteringOrder[String] with Ascending

  object geoCharI extends StringColumn(this) with ClusteringOrder[String] with Ascending
  object geoCharJ extends StringColumn(this) with ClusteringOrder[String] with Ascending
  object geoCharK extends StringColumn(this) with ClusteringOrder[String] with Ascending
  object geoCharL extends StringColumn(this) with ClusteringOrder[String] with Ascending

  object publishedAt extends DateTimeColumn(this) with ClusteringOrder[DateTime] with Ascending
  object id extends StringColumn(this) with ClusteringOrder[String] with Ascending

  object title extends StringColumn(this)
  object description extends StringColumn(this)
  object tags extends ListColumn[VideoByGeohashTable, Video, String](this)

  object location extends JsonColumn[VideoByGeohashTable, Video, Location](this) {
    override def fromJson(obj: String): Location = read[Location](obj)
    override def toJson(obj: Location): String = write(obj)
  }

  object channel extends JsonColumn[VideoByGeohashTable, Video, Channel](this) {
    override def fromJson(obj: String): Channel = read[Channel](obj)
    override def toJson(obj: Channel): String = write(obj)
  }

  object thumbnails extends JsonColumn[VideoByGeohashTable, Video, Thumbnails](this) {
    override def fromJson(obj: String): Thumbnails = read[Thumbnails](obj)
    override def toJson(obj: Thumbnails): String = write(obj)
  }

  object statistics extends JsonColumn[VideoByGeohashTable, Video, Statistics](this) {
    override def fromJson(obj: String): Statistics = read[Statistics](obj)
    override def toJson(obj: Statistics): String = write(obj)
  }

  def fromRow(row: Row): Video = {
    Video(
      id(row),
      title(row),
      description(row),
      publishedAt(row),
      tags(row),
      location(row),
      channel(row),
      thumbnails(row),
      statistics(row)
    )
  }

}

abstract class ConcreteVideoByGeohashTable extends VideoByGeohashTable with RootConnector {

  def getByLocationAndTime(bounds: (Location, Location), radius: String): Future[List[Video]] = ???

  def store(video: Video): Future[ResultSet] = {
    val location = video.location
    val hashChars: List[String] = GeoHash.encodeHash(
      location.latitude.toDouble,
      location.longitude.toDouble,
      12
    ).toList map (_.toString)

    insert
      .value(_.geoCharA, hashChars(0))
      .value(_.geoCharB, hashChars(1))
      .value(_.geoCharC, hashChars(2))
      .value(_.geoCharD, hashChars(3))

      .value(_.geoCharE, hashChars(4))
      .value(_.geoCharF, hashChars(5))
      .value(_.geoCharG, hashChars(6))
      .value(_.geoCharH, hashChars(7))

      .value(_.geoCharI, hashChars(8))
      .value(_.geoCharJ, hashChars(9))
      .value(_.geoCharK, hashChars(10))
      .value(_.geoCharL, hashChars(11))

      .value(_.publishedAt, video.publishedAt)
      .value(_.id, video.id)
      .value(_.title, video.title)
      .value(_.description, video.description)
      .value(_.tags, video.tags)
      .value(_.location, video.location)
      .value(_.channel, video.channel)
      .value(_.thumbnails, video.thumbnails)
      .value(_.statistics, video.statistics)
      .future
  }

}
