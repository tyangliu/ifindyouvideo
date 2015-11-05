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

object YoutubeProtocol {
  case class Search(location: Location, radius: String)
}

class YoutubeService extends Actor {

  import YoutubeProtocol._
  import scala.concurrent.ExecutionContext.Implicits.global
  import de.heikoseeberger.akkahttpjson4s.Json4sSupport._

  implicit val materializer = ActorMaterializer()
  implicit val serialization = Serialization
  implicit val formats = DefaultFormats

  def receive = {
    case Search(location, radius) => search(location, radius)
  }

  def search(location: Location, radius: String): Unit = async {
    val locationStr = location match {
      case Location(lat,long,_) => List(lat,long).mkString(",")
    }

    val params = Map(
      "key"            -> "AIzaSyCyJJILurm5Pf6ZLFCoCfninmObBvqyiWk",
      "part"           -> "id",
      "order"          -> "viewCount",
      "type"           -> "video",
      "location"       -> locationStr,
      "locationRadius" -> radius
    )

    val req = HttpRequest(uri = Uri("https://www.googleapis.com/youtube/v3/search").withQuery(params))
    val res = await { Http(context.system).singleRequest(req) }

    res.status match {
      case OK => Unmarshal(res.entity).to[JValue] map { resJson =>
        val ids = (resJson \ "items" \ "id" \ "videoId").values
        println(ids)
      }
      /*
      case BadRequest => Left("Invalid Request")
      case _ => Unmarshal(response.entity).to[String].flatMap { entity =>
        val error = s"YouTube request failed with status code ${response.status} and entity $entity"
        new IOException(error)
      }
      */
    }
  } onFailure { case e => println("An error has occured: " + e.getMessage) }

}
