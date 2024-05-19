import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PackageListComponent } from './components/package-list/package-list.component';
import { PackageDetailComponent } from './components/package-detail/package-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments/environment';
import { ConfirmPurchaseComponent } from './components/confirm-purchase/confirm-purchase.component'; // Import environment
import { CurrencyPipe } from './pipes/currency.pipe'; // Import the custom pipe
import { HomeModule } from './components/home/home.module'; // Import HomeModule
import { AuthRedirectGuard } from './guards/auth-redirect.guard'; // Import AuthRedirectGuard


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PackageListComponent,
    PackageDetailComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    ConfirmPurchaseComponent,
    CurrencyPipe // Declare the custom pipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Initialize AngularFireModule
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    HomeModule // Add HomeModule
  ],
  providers: [
    provideClientHydration(),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAnimationsAsync(),
    AuthRedirectGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



