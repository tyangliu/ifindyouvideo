package com.ifindyouvideo.videos

import com.websudos.phantom.builder.query.InsertQuery
import com.websudos.phantom.dsl._
import com.websudos.phantom.testkit._
import org.json4s.native.JsonMethods._
import org.json4s.native.Serialization
import org.json4s.native.Serialization.{read, write}
import org.json4s._
import com.github.davidmoten.geo.GeoHash

class VideoTable extends CassandraTable[VideoTable, Video] {

  implicit val serialization = Serialization
  implicit val formats = DefaultFormats

  object id extends StringColumn(this) with PartitionKey[String]
  object title extends StringColumn(this)
  object description extends StringColumn(this)
  object publishedAt extends StringColumn(this)
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

object VideoTable extends VideoTable with PhantomCassandraConnector {
  def store(video: Video): InsertQuery.Default[VideoTable, Video] = {
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
  }
}

class VideoByGeohashTable extends CassandraTable[VideoByGeohashTable, Video] {

  implicit val serialization = Serialization
  implicit val formats = DefaultFormats

  object geohashA extends StringColumn(this) with PartitionKey[String]
  object geohashB extends StringColumn(this) with ClusteringOrder[String] with Ascending
  object geohashC extends StringColumn(this) with ClusteringOrder[String] with Ascending
  object geohashD extends StringColumn(this) with ClusteringOrder[String] with Ascending

  object geohashE extends StringColumn(this) with ClusteringOrder[String] with Ascending
  object geohashF extends StringColumn(this) with ClusteringOrder[String] with Ascending
  object geohashG extends StringColumn(this) with ClusteringOrder[String] with Ascending
  object geohashH extends StringColumn(this) with ClusteringOrder[String] with Ascending

  object geohashI extends StringColumn(this) with ClusteringOrder[String] with Ascending
  object geohashJ extends StringColumn(this) with ClusteringOrder[String] with Ascending
  object geohashK extends StringColumn(this) with ClusteringOrder[String] with Ascending
  object geohashL extends StringColumn(this) with ClusteringOrder[String] with Ascending

  object publishedAt extends StringColumn(this) with ClusteringOrder[String] with Ascending
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

object VideoByGeohashTable extends VideoByGeohashTable with PhantomCassandraConnector {
  def store(video: Video): InsertQuery.Default[VideoByGeohashTable, Video] = {
    val location = video.location
    val hashChars: List[String] = GeoHash.encodeHash(
      location.latitude.toDouble,
      location.longitude.toDouble,
      12
    ).toList map (_.toString)

    insert
      .value(_.geohashA, hashChars(0))
      .value(_.geohashB, hashChars(1))
      .value(_.geohashC, hashChars(2))
      .value(_.geohashD, hashChars(3))

      .value(_.geohashE, hashChars(4))
      .value(_.geohashF, hashChars(5))
      .value(_.geohashG, hashChars(6))
      .value(_.geohashH, hashChars(7))

      .value(_.geohashI, hashChars(8))
      .value(_.geohashJ, hashChars(9))
      .value(_.geohashK, hashChars(10))
      .value(_.geohashL, hashChars(11))

      .value(_.publishedAt, video.publishedAt)
      .value(_.id, video.id)
      .value(_.title, video.title)
      .value(_.description, video.description)
      .value(_.tags, video.tags)
      .value(_.location, video.location)
      .value(_.channel, video.channel)
      .value(_.thumbnails, video.thumbnails)
      .value(_.statistics, video.statistics)
  }
}
