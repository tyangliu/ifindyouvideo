package com.ifindyouvideo.users

import java.util.UUID
import scala.concurrent.Future
import com.websudos.phantom.dsl._

case class User(id: UUID, name: String, avatarUrl: String)
