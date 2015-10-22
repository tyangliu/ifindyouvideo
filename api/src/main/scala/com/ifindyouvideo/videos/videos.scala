package com.ifindyouvideo.videos

import scala.concurrent.Future
import com.websudos.phantom.dsl._

case class Video(
  id:          String,
  title:       String,
  description: Option[String],
  tags:        Vector[String],
  location:    Location,
  channel:     Channel,
  thumbnails:  Thumbnails
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
