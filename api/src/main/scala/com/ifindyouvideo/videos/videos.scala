package com.ifindyouvideo.videos

import scala.concurrent.Future
import sangria.relay.{Identifiable, Node}
import com.websudos.phantom.dsl._

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
) extends Node

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

case class User(id: String) extends Node

class UserRepo {
  def getUser(id: String): Option[User] = Some(User("dummy"))
}

class VideoRepo {
  import VideoRepo._

  def getVideo(id: String): Option[Video] = videos.find(v => v.id == id)

  def findVideos(latitude: BigDecimal, longitude: BigDecimal, radius: String) = videos
}

case class UserContext(userRepo: UserRepo, videoRepo: VideoRepo) {
  def user = User("dummy")
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
