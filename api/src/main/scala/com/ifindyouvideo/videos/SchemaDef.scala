package com.ifindyouvideo.videos

import sangria.relay._
import sangria.schema._
import scala.concurrent.Future
import org.joda.time.format.ISODateTimeFormat
import scala.concurrent.ExecutionContext.Implicits.global

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
      Field("viewCount", OptionType(StringType),
        Some("The view count of a video"),
        resolve = _.value.viewCount
      ),
      Field("likeCount", OptionType(StringType),
        Some("The like count of a video"),
        resolve = _.value.likeCount
      ),
      Field("dislikeCount", OptionType(StringType),
        Some("The dislike count of a video"),
        resolve = _.value.dislikeCount
      ),
      Field("favoriteCount", OptionType(StringType),
        Some("The favorite count of a video"),
        resolve = _.value.favoriteCount
      ),
      Field("commentCount", OptionType(StringType),
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

  val CityType = ObjectType(
    "City",
    "A city containing name, region, and bounds",
    fields[Unit, City](
      Field("name", StringType,
        Some("Name of the city"),
        resolve = _.value.name
      ),
      Field("region", StringType,
        Some("Geographic region the city is located in"),
        resolve = _.value.region
      ),
      Field("bounds", BoundsType,
        Some("Approximate rectangular bounds of the city"),
        resolve = _.value.bounds
      )
    )
  )

  val RawId = Argument("rawId", StringType, description = "id of the video")
  val CityName  = Argument("city", StringType, "name of a city")
  val Year  = Argument("year", IntType, "year to find videos from")
  val Month = Argument("month", IntType, "month to find videos from")
  val IdToken = Argument("idToken", OptionInputType(StringType), "Google token")

  val UserType: ObjectType[UserContext,User] = ObjectType(
    "User",
    "A user",
    interfaces[UserContext, User](nodeInterface),
    fields[UserContext, User](
      Node.globalIdField[UserContext, User]("User"),
      Field("email", StringType,
        Some("Email of the user"),
        resolve = _.value.email
      ),
      Field("favoriteCities", ListType(StringType),
        Some("List of the user's favorite cities"),
        resolve = _.value.favoriteCities
      ),
      Field("roles", ListType(StringType),
        Some("List of user's roles"),
        resolve = _.value.roles
      ),
      Field("city", OptionType(CityType),
        arguments = CityName :: Nil,
        resolve = ctx => ctx.ctx.cityRepo.get(ctx arg CityName)
      ),
      Field("cities", ListType(CityType),
        Some("List of all supported cities in North America"),
        resolve = ctx => ctx.ctx.cityRepo.getByRegion("North America")
      ),
      Field("video", OptionType(VideoType),
        arguments = RawId :: Nil,
        resolve = ctx => ctx.ctx.videoRepo.get(ctx arg RawId)
      ),
      Field("videosByCity", ListType(VideoType),
        arguments = Year :: Month :: CityName :: Nil,
        resolve = ctx => { ctx.ctx.cityRepo.get(ctx arg CityName) flatMap { _ match {
          case Some(City(_, _, bounds)) => {
            ctx.ctx.videoRepo.getByYearMonthLocation(
              ctx arg Year, ctx arg Month, bounds
            )
          }
          case None => Future { Nil }
        } } }
      )
    )
  )

  val Query = ObjectType("Query", fields[UserContext, Unit](
    Field("viewer", UserType,
      arguments = IdToken :: Nil,
      resolve = ctx => {
        ctx argOpt IdToken match {
          case None => ctx.ctx.user
          case Some(idToken) => ctx.ctx.userRepo.getUserByToken(idToken)
        }
      }
    ),
    nodeField
  ))

  val VideoSchema = Schema(Query)
}
