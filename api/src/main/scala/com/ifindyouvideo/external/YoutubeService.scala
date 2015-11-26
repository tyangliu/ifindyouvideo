package com.ifindyouvideo.external

import scala.concurrent.Future
import scala.util.{Try, Success, Failure}
import java.io.IOException
import java.text._
import org.joda.time.DateTime

import akka.actor._
import akka.stream.ActorMaterializer

import akka.http.scaladsl.model._
import akka.http.scaladsl.model.StatusCodes._
import akka.http.scaladsl.Http
import akka.http.scaladsl.unmarshalling._

import scala.async.Async.{async, await}

import org.json4s.native.JsonMethods._
import org.json4s.native.Serialization
import org.json4s.ext.JodaTimeSerializers
import org.json4s._

import com.ifindyouvideo.videos._

class YoutubeService(implicit val system: ActorSystem) {

  import system.dispatcher
  import de.heikoseeberger.akkahttpjson4s.Json4sSupport._

  implicit val materializer = ActorMaterializer()
  implicit val serialization = Serialization
  implicit val formats = new DefaultFormats {
    override def dateFormatter = {
      new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    }
  } ++ JodaTimeSerializers.all

  def search(center: Location, radius: String, y: Int = 0, m: Int = 0): Future[List[Video]] = async {
    val locationStr = center match {
      case Location(lat,long,_) => List(lat,long).mkString(",")
    }

    val partialParams = Map(
      "key"            -> "AIzaSyCyJJILurm5Pf6ZLFCoCfninmObBvqyiWk",
      "part"           -> "id",
      "order"          -> "viewCount",
      "type"           -> "video",
      "maxResults"     -> "50",
      "location"       -> locationStr,
      "locationRadius" -> radius
    )

    val params = if (y > 0 && m > 0) {
      partialParams ++ {
        val startDate = new DateTime(y, m, 1, 0, 0, 0, 0)
        val endDate   = startDate.dayOfMonth.withMaximumValue
        Map(
          "publishedAfter"  -> startDate.toString,
          "publishedBefore" -> endDate.toString
        )
      }
    } else {
      partialParams
    }

    val req = HttpRequest(uri = Uri("https://www.googleapis.com/youtube/v3/search").withQuery(params))
    val res = await { Http(system).singleRequest(req) }

    res.status match {
      case OK => {
        val resJson = await { Unmarshal(res.entity).to[JValue] }
        val ids = (resJson \ "items" \ "id" \ "videoId").extract[List[String]]
        await { getVideoDetails(ids) }
      }
      case _ => Nil
    }
  }

  def getVideoDetails(ids: List[String]): Future[List[Video]] = async {
    val params = Map(
      "key"  -> "AIzaSyCyJJILurm5Pf6ZLFCoCfninmObBvqyiWk",
      "part" -> List("id","snippet","statistics","recordingDetails").mkString(","),
      "id"   -> ids.mkString(",")
    )

    val req = HttpRequest(uri = Uri("https://www.googleapis.com/youtube/v3/videos").withQuery(params))
    val res = await { Http(system).singleRequest(req) }

    res.status match {
      case OK => {
        val resJson = await { Unmarshal(res.entity).to[JValue] }
        for {
          JArray(items)         <- resJson \ "items"
          item                  <- items
          snippet               =  item \ "snippet"
          JString(id)           <- item \ "id"
          JString(title)        <- snippet \ "title"
          JString(description)  <- snippet \ "description"
          publishedAt           =  (snippet \ "publishedAt").extract[DateTime]
          tags                  =  (snippet \ "tags").extract[List[String]]
          location              =  (item \ "recordingDetails" \ "location").extract[Location]
          JString(channelId)    <- snippet \ "channelId"
          JString(channelTitle) <- snippet \ "channelTitle"
          channel               =  Channel(channelId, channelTitle)
          thumbnails            =  (snippet \ "thumbnails").extract[Thumbnails]
          statistics            =  (item \ "statistics").extract[Statistics]
        } yield Video(
          id, title, description, publishedAt, tags,
          location, channel, thumbnails, statistics
        )
      }
      case _ => Nil
    }
  }

}
