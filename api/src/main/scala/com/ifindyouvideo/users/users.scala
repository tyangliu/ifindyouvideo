package com.ifindyouvideo.users

import scala.concurrent.Future
import com.websudos.phantom.dsl._

case class User(id: String, name: String, avatarUrl: String)

// Location of User for filtering videos nearby
case class Location(latitude: BigDecimal, longitude: BigDecimal, altitude: BigDecimal)

/*
case class Image(url: String, width: Int, height: Int)

case class Video(
                  id:          String,
                  title:       String,
                  description: Option[String],
                  tags:        List[String],
                  location:    Location,
                  channel:     Channel,
                  thumbnails:  Option[Thumbnails]
                  )

*/

object User {
  val users = List(
    User(
      id = "1000",
      name = "Bob",
      avatarUrl = "Test"
    ),
    User(
      id = "1000",
      name = "Bob2",
      avatarUrl = "Test"
    )
  )
}
