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

import com.google.inject.Singleton
import play.api.libs.json.{Format, Json}
import uk.gov.hmrc.bforms.models.persistence.{BadDebtReliefClaimed, ConfirmEmailAddress, EmailAddress, ExemptWaste, FirstName, GovernmentGatewayId, LandFillTaxDetailsPersistence, LastName, LowerRateWaste, NameOfBusiness, OtherCredits, OverDeclarationsForThisPeriod, StandardRateWaste, Status, TaxCreditClaimedForEnvironment, TaxDueForThisPeriod, TelephoneNumber, UnderDeclarationsFromPreviousPeriod}
import uk.gov.hmrc.bforms.models._
import reactivemongo.api.DB
import uk.gov.hmrc.mongo.ReactiveRepository

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

@Singleton
class LandFillTaxRepositoryImpl @Inject()(implicit db:DB) extends ReactiveRepository[LandFillTaxDetailsPersistence, String]("formData", () => db, LandFillTaxDetailsPersistence.mongoFormat, implicitly[Format[String]]) with LandFillTaxRepository {

  def store(form: LandfillTaxDetails) = {

    val store = LandFillTaxDetailsPersistence(GovernmentGatewayId("Something") , FirstName(form.firstName), LastName(form.lastName), TelephoneNumber(form.telephoneNumber),
      Status(form.status),
      NameOfBusiness(form.nameOfBusiness),
      form.accountingPeriodStartDate,
      form.accountingPeriodEndDate,
      TaxDueForThisPeriod(form.taxDueForThisPeriod),
      UnderDeclarationsFromPreviousPeriod(form.underDeclarationsFromPreviousPeriod),
      OverDeclarationsForThisPeriod(form.overDeclarationsForThisPeriod),
      TaxCreditClaimedForEnvironment(form.taxCreditClaimedForEnvironment),
      BadDebtReliefClaimed(form.badDebtReliefClaimed),
      OtherCredits(form.otherCredits),
      StandardRateWaste(form.standardRateWaste),
      LowerRateWaste(form.lowerRateWaste),
      ExemptWaste(form.exemptWaste),
      form.environmentalBodies,
//      EnvironmentalBodyPersistence(BodyName(form.environmentalBodies.get(0).bodyName), Amount(form.environmentalBodies.get(0).amount)),//OrElse(Seq(EnvironmentalBody(" ", " "))),

      EmailAddress(form.emailAddress.getOrElse("None")),
      ConfirmEmailAddress(form.confirmEmailAddress.getOrElse("None"))
    )
    insert(store) map {
      case r if r.ok =>
        logger.info(s"form with details of '${form.firstName}' & '${form.lastName}' was successfully stored")
        Right(())
      case r =>
        logger.error(s"form with details of '${form.firstName}' & '${form.lastName}' was not successfully stored")
        Left(r.message)
    }
  }

  private def findById(id : GovernmentGatewayId): Future[List[LandFillTaxDetailsPersistence]] = {
    find(
      "ID" -> id
    )
  }

  def get(id : String) :Future[List[LandFillTaxDetailsPersistence]] = {
    findById(GovernmentGatewayId(id))
  }
}

trait LandFillTaxRepository {

  def store(form : LandfillTaxDetails) : Future[Either[String, Unit]]

  def get(registrationNumber : String) : Future[List[LandFillTaxDetailsPersistence]]
}

