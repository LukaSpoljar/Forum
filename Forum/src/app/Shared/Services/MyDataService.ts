import { Injectable } from "@angular/core";
import { MyAjaxService } from "./MyAjaxService";
import { MyComment } from "../Models/MyComment";
import { MyCategory } from "../Models/MyCategory";
import { MyCommentLikeInfo } from "../Models/MyCommentLikeInfo";
import { MyLoggedUser } from "../LoggedUser/MyLoggedUser";
import { MyUser } from "../Models/MyUser";
import { MyRoutes } from "../Routes/MyRoutes";

@Injectable({
  providedIn: 'root'
})

export class MyDataService {

  myAjaxService: MyAjaxService;
  selectedCategory: any = null;

  allUsers: MyUser[] = [];
  allCategories: MyCategory[] = [];
  allComments: MyComment[] = [];

  filteredAllComments: MyComment[] = [];


  /*categoriesSubject: BehaviorSubject<any> = new BehaviorSubject(null);*/

  constructor(private _myAjaxService: MyAjaxService) {
    this.myAjaxService = _myAjaxService;
  }

  /************************************* GETTING FROM DATABASE *********************************************/
  getAllUsersFromDatabase() {
    this.myAjaxService.getAllUsersFromDatabase()
      .subscribe((res: MyUser[]) => this.allUsers = res);
  }


  getAllCategoriesFromDatabase() {

    let response: any = null;

    this.myAjaxService.getAllCategoriesFromDatabase()
      .subscribe({
        next: (res: any): void => { response = res; },
        error: (res: any): void => { response = res; },
        complete: (): void => {

          if (Array.isArray(response)) {
            this.allCategories = response;
            if (this.allCategories.length > 0)
              this.selectedCategory = this.allCategories[0];
            this.getAllCommentsFromDatabase();
          }
        }
      });
  }


  getAllCommentsFromDatabase() {

    let adminPermission: boolean = MyLoggedUser.getAdminPermission();
    let loggedUser: MyUser | undefined = MyLoggedUser.getUser();

    this.myAjaxService.getAllCommentsFromDatabase()
      .subscribe((res: MyComment[]) => {

        this.allComments = [];
        this.filteredAllComments = [];

        res.forEach((element, index) => {

          if (this.selectedCategory && element.CategoryID == this.selectedCategory.ID) {

            this.allComments.push(element);
            this.filteredAllComments.push(element);

          } else if (!this.selectedCategory) {

            if (adminPermission) {

              this.allComments.push(element);
              this.filteredAllComments.push(element);

            } else if (loggedUser && element.UserID == loggedUser.ID) {

              this.allComments.push(element);
              this.filteredAllComments.push(element);

            }

          }

        });

      });
  }


  /************************************* UPDATING DATABASE ENTITIES *********************************************/
  updateCommentFromDatabase(tmpComment: MyComment, tmpRememberComment: MyComment) {
    this.myAjaxService.updatePostFromDatabase(tmpComment)
      .subscribe(res => {

        this.getAllCommentsFromDatabase();

      }, error => {

        tmpComment = MyComment.createNewCopyOfComment(tmpRememberComment);
        console.log(error + " Neuspješno ažuriranje posta");
      });
  }

  updateLikeInfo(tmpLikeInfo: MyCommentLikeInfo) {

    this.myAjaxService.updateLikeInfo(tmpLikeInfo)
      .subscribe(res => {

        this.getAllCommentsFromDatabase();

      });
  }


  /************************************* ADDING TO DATABASE *********************************************/
  addNewUserToDatabase(tmpUser: MyUser, tmpRouter: MyRoutes) {
    this.myAjaxService.addNewUserToDatabase(tmpUser)
      .subscribe((res => {
        MyLoggedUser.sessionStorageLogin(tmpRouter, res);
      }));
  }

  addNewCommentToDatabase(tmpComment: MyComment) {
    this.myAjaxService.addNewCommentToDatabase(tmpComment)
      .subscribe(((res: any) => {

        let tmpLikeInfo: MyCommentLikeInfo = MyCommentLikeInfo.MyLikeInfoBuilder()
          .setCommentId(res["insertId"])
          .setUsersWhoLiked()
          .build();

        this.myAjaxService.addNewLikeInfoToDatabase(tmpLikeInfo)
          .subscribe(res => {
            this.getAllCommentsFromDatabase()
          });
      }));
  }


  /************************************* DELETEING FROM DATABASE *********************************************/
  deleteCommentFromDatabase(tmpComment: MyComment) {
    this.myAjaxService.deleteExistingCommentLikeInfo(tmpComment.LikeInfo)
      .subscribe(res => {

        this.myAjaxService.deleteExistingPost(tmpComment)
          .subscribe(res => {

            this.getAllCommentsFromDatabase();
          });

      });
  }


}
