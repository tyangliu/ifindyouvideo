package com.ifindyouvideo

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.model.StatusCodes._
import akka.http.scaladsl.model.HttpHeader
import akka.http.scaladsl.model.headers._
import akka.http.scaladsl.server._
import akka.stream.ActorMaterializer

import org.json4s.native.JsonMethods._
import org.json4s.native.Serialization
import org.json4s.ext.JodaTimeSerializers
import org.json4s._

import sangria.parser.{SyntaxError, QueryParser}
import sangria.execution.Executor
import sangria.integration.json4s._
import sangria.integration.json4s.native._

import scala.util.{Success, Failure}

import com.ifindyouvideo.videos._
import com.ifindyouvideo.external.{ YoutubeService, AuthService}

object Server extends App with CorsSupport {
  implicit val system = ActorSystem("ifindyouvideo")
  implicit val materializer = ActorMaterializer()
  implicit val serialization = Serialization
  implicit val formats = DefaultFormats ++ JodaTimeSerializers.all

  import system.dispatcher

  override val corsAllowOrigins = List("*")

  override val corsAllowedHeaders = List(
    "Origin", "X-Requested-With", "Content-Type", "Accept",
    "Accept-Encoding", "Accept-Language", "Host", "Referer", "User-Agent"
  )

  override val corsAllowCredentials = true

  override val optionsCorsHeaders = List[HttpHeader](
    `Access-Control-Allow-Headers`(corsAllowedHeaders.mkString(", ")),
    `Access-Control-Max-Age`(60 * 60 * 24 * 20), // cache pre-flight response for 20 days
    `Access-Control-Allow-Credentials`(corsAllowCredentials)
  )

  val executor = Executor(
    schema = SchemaDef.VideoSchema,
    userContext = new UserContext(
      new UserRepo(new AuthService),
      new VideoRepo(new YoutubeService),
      new CityRepo
    )
  )

  import de.heikoseeberger.akkahttpjson4s.Json4sSupport._

  val routes = cors {
    (post & entity(as[JValue])) { requestJson =>
      val JString(query) = requestJson \ "query"

      val operation = requestJson \ "operation" match {
        case JString(op) => Some(op)
        case _           => None
      }
      val vars = requestJson \ "variables" match {
        case JString(s) => parse(s, useBigDecimalForDouble = true)
        case o: JObject => o
        case _          => JObject()
      }

      QueryParser.parse(query) match {
        case Success(queryAst) =>
          complete(executor.execute(queryAst,
            operationName = operation,
            variables = vars
          ))

        case Failure(error) =>
          complete(BadRequest, JObject("error" -> JString(error.getMessage)))
      }
    }
  }

  Http().bindAndHandle(routes, "0.0.0.0", 8080)
}
