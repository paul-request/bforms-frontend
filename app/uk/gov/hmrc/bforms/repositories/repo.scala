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

package uk.gov.hmrc.bforms.repositories

import java.time.LocalDate
import javax.inject.Inject

import play.api.libs.functional.syntax._
import com.google.inject.Singleton
import play.api.libs.json.{JsValue, _}
import reactivemongo.api.DB
import uk.gov.hmrc.bforms.models.{BadDebtReliefClaimed, ConfirmEmailAddress, EitherLandfillTaxDetailsPersistenceMapStringString, EmailAddress, EnvironmentalBody1, EnvironmentalBody2, ExemptWaste, FirstName, GovernmentGatewayId, LandFillTaxDetailsPersistence, LandfillTaxDetails, LastName, LowerRateWaste, NameOfBusiness, OtherCredits, OverDeclarationsForThisPeriod, StandardRateWaste, Status, TaxCreditClaimedForEnvironment, TaxDueForThisPeriod, TelephoneNumber, UnderDeclarationsFromPreviousPeriod}
import uk.gov.hmrc.mongo.ReactiveRepository

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

/**
  * Created by daniel-connelly on 22/12/16.
  */
@Singleton
class LandFillTaxRepositoryImpl @Inject()(implicit db:DB) extends ReactiveRepository[Either[LandFillTaxDetailsPersistence, Map[String, String]] , String]("formData", () => db, EitherLandfillTaxDetailsPersistenceMapStringString.format, implicitly[Format[String]]) with LandFillTaxRepository {

  def store(form:Either[LandfillTaxDetails, Map[String, String]]) = {
    form.fold(
       landfilltaxdetails => {
        val store = LandFillTaxDetailsPersistence(GovernmentGatewayId("Something"),
          FirstName(landfilltaxdetails.firstName),
          LastName(landfilltaxdetails.lastName),
          TelephoneNumber(landfilltaxdetails.telephoneNumber),
          Status(landfilltaxdetails.status),
          NameOfBusiness(landfilltaxdetails.nameOfBusiness),
          landfilltaxdetails.accountingPeriodStartDate,
          landfilltaxdetails.accountingPeriodEndDate,
          TaxDueForThisPeriod(landfilltaxdetails.taxDueForThisPeriod),
          UnderDeclarationsFromPreviousPeriod(landfilltaxdetails.underDeclarationsFromPreviousPeriod),
          OverDeclarationsForThisPeriod(landfilltaxdetails.overDeclarationsForThisPeriod),
          TaxCreditClaimedForEnvironment(landfilltaxdetails.taxCreditClaimedForEnvironment),
          BadDebtReliefClaimed(landfilltaxdetails.badDebtReliefClaimed),
          OtherCredits(landfilltaxdetails.otherCredits),
          StandardRateWaste(landfilltaxdetails.standardRateWaste),
          LowerRateWaste(landfilltaxdetails.lowerRateWaste),
          ExemptWaste(landfilltaxdetails.exemptWaste),
          EnvironmentalBody1(landfilltaxdetails.environmentalBody1),
          EnvironmentalBody2(landfilltaxdetails.environmentalBody2.getOrElse(0)),
          EmailAddress(landfilltaxdetails.emailAddress.getOrElse("None")),
          ConfirmEmailAddress(landfilltaxdetails.confirmEmailAddress.getOrElse("None"))
        )
        insert(Left(store)) map {
          case r if r.ok =>
            logger.info(s"form with details of '${landfilltaxdetails.firstName}' & '${landfilltaxdetails.lastName}' was successfully stored")
            Right(())
          case r =>
            logger.error(s"form with details of '${landfilltaxdetails.firstName}' & '${landfilltaxdetails.lastName}' was not successfully stored")
            Left(r.message)
        }
      },
      Map => {
      insert(Right(Map)) map {
        case r if r.ok =>
          logger.info(s"map of a form in database")
          Right(())
        case r =>
          logger.error(s"map not put into databse")
          Left(r.message)
      }
    }
    )
  }

  private def findById(id : GovernmentGatewayId): Future[List[Either[LandFillTaxDetailsPersistence, Map[String, String]]]] = {
    find(
      "ID" -> id
    )
  }

  def get(id : String) :Future[List[Either[LandFillTaxDetailsPersistence, Map[String, String]]]] = {
    findById(GovernmentGatewayId(id))
  }
}

trait LandFillTaxRepository {

  def store(form : Either[LandfillTaxDetails, Map[String, String]]) : Future[Either[String, Unit]]

  def get(registrationNumber : String) : Future[List[Either[LandFillTaxDetailsPersistence, Map[String, String]]]]
}