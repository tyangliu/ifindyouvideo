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
      Field("name", OptionType(StringType),
        Some("The name of the video."),
        resolve = _.value.name
      )
    )
  )
}
