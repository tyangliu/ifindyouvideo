package com.ifindyouvideo.videos

import scala.concurrent.Future
import com.websudos.phantom.dsl._

case class Video(
  id:          String,
  title:       String,
  description: Option[String],
  tags:        List[String]/*,
  location:    Location,
  channel:     Channel,
  thumbnails:  Thumbnails?*/
)

case class Location(latitude: Double, longitude: Double, altitude: Double)
case class Channel(id: String, title: String)

case class Image(url: String, width: Int, height: Int)

case class Thumbnails(
  default:  Image,
  medium:   Image,
  high:     Image,
  standard: Image,
  maxres:   Image
)

class VideoRepo {
  import VideoRepo._

  def getVideo(id: String): Option[Video] = videos.find(v => v.id == id)
}

object VideoRepo {
  val videos = List(

    Video(
      id="1000",
      title="Test",
      description=Some("test"),
      tags=List("tag1", "tag2")
    ),
    Video(
      id="1001",
      title="Video Title",
      description=Some("test3"),
      tags=List("tag3", "tag4")
    )

  )
}