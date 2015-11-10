name := "ifindyouvideo"

version := "1.0"

scalaVersion := "2.11.7"

resolvers ++= Seq(
  "Typesafe repository snapshots" at "http://repo.typesafe.com/typesafe/snapshots/",
  "Typesafe Releases"             at "http://repo.typesafe.com/typesafe/releases/",
  "Sonatype repo"                 at "https://oss.sonatype.org/content/groups/scala-tools/",
  "Sonatype releases"             at "https://oss.sonatype.org/content/repositories/releases",
  "Sonatype snapshots"            at "https://oss.sonatype.org/content/repositories/snapshots",
  "Sonatype staging"              at "http://oss.sonatype.org/content/repositories/staging",
  "Java.net Maven2 Repository"    at "http://download.java.net/maven/2/",
  "Twitter Repository"            at "http://maven.twttr.com",
  "Websudos releases"             at "https://dl.bintray.com/websudos/oss-releases/"
)

libraryDependencies ++= {
  val akkaVersion      = "2.4.0"
  val akkaHttpVersion  = "1.0"
  val scalaTestVersion = "2.2.4"
  val sangriaVersion   = "0.4.3"
  val phantomVersion   = "1.12.2"

  Seq(
    "com.typesafe.akka"      %% "akka-actor"                        % akkaVersion,
    "com.typesafe.akka"      %% "akka-testkit"                      % akkaVersion,
    "com.typesafe.akka"      %% "akka-http-experimental"            % akkaHttpVersion,
    "com.typesafe.akka"      %% "akka-http-testkit-experimental"    % akkaHttpVersion,

    "org.scalatest"          %% "scalatest"                         % scalaTestVersion % "test",

    "org.scala-lang.modules" %% "scala-async"                       % "0.9.6-RC2",

    "org.sangria-graphql"    %% "sangria"                           % sangriaVersion,
    "org.sangria-graphql"    %% "sangria-relay"                     % sangriaVersion,

    "com.websudos"           %% "phantom-dsl"                       % phantomVersion,
    "com.websudos"           %% "phantom-testkit"                   % phantomVersion,

    "org.json4s"             %% "json4s-native"                     % "3.2.11",
    "de.heikoseeberger"      %% "akka-http-json4s"                  % "1.0.0",

    "com.github.davidmoten"  %  "geo"                               % "0.7.1"
  )
}

Revolver.settings
