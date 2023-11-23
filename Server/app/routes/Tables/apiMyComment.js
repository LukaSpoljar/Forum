module.exports = {

    databaseTableComments: (apiRouter, pool, myToken) => {

        const MyComment = require("../../Models/MyComment");

        /******************************************************************* DATABASE TABLE COMMENTS ******************************************************************/
        apiRouter.route('/comments/:token').get(async function (req, res) {

            /**** Get all Comments ****/

            if (myToken.verifyMyToken(req.params.token)) {
                try {

                    let myConnection = await pool.getConnection();

                    let myQuerySQL = `

                        SELECT comments.*,
                               users.Name           AS Author,
                               likes_per_comment.ID AS LikesID,
                               likes_per_comment.UsersWhoLiked

                        FROM comments
                                 INNER JOIN users ON comments.UserID = users.ID
                                 INNER JOIN likes_per_comment ON comments.ID = likes_per_comment.CommentID

                        ORDER BY comments.Timestamp DESC

                    `;

                    let rows = await myConnection.query(myQuerySQL);

                    myConnection.release();
                    res.json({status: 'OK', comments: rows});

                } catch (e) {

                    console.log(e);
                    return res.json({"code": 100, "status": "Error with query"});
                }
            } else {

                res.json({myMessage: "INVALID TOKEN"});
            }

        });


        apiRouter.route('/comments').post(async function (req, res) {

            /**** Create new Comment ****/

            const tmpComment = MyComment.CommentBuilder()
                .setUserId(req.body.UserID)
                .setCategoryId(req.body.CategoryID)
                .setTimestamp(req.body.Timestamp)
                .setComment(req.body.Comment)
                .build();

            try {

                let myConnection = await pool.getConnection();
                let myQuery = await myConnection.query('INSERT INTO comments SET ?', tmpComment);
                myConnection.release();
                res.json({status: 'OK', insertId: myQuery.insertId});

            } catch (e) {

                console.log(e);
                res.json({status: 'NOT OK'});
            }

        }).put(async function (req, res) {

            /**** Update existing Comment ****/

            const tmpComment = MyComment.CommentBuilder()
                .setId(req.body.ID)
                .setUserId(req.body.UserID)
                .setCategoryId(req.body.CategoryID)
                .setTimestamp(req.body.Timestamp)
                .setComment(req.body.Comment)
                .build();

            try {

                let myConnection = await pool.getConnection();
                let myQuery = await myConnection.query('UPDATE comments SET ? WHERE ID = ?', [tmpComment, req.body.ID]);
                myConnection.release();

                res.json({status: 'OK', changedRows: myQuery.changedRows});
                console.log(myQuery);

            } catch (e) {

                res.json({status: 'NOT OK'});
            }
        });


        apiRouter.route('/comments/:ID').delete(async function (req, res) {

            /**** Delete existing Comment ****/

            try {

                let myConnection = await pool.getConnection();
                let myQuery = await myConnection.query('DELETE FROM comments WHERE ID = ?', req.params.ID);
                myConnection.release();
                res.json({status: 'OK', affectedRows: myQuery.affectedRows});

            } catch (e) {

                res.json({status: 'NOT OK'});
            }
        });
    }
}