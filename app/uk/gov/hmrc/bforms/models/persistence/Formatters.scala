/*
 * Copyright 2017 HM Revenue & Customs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package uk.gov.hmrc.bforms.models.persistence

import java.time.LocalDate

import play.api.libs.json._

object ValueClassFormat {
  def format[A: Format](fromStringToA: String => A)(fromAToString: A => String) = {
    new Format[A] {
      def reads(json: JsValue): JsResult[A] = {
        json match {
          case JsString(str) => JsSuccess(fromStringToA(str))
          case unknown => JsError(s"JsString value expected, got: $unknown")
        }
      }
      def writes(a: A): JsValue = JsString(fromAToString(a))
    }
  }
}

object ValueClassFormatLocalDate {
  def format[A: Format](fromDateToA: LocalDate => A)(fromAToDate: A => LocalDate) = {
    new Format[LocalDate] {
      override def reads(json: JsValue): JsResult[LocalDate] = json.validate[String].map(LocalDate.parse)

      override def writes(a: LocalDate): JsValue = Json.toJson(a.toString)
    }
  }
}

object ValueClassFormatBigDecimal {
  def format[A: Format](fromBigDecimalToA: BigDecimal => A)(fromAToBigDecimal: A => BigDecimal) = {
    new Format[A] {
      def reads(json: JsValue): JsResult[A] = {
        json match {
          case JsNumber(num) => JsSuccess(fromBigDecimalToA(num))
          case unknown => JsError(s"JsNumber value expected, got: $unknown")
        }
      }
      def writes(a: A): JsValue = JsNumber(fromAToBigDecimal(a))
    }
  }
}
