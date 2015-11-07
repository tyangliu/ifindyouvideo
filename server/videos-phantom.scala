package com.ifindyouvideo.videos

import scala.concurrent.Future
import sangria.relay.{Identifiable, Node}
import com.websudos.phantom.dsl._

/*
case class Video(
  id:          String,
  title:       String,
  description: String,
  publishedAt: String,
  tags:        List[String],
  location:    Location,
  channel:     Channel,
  thumbnails:  Thumbnails,
  statistics:  Statistics
) extends Node */

class Videos extends CassandraTable[ConcreteVideos, Video] {
  object id extends StringColumn(this)
  object title extends StringColumn(this)
  object description extends StringColumn(this)
  object publishedAt extends StringColumn(this)
  object tags extends ListColumn[String](this)
  object location extends LocationColumn(this)
  object channel extends ChannelColumn(this)
  object thumbnails extends ThumbnailsColumn(this)
  object statistics extends StatisticsColumn(this)

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

// The root connector comes from import com.websudos.phantom.dsl._
abstract class ConcreteVideos extends Videos with RootConnector {

  def store(video : Video): Future[ResultSet] = {
    //insert.value(_.id, video.id).value(_.email, video.email)
      .value(_.id, video.id)
      .value(_.title, video.title)
      .value(_.description, video.description)
      .value(_.publishedAt, video.publishedAt)
      .value(_.tags, video.tags)
      .value(_.location, video.location)
      .value(_.channel, video.thumbnails)
      .value(_.statistics, video.statistics)
      .consistencyLevel_=(ConsistencyLevel.ALL)
      .future()
  }

  def getById(id: String): Future[Option[Video]] = {
    select.where(_.id eqs id).one()
  }
}

// Define connector
object Defaults {
  val connector = ContactPoint.local.keySpace("my_keyspace")
}

class MyDatabase(val keyspace: KeySpaceDef) extends com.websudos.phantom.db.DatabaseImpl(keyspace) {
  object users extends ConcreteUsers with keyspace.Connector
}

object MyDatabase extends MyDatabase(Defaults.connector)





case class Location(latitude: BigDecimal, longitude: BigDecimal, altitude: BigDecimal)
case class Channel(id: String, title: String)

case class Statistics(
  viewCount: String,
  likeCount: String,
  dislikeCount: String,
  favoriteCount: String,
  commentCount: String
)

case class Image(url: String, width: Int, height: Int)

case class Thumbnails(
   default:  Option[Image],
   medium:   Option[Image],
   high:     Option[Image],
   standard: Option[Image],
   maxres:   Option[Image]
 )

class VideoRepo {
  import VideoRepo._

  def getVideo(id: String): Option[Video] = videos.find(v => v.id == id)

  def findVideos(latitude: BigDecimal, longitude: BigDecimal, radius: String) = videos

}

object VideoRepo {
  val videos = List(
    Video(
      id = "1000",
      title = "Awesome Video",
      description = "test",
      publishedAt = "test",
      tags = List("tag1", "tag2"),
      location = Location(5.3289,5.394,3.239),
      channel = Channel("1234", "A Channel Title"),
      thumbnails = Thumbnails(None,None,None,None,None),
      statistics = Statistics("1","2","3","4","5")
    ),
    Video(
      id = "1001",
      title = "Test",
      description = "test 2",
      publishedAt = "test",
      tags = List("tag3", "tag4"),
      location = Location(5.3289,5.394,3.239),
      channel = Channel("1234", "A Channel Title"),
      thumbnails = Thumbnails(None,None,None,None,None),
      statistics = Statistics("1","2","3","4","5")
    ),
    Video(
      id = "1002",
      title = "Another Test",
      description = "test 3",
      publishedAt = "test",
      tags = List("tag5", "tag6"),
      location = Location(5.3289,5.394,3.239),
      channel = Channel("1234", "A Channel Title"),
      thumbnails = Thumbnails(None,None,None,None,None),
      statistics = Statistics("1","2","3","4","5")
    )
  )
}
