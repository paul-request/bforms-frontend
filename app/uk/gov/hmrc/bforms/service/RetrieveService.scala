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

package uk.gov.hmrc.bforms.service

import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.Locale

import uk.gov.hmrc.bforms.connectors.BformsConnector
import uk.gov.hmrc.bforms.models.{ EnvironmentalBody, FormTypeId, FormField, LandfillTaxDetails }
import uk.gov.hmrc.play.http.HeaderCarrier

import scala.concurrent.ExecutionContext.Implicits.global

import scala.concurrent.Future
import play.api.libs.json._
import uk.gov.hmrc.bforms.models.{FieldValue, FormTemplate}

object RetrieveService {

  def bformsConnector = BformsConnector

  def getFields(formTemplate: FormTemplate): List[FieldValue] = {
    formTemplate.sections.flatMap(_.fields)
  }

  def formTemplateFromJson(formTemplate: JsObject): Either[String, FormTemplate] = {
    formTemplate.validate[FormTemplate] match {
      case JsSuccess(formTemplate, _) => Right(formTemplate)
      case JsError(error) => Left(error.toString)
    }
  }

  def getFormTemplate(formTypeId: FormTypeId, version: String)(implicit hc : HeaderCarrier): Future[Either[String, FormTemplate]] = {
    val templateF = bformsConnector.retrieveFormTemplate(formTypeId, version)

    for {
      template <- templateF
    } yield {
      template match {
        case Some(jsonTemplate) => formTemplateFromJson(jsonTemplate)
        case None => Left(s"No template for formTypeId $formTypeId version $version")
      }
    }
  }

  def retrieveFromBackEnd(registrationNumber: String)(implicit hc : HeaderCarrier): Future[Either[LandfillTaxDetails, Unit]] = {
    bformsConnector.retrieveForm(registrationNumber).map {
      case list if list.value.isEmpty =>
        Right(())
      case list =>
        list.\("fields").validate[List[FormField]] match {
          case JsSuccess(js, _) =>
            listFormFieldToLandFillTaxDetails(js).validate[LandfillTaxDetails] match {
              case JsSuccess(jss, _) => Left(jss)
              case JsError(err) =>
                Left(createfilledObject(js))
            }
        }
    }
  }

  private def listFormFieldToLandFillTaxDetails(listFormField: List[FormField]) = {
    val obj= listFormField.foldRight(Json.obj()) { (formField, acc) =>
      val something = if (formField.id == "environmentalBodies") {
        formField.id -> Json.parse(formField.value)
      } else {
        formField.id -> JsString(formField.value)
      }
      acc + something
    }
    obj
  }

  private def createfilledObject(js : List[FormField]) ={
    val date = DateTimeFormatter.ofPattern("dd/MM/yyyy")
    val dateformatter = date.withLocale(Locale.UK)
    val mapOfValues = js.map(f => f.id -> f.value).toMap
    new LandfillTaxDetails(
      mapOfValues("registrationNumber"),
      mapOfValues("save"),
      mapOfValues("firstName"),
      mapOfValues("lastName"),
      mapOfValues("telephoneNumber"),
      mapOfValues("status"),
      mapOfValues("nameOfBusiness"),
      if(mapOfValues("accountingPeriodStartDate") != ""){
        LocalDate.parse(mapOfValues("accountingPeriodStartDate"), dateformatter)
      } else {LocalDate.MIN},
      if(mapOfValues("accountingPeriodEndDate") != ""){
        LocalDate.parse(mapOfValues("accountingPeriodEndDate"), dateformatter)
      } else {LocalDate.MIN},
      mapOfValues("taxDueForThisPeriod"),
      mapOfValues("underDeclarationsFromPreviousPeriod"),
      mapOfValues("overDeclarationsForThisPeriod"),
      if(mapOfValues("taxCreditClaimedForEnvironment") != ""){
        BigDecimal(mapOfValues("taxCreditClaimedForEnvironment"))
      } else {BigDecimal(-1)},
      mapOfValues("badDebtReliefClaimed"),
      mapOfValues("otherCredits"),
      mapOfValues("standardRateWaste"),
      mapOfValues("lowerRateWaste"),
      mapOfValues("exemptWaste"),
      if(mapOfValues("environmentalBodies") != "[{\"bodyName\":\"\",\"amount\":\"\"}]") {
        Json.obj("environmentalBodies" -> mapOfValues("environmentalBodies")).validate[Seq[EnvironmentalBody]].get
      } else {
        Seq(EnvironmentalBody("", -1))
      },
      Some(mapOfValues("emailAddress")),
      Some(mapOfValues("confirmEmailAddress"))
    )
  }
}