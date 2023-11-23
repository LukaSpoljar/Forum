class MyCommentLikeInfo {

    constructor(tmpDataObject = {id: undefined, commentId: 0, usersWhoLiked: ""}) {
        this.ID = tmpDataObject.id;
        this.CommentID = tmpDataObject.commentId;
        this.UsersWhoLiked = tmpDataObject.usersWhoLiked ? tmpDataObject.usersWhoLiked : "[]";
    }

}


module.exports = {

    LikeInfoBuilder: function () {

        let tmpId = undefined;
        let tmpCommentId = undefined;
        let tmpUsersWhoLiked = undefined;

        return {

            setId: function (_id) {
                tmpId = _id;
                return this;
            },
            setCommentId: function (_commentId) {
                tmpCommentId = _commentId;
                return this;
            },
            setUsersWhoLiked: function (_usersWhoLiked) {
                tmpUsersWhoLiked = _usersWhoLiked;
                return this;
            },
            build: function () {
                return new MyCommentLikeInfo({id: tmpId, commentId: tmpCommentId, usersWhoLiked: tmpUsersWhoLiked});
            }
        }

    }
}



