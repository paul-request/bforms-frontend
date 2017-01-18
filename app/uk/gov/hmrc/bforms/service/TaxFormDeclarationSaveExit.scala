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

import uk.gov.hmrc.bforms.repositories.LandfillTaxRepository
import uk.gov.hmrc.bforms.models.LandfillTaxDetailsDeclaration

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

trait TaxFormDeclarationSaveExit[A] {
  def apply(a: A): Future[Either[String,Unit]]
}

object TaxFormDeclarationSaveExit {

  private def getTaxFormDeclarationSaveExit[A](f: A => Future[Either[String, Unit]]) : TaxFormDeclarationSaveExit[A] = {
    new TaxFormDeclarationSaveExit[A] {
      def apply(params: A) : Future[Either[String, Unit]] = f(params)
    }
  }

  implicit def nameLater(implicit repository: LandfillTaxRepository): TaxFormDeclarationSaveExit[Either[LandfillTaxDetailsDeclaration, Map[String, String]]] = {
    getTaxFormDeclarationSaveExit((r : Either[LandfillTaxDetailsDeclaration, Map[String, String]]) =>  repository.store(r))
  }
}

object DeclarationSaveExit {

  def declarationSaveForm[A, B](formDetails:Either[A, B])(implicit taxFormSaveExit:TaxFormDeclarationSaveExit[Either[A, B]]):Future[Boolean] = {
    taxFormSaveExit(formDetails).map {
      case _ => true
      case x => false
    }
  }
}
