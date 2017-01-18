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
import play.api.libs.json._
import uk.gov.hmrc.bforms.models._
import uk.gov.hmrc.bforms.models.persistence.{LandfillTaxDetailsPersonPersistence, _}
import uk.gov.hmrc.mongo.ReactiveRepository

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

@Singleton
class LandfillTaxRepositoryImpl @Inject()(implicit db:DB) extends ReactiveRepository[Either[LandfillTaxDetailsPersistence, Map[String, String]] , String]("formData", () => db, EitherLandfillTaxDetailsPersistenceMapStringString.format, implicitly[Format[String]]) with LandfillTaxRepository {

  def store(form:Either[LandfillTaxDetails, Map[String, String]]) = {
    form.fold(
      landfilltaxdetails => {
        val store = LandfillTaxDetailsPersistence(GovernmentGatewayId(landfilltaxdetails.registrationNumber),
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
          landfilltaxdetails.environmentalBodies,
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

  def store(form:Either[LandfillTaxDetailsDeclaration, Map[String, String]]) = {
    form.fold(
      landfilltaxdetails => {
        val store = LandfillTaxDetailsDeclarationPersistence(GovernmentGatewayId(landfilltaxdetails.registrationNumber),
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
          landfilltaxdetails.environmentalBodies,
          EmailAddress(landfilltaxdetails.emailAddress.getOrElse("None")),
          ConfirmEmailAddress(landfilltaxdetails.confirmEmailAddress.getOrElse("None"))
        )
        insert(Left(store)) map {
          case r if r.ok =>
            logger.info(s"form with details of '${landfilltaxdetails.nameOfBusiness}' was successfully stored")
            Right(())
          case r =>
            logger.error(s"form with details of '${landfilltaxdetails.nameOfBusiness}' was not successfully stored")
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

  def store(form:Either[LandfillTaxDetailsPerson, Map[String, String]]) = {
    form.fold(
      landfilltaxdetails => {
        val store = LandfillTaxDetailsPersonPersistence(GovernmentGatewayId(landfilltaxdetails.registrationNumber),
          FirstName(landfilltaxdetails.firstName),
          LastName(landfilltaxdetails.lastName),
          TelephoneNumber(landfilltaxdetails.telephoneNumber),
          Status(landfilltaxdetails.status))
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

  private def findByIdObject(id : GovernmentGatewayId): Future[List[Either[LandfillTaxDetailsPersistence, Map[String, String]]]] = {
    find("object.registrationNumber" -> id)
  }

  private def findPersonByIdObject(id : GovernmentGatewayId): Future[List[Either[LandfillTaxDetailsPersonPersistence, Map[String, String]]]] = {
    find("object.registrationNumber" -> id)
  }

  private def findDeclarationByIdObject(id : GovernmentGatewayId): Future[List[Either[LandfillTaxDetailsDeclarationPersistence, Map[String, String]]]] = {
    find("object.registrationNumber" -> id)
  }

  private def findByIdMap(id : GovernmentGatewayId): Future[List[Either[LandfillTaxDetailsPersistence, Map[String, String]]]] = {
    find("map.registrationNumber" -> id)
  }

  private def findPersonByIdMap(id : GovernmentGatewayId): Future[List[Either[LandfillTaxDetailsPersonPersistence, Map[String, String]]]] = {
    find("map.registrationNumber" -> id)
  }

  private def findDeclaratiobnByIdMap(id : GovernmentGatewayId): Future[List[Either[LandfillTaxDetailsDeclarationPersistence, Map[String, String]]]] = {
    find("map.registrationNumber" -> id)
  }

  def get(id : String) :Future[List[Either[LandfillTaxDetailsPersistence, Map[String, String]]]] = {
    findByIdMap(GovernmentGatewayId(id)).flatMap {
      case empty if(empty.isEmpty) => {
        println("empty")
        findByIdObject(GovernmentGatewayId(id)).flatMap{
          case emptyList if(emptyList.isEmpty) => {
            println("emptyList")
            Future.successful(emptyList)
          }
          case fullList => {
            println("fullList")
            Future.successful(fullList)
          }
          case _ =>{
            println("someResponse")
            Future.successful(empty)
          }
        }
      }
      case list : List[Either[LandfillTaxDetailsPersistence, Map[String, String]]] => {
        println("list")
        Future.successful(list)
      }
    }
  }

  def get(id : String) :Future[List[Either[LandfillTaxDetailsDeclarationPersistence, Map[String, String]]]] = {
    findDeclaratiobnByIdMap(GovernmentGatewayId(id)).flatMap {
      case empty if(empty.isEmpty) => {
        println("empty")
        findDeclarationByIdObject(GovernmentGatewayId(id)).flatMap{
          case emptyList if(emptyList.isEmpty) => {
            println("emptyList")
            Future.successful(emptyList)
          }
          case fullList => {
            println("fullList")
            Future.successful(fullList)
          }
          case _ =>{
            println("someResponse")
            Future.successful(empty)
          }
        }
      }
      case list : List[Either[LandfillTaxDetailsDeclarationPersistence, Map[String, String]]] => {
        println("list")
        Future.successful(list)
      }
    }
  }

  def get(id : String) :Future[List[Either[LandfillTaxDetailsPersonPersistence, Map[String, String]]]] = {
    findPersonByIdMap(GovernmentGatewayId(id)).flatMap {
      case empty if(empty.isEmpty) => {
        println("empty")
        findPersonByIdObject(GovernmentGatewayId(id)).flatMap{
          case emptyList if(emptyList.isEmpty) => {
            println("emptyList")
            Future.successful(emptyList)
          }
          case fullList => {
            println("fullList")
            Future.successful(fullList)
          }
          case _ =>{
            println("someResponse")
            Future.successful(empty)
          }
        }
      }
      case list : List[Either[LandfillTaxDetailsPersonPersistence, Map[String, String]]] => {
        println("list")
        Future.successful(list)
      }
    }
  }
}

trait LandfillTaxRepository {

  def store(form : Either[LandfillTaxDetails, Map[String, String]]) : Future[Either[String, Unit]]
  def store(form : Either[LandfillTaxDetailsDeclaration, Map[String, String]]) : Future[Either[String, Unit]]
  def store(form : Either[LandfillTaxDetailsPerson, Map[String, String]]) : Future[Either[String, Unit]]

  def get(registrationNumber : String) : Future[List[Either[LandfillTaxDetailsPersistence, Map[String, String]]]]
  def get(registrationNumber : String) : Future[List[Either[LandfillTaxDetailsDeclarationPersistence, Map[String, String]]]]
  def get(registrationNumber : String) : Future[List[Either[LandfillTaxDetailsPersonPersistence, Map[String, String]]]]

}