import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map } from "rxjs/operators";
import { MyComment } from "../Models/MyComment";
import { MyCommentLikeInfo } from "../Models/MyCommentLikeInfo";
import { MyUser } from "../Models/MyUser";
import { MyCategory } from "../Models/MyCategory";
import { MyLoggedUser } from "../LoggedUser/MyLoggedUser";
import { MyRoutes } from "../Routes/MyRoutes";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class MyAjaxService {

  private urlPrefix: string = environment.API_URL;
  private authUrl: string = environment.API_URL + '/authenticate';

  myRoutes: MyRoutes;

  constructor(private http: HttpClient, private router: Router) {
    this.myRoutes = new MyRoutes(router);
  }

  /********************************************* GET ****************************************************************/
  getAllCategoriesFromDatabase() {

    return this.http.get('https://api.mockaroo.com/api/31bb0e90?count=3&key=6e240d30').pipe(
      map((res: any) => {
        if (Array.isArray(res)) {
          return res;
        }
        return res;
      })
    )
  }

  getAllUsersFromDatabase() {

    return this.http.get(this.urlPrefix + '/api/users')
      .pipe(
        map((res: any) => {
          const tmpAllUsers: MyUser[] = [];

          for (let key in res["users"]) {
            tmpAllUsers.push({ ...res["users"][key] })
          }

          return tmpAllUsers;
        })
      );
  }

  getAllLikesFromDatabase() {
    return this.http.get(this.urlPrefix + '/api/likes_per_comment');
  }

  getAllCommentsFromDatabase() {

    return this.http.get(this.urlPrefix + `/api/comments/${MyLoggedUser.getToken()}`)
      .pipe(
        map((res: any) => {

          if (res["myMessage"] == "INVALID TOKEN") {
            MyLoggedUser.sessionStorageLogout(this.myRoutes);
          }

          const tmpAllComments: MyComment[] = [];

          for (let key in res["comments"]) {

            let element = res["comments"][key];

            let tmpLikeInfo = MyCommentLikeInfo.MyLikeInfoBuilder()
              .setId(element.LikesID)
              .setCommentId(element.ID)
              .setUsersWhoLiked(element.UsersWhoLiked)
              .build();

            let tmpComment = MyComment.MyCommentBuilder()
              .setId(element.ID)
              .setUserId(element.UserID)
              .setCategoryId(element.CategoryID)
              .setAuthor(element.Author)
              .setTimestamp(element.Timestamp)
              .setComment(element.Comment)
              .setLikeInfo(tmpLikeInfo)
              .build();

            tmpAllComments.push(tmpComment);
          }

          return tmpAllComments;
        })
      );
  }


  /********************************************* POST ****************************************************************/
  authenticateUser(credentials: any) {
    return this.http.post(this.authUrl, credentials);
  }

  addNewCommentToDatabase(tmpComment: MyComment) {
    console.dir(this.urlPrefix)
    return this.http.post(this.urlPrefix + `/api/comments`, tmpComment);
  }

  addNewUserToDatabase(tmpUser: MyUser) {
    return this.http.post(this.urlPrefix + '/api/users', tmpUser);
  }

  addNewCategoryToDatabase(tmpCategory: MyCategory) {
    return this.http.post(this.urlPrefix + '/api/categories', tmpCategory);
  }

  addNewLikeInfoToDatabase(tmpNumOfLikes: MyCommentLikeInfo) {
    return this.http.post(this.urlPrefix + '/api/likes_per_comment', tmpNumOfLikes);
  }


  /********************************************* UPDATE ****************************************************************/
  updatePostFromDatabase(tmpComment: MyComment) {
    return this.http.put(this.urlPrefix + `/api/comments`, tmpComment);
  }

  updateLikeInfo(tmpLikeInfo: MyCommentLikeInfo) {
    return this.http.put(this.urlPrefix + `/api/likes_per_comment`, tmpLikeInfo);
  }


  /********************************************* DELETE ****************************************************************/
  deleteExistingPost(tmpComment: MyComment) {
    return this.http.delete(this.urlPrefix + `/api/comments/${tmpComment.ID}`);
  }

  deleteExistingCommentLikeInfo(tmpMyCommentLikeInfo: MyCommentLikeInfo) {
    return this.http.delete(this.urlPrefix + `/api/likes_per_comment/${tmpMyCommentLikeInfo.ID}`);
  }
}
