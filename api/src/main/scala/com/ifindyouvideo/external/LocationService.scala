package com.ifindyouvideo.external
import scala.concurrent.Future
import scala.util.{Success, Failure}
import java.io.IOException

import akka.actor._
import akka.stream.ActorMaterializer

import akka.http.scaladsl.model._
import akka.http.scaladsl.model.StatusCodes._
import akka.http.scaladsl.Http
import akka.http.scaladsl.unmarshalling._

import scala.async.Async.{async, await}

import org.json4s.native.JsonMethods._
import org.json4s.native.Serialization
import org.json4s._

import com.ifindyouvideo.videos._

/**
 * Created by thomasliu on 10/21/15.
 */


object GoogleGeocode {
  case class Search(city: String)
}


class LocationService(implicit val system: ActorSystem) {
  import GoogleGeocode._
  import system.dispatcher
  import de.heikoseeberger.akkahttpjson4s.Json4sSupport._

  implicit val materializer = ActorMaterializer()
  implicit val serialization = Serialization
  implicit val formats = DefaultFormats

  def searchLatLong(city : String) : Future[Option[Bounds]] = async {

    val params = Map(
      "key" -> "AIzaSyDo_kdE05psxggmYqbqMyctx3eL85-axq0",
      "query" -> city)

    val req = HttpRequest(uri = Uri("https://maps.googleapis.com/maps/api/place/textsearch/json").withQuery(params))
    val res = await {
      Http(system).singleRequest(req)
    }

    res.status match {
      case OK => {
        val resJson = await { Unmarshal(res.entity).to[JValue] }
        println(pretty(render(resJson)))
        val results = for {
          JArray(items) <- resJson \ "results"
          item <- items
          location = item \ "geometry" \ "location"
          JDouble(lat) <- location \ "lat"
          JDouble(long) <- location \ "lng"
          center = Location(lat, long, 0)
          northEast = item \ "geometry" \ "viewport" \ "northeast"
          JDouble(neLat) <- northEast \ "lat"
          JDouble(neLon) <- northEast \ "lng"
          southWest = item \ "geometry" \ "viewport" \ "southwest"
          JDouble(swLat) <- southWest \ "lat"
          JDouble(swLon) <- southWest \ "lng"
        } yield { Some(Bounds(Location(neLat, swLon, 0), Location(swLat, neLon, 0))) }
        results match {
          case Nil => {None}
          case _ => results.head
        }
      }
      case _ => None
    }
  }

  def MapCenterPoint(lat: Double, long: Double): Unit = async {
  }

  def haversineDistance(pointA: (Double, Double), pointB: (Double, Double)): Double = {
    val deltaLat = math.toRadians(pointB._1 - pointA._1)
    val deltaLong = math.toRadians(pointB._2 - pointA._2)
    val a = math.pow(math.sin(deltaLat / 2), 2) + math.cos(math.toRadians(pointA._1)) * math.cos(math.toRadians(pointB._1)) * math.pow(math.sin(deltaLong / 2), 2)
    val greatCircleDistance = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    3958.761 * 1.60934 * greatCircleDistance
  }
}
