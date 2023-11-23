import {Router} from "@angular/router";

export class MyRoutes {

  router: Router;

  constructor(private _router: Router) {
    this.router = _router;
  }

  navigateToHome() {
    if (this.router) {
      this.router.navigate(['']);
    }
  }

  navigateToLoginForm() {
    if (this.router) {
      this.router.navigate(['login']);
    }
  }

  navigateToRegisterForm() {
    if (this.router) {
      this.router.navigate(['register']);
    }
  }

  navigateToProfile() {
    if (this.router) {
      this.router.navigate(['profile', JSON.parse(<string>sessionStorage.getItem("user")).ID]);
    }
  }
}


