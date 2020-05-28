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


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'fish', component: FishdetailsComponent },
  { path: 'auction', component: AuctionComponent },
  { path: 'auction/:id', component: AuctionplatformComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'history/:id', component: HistoryDetailsComponent },
  { path: 'winnerdetails/:id', component: WinnerdetailsComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }