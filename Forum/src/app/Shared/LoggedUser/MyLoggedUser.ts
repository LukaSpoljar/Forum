import {MyUser} from "../Models/MyUser";
import {MyRoutes} from "../Routes/MyRoutes";

export class MyLoggedUser {

  public static getUser(): MyUser { return sessionStorage.getItem('user') ? <MyUser>JSON.parse(<string>sessionStorage.getItem('user')) : new MyUser({}); }
  public static getToken(): string { return sessionStorage.getItem("token") ? <string>JSON.parse(<string>sessionStorage.getItem("token")) : ""; }
  public static getAdminPermission(): boolean { return JSON.parse(<string>sessionStorage.getItem("permission")) == "OK"; }


  public static sessionStorageLogout(tmpRoute: MyRoutes) {

    sessionStorage.removeItem("user");
    sessionStorage.removeItem("permission");
    sessionStorage.removeItem("token");

    if (tmpRoute) {
      tmpRoute.navigateToLoginForm();
    }
  }

  public static sessionStorageLogin(tmpRoute: MyRoutes, tmpResponse: any) {

    sessionStorage.setItem('user', JSON.stringify({...tmpResponse["user"]}));
    sessionStorage.setItem('permission', JSON.stringify(tmpResponse["dozvola"]));
    sessionStorage.setItem('token', JSON.stringify(tmpResponse["token"]));

    if (tmpRoute) {
      tmpRoute.navigateToHome();
    }
  }
}
