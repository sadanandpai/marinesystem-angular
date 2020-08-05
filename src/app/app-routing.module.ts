import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './logging/login/login.component';
import { RegisterComponent } from './logging/register/register.component';
import { HomeComponent } from './home/home.component';
import { FishdetailsComponent } from './fishdetails/fishdetails.component';
import { AuctionComponent } from './auction/auction.component';
import { AuctionplatformComponent } from './auction/auctionplatform/auctionplatform.component';
import { HistoryComponent } from './history/history.component';
import { HistoryDetailsComponent } from './history/history-details/history-details.component';
import { WinnerdetailsComponent } from './auction/winnerdetails/winnerdetails.component';
import { TransactionComponent } from './auction/auctionplatform/transaction/transaction.component';
import { MyboatsComponent } from './myboats/myboats.component';
import { AddexpensesComponent } from './addexpenses/addexpenses.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { MapComponent } from './map/map.component';
import { AddboatComponent } from './addboat/addboat.component';
import { AddmemberComponent } from './addmember/addmember.component';
// import { AddsalaryComponent } from './addsalary/addsalary.component';
import { AttendenceComponent } from './attendence/attendence.component';
import { CalculationComponent } from './calculation/calculation.component';
import { CalculationDetailsComponent } from './calculation/calculation-details/calculation-details.component';
import { TripwiseCalculationComponent } from './calculation/ownercalculation/tripwise-calculation/tripwise-calculation.component';
import { MycrewDetailsComponent } from './calculation/calculation-details/boatdrivercalculation-details/mycrew-details/mycrew-details.component';
import { CustomerAuctionplatformComponent } from './auction/customer-auctionplatform/customer-auctionplatform.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { BonusComponent } from './bonus/bonus.component';
import { AdvanceComponent } from './bonus/advance/advance.component';
import { AdvanceHistoryComponent } from './bonus/advance/advance-history/advance-history.component';
import { BonusHistoryComponent } from './bonus/bonus-history/bonus-history.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'fish', component: FishdetailsComponent },
  { path: 'auction', component: AuctionComponent },
  { path: 'auction/:id', component: AuctionplatformComponent },
  { path: 'customerauctionplatform/:id', component: CustomerAuctionplatformComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'history/:id', component: HistoryDetailsComponent },
  { path: 'winnerdetails/:id', component: WinnerdetailsComponent },
  { path: 'transaction/:id', component: TransactionComponent },
  { path: 'myboats', component: MyboatsComponent },
  { path: 'expenses', component: AddexpensesComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'map', component: MapComponent },
  { path: 'addboats', component: AddboatComponent },
  { path: 'addmembers', component: AddmemberComponent },
  // { path: 'addsalary', component: AddsalaryComponent },
  { path: 'attendence', component: AttendenceComponent },
  { path: 'calculation', component: CalculationComponent },
  { path: 'calculation/:id', component: CalculationDetailsComponent },
  { path: 'trips/:id', component: TripwiseCalculationComponent },
  { path: 'mycrew/:id', component: MycrewDetailsComponent },
  { path: 'subscribe', component: SubscribeComponent },
  { path: 'bonus/:id', component: BonusComponent },
  { path: 'advance', component: AdvanceComponent },
  { path: 'bonushistory', component: BonusHistoryComponent },
  { path: 'advancehistory', component: AdvanceHistoryComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }