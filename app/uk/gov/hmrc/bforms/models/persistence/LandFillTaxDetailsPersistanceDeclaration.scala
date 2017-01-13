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

import org.apache.commons.lang3.RandomStringUtils
import uk.gov.hmrc.bforms.models._

case class LandFillTaxDetailsPersistenceDeclaration(ID: GovernmentGatewayId = GovernmentGatewayId(RandomStringUtils.random(4)),
                                                    nameOfBusiness: NameOfBusiness = new NameOfBusiness(""),
                                                    accountingPeriodStartDate: LocalDate = LocalDate.now,
                                                    accountingPeriodEndDate: LocalDate = LocalDate.now,
                                                    taxDueForThisPeriod: TaxDueForThisPeriod = new TaxDueForThisPeriod(""),
                                                    underDeclarationsFromPreviousPeriod: UnderDeclarationsFromPreviousPeriod = new UnderDeclarationsFromPreviousPeriod(""),
                                                    overDeclarationsForThisPeriod: OverDeclarationsForThisPeriod = new OverDeclarationsForThisPeriod(""),
                                                    taxCreditClaimedForEnvironment: TaxCreditClaimedForEnvironment = new TaxCreditClaimedForEnvironment(0),
                                                    badDebtReliefClaimed: BadDebtReliefClaimed = new BadDebtReliefClaimed(""),
                                                    otherCredits: OtherCredits = new OtherCredits(""),
                                                    standardRateWaste: StandardRateWaste = new StandardRateWaste(""),
                                                    lowerRateWaste: LowerRateWaste = new LowerRateWaste(""),
                                                    exemptWaste: ExemptWaste = new ExemptWaste(""),
                                                    environmentalBody1: Seq[EnvironmentalBody] = Seq(EnvironmentalBody("default", 0)),
                                                    emailAddress: EmailAddress = new EmailAddress(Some("")),
                                                    confirmEmailAddress: ConfirmEmailAddress = new ConfirmEmailAddress(Some("")),
                                                    datePersisted: LocalDate = LocalDate.now
                                                   ) {
}





