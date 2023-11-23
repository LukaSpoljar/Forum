import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MyUser} from "../Shared/Models/MyUser";
import {environment} from "../../environments/environment";
import {MyDataService} from "../Shared/Services/MyDataService";
import {MyRoutes} from "../Shared/Routes/MyRoutes";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myData : MyDataService;
  myRoutes: MyRoutes;
  userRegisterForm : any;

  private formBuilder: FormBuilder;

  private usernameInputRef : any;
  private passwordInputRef : any;
  private confirmPasswordInputRef : any;
  private nameInputRef: any;
  private emailInputRef: any;

  private usernameInputWarningRef: any;
  private passwordInputWarningRef: any;
  private confirmedPasswordInputWarningRef: any;
  private nameInputWarningRef: any;
  private emailInputWarningRef: any;

  private readonly cssStyleDisplayBlock: string;
  private readonly cssStyleDisplayNone: string;


  constructor(private _router: Router, private _formBuilder: FormBuilder, private _myDataService: MyDataService) {
    this.myData = _myDataService;
    this.myRoutes = new MyRoutes(_router);
    this.formBuilder = _formBuilder;

    this.cssStyleDisplayBlock = "display: block;";
    this.cssStyleDisplayNone = "display: none;";
  }

  ngOnInit(): void {

    this.userRegisterForm = <FormGroup>this.formBuilder.group(
      {
        'username': new FormControl(null, [Validators.required, Validators.minLength(4)]),
        'password': new FormControl(null, [Validators.required]),
        'confirmPassword': new FormControl(null, [Validators.required]),
        'name': new FormControl(null, [Validators.required]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
      }
    );

    /**** Form input fields references ****/
    this.usernameInputRef = this.userRegisterForm.controls['username'];
    this.passwordInputRef = this.userRegisterForm.controls['password'];
    this.confirmPasswordInputRef = this.userRegisterForm.controls['confirmPassword'];
    this.nameInputRef = this.userRegisterForm.controls['name'];
    this.emailInputRef = this.userRegisterForm.controls['email'];

    /**** Form input fields warnings references ****/
    this.usernameInputWarningRef = document.getElementById("username_error_message");
    this.passwordInputWarningRef = document.getElementById("password_error_message");
    this.confirmedPasswordInputWarningRef = document.getElementById("confirmed_password_error_message");
    this.nameInputWarningRef = document.getElementById("name_error_message");
    this.emailInputWarningRef = document.getElementById("email_error_message");

    this.usernameInputRef.valueChanges.subscribe((value : any) => { this.checkInputField(this.usernameInputRef, this.usernameInputWarningRef);});
    this.passwordInputRef.valueChanges.subscribe((value : any) => { this.checkInputField(this.passwordInputRef, this.passwordInputWarningRef); });
    this.confirmPasswordInputRef.valueChanges.subscribe((value : any) => { this.checkConfirmedPassword(); });
    this.nameInputRef.valueChanges.subscribe((value : any) => { this.checkInputField(this.nameInputRef, this.nameInputWarningRef); });
    this.emailInputRef.valueChanges.subscribe((value : any) => { this.checkInputField(this.emailInputRef, this.emailInputWarningRef); });

    /**** Default input fields warnings CSS ****/
    this.emailInputWarningRef.style = this.cssStyleDisplayNone;
    this.nameInputWarningRef.style = this.cssStyleDisplayNone;
    this.confirmedPasswordInputWarningRef.style = this.cssStyleDisplayNone;
    this.passwordInputWarningRef.style = this.cssStyleDisplayNone;
    this.usernameInputWarningRef.style = this.cssStyleDisplayNone;
  }

  onRegister(event: any) {

    event.preventDefault();

    if (this.userRegisterForm.invalid) {

      this.checkInputField(this.usernameInputRef, this.usernameInputWarningRef);
      this.checkInputField(this.passwordInputRef, this.passwordInputWarningRef);
      this.checkConfirmedPassword();
      this.checkInputField(this.nameInputRef, this.nameInputWarningRef);
      this.checkInputField(this.emailInputRef, this.emailInputWarningRef);

    } else {

      let tmpUsername = this.userRegisterForm.controls['username'].value;
      let tmpPassword = this.userRegisterForm.controls['password'].value;
      let tmpName = this.userRegisterForm.controls['name'].value;
      let tmpEmail = this.userRegisterForm.controls['email'].value;

      let myNewUser: MyUser = MyUser.MyUserBuilder()
        .setUsername(tmpUsername)
        .setPassword(tmpPassword)
        .setName(tmpName)
        .setEmail(tmpEmail)
        .build();

      this.myData.addNewUserToDatabase(myNewUser, this.myRoutes);

    }
  }

  checkConfirmedPassword() { this.confirmPasswordInputRef.invalid || this.passwordInputRef.value != this.confirmPasswordInputRef.value ? this.confirmedPasswordInputWarningRef.style = this.cssStyleDisplayBlock : this.confirmedPasswordInputWarningRef.style = this.cssStyleDisplayNone; }
  checkInputField(inputElementRef: any, warningElementRef: any) { inputElementRef.invalid ? warningElementRef.style = this.cssStyleDisplayBlock : warningElementRef.style = this.cssStyleDisplayNone; }
}
