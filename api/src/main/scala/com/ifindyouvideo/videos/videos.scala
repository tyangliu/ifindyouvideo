package com.ifindyouvideo.videos

import scala.concurrent.future
import scala.concurrent.Future
import scala.concurrent.duration._
import scala.concurrent.ExecutionContext.Implicits.global
import org.joda.time.DateTime
import com.ifindyouvideo.database.Database

class UserRepo {
  def getUser(id: String): Option[User] = Some(User("dummy"))
}

class VideoRepo {
  import VideoRepo._

  def get(id: String): Future[Option[Video]] = Database.videos.getById(id)

  def getByYearMonthCity(y: Int, m: Int, city: String): Future[List[Video]]  = {
    (cities get city) match {
      case Some(Bounds(nw, se)) => getByYearMonthLocation(y, m, nw, se)
      case None => future { Nil }
    }
  }

  def getByYearMonthLocation(y: Int, m: Int, nw: Location, se: Location): Future[List[Video]] = {
    Database.videosByGeohash.getByYearMonthLocation(y, m, nw, se)
  }
}

case class UserContext(userRepo: UserRepo, videoRepo: VideoRepo) {
  def user = User("dummy")
  def location = Some(Location(59.288331692,-135.637207031,0))

  def getAvailableCities: List[String] = VideoRepo.cities.keySet.toList
  def getCityBounds(city: String): Option[Bounds] = VideoRepo.cities get city
}

object VideoRepo {
  val cities = Map(
    "Vancouver, BC" -> Bounds(Location(49.314076,-123.224759,0), Location(49.198177,-123.023068,0)),
    "San Francisco, CA" -> Bounds(Location(37.929771, -123.166067,0), Location(37.693129, -122.327915,0)),
    "Seattle, WA" -> Bounds(Location(47.734145,-122.435908,0), Location(47.495551,-122.235903,0))
  )
}
