package com.ifindyouvideo.videos

import org.joda.time.DateTime
import scala.concurrent.Future
import sangria.relay.{Identifiable, Node}

case class Video(
  id:          String,
  title:       String,
  description: String,
  publishedAt: DateTime,
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
case class Bounds(nw: Location, se: Location)
