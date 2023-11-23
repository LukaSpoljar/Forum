import {MyCommentLikeInfo} from "./MyCommentLikeInfo";

export class MyComment {

  ID: number | undefined;
  UserID: number = 0;
  CategoryID: number = 0;
  Author: string = "";
  Timestamp: string = "";
  Comment: string = "";
  LikeInfo: MyCommentLikeInfo = new MyCommentLikeInfo({});

  isBeingEdited: boolean = false;

  constructor(tmpDataObject: { id?: number, userId?: number, categoryId?: number, author?: string, timestamp?: string, comment?: string, likeInfo?: MyCommentLikeInfo }) {

    this.ID = tmpDataObject.id;

    if (tmpDataObject.userId) { this.UserID = tmpDataObject.userId; }
    if (tmpDataObject.categoryId) { this.CategoryID = tmpDataObject.categoryId; }
    if (tmpDataObject.author) { this.Author = tmpDataObject.author; }
    if (tmpDataObject.timestamp) { this.Timestamp = tmpDataObject.timestamp; }
    if (tmpDataObject.comment) { this.Comment = tmpDataObject.comment; }
    if (tmpDataObject.likeInfo) { this.LikeInfo = tmpDataObject.likeInfo; }
  }


  //Pattern Builder
  public static MyCommentBuilder() {

    let tmpId: number | undefined;
    let tmpUserId: number | undefined;
    let tmpCategoryId: number | undefined;
    let tmpAuthor: string | undefined;
    let tmpTimestamp: string | undefined;
    let tmpComment: string | undefined;
    let tmpLikeInfo: MyCommentLikeInfo | undefined;

    return {
      setId: function (_id?: number) {
        tmpId = _id;
        return this;
      },
      setUserId: function (_userId?: number) {
        tmpUserId = _userId;
        return this;
      },
      setCategoryId: function (_categoryId?: number) {
        tmpCategoryId = _categoryId;
        return this;
      },
      setAuthor: function (_author?: string) {
        tmpAuthor = _author;
        return this;
      },
      setTimestamp: function (_timestamp?: string) {
        tmpTimestamp = _timestamp;
        return this;
      },
      setComment: function (_comment?: string) {
        tmpComment = _comment;
        return this;
      },
      setLikeInfo: function (_likeInfo?: MyCommentLikeInfo) {
        tmpLikeInfo = _likeInfo;
        return this;
      },
      build: function () {
        return new MyComment({
          id: tmpId,
          userId: tmpUserId,
          categoryId: tmpCategoryId,
          author: tmpAuthor,
          timestamp: tmpTimestamp,
          comment: tmpComment,
          likeInfo: tmpLikeInfo
        });
      }
    }
  }


  public static createNewCopyOfComment(tmpComment: MyComment): MyComment {
    return MyComment.MyCommentBuilder()
      .setId(tmpComment.ID)
      .setUserId(tmpComment.UserID)
      .setCategoryId(tmpComment.CategoryID)
      .setAuthor(tmpComment.Author)
      .setTimestamp(tmpComment.Timestamp)
      .setComment(tmpComment.Comment)
      .setLikeInfo(tmpComment.LikeInfo)
      .build();
  }

  copy(tmpCopyComment: MyComment) {
    this.ID = tmpCopyComment.ID;
    this.UserID = tmpCopyComment.UserID;
    this.CategoryID = tmpCopyComment.CategoryID;
    this.Author = tmpCopyComment.Author;
    this.Timestamp = tmpCopyComment.Timestamp;
    this.Comment = tmpCopyComment.Comment;
    this.LikeInfo = tmpCopyComment.LikeInfo;
  }

}
