package com.ifindyouvideo.external

import scala.concurrent.Future
import scala.concurrent.future
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

class Rating(implicit val system: ActorSystem) {

  import system.dispatcher
  import de.heikoseeberger.akkahttpjson4s.Json4sSupport._

  def rateVideo(rating: Boolean, youtube: String, videoID: String) {

    if (rating) {
      val params = Map(
        "id" -> videoID,
        "rating" -> "like"
      ).execute()

    } else {
      val params = Map(
        "id" -> videoID,
        "rating" -> "dislike"
      ).execute()
    }
  }

}