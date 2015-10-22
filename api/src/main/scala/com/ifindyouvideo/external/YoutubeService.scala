package com.ifindyouvideo.external

import scala.concurrent.Future
import java.io.IOException
import akka.actor._
import akka.stream.ActorMaterializer
import akka.http.scaladsl.model._
import akka.http.scaladsl.model.StatusCodes._
import akka.http.scaladsl.Http
import akka.http.scaladsl.unmarshalling._
import com.ifindyouvideo.videos._

/**
  * Created by thomasliu on 10/21/15.
  */
class YoutubeService extends Actor {

  case class Search(location: Location, radius: String)

  def receive = {
    case Search(location, radius) => search(location, radius)
  }

  def search(location: Location, radius: String): Future[Vector[Video]] = {
    val params = Map(
      "key"            -> "AIzaSyCyJJILurm5Pf6ZLFCoCfninmObBvqyiWk",
      "part"           -> "id",
      "order"          -> "viewCount",
      "type"           -> "video",
      "location"       -> location.mkString(","),
      "locationRadius" -> radius
    )

    for {
      request <- HttpRequest(uri = Uri("/").withQuery(params))
      response <- Http().singleRequest(request)
    } yield response.status match {
      case OK => Unmarshal(response.entity)
      case BadRequest => Future.successful(Left("Invalid Request"))
      case _ => Unmarshal(response.entity).to[String].flatMap { entity =>
        val error = s"YouTube request failed with status code ${response.status} and entity $entity"
        Future.failed(new IOException(error))
      }
    }
  }

}
