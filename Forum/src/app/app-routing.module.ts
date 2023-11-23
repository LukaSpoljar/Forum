import { NgModule } from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {ForumComponent} from "./forum/forum.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ProfileComponent} from "./profile/profile.component";

const routes: Route[] = [
  {path: '', component: ForumComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile/:id', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
