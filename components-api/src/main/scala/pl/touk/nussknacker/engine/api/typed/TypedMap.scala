package pl.touk.nussknacker.engine.api.typed

import java.util.Collections
import java.{util => ju}

/**
 * The idea of this class is to be something like java bean with properties represented by Map entries.
 * If you use this class as a global variables, it will be typed using `TypedObjectTypingResult`.
 */
class TypedMap(map: ju.Map[String, Any]) extends ju.HashMap[String, Any](map) {

  def this() =
    this(Collections.emptyMap())

}

object TypedMap {

  import scala.jdk.CollectionConverters._

  def apply(scalaFields: Map[String, Any]): TypedMap = {
    new TypedMap(scalaFields.asJava)
  }

}
