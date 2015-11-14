package com.ifindyouvideo.videos

import sangria.relay._
import sangria.schema._
import scala.concurrent.Future
import org.joda.time.format.ISODateTimeFormat

object SchemaDef {
  val NodeDefinition(nodeInterface, nodeField) = Node.definition((id: GlobalId, ctx: Context[UserContext, Unit]) ⇒ {
    if (id.typeName == "Video") ctx.ctx.videoRepo.get(id.id)
     // TODO: this is hardcoded to current user right now
    else if (id.typeName == "User") ctx.ctx.userRepo.getUser(id.id)
    else None
  }, Node.possibleNodeTypes[UserContext, Node](VideoType, UserType))

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

  val ImageType = ObjectType(
    "Image",
    "Image for a video, with url, width, and height",
    fields[Unit, Image](
      Field("url", StringType,
        Some("The url of the image"),
        resolve = _.value.url
      ),
      Field("width", IntType,
        Some("The width of the image"),
        resolve = _.value.width
      ),
      Field("height", IntType,
        Some("The height of the image"),
        resolve = _.value.height
      )
    )
  )

  val ThumbnailsType = ObjectType(
    "Thumbnails",
    "Thumbnails for a video",
    fields[Unit, Thumbnails](
      Field("default", OptionType(ImageType),
        Some("The default thumbnail image of a video"),
        resolve = _.value.default
      ),
      Field("medium", OptionType(ImageType),
        Some("The medium thumbnail image of a video"),
        resolve = _.value.medium
      ),
      Field("high", OptionType(ImageType),
        Some("The high thumbnail image of a video"),
        resolve = _.value.high
      ),
      Field("standard", OptionType(ImageType),
        Some("The standard thumbnail image of a video"),
        resolve = _.value.standard
      ),
      Field("maxres", OptionType(ImageType),
        Some("The maxres thumbnail image of a video"),
        resolve = _.value.maxres
      )
    )
  )

  val StatisticsType = ObjectType(
    "Statistics",
    "Statistics for a video",
    fields[Unit, Statistics](
      Field("viewCount", StringType,
        Some("The view count of a video"),
        resolve = _.value.viewCount
      ),
      Field("likeCount", StringType,
        Some("The like count of a video"),
        resolve = _.value.likeCount
      ),
      Field("dislikeCount", StringType,
        Some("The dislike count of a video"),
        resolve = _.value.dislikeCount
      ),
      Field("favoriteCount", StringType,
        Some("The favorite count of a video"),
        resolve = _.value.favoriteCount
      ),
      Field("commentCount", StringType,
        Some("The comment count of a video"),
        resolve = _.value.commentCount
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
      Field("description", StringType,
        Some("The description of the video"),
        resolve = _.value.description
      ),
      Field("publishedAt", StringType,
        Some("The published date of the video"),
        resolve = v => ISODateTimeFormat.dateTime().print(v.value.publishedAt)
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
      ),
      Field("thumbnails", ThumbnailsType,
        Some("The video's thumbnails"),
        resolve = _.value.thumbnails
      ),
      Field("statistics", StatisticsType,
        Some("The video's statistics"),
        resolve = _.value.statistics
      )
    )
  )

  val BoundsType = ObjectType(
    "Bounds",
    "A geographic bound with northwest and southeast lat/long coordinates",
    fields[Unit, Bounds](
      Field("nw", LocationType,
        Some("The northwest location point"),
        resolve = _.value.nw
      ),
      Field("se", LocationType,
        Some("The southeast location point"),
        resolve = _.value.se
      )
    )
  )

  val RawId = Argument("rawId", StringType, description = "id of the video")
  val City  = Argument("city", StringType, "name of a city")
  val Year  = Argument("year", IntType, "year to find videos from")
  val Month = Argument("month", IntType, "month to find videos from")

  val UserType: ObjectType[UserContext,User] = ObjectType(
    "User",
    "A user",
    interfaces[UserContext, User](nodeInterface),
    fields[UserContext, User](
      Node.globalIdField[UserContext, User]("User"),
      Field("cityBounds", OptionType(BoundsType),
        arguments = City :: Nil,
        resolve = ctx => ctx.ctx.getCityBounds(ctx arg City)
      ),
      Field("cities", ListType(StringType),
        resolve = ctx => ctx.ctx.getAvailableCities
      ),
      Field("video", OptionType(VideoType),
        arguments = RawId :: Nil,
        resolve = ctx => ctx.ctx.videoRepo.get(ctx arg RawId)
      ),
      Field("videosByCity", ListType(VideoType),
        arguments = Year :: Month :: City :: Nil,
        resolve = ctx => ctx.ctx.videoRepo.getByYearMonthCity(
          ctx arg Year, ctx arg Month, ctx arg City
        )
      )
    )
  )

  val Query = ObjectType("Query", fields[UserContext, Unit](
    Field("viewer", UserType,
      resolve = ctx => ctx.ctx.user
    ),
    nodeField
  ))

  val VideoSchema = Schema(Query)
}
