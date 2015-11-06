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

    val params = Map(
      "key" -> "AIzaSyCyJJILurm5Pf6ZLFCoCfninmObBvqyiWk",
      "query" -> "2200 LowerMall, Vancouver, BC, Canada"
    )

    val req = HttpRequest(uri = Uri("https://maps.googleapis.com/maps/api/place/textsearch/json?").withQuery(params))

    val res = await{Http(context.system).singleRequest(req)}

    res.status match {
      case OK => Unmarshal(res.entity).to[JValue] map {
        resJson => val results = for {
          JArray(items) <- resJson \ "results" \ "geometry" \ "location"
          item <- items
          lat = (item \ "lat").extract[String]
          long = (item \ "long").extract[String]
        }
        MapCenterPoint(lat, long)
      }
      case _ => val error = "Invalid Request"
    }

    def MapCenterPoint(lat: String, long: String): Unit = async {
      // make center location for map to use
    }

  }
}



