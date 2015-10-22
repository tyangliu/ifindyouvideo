package com.ifindyouvideo.videos

import sangria.schema._
import scala.concurrent.Future

object SchemaDef {
  val Video = ObjectType(
    "Video",
    "A YouTube video",
    fields[Unit, Video](
      Field("id", StringType,
        Some("The id of the video."),
        resolve = _.value.id
      ),
      Field("title", StringType,
        Some("The title of the video."),
        resolve = _.value.title
      ),
      Field("description", OptionType(StringType),
        Some("The description of the video."),
        resolve = _.value.description.getOrElse("")
      ),
      Field("tags", ListType(StringType),
        Some("The video's tags."),
        resolve = _.value.tags
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
