package com.ifindyouvideo.videos

import scala.concurrent.Future
import scala.concurrent.duration._
import scala.concurrent.ExecutionContext.Implicits.global
import org.joda.time.DateTime
import com.ifindyouvideo.database.Database

class UserRepo {
  def getUser(id: String): Option[User] = Some(User("dummy", "dummy@gmail.com", Nil))
}

class VideoRepo {
  def get(id: String): Future[Option[Video]] = Database.videos.getById(id)

  def getByYearMonthLocation(y: Int, m: Int, nw: Location, se: Location): Future[List[Video]] = {
    Database.videosByGeohash.getByYearMonthLocation(y, m, nw, se)
  }
}

class CityRepo {
  def get(name: String): Future[Option[City]] = {
    Database.cities.getByName(name)
  }

  def getByRegion(region: String): Future[List[City]] = {
    Database.citiesByRegion.getByRegion(region)
  }
}

case class UserContext(userRepo: UserRepo, videoRepo: VideoRepo, cityRepo: CityRepo) {
  def user = User("dummy", "dummy@gmail.com", List("Vancouver, BC", "Seattle, WA"))
}
