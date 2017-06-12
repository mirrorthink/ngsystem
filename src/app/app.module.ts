import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './view/main.component';
import { LogComponent } from './view/log.component';
import { LoginComponent } from './view/login.component';
import { AdministratorComponent } from './view/administrator.component';
import { CommonApiService } from './server';
import { Http} from '@angular/http'

import { PopoverComponent } from './component/popover/popover.component'
import { PaginationComponent } from './component/pagination/pagination.component'

import { CookieService } from './server/cookies';
import { GuardService } from './server/guardService';
//上传

import { FileUploadModule } from 'ng2-file-upload';
const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main',canActivate:[GuardService], component: MainComponent },
  { path: 'log', canActivate:[GuardService], component: LogComponent},
  { path: 'administrator',canActivate:[GuardService],  component: AdministratorComponent },
  { path: 'login', component: LoginComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LogComponent,
    AdministratorComponent,
    PopoverComponent,
    PaginationComponent,
    LoginComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),

    FileUploadModule
  ],
  providers: [CookieService,CommonApiService,GuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
