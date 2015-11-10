package com.ifindyouvideo.videos

import com.websudos.phantom.builder.query.InsertQuery
import com.websudos.phantom.dsl._
import com.websudos.phantom.testkit._
import org.json4s.native.JsonMethods._
import org.json4s.native.Serialization
import org.json4s._

class VideoByGeohashTable extends CassandraTable[VideoByGeohashTable, Video] {

  import scala.concurrent.ExecutionContext.Implicits.global
  import de.heikoseeberger.akkahttpjson4s.Json4sSupport._

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

  object id extends StringColumn(this) with ClusteringOrder[String] with Ascending

  object title extends StringColumn(this)
  object description extends StringColumn(this)
  object publishedAt extends StringColumn(this)
  object tags extends ListColumn[String](this)

  object location extends JsonColumn[VideoByGeohashTable, Video, Location](this) {
    override def fromJson(obj: String): Location = {
      // TODO
    }

    override def toJson(obj: Location): String = {
      // TODO
    }
  }

  object channel extends JsonColumn[VideoByGeohashTable, Video, Channel](this) {
    override def fromJson(obj: String): Channel = {
      // TODO
    }

    override def toJson(obj: Channel): String = {
      // TODO
    }
  }

  object thumbnails extends JsonColumn[VideoByGeohashTable, Video, Thumbnails](this) {
    override def fromJson(obj: String): Thumbnails = {
      // TODO
    }

    override def toJson(obj: Thumbnails): String = {
      // TODO
    }
  }

  object statistics extends JsonColumn[VideoByGeohashTable, Video, Statistics](this) {
    override def fromJson(obj: String): Statistics = {
      // TODO
    }

    override def toJson(obj: Statistics): String = {
      // TODO
    }
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
  def store(obj: Video): InsertQuery.Default[VideoByGeohashTable, Video] = {
    // TODO
  }
}
