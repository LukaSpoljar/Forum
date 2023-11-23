import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MyRoutes} from "../Shared/Routes/MyRoutes";
import {MyAjaxService} from "../Shared/Services/MyAjaxService";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyLoggedUser} from "../Shared/LoggedUser/MyLoggedUser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myRoutes: MyRoutes;
  myAjaxService: MyAjaxService;

  userLoginForm: any;
  loginWarningRef: any;

  private formBuilder: FormBuilder;
  private usernameInputRef: any;
  private passwordInputRef: any;
  private usernameInputWarningRef: any;
  private passwordInputWarningRef: any;
  private readonly cssStyleDisplayBlock: string;
  private readonly cssStyleDisplayNone: string;


  constructor(private _router: Router, private _formBuilder: FormBuilder, private _myAjaxService: MyAjaxService) {
    this.myRoutes = new MyRoutes(_router);
    this.myAjaxService = _myAjaxService;
    this.formBuilder = _formBuilder;

    this.cssStyleDisplayBlock = "display: block;";
    this.cssStyleDisplayNone = "display: none;";
  }

  ngOnInit(): void {

    this.userLoginForm = <FormGroup>this.formBuilder.group(
      {
        'username': new FormControl(null, Validators.required),
        'password': new FormControl(null, Validators.required)
      }
    );


    /**** Form input fields references ****/
    this.usernameInputRef = this.userLoginForm.controls['username'];
    this.passwordInputRef = this.userLoginForm.controls['password'];

    /**** Form input fields warnings references ****/
    this.usernameInputWarningRef = document.getElementById("username_error_message");
    this.passwordInputWarningRef = document.getElementById("password_error_message");
    this.loginWarningRef = document.getElementById("login_error_message");

    this.usernameInputRef.valueChanges.subscribe((value: any) => this.checkInputField(this.usernameInputRef, this.usernameInputWarningRef));
    this.passwordInputRef.valueChanges.subscribe((value: any) => this.checkInputField(this.passwordInputRef, this.passwordInputWarningRef));

    /**** Default input fields warnings CSS ****/
    this.passwordInputWarningRef.style = this.cssStyleDisplayNone;
    this.usernameInputWarningRef.style = this.cssStyleDisplayNone;
    this.loginWarningRef.style = this.cssStyleDisplayNone;

  }

  clickedLogin(event: any) {

    event.preventDefault();

    let loginUsername: string = this.usernameInputRef.value;
    let loginPassword: string = this.passwordInputRef.value;

    console.log("Username is -> " + loginUsername);
    console.log("Password is -> " + loginPassword);

    if (loginUsername && loginPassword) {

      let credentials = {
        Username: loginUsername,
        Password: loginPassword
      };

      this.myAjaxService.authenticateUser(credentials)
        .subscribe((res: any) => {
          if (res["status"] == "OK") {

            MyLoggedUser.sessionStorageLogin(this.myRoutes, res);

          } else {

            console.log("Login FAILED");
            this.loginWarningRef.style = "display: block;";
          }
        });

    } else {

      this.checkInputField(this.usernameInputRef, this.usernameInputWarningRef);
      this.checkInputField(this.passwordInputRef, this.passwordInputWarningRef);
    }
  }


  checkInputField(inputElementRef: any, warningElementRef: any) {
    inputElementRef.invalid ? warningElementRef.style = this.cssStyleDisplayBlock : warningElementRef.style = this.cssStyleDisplayNone;
  }
}
