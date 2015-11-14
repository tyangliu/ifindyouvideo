package com.ifindyouvideo.database

import scala.collection.JavaConverters._
import scala.util.{Try, Success, Failure}
import scala.concurrent.Future
import scala.concurrent.Promise
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

class VideoByGeohashTable extends CassandraTable[VideoByGeohashTable, Video] {

  implicit val serialization = Serialization
  implicit val formats = DefaultFormats

  object yearMonth extends IntColumn(this) with PartitionKey[Int]

  object geoCharA extends StringColumn(this) with ClusteringOrder[String] with Ascending
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

  val hashColumns = List(
    geoCharA, geoCharB, geoCharC, geoCharD,
    geoCharE, geoCharF, geoCharG, geoCharH,
    geoCharI, geoCharJ, geoCharK, geoCharL
  )

  object id extends StringColumn(this) with ClusteringOrder[String] with Ascending

  object title extends StringColumn(this)
  object description extends StringColumn(this)
  object publishedAt extends DateTimeColumn(this)
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

  def futureToFutureTry[T](f: Future[T]): Future[Try[T]] = {
    f map(Success(_)) recover {case e => Failure(e)}
  }

  def getByYearMonthLocation(y: Int, m: Int, nw: Location, se: Location): Future[List[Video]] = {
    val yearMonth = y * 100 + m
    val hashes = GeoHash.coverBoundingBoxMaxHashes(
      nw.latitude.toDouble,
      nw.longitude.toDouble,
      se.latitude.toDouble,
      se.longitude.toDouble,
      12
    ).getHashes.asScala.toList

    val futures = hashes map {_.toList map { _.toString}} map { hashChars =>
      val charsWithIndex = hashChars.zipWithIndex
      (select.where(_.yearMonth eqs yearMonth) /: charsWithIndex) { (a,b) =>
        val (char, index) = b
        a.and(_.hashColumns(index) eqs char)
      }
    } map {_.fetch map {_.toList}} map {futureToFutureTry(_)}

    Future.sequence(futures) map { listOfTry =>
      (listOfTry collect {case Success(x) => x}).flatten
    }
  }

  def store(video: Video, allTime: Boolean = false): Future[ResultSet] = {
    val location = video.location
    val hashChars: List[String] = GeoHash.encodeHash(
      location.latitude.toDouble,
      location.longitude.toDouble,
      12
    ).toList map {_.toString}

    val date = video.publishedAt
    val yearMonth = if (allTime) 0 else date.getYear * 100 + date.getMonthOfYear

    insert
      .value(_.yearMonth, yearMonth)
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

  def multiStore(videos: List[Video]): Future[List[ResultSet]] = {
    Future.sequence(videos map {store(_)})
  }

}
