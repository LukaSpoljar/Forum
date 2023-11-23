import {Injectable} from "@angular/core";
import {MyCommentLikeInfo} from "../Models/MyCommentLikeInfo";
import {MyUser} from "../Models/MyUser";

@Injectable({
  providedIn: 'root'
})


export class MyLikeButtonService {


  private static bootstrapClassDangerButton: string = "btn btn-danger";
  private static bootstrapClassSuccessButton: string = "btn btn-success";


  public static paintLikeButton(tmpUser: MyUser, tmpLikeInfo: MyCommentLikeInfo): string {

    let usersWhoLikedArray: any = tmpLikeInfo.UsersWhoLiked ? new Set(JSON.parse(tmpLikeInfo.UsersWhoLiked)) : new Set();
    return usersWhoLikedArray.has(tmpUser.ID) ? this.bootstrapClassDangerButton : this.bootstrapClassSuccessButton;
  }


  public static whoLikedComment(tmpUser: MyUser, tmpLikeInfo: MyCommentLikeInfo) {

    let usersWhoLikedArray: any = tmpLikeInfo.UsersWhoLiked ? new Set(JSON.parse(tmpLikeInfo.UsersWhoLiked)) : new Set();
    usersWhoLikedArray.has(tmpUser.ID) ? usersWhoLikedArray.delete(tmpUser.ID) : usersWhoLikedArray.add(tmpUser.ID);

    tmpLikeInfo.UsersWhoLiked = JSON.stringify(Array.from(usersWhoLikedArray));
    tmpLikeInfo.LikesCounter = usersWhoLikedArray.size;
  }
}
