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
      )
    )
  )
}
