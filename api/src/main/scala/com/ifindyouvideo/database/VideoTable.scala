package com.ifindyouvideo.database

import scala.concurrent.Future
import com.websudos.phantom.dsl._
import com.websudos.phantom.connectors._
import org.json4s.native.JsonMethods._
import org.json4s.native.Serialization
import org.json4s.native.Serialization.{read, write}
import org.json4s._
import org.json4s.ext.JodaTimeSerializers
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

  def getById(id: String): Future[Option[Video]] = {
    select.where(_.id eqs id).one()
  }

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

  def multiStore(videos: List[Video]): Future[List[ResultSet]] = {
    Future.sequence(videos map {store(_)})
  }

}
