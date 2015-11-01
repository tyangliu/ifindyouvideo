package com.ifindyouvideo.videos

import sangria.relay._
import sangria.schema._
import scala.concurrent.Future

object SchemaDef {
  val NodeDefinition(nodeInterface, nodeField) = Node.definition((id: GlobalId, ctx: Context[VideoRepo, Unit]) ⇒ {
    if (id.typeName == "Video") ctx.ctx.getVideo(id.id)
    else None
  }, Node.possibleNodeTypes[VideoRepo, Node](VideoType))

  def idFields[T : Identifiable](name: String) = fields[Unit, T](
    Node.globalIdField(name),
    Field("rawId", StringType, resolve = ctx ⇒ implicitly[Identifiable[T]].id(ctx.value))
  )

  val LocationType = ObjectType(
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

  val ChannelType = ObjectType(
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

  val VideoType: ObjectType[Unit, Video] = ObjectType(
    "Video",
    "A YouTube video",
    interfaces[Unit, Video](nodeInterface),
    idFields[Video]("Video") ++
    fields[Unit, Video](
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
      Field("location", LocationType,
        Some("The video's recording location"),
        resolve = _.value.location
      ),
      Field("channel", ChannelType,
        Some("The video's channel"),
        resolve = _.value.channel
      )
    )
  )

  val RawId = Argument("rawId", StringType, description = "id of the video")

  val Query = ObjectType("Query", fields[VideoRepo, Unit](
    Field("video", OptionType(VideoType),
      arguments = RawId :: Nil,
      resolve = ctx => ctx.ctx.getVideo(ctx arg RawId)
    ),
    nodeField
  ))

  val VideoSchema = Schema(Query)
}
