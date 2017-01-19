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

import uk.gov.hmrc.bforms.repositories.LandfillTaxPersonRepository
import uk.gov.hmrc.bforms.models.LandfillTaxDetailsPerson

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

trait TaxFormPersonSaveExit[A] {
  def apply(a: A): Future[Either[String,Unit]]
}

object TaxFormPersonSaveExit {

  private def getTaxFormPersonSaveExit[A](f: A => Future[Either[String, Unit]]) : TaxFormPersonSaveExit[A] = {
    new TaxFormPersonSaveExit[A] {
      def apply(params: A) : Future[Either[String, Unit]] = f(params)
    }
  }

  implicit def nameLater(implicit repository: LandfillTaxPersonRepository): TaxFormPersonSaveExit[Either[LandfillTaxDetailsPerson, Map[String, String]]] = {
    getTaxFormPersonSaveExit((r : Either[LandfillTaxDetailsPerson, Map[String, String]]) =>  repository.store(r))
  }
}

object PersonSaveExit {

  def personSaveForm[A, B](formDetails:Either[A, B])(implicit taxFormSaveExit:TaxFormPersonSaveExit[Either[A, B]]):Future[Boolean] = {
    taxFormSaveExit(formDetails).map {
      case _ => true
      case x => false
    }
  }
}
