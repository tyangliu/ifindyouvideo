package com.ifindyouvideo.videos

import scala.concurrent.Future
import com.websudos.phantom.dsl._

case class Location(latitude: BigDecimal, longitude: BigDecimal, altitude: BigDecimal)
case class Channel(id: String, title: String)

case class Image(url: String, width: Int, height: Int)

case class Thumbnails(
   default:  Image,
   medium:   Image,
   high:     Image,
   standard: Image,
   maxres:   Image
 )

case class Video(
  id:          String,
  title:       String,
  description: Option[String],
  tags:        List[String],
  location:    Location,
  channel:     Channel,
  thumbnails:  Option[Thumbnails]
)

class VideoRepo {
  import VideoRepo._

  def getVideo(id: String): Option[Video] = videos.find(v => v.id == id)
}

object VideoRepo {
  val videos = List(
    Video(
      id = "1000",
      title = "Awesome Video",
      description = Some("test"),
      tags = List("tag1", "tag2"),
      location = Location(5.3289,5.394,3.239),
      channel = Channel("1234", "A Channel Title"),
      thumbnails = None
    ),
    Video(
      id = "1001",
      title = "Test",
      description = Some("test 2"),
      tags = List("tag3", "tag4"),
      location = Location(5.3289,5.394,3.239),
      channel = Channel("1234", "A Channel Title"),
      thumbnails = None
    ),
    Video(
      id = "1002",
      title = "Another Test",
      description = Some("test 3"),
      tags = List("tag5", "tag6"),
      location = Location(5.3289,5.394,3.239),
      channel = Channel("1234", "A Channel Title"),
      thumbnails = None
    )
  )
}