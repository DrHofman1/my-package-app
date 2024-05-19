import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackageListComponent } from './components/package-list/package-list.component';
import { PackageDetailComponent } from './components/package-detail/package-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { ConfirmPurchaseComponent } from './components/confirm-purchase/confirm-purchase.component';
import { HomeComponent } from './components/home/home.component';
import { AuthRedirectGuard } from './guards/auth-redirect.guard';


const routes: Routes = [
  { path: '', component: HomeComponent }, // Set HomeComponent as the default route
  { path: 'packages', component: PackageListComponent },
  { path: 'package/:id', component: PackageDetailComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthRedirectGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: 'confirm-purchase/:id', component: ConfirmPurchaseComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }






