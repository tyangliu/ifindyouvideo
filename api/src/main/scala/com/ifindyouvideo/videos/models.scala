package com.ifindyouvideo.videos

import java.util.UUID
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
  viewCount: Option[String],
  likeCount: Option[String],
  dislikeCount: Option[String],
  favoriteCount: Option[String],
  commentCount: Option[String]
)

case class Image(url: String, width: Int, height: Int)

case class Thumbnails(
  default:  Option[Image],
  medium:   Option[Image],
  high:     Option[Image],
  standard: Option[Image],
  maxres:   Option[Image]
)

case class Bounds(nw: Location, se: Location)
case class City(name: String, region: String, bounds: Bounds)

case class User(
  id:             String,
  email:          String,
  favoriteCities: List[String],
  roles:          List[String]
) extends Node
