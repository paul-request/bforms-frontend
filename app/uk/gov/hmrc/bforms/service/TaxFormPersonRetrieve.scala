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

import play.api.Logger
import uk.gov.hmrc.bforms.models.persistence.LandfillTaxDetailsPersonPersistence
import uk.gov.hmrc.bforms.repositories.LandfillTaxPersonRepository

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

trait TaxFormPersonRetrieve[A, B, C] {
  def apply(a: A) : Future[List[Either[B, C]]]
}

object TaxFormPersonRetrieve {

  private def retrieveTaxFormPerson[A, B, C](f: A => Future[List[Either[B, C]]]) : TaxFormPersonRetrieve[A, B, C] = {
    new TaxFormPersonRetrieve[A, B, C] {
      def apply(params: A) : Future[List[Either[B, C]]] = f(params)
    }
  }

  implicit def somethingElse(implicit repository: LandfillTaxPersonRepository) : TaxFormPersonRetrieve[String, LandfillTaxDetailsPersonPersistence, Map[String, String]]  = {
    retrieveTaxFormPerson((f : String) =>  repository.get(f))
  }
}

object RetrievePersonService {

  def retrieve[A, B, C](registrationNumber:A)(implicit taxFormRetrieve:TaxFormPersonRetrieve[A, LandfillTaxDetailsPersonPersistence, Map[String, String]]) : Future[Either[Unit, Either[LandfillTaxDetailsPersonPersistence, Map[String, String]]]] = {
    taxFormRetrieve(registrationNumber).flatMap {
      case obj: List[Either[LandfillTaxDetailsPersonPersistence, Map[String, String]]] if(obj.isEmpty) => {
        println("emptyList")
        Future.successful(Left(()))
      }
      case obj: List[Either[LandfillTaxDetailsPersonPersistence, Map[String, String]]] => obj(0).fold(
        left => {
          println("left")
          Future.successful(Right(Left(left)))
        },
        right => {
          println("right")
          Future.successful(Right(Right(right)))
        }
      )
      }
  }
}