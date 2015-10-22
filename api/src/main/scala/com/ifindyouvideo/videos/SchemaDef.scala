package com.ifindyouvideo.videos

import sangria.schema._
import scala.concurrent.Future

object SchemaDef {
  val Location = ObjectType(
    "Location",
    "A Location containing lat, long, and altitude",
    fields[Unit, Location](
      Field("latitude", BigDecimalType,
        Some("The latitude coordinate"),
        resolve = _.value.latitude
      ),
      Field("longitude", BigDecimalType,
        Some("The longitude coordinate"),
        resolve = _.value.longitude
      ),
      Field("altitude", BigDecimalType,
        Some("The altitude coordinate"),
        resolve = _.value.altitude
      )
    )
  )

  val Channel = ObjectType(
    "Channel",
    "A YouTube channel",
    fields[Unit, Channel](
      Field("id", StringType,
        Some("The channel id"),
        resolve = _.value.id
      ),
      Field("title", StringType,
        Some("The channel title"),
        resolve = _.value.title
      )
    )
  )

  val Video = ObjectType(
    "Video",
    "A YouTube video",
    fields[Unit, Video](
      Field("id", StringType,
        Some("The id of the video"),
        resolve = _.value.id
      ),
      Field("title", StringType,
        Some("The title of the video"),
        resolve = _.value.title
      ),
      Field("description", OptionType(StringType),
        Some("The description of the video"),
        resolve = _.value.description.getOrElse("")
      ),
      Field("tags", ListType(StringType),
        Some("The video's tags"),
        resolve = _.value.tags
      ),
      Field("location", Location,
        Some("The video's recording location"),
        resolve = _.value.location
      ),
      Field("channel", Channel,
        Some("The video's channel"),
        resolve = _.value.channel
      )
    )
  )

  val Id = Argument("id", StringType, description = "id of the video")

  val Query = ObjectType("Query", fields[VideoRepo, Unit](
    Field("video", OptionType(Video),
      arguments = Id :: Nil,
      resolve = ctx => ctx.ctx.getVideo(ctx arg Id)
    )
  ))

  val VideoSchema = Schema(Query)
}
