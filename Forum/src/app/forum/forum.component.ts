import {MyCategory} from "../Shared/Models/MyCategory";
import {MyUser} from "../Shared/Models/MyUser";
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MyRoutes} from "../Shared/Routes/MyRoutes";
import {MyComment} from "../Shared/Models/MyComment";
import {MyLoggedUser} from "../Shared/LoggedUser/MyLoggedUser";
import {MyDataService} from "../Shared/Services/MyDataService";
import {MyLikeButtonService} from "../Shared/Services/MyLikeButtonService";
import {MyCommentLikeInfo} from "../Shared/Models/MyCommentLikeInfo";


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  myRoutes: MyRoutes;
  myData: MyDataService;

  loggedUser: MyUser = new MyUser({});
  tmpCommentToRememberBeforeEditing: MyComment = new MyComment({});

  isNewPostBeingMaking: boolean = false;
  justWritingComment: string = "";

  constructor(private _router: Router, private _myData: MyDataService) {
    this.myRoutes = new MyRoutes(_router);
    this.myData = _myData;

    this.loggedUser = MyLoggedUser.getUser();
    this.myData.selectedCategory = null;
  }


  ngOnInit(): void {
    if (this.loggedUser.Name) {

      this.myData.getAllCategoriesFromDatabase();

    } else {

      this.myRoutes.navigateToLoginForm();
    }
  }


  /**************************************** User is selecting category ***********************************************/
  getSelectedCategory(index: number) {

    this.myData.selectedCategory = MyCategory.MyCategoryBuilder()
      .setId(this.myData.allCategories[index].ID)
      .setTitle(this.myData.allCategories[index].Title)
      .build();

    this.myData.getAllCommentsFromDatabase();
  }


  /****************************************** Updating Likes *******************************************************/
  paintLikeButton(index: number): string {
    let tmpLikeInfo: MyCommentLikeInfo = this.myData.allComments[index].LikeInfo;
    return MyLikeButtonService.paintLikeButton(this.loggedUser, tmpLikeInfo);
  }

  increaseNumberOfLikes(index: number) {
    let tmpLikeInfo: MyCommentLikeInfo = this.myData.allComments[index].LikeInfo;

    MyLikeButtonService.whoLikedComment(this.loggedUser, tmpLikeInfo);
    this.myData.updateLikeInfo(tmpLikeInfo);
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
    let tmpComment: MyComment = this.myData.allComments[index];
    this.tmpCommentToRememberBeforeEditing = MyComment.createNewCopyOfComment(tmpComment)
    tmpComment.isBeingEdited = true;
  }

  doneEditingExistingPost(index: number) {
    let tmpComment: MyComment = this.myData.allComments[index];
    tmpComment.isBeingEdited = false;
    this.myData.updateCommentFromDatabase(tmpComment, this.tmpCommentToRememberBeforeEditing);
  }


  /**************************************** DELETE EXISTING POST ***********************************************/
  deleteExistingPost(index: number) {
    let tmpComment: MyComment = this.myData.allComments[index];
    this.myData.deleteCommentFromDatabase(tmpComment)
  }

}
