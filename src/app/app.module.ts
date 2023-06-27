import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AbstractControl, FormsModule,ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopHeaderComponent } from './components/shop-header/shop-header.component';
import { OffersComponent } from './components/offers/offers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { LoginComponent } from './components/modal/login/login.component';
import { CreateOfferComponent } from './components/create-offer/create-offer.component';
import { OfferDetailsComponent } from './components/offer-details/offer-details.component';
import { AccountActivationComponent } from './components/modal/account-activation/account-activation.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrderComponent } from './components/modal/order/order.component';
import { MyOffersComponent } from './components/my-offers/my-offers.component';
import { MyPurchasesComponent } from './components/my-purchases/my-purchases.component';
import { SupportComponent } from './components/modal/support/support.component';
import { AnswerComponent } from './components/modal/answer/answer.component';
import { ContactSupportComponent } from './components/contact-support/contact-support.component';
import { CardComponent } from './components/card/card.component';

export const baseUrl: string = "http://localhost:9000/";
//export const notEmptyNotBlankRegex: string = '^(?!\s*$).+';
export const notEmptyNotBlankRegex= /^(.|\s)*\S(.|\s)*$/;

@NgModule({
  declarations: [
    AppComponent,
    ShopHeaderComponent,
    OffersComponent,
    LoginComponent,
    CreateOfferComponent,
    OfferDetailsComponent,
    AccountActivationComponent,
    RegistrationComponent,
    ProfileComponent,
    OrderComponent,
    MyOffersComponent,
    MyPurchasesComponent,
    SupportComponent,
    AnswerComponent,
    ContactSupportComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    MatExpansionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function positiveNumberValidator(control: AbstractControl){
  if(control.value > 0){
    return null
  }
  else{
    return {"notPositive": true}
  }

}

export function priceRangeValidator(control: AbstractControl){
  const priceFrom = control.get('priceFrom')
  const priceTo = control.get('priceTo')
  if(priceFrom && priceTo){
    if(priceFrom.value && priceTo.value){
    if(priceTo.value <= priceFrom.value){
      return {"priceRange": true}
    }
  }
  }
  return null
}

export function positiveNumberOrNullValidator(control: AbstractControl){
  if(control.value && control.value < 0){
    return {"notPositiveOrNull": true}
  }
  else{
    return null
  }

}

