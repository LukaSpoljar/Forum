import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForumComponent } from './forum/forum.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {HttpClientModule} from "@angular/common/http";
import { NavigationComponent } from './navigation/navigation.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProfileComponent } from './profile/profile.component';
import {MyFilterPipePipe} from "./Shared/Pipes/Filtering.pipe";
import {MySortingPipePipe} from "./Shared/Pipes/Sorting.pipe";
import {HighlightDirective} from "./Shared/Directives/Highlight.directive";

@NgModule({
  declarations: [
    AppComponent,
    ForumComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    ProfileComponent,
    MySortingPipePipe,
    MyFilterPipePipe,
    HighlightDirective,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
