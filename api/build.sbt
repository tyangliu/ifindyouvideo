name := "ifindyouevent"

version := "1.0"

scalaVersion := "2.11.7"

resolvers += "Typesafe Releases" at "http://repo.typesafe.com/typesafe/releases/"

libraryDependencies ++= {
  val akkaVersion = "2.4.0"
  val akkaHttpVersion = "1.0-M2"
  val scalaTestVersion = "2.2.4"

  Seq(
    "com.typesafe.akka" %% "akka-actor"                           % akkaVersion,
    "com.typesafe.akka" %% "akka-testkit"                         % akkaVersion,
    "com.typesafe.akka" %% "akka-http-experimental"               % akkaHttpVersion,
    "com.typesafe.akka" %% "akka-http-spray-json-experimental"    % akkaHttpVersion,
    "com.typesafe.akka" %% "akka-http-testkit-experimental"       % akkaHttpVersion,
    "com.typesafe.akka" %% "akka-http-spray-json-experimental"    % akkaHttpVersion,
    "org.scalatest"     %% "scalatest"                            % scalaTestVersion              % "test"
  )
}

    