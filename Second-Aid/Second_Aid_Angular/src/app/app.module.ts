import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProcComponent } from './proc/proc.component';
import { AuthService } from './auth.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { ProcDetailComponent } from './proc-detail/proc-detail.component';
import { RouterModule } from '@angular/router';
// import { AuthGuard } from './authguard';
import {AccordionModule} from 'ng2-accordion';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    ProcComponent,
    NotFoundComponent,
    ProfileComponent,
    ProcDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AccordionModule,    
    RouterModule.forRoot([
          { path: '', component: LoginComponent },
          { path: 'home', redirectTo: '', pathMatch: 'full' },
          { path: 'login', component: LoginComponent },
          { path: 'logout', component: LogoutComponent },
          // { path: 'procedures', component: ProcComponent, canActivate: [AuthGuard] },
          { path: 'procedures', component: ProcComponent},
          { path: 'procedures/:id', component: ProcDetailComponent},
          { path: 'profile', component: ProfileComponent},
          { path: '**', component: NotFoundComponent}
          ])
  ],
  // providers: [AuthService, AuthGuard],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }