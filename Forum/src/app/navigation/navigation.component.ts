import {Component, OnInit} from '@angular/core';
import {MyLoggedUser} from "../Shared/LoggedUser/MyLoggedUser";
import {Router} from "@angular/router";
import {MyRoutes} from "../Shared/Routes/MyRoutes";


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  myRoutes: MyRoutes;

  private readonly cssStyleDisplayFlex: any;
  private readonly cssStyleDisplayNone: any;

  constructor(private _router: Router) {
    this.myRoutes = new MyRoutes(_router);

    this.cssStyleDisplayFlex = {"display": "flex"};
    this.cssStyleDisplayNone = {"display": "none"};
  }

  ngOnInit(): void {
  }

  displayElementsWhenUserIsUNKNOWN() {
    if (MyLoggedUser.getUser()) {
      return this.cssStyleDisplayNone;
    } else {
      return this.cssStyleDisplayFlex;
    }
  }

  displayElementsWhenUserIsLogged() {
    if (MyLoggedUser.getUser() == null) {
      return this.cssStyleDisplayNone;
    } else {
      return this.cssStyleDisplayFlex;
    }
  }

  logout() {
    MyLoggedUser.sessionStorageLogout(this.myRoutes);
  }
}
