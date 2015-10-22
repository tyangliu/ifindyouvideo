package com.ifindyouvideo

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.model.StatusCodes._
import akka.http.scaladsl.server._
import akka.stream.ActorMaterializer

import org.json4s.native.JsonMethods._
import org.json4s.native.Serialization
import org.json4s._

import sangria.parser.{SyntaxError, QueryParser}
import sangria.execution.Executor
import sangria.integration.json4s._
import sangria.integration.json4s.native._

import scala.util.{Success, Failure}

import com.ifindyouvideo.videos._

object Server extends App {
  implicit val system = ActorSystem("ifindyouvideo")
  implicit val materializer = ActorMaterializer()
  implicit val serialization = Serialization
  implicit val formats = DefaultFormats

  import system.dispatcher

  val executor = Executor(
    schema = SchemaDef.VideoSchema,
    userContext = new VideoRepo
  )

  import de.heikoseeberger.akkahttpjson4s.Json4sSupport._

  val routes = {
    (post & entity(as[JValue])) { requestJson =>
      val JString(query) = requestJson \ "query"
      val operation = requestJson \ "operation" match {
        case JString(op) => Some(op)
        case JNothing => None
      }
      val vars = requestJson \ "variables" match {
        case JString(s) => parse(s, useBigDecimalForDouble = true)
        case JNothing => JObject()
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
