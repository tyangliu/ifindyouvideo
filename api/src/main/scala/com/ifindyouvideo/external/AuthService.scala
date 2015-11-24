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

case class AuthResult(id: String, email: String)

class AuthService(implicit val system: ActorSystem) {

  import system.dispatcher
  import de.heikoseeberger.akkahttpjson4s.Json4sSupport._

  implicit val materializer = ActorMaterializer()
  implicit val serialization = Serialization
  implicit val formats = DefaultFormats

  def validate(idToken: String): Future[Option[AuthResult]] = async {

    val params = Map(
      "id_token" -> idToken
    )

    val req = HttpRequest(uri = Uri("https://www.googleapis.com/oauth2/v3/tokeninfo").withQuery(params))
    val res = await {
      Http(system).singleRequest(req)
    }

    res.status match {
      case OK => {
        val resJson = await { Unmarshal(res.entity).to[JValue] }
        val email = (resJson \ "email").extract[String]
        val id = (resJson \ "sub").extract[String]
        Some(AuthResult(id, email))
      }
      case _ => None
    }
  }
}
