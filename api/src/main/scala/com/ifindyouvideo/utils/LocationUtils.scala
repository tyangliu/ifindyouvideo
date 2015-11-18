package com.ifindyouvideo.utils

import com.ifindyouvideo.videos.Location

object LocationUtils {

  def boundingBoxCenterRadius(nw: Location, se: Location): (Location, String) = {
    val ctr = centerPoint(nw, se)
    val distance = haversineDistance(nw, ctr)

    (ctr, distance.toString + "km")
  }

  def centerPoint(a: Location, b: Location): Location = {
    Location(
      (a.latitude + b.latitude)   / 2,
      (a.longitude + b.longitude) / 2,
      (a.altitude + b.altitude)   / 2
    )
  }

  def haversineDistance(a: Location, b: Location): BigDecimal = {
    val Δlat  = math.toRadians(b.latitude.toDouble  - a.latitude.toDouble)
    val Δlong = math.toRadians(b.longitude.toDouble - a.longitude.toDouble)

    val x = math.pow(math.sin(Δlat / 2), 2) +
            math.cos(math.toRadians(a.latitude.toDouble)) *
            math.cos(math.toRadians(b.latitude.toDouble)) *
            math.pow(math.sin(Δlong / 2), 2)

    val greatCircleDistance = 2 * math.atan2(math.sqrt(x), math.sqrt(1 - x))
    3958.761 * 1.60934 * greatCircleDistance
  }

}
