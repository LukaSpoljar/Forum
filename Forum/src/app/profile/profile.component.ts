import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MyUser} from "../Shared/Models/MyUser";
import {MyAjaxService} from "../Shared/Services/MyAjaxService";
import {MyComment} from "../Shared/Models/MyComment";
import {MyRoutes} from "../Shared/Routes/MyRoutes";
import {MyCategory} from "../Shared/Models/MyCategory";
import {MyLoggedUser} from "../Shared/LoggedUser/MyLoggedUser";
import {MyLikeButtonService} from "../Shared/Services/MyLikeButtonService";
import {MyDataService} from "../Shared/Services/MyDataService";
import {MyCommentLikeInfo} from "../Shared/Models/MyCommentLikeInfo";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  myRoutes: MyRoutes;
  myData: MyDataService;
  myAjax: MyAjaxService;

  loggedUser: MyUser = new MyUser({});

  tmpCommentToRememberBeforeEditing: MyComment = new MyComment({});

  isNewPostBeingMaking: boolean = false;
  justWritingComment: string = "";

  categoryName: string = "";
  searchQuery: string = "";

  userIdFromURL: number | undefined;
  myPermission: boolean = false;
  addingNewCategoryOnEvenNumber: number = 1;


  constructor(private _router: Router, private _myAjaxService: MyAjaxService, private _myData: MyDataService, private activatedRoute: ActivatedRoute) {
    this.myRoutes = new MyRoutes(_router);
    this.myAjax = _myAjaxService;
    this.myData = _myData;
    this.myData.selectedCategory = null;
  }

  ngOnInit(): void {

    this.userIdFromURL = this.activatedRoute.snapshot.params['id'];
    this.myPermission = MyLoggedUser.getAdminPermission();

    /**** Set Logged User via ID ****/
    this.setLoggedUserViaID(this.userIdFromURL);
    /**** Get All Comments ****/
    this.myData.getAllCommentsFromDatabase();

  }

  /*********************************************** GET LOGGED USER *********************************************/
  setLoggedUserViaID(tmpUserID: number | undefined) {

    this.myAjax.getAllUsersFromDatabase()
      .subscribe((res: MyUser[]) => {

          this.myData.allUsers = res;
          let existingUser: boolean = false;

          this.myData.allUsers.forEach((element, index) => {
            if (element.ID == tmpUserID) {
              this.loggedUser = MyUser.createNewCopyOfUser(element);
              existingUser = true;
            }
          });

          if (!existingUser) {
            this.myRoutes.navigateToLoginForm();
          }

        }
      );

  }


  /*********************************************** ADD NEW CATEGORY *********************************************/
  startMakingNewCategory() {
    this.addingNewCategoryOnEvenNumber++;
  }

  saveNewCategory() {
    if (this.categoryName.length > 0) {

      let tmpCategory = MyCategory.MyCategoryBuilder()
        .setTitle(this.categoryName)
        .build();

      this.myAjax.addNewCategoryToDatabase(tmpCategory)
        .subscribe(res => {

          this.categoryName = "";
          this.addingNewCategoryOnEvenNumber++;

        }, error => {

          console.log(error + "Neuspješno dodavanje nove kategorije");
        });
    }
  }

  /****************************************** Updating Likes *******************************************************/
  paintLikeButton(index: number): string {
    let tmpLikeInfo: MyCommentLikeInfo = this.myData.filteredAllComments[index].LikeInfo;
    return MyLikeButtonService.paintLikeButton(this.loggedUser, tmpLikeInfo);
  }

  increaseNumberOfLikes(index: number) {
    let tmpLikeInfo: MyCommentLikeInfo = this.myData.filteredAllComments[index].LikeInfo;

    MyLikeButtonService.whoLikedComment(this.loggedUser, tmpLikeInfo);
    this.myData.updateLikeInfo(tmpLikeInfo);

    this.searchQuery = "";
  }


  /**************************************** ADDING NEW POST ***********************************************/
  startMakingNewPost() {
    this.isNewPostBeingMaking = true;
    this.justWritingComment = "";
  }

  addNewPost() {
    if (this.justWritingComment) {

      let tmpComment: MyComment = MyComment.MyCommentBuilder()
        .setUserId(this.loggedUser.ID)
        .setCategoryId(this.myData.selectedCategory.ID)
        .setAuthor(this.loggedUser.Name)
        .setTimestamp(String(Date.now()))
        .setComment(this.justWritingComment)
        .build();

      this.myData.addNewCommentToDatabase(tmpComment);

      this.endMakingNewPost();
    }
  }

  endMakingNewPost() {
    this.isNewPostBeingMaking = false;
  }


  /**************************************** EDITING EXISTING POST ***********************************************/
  editExistingPost(index: number) {
    let tmpComment: MyComment = this.myData.filteredAllComments[index];

    this.tmpCommentToRememberBeforeEditing = MyComment.createNewCopyOfComment(tmpComment)
    tmpComment.isBeingEdited = true;
  }

  doneEditingExistingPost(index: number) {
    let tmpComment: MyComment = this.myData.filteredAllComments[index];

    tmpComment.isBeingEdited = false;
    this.myData.updateCommentFromDatabase(tmpComment, this.tmpCommentToRememberBeforeEditing);

    this.searchQuery = "";
  }


  /**************************************** DELETE EXISTING POST ***********************************************/
  deleteExistingPost(index: number) {
    let tmpComment: MyComment = this.myData.filteredAllComments[index];
    this.myData.deleteCommentFromDatabase(tmpComment);

    this.searchQuery = "";
  }


  searchByTextComment() {
    this.myData.filteredAllComments = this.myData.allComments.filter(element => element["Comment"].includes(this.searchQuery));
  }
}


