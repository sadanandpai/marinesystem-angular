import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HeaderComponent } from './header/header.component';
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
import { AddmemberComponent } from './addmember/addmember.component';
import { OwnerexpenseComponent } from './addexpenses/ownerexpense/ownerexpense.component';
import { BdexpenseComponent } from './addexpenses/bdexpense/bdexpense.component';
import { AddboatComponent } from './addboat/addboat.component';
import { MyboatownerComponent } from './myboats/myboatowner/myboatowner.component';
import { MyboatdriverComponent } from './myboats/myboatdriver/myboatdriver.component';
import { AttendenceComponent } from './attendence/attendence.component';
import { AddsalaryComponent } from './addsalary/addsalary.component';
import { CalculationComponent } from './calculation/calculation.component';
import { DrivercalculationComponent } from './calculation/drivercalculation/drivercalculation.component';
import { OwnercalculationComponent } from './calculation/ownercalculation/ownercalculation.component';
import { CalculationDetailsComponent } from './calculation/calculation-details/calculation-details.component';
import { OwnercalculationDetailsComponent } from './calculation/calculation-details/ownercalculation-details/ownercalculation-details.component';
import { BoatdrivercalculationDetailsComponent } from './calculation/calculation-details/boatdrivercalculation-details/boatdrivercalculation-details.component';
import { TripwiseCalculationComponent } from './calculation/ownercalculation/tripwise-calculation/tripwise-calculation.component';
import { MycrewDetailsComponent } from './calculation/calculation-details/boatdrivercalculation-details/mycrew-details/mycrew-details.component';
import { FooterComponent } from './footer/footer.component';
import { CustomerAuctionplatformComponent } from './auction/customer-auctionplatform/customer-auctionplatform.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { CustomerComponent } from './subscribe/customer/customer.component';
import { OwnerComponent } from './subscribe/owner/owner.component';
import { BonusComponent } from './bonus/bonus.component';
import { AdvanceComponent } from './bonus/advance/advance.component';
import { BonusHistoryComponent } from './bonus/bonus-history/bonus-history.component';
import { AdvanceHistoryComponent } from './bonus/advance/advance-history/advance-history.component';
import { SeasonconfirmationComponent } from './confirmation/seasonconfirmation.component';
import { TripconfirmationComponent } from './confirmation/tripconfirmation/tripconfirmation.component';
import { AddmonthlyexpenseComponent } from './addmonthlyexpense/addmonthlyexpense.component';
import { ExpenseHistoryComponent } from './addmonthlyexpense/expense-history/expense-history.component';
import { ReportComponent } from './report/report.component';
import { MonthlyreportComponent } from './report/monthlyreport/monthlyreport.component';
import { SeasonreportComponent } from './report/seasonreport/seasonreport.component';
import { MonthlyboatexpenseComponent } from './monthlyboatexpense/monthlyboatexpense.component';
import { CompassComponent } from './compass/compass.component';
import { DeleteAuctionComponent } from './auction/delete-auction/delete-auction.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    HeaderComponent, 
    RegisterComponent, 
    HomeComponent, 
    FishdetailsComponent, 
    AuctionComponent, 
    AuctionplatformComponent, 
    HistoryComponent, 
    HistoryDetailsComponent, 
    WinnerdetailsComponent, 
    TransactionComponent, 
    MyboatsComponent, 
    AddexpensesComponent, 
    CalculatorComponent, 
    MapComponent, 
    AddmemberComponent, 
    BdexpenseComponent,
    OwnerexpenseComponent,
    AddboatComponent,
    MyboatownerComponent,
    MyboatdriverComponent,
    AttendenceComponent,
    AddsalaryComponent,
    CalculationComponent,
    DrivercalculationComponent,
    OwnercalculationComponent,
    CalculationDetailsComponent,
    OwnercalculationDetailsComponent,
    BoatdrivercalculationDetailsComponent,
    TripwiseCalculationComponent,
    MycrewDetailsComponent,
    FooterComponent,
    CustomerAuctionplatformComponent,
    SubscribeComponent,
    CustomerComponent,
    OwnerComponent,
    BonusComponent,
    AdvanceComponent,
    BonusHistoryComponent,
    AdvanceHistoryComponent,
    SeasonconfirmationComponent,
    TripconfirmationComponent,
    AddmonthlyexpenseComponent,
    ExpenseHistoryComponent,
    ReportComponent,
    MonthlyreportComponent,
    SeasonreportComponent,
    MonthlyboatexpenseComponent,
    CompassComponent,
    DeleteAuctionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
