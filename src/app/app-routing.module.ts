import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffersComponent } from './components/offers/offers.component';
import { CreateOfferComponent } from './components/create-offer/create-offer.component';
import { OfferDetailsComponent } from './components/offer-details/offer-details.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MyOffersComponent } from './components/my-offers/my-offers.component';
import { MyPurchasesComponent } from './components/my-purchases/my-purchases.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [{
  path: '',
  component: OffersComponent
},
{
  path: 'create_offer',
  component: CreateOfferComponent
},
{
  path: 'offers/:id',
  component: OfferDetailsComponent
},
{
  path: 'register',
  component: RegistrationComponent
},
{
  path : 'my_offers',
  component: MyOffersComponent
},
{
  path: 'my_purchases',
  component: MyPurchasesComponent
},
{
  path:'profile',
  component: ProfileComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
