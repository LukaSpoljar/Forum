export class MyCommentLikeInfo {

  ID: number | undefined;
  CommentID: number;
  UsersWhoLiked: string | undefined;
  LikesCounter: number = 0;


  constructor(tmpDataObject: { id?: number, commentId?: number, usersWhoLiked?: string }) {
    this.ID = tmpDataObject.id;
    this.CommentID = tmpDataObject.commentId ? tmpDataObject.commentId : 0;
    this.UsersWhoLiked = tmpDataObject.usersWhoLiked;
    this.LikesCounter = (this.UsersWhoLiked) ? (JSON.parse(this.UsersWhoLiked)).length : 0;
  }


  //Pattern Builder
  public static MyLikeInfoBuilder() {

    let tmpId: number | undefined;
    let tmpCommentId: number | undefined;
    let tmpUsersWhoLiked: string | undefined;

    return {
      setId: function (_id?: number) {
        tmpId = _id;
        return this;
      },
      setCommentId: function (_commentId?: number) {
        tmpCommentId = _commentId;
        return this;
      },
      setUsersWhoLiked: function (_usersWhoLiked ?: string) {
        tmpUsersWhoLiked = _usersWhoLiked;
        return this
      },
      build: function () {
        return new MyCommentLikeInfo({id: tmpId, commentId: tmpCommentId, usersWhoLiked: tmpUsersWhoLiked});
      }
    }
  }

  public static createNewCopyOfLikeInfo(tmpLikeInfo: MyCommentLikeInfo): MyCommentLikeInfo {
    return MyCommentLikeInfo.MyLikeInfoBuilder()
      .setId(tmpLikeInfo.ID)
      .setCommentId(tmpLikeInfo.CommentID)
      .setUsersWhoLiked(tmpLikeInfo.UsersWhoLiked)
      .build();
  }

}
