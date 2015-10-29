package com.ifindyouvideo.users

import java.util.UUID
import _root_.com.ifindyouvideo.videos.Channel
import _root_.com.ifindyouvideo.videos.Location
import _root_.com.ifindyouvideo.videos.Video

import scala.concurrent.Future
import com.websudos.phantom.dsl._

case class User(id: UUID, name: String, avatarUrl: String)

// Location of User for filtering videos nearby
case class Location(latitude: BigDecimal, longitude: BigDecimal, altitude: BigDecimal)

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