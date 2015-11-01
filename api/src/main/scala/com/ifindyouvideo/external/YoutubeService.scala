package com.ifindyouvideo.external

import org.json4s.JsonAST.JValue

import scala.concurrent.Future
import java.io.IOException
import akka.actor._
import akka.stream.ActorMaterializer
import akka.http.scaladsl.model._
import akka.http.scaladsl.model.StatusCodes._
import akka.http.scaladsl.Http
import akka.http.scaladsl.unmarshalling._
import com.ifindyouvideo.videos._

import org.json4s.native.JsonMethods._
import org.json4s._

import de.heikoseeberger.akkahttpjson4s.Json4sSupport._
/*
class YoutubeService extends Actor with YoutubeClient {

  case class Search(location: Location, radius: String)

  def receive = {
    case Search(location, radius) => search(location, radius)
  }

}

trait YoutubeClient {
  def search(location: Location, radius: String): Either[String, JValue] = {
    val params = Map(
      "key"            -> "AIzaSyCyJJILurm5Pf6ZLFCoCfninmObBvqyiWk",
      "part"           -> "id",
      "order"          -> "viewCount",
      "type"           -> "video",
      "location"       -> List(location.latitude,location.longitude).mkString(","),
      "locationRadius" -> radius
    )

    for {
      request <- HttpRequest(uri = Uri("/").withQuery(params))
      response <- Http().singleRequest(request)
    } yield response.status match {
      case OK => Unmarshal(response.entity).to[JValue]
      case BadRequest => Future.successful(Left("Invalid Request"))
      case _ => Unmarshal(response.entity).to[String].flatMap { entity =>
        val error = s"YouTube request failed with status code ${response.status} and entity $entity"
        Future.failed(new IOException(error))
      }
    }
  }
}
*/
