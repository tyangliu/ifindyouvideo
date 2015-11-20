package com.ifindyouvideo.videos

import scala.concurrent.Future
import scala.concurrent.duration._
import scala.concurrent.ExecutionContext.Implicits.global
import scala.async.Async.{async, await}
import org.joda.time.DateTime
import com.ifindyouvideo.database.Database
import com.ifindyouvideo.external.YoutubeService
import com.ifindyouvideo.utils.LocationUtils

class UserRepo {
  def getUser(id: String): Option[User] = Some(User("dummy", "dummy@gmail.com", Nil))
}

class VideoRepo(youtubeService: YoutubeService) {
  def get(id: String): Future[Option[Video]] = Database.videos.getById(id)

  def getByYearMonthLocation(y: Int, m: Int, bounds: Bounds): Future[List[Video]] = {
    Database.videosByGeohash.getByYearMonthLocation(y, m, bounds)
  }

  def retrieveAndStore(y: Int, m: Int, bounds: Bounds): Future[List[Video]] = async {
    val Bounds(nw, se) = bounds
    val (center, radius) = LocationUtils.boundingBoxCenterRadius(nw, se)

    val results = await { youtubeService.search(center, radius, y, m) }
    await { Database.videos.multiStore(results) }
    await { Database.videosByGeohash.multiStore(results, isAllTime(y, m)) }

    results
  }

  def isAllTime(y: Int, m: Int) = y == 0 && m == 0
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
