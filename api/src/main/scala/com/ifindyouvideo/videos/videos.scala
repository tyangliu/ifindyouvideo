package com.ifindyouvideo.videos

import scala.concurrent.Future
import scala.concurrent.duration._
import scala.concurrent.ExecutionContext.Implicits.global
import scala.async.Async.{async, await}
import org.joda.time.DateTime
import com.ifindyouvideo.database.Database
import com.ifindyouvideo.external.{ YoutubeService, AuthService, AuthResult , LocationService}
import com.ifindyouvideo.utils.LocationUtils

class UserRepo(authService: AuthService) {
  def getUser(id: String): Option[User] = Some(User("dummy", "dummy@gmail.com", Nil, Nil))
  def getUserByToken(idToken: String) : Future[User] =  async {
    val idTokenResult = await {authService.validate(idToken)}
    idTokenResult match {
      case None => User("stupid", "stupidFace@thatsnotnice.com", Nil, Nil)
      case Some(AuthResult(id, email)) => {
        val userOpt = await { Database.usersByEmail.getByEmail(email) }
        userOpt match {
          case None => {
            val newUser = User(id, email, Nil, Nil)
            await { Database.usersByEmail.store(newUser) }
            await { Database.users.store(newUser) }
            newUser
          }
          case Some(user) => user
        }
      }
    }
  }

//  def addFavouriteCity(user: User, city: String): Future[User = async {
//    val newUser = user.copy(favoriteCities = city :: user.favoriteCities)
//    await { Database.usersByEmail.store(newUser) }
//    await { Database.users.store(newUser) }
//    newUser
//  }
}

class VideoRepo(youtubeService: YoutubeService, locationService: LocationService) {
  def get(id: String): Future[Option[Video]] = Database.videos.getById(id)

  def getByYearMonthLocation(y: Int, m: Int, bounds: Bounds): Future[List[Video]] = {
    Database.videosByGeohash.getByYearMonthLocation(y, m, bounds)
  }

  def getByLocation(cityName : String, y: Int, m: Int): Future[List[Video]] = async {
    if (cityName.length == 0) { Nil }
    else {
      val bound = await {
        locationService.searchLatLong(cityName)
      }
      val (center, radius) = bound match {
        case Some(Bounds(nw, se)) => LocationUtils.boundingBoxCenterRadius(nw, se)
        case None => (Location(0, 0, 0), "1km")
      }
      await {
        youtubeService.search(center, radius, y, m)
      }
    }
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
  def user = User("dummy", "dummy@gmail.com", List("Vancouver, BC", "Seattle, WA"), Nil)
}
