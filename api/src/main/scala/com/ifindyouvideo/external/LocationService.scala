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

import com.ifindyouvideo.videos.Location

/**
 * Created by thomasliu on 10/21/15.
 */


object GoogleGeocode {
  case class Search(city: String)
}


class LocationService extends Actor {
  import GoogleGeocode._
  import scala.concurrent.ExecutionContext.Implicits.global
  import de.heikoseeberger.akkahttpjson4s.Json4sSupport._

  implicit val materializer = ActorMaterializer()
  implicit val serialization = Serialization
  implicit val formats = DefaultFormats

  def receive = {
    case Search(city) => searchLatLong(city)
    case _ => println("Invalid message received")
  }

  def searchLatLong(city : String) : Unit = async {

    val req = HttpRequest(uri = Uri("https://maps.googleapis.com/maps/api/place/textsearch/json?" + "key=AIzaSyDo_kdE05psxggmYqbqMyctx3eL85-axq0&query=" + city))

    val res = await {
      Http(context.system).singleRequest(req)
    }

    res.status match {
      case OK => Unmarshal(res.entity).to[JValue] map { resJson =>
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
          northEast = item \ "geometry" \ "viewport" \ "southwest"
          JDouble(swLat) <- northEast \ "lat"
          JDouble(swLon) <- northEast \ "lng"
        } {
          println(haversineDistance((lat, long), (swLat, swLon)))
        }
      }
      case _ => val error = "Invalid Request"
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





