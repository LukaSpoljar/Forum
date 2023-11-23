class MyComment {

    constructor(tmpDataObject = {
        id: undefined,
        userId: 0,
        categoryId: 0,
        timestamp: "",
        comment: ""
    }) {
        this.ID = tmpDataObject.id;
        this.UserID = tmpDataObject.userId;
        this.CategoryID = tmpDataObject.categoryId;
        this.Timestamp = tmpDataObject.timestamp;
        this.Comment = tmpDataObject.comment;
    }

}

module.exports = {

    CommentBuilder: function () {

        let tmpId = undefined;
        let tmpUserId = undefined;
        let tmpCategoryId = undefined;
        let tmpTimestamp = undefined;
        let tmpComment = undefined;

        return {
            setId: function (_id) {
                tmpId = _id;
                return this;
            },
            setUserId: function (_userId) {
                tmpUserId = _userId;
                return this;
            },
            setCategoryId: function (_categoryId) {
                tmpCategoryId = _categoryId;
                return this;
            },
            setTimestamp: function (_timestamp) {
                tmpTimestamp = _timestamp;
                return this;
            },
            setComment: function (_comment) {
                tmpComment = _comment;
                return this;
            },
            build: function () {
                return new MyComment({
                    id: tmpId,
                    userId: tmpUserId,
                    categoryId: tmpCategoryId,
                    timestamp: tmpTimestamp,
                    comment: tmpComment
                });
            }
        }

    }
}







