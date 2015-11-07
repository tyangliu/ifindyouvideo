package com.ifindyouvideo.videos

import scala.concurrent.Future
import sangria.relay.{Identifiable, Node}
import com.websudos.phantom.dsl._

case class Video(
  id:          String,
  title:       String,
  description: String,
  publishedAt: String,
  tags:        List[String],
  location:    Location,
  channel:     Channel,
  thumbnails:  Thumbnails,
  statistics:  Statistics
) extends Node

case class Location(latitude: BigDecimal, longitude: BigDecimal, altitude: BigDecimal)
case class Channel(id: String, title: String)

case class Statistics(
  viewCount: String,
  likeCount: String,
  dislikeCount: String,
  favoriteCount: String,
  commentCount: String
)

case class Image(url: String, width: Int, height: Int)

case class Thumbnails(
   default:  Option[Image],
   medium:   Option[Image],
   high:     Option[Image],
   standard: Option[Image],
   maxres:   Option[Image]
 )

case class User(id: String) extends Node

class UserRepo {
  def getUser(id: String): Option[User] = Some(User("dummy"))
}

class VideoRepo {
  import VideoRepo._

  def getVideo(id: String): Option[Video] = videos.find(v => v.id == id)

  def findVideos(latitude: BigDecimal, longitude: BigDecimal, radius: String) = videos
}

case class UserContext(userRepo: UserRepo, videoRepo: VideoRepo) {
  def user = User("dummy")
}

object VideoRepo {
  val videos = List(
    Video(
      id = "oODmbz_PJQw",
      title = "Largest silver salmon ever caught in Alaska",
      description = "Thumbs UP if you like.  \\n  \\n  We drove up to Haines Alaska for a fun filled weekend of fishing and I hooked in to this monster coho salmon!!! I had a crappy tire rod and some 10 pound line. Man was I happy to finally land it! For the record the french guy was in our face all day asking questions, \\\"borrowing\\\" stuff and casting while we were reeling in fish.",
      publishedAt = "2008-10-03T04:38:45.000Z",
      tags = List("Alaska","silver","salmon","run","coho","fishing","tips","accidents","bloopers","wildlife","records","trophy","shark","halibut","chilkat","chilkoot","fish"),
      location = Location(59.7231771449,-139.39453125,0.0),
      channel = Channel("UC8CXqtQfr_qwE-L3A3XoEGQ", "Worlds Wildest Wonders"),
      thumbnails = Thumbnails(
        Some(Image("https://i.ytimg.com/vi/oODmbz_PJQw/default.jpg", 120, 90)),
        Some(Image("https://i.ytimg.com/vi/oODmbz_PJQw/mqdefault.jpg.jpg", 320, 180)),
        Some(Image("https://i.ytimg.com/vi/oODmbz_PJQw/hqdefault.jpg.jpg", 480, 360)),
        Some(Image("https://i.ytimg.com/vi/oODmbz_PJQw/sddefault.jpg.jpg", 640, 480)),
        None),
      statistics = Statistics("1340626","1467","1256","0","1144")
    ),
    Video(
      id = "CxOIBgE1Z0o",
      title = "Medicine for the People: For Humanity's Sake",
      description = "Medicine for the People play at Home Skillet Festival in Sitka, Alaska and hang with filmmaker Hannah Guggenheim.",
      publishedAt = "2010-08-13T21:54:59.000Z",
      tags = List("Medicine for the People","best song","viral video","ska","Nahko Bear","Hope Medford","Hannah Guggenheim","Portland music scene","funniest viral video","Hawaii music","best new band","coachella","acoustic","justin bieber"),
      location = Location(55.97379820507658,-137.109375,0.0),
      channel = Channel("UCLct3N3oCeqNW5_J0DycSJw", "Hannah Guggenheim"),
      thumbnails = Thumbnails(
        Some(Image("https://i.ytimg.com/vi/CxOIBgE1Z0o/default.jpg", 120, 90)),
        Some(Image("https://i.ytimg.com/vi/CxOIBgE1Z0o/mqdefault.jpg", 320, 180)),
        Some(Image("https://i.ytimg.com/vi/CxOIBgE1Z0o/hqdefault.jpg", 480, 360)),
        None,None),
      statistics = Statistics("305079","1347","9","0","106")
    ),
    Video(
      id = "IrgSkA8wOSw",
      title = "Early Bob Dylan Blues Collection: a blues album - Ten Bob Dylan songs (cover&art by Paul)",
      description =
        """Copyright music and lyrics reproduced by kind permission of Special Rider.
          For original, exclusive performances by Bob Dylan, check-out the official channel at www.youtube.com/bobdylan
          Performed by me: Paul Hall of paulhallart (I also did the artwork).
          Since I was 9 ('55), I played harmonica but I learned this style of blues harp back in the day ('65) when I was in art school at the School of Visual Arts in New York City,
           and also listening to Radio Unnameable on WBAI in the wee hours of the mornings when I'd be up late painting.
            Bob was my neighbor back then as well in the West Village (2 buildings over) tho I never met him.
            \\n\\n\\nFor more info: http://www.paulhallart.com/pages/literature/deeperlevels/deltabird1/grenwichvillageperiod.htm\\n\\n
            The songs (marked in: minutes:seconds) :\\n\\nCrash on the Levee (at 00:02),\\n\\nDown the Highway (at 05:12),\\n\\nFrom a Buick 6 (at 13:12),\\n\\nLong
            Distance Operator (at 16:59),\\n\\nMaggie's Farm (at 22:12),\\n\\nOdds and Ends (at 28:01),\\n\\nOn the Road Again (at 33:08),\\n\\nOutlaw Blues (at 34:55),\\n\\nSitting on a Barbed Wire Fence (at 40:27),\\n\\n
            Watchin' The River Flow (at 45:19),\\n\\n\\n\\nThis is a Bob Dylan Cover Album, songs by Bob Dylan, cover by me, paulhallart, but it's also a blues collection of about one hour of music, the last part being non-blues harmonica covers for the last minutes in this show to give the titles of my artwork included as the slide show (in case u might want2buy a painting or something).  But in a sense that it is a cover it's kind of like one of many Bob Dylan albums of covers that I uploaded to YouTube, summer of '11, in Alaska.  So this is sort of the culmination of a series of ten Bob Dylan full albums but as covers by me, the last of the Bob Dylan full albums (1 hour long) that I covered, collected and arranged, performing the numbers in the blues style.\\n\\nAgain the location of the cuts on the album:\\n\\n0:00 Crash on the Levee, 5:12 Down the Highway, 13:11 From a Buick 6, 17:04 Long Distance Opperator, 22:18 Maggie's Farm, 28:00 Odds and Ends, 31:10 On the Road Again, 34:55 Outlaw Blues, 40:30 Sitting on a Barbed Wire Fence, 45:19 Watchin' the River Flow""".stripMargin,
      publishedAt = "2011-09-14T17:13:24.000Z",
      tags = List("Early Bob Dyaln Blues Album","Bob Dylan","bob dylan","bob dylan album","blues","collection","cover","classical guitar","nylon-string guitar","harmonica","vocal","Crash on the Levee","Down the Highway","From a Buick 6","Long Distance Operator","Maggie's Farm","Outlaw Blues","Sitting on a Barbed Wire Fence","Watchin' The River Flow","acoustic","music","art","fine art","drawing","drawings","painting","digital art","oil painting","creative","artist","Cover Version","Paint","Guitar","Draw","Acoustic Music (Musical Genre)"),
      location = Location(59.46062,-135.3044,0.0),
      channel = Channel("UCoAOu40g8aE81WCb_lk2gzw", "A Channel Title"),
      thumbnails = Thumbnails(
        Some(Image("https://i.ytimg.com/vi/IrgSkA8wOSw/default.jpg", 120, 90)),
        Some(Image("https://i.ytimg.com/vi/IrgSkA8wOSw/mqdefault.jpg", 320, 180)),
        Some(Image("https://i.ytimg.com/vi/IrgSkA8wOSw/hqdefault.jpg", 480, 360)),
        Some(Image("https://i.ytimg.com/vi/IrgSkA8wOSw/sddefault.jpg", 640, 480)),
        None),
      statistics = Statistics("300542","544","49","0","95")
    ),
    Video(
      id = "Qm1edxnM8Xc",
      title = "Mr krabs dance robot for 3 minutes!",
      description = "the coolest dance ever in spongebob and the best song ever in one video OMG",
      publishedAt = "2010-11-04T14:31:55.000Z",
      tags = List("mr","krabs","dance","robot","spongebob","schwammkopf","patrick","sparepants","plankton","gary","tecno","my","leg","DEUUEAUGH","deuueaugh"),
      location = Location(60.58696734225869,-140.2734375,0.0),
      channel = Channel("UCJYdWZ53F0_M6-FbgpQfsZw", "Ergomanic"),
      thumbnails = Thumbnails(
        Some(Image("https://i.ytimg.com/vi/Qm1edxnM8Xc/default.jpg", 120, 90)),
        Some(Image("https://i.ytimg.com/vi/Qm1edxnM8Xc/mqdefault.jpg", 320, 180)),
        Some(Image("https://i.ytimg.com/vi/Qm1edxnM8Xc/hqdefault.jpg", 480, 360)),
        None,None),
      statistics = Statistics("275193","1700","49","0","440")
    ),
    Video(
      id = "N0vTrfbK3FM",
      title = "Chicka Chicka Boom Boom Song By John Archambault",
      description = "Copied from Cassette Tape.  Chicka Chicka Boom Boom is a book written by Bill Martin, Jr, and John Archambault.  The song is composed and arranged by John Archambault and David Plummer.  \\n\\nThis is my son and daughter's favorite book and song, but our cassette tape player broke... what's a dad to do?  Digitize it!   Sorry for the poor video, we were after the audio track.",
      publishedAt = "2008-10-03T04:38:45.000Z",
      tags = List("chicka","boom","book","music"),
      location = Location(59.288331692,-135.637207031,0.0),
      channel = Channel("UC_EUYuKP6AENi7tEcV4HTbw", "Worlds Wildest Wonders"),
      thumbnails = Thumbnails(
        Some(Image("https://i.ytimg.com/vi/N0vTrfbK3FM/default.jpg", 120, 90)),
        Some(Image("https://i.ytimg.com/vi/N0vTrfbK3FM/mqdefault.jpg", 320, 180)),
        Some(Image("https://i.ytimg.com/vi/N0vTrfbK3FM/hqdefault.jpg", 480, 360)),
        None,None),
      statistics = Statistics("272333","214","56","0","17")
    )
  )
}
