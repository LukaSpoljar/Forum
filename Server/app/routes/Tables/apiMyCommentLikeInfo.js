module.exports = {

    databaseTableNumberOfLikes: (apiRouter, pool) => {

        const MyLikeInfo = require("../../Models/MyCommentLikeInfo");

        /******************************************************************* DATABASE TABLE LIKES ******************************************************************/
        apiRouter.route('/likes_per_comment').get(async function (req, res) {

            /**** Get all LikeInfo objects ****/

            try {

                let myConnection = await pool.getConnection();
                let rows = await myConnection.query('SELECT * FROM likes_per_comment');
                myConnection.release();

                res.json({status: 'OK', likes_per_comment: rows});

            } catch (e) {

                console.log(e);
                return res.json({"code": 100, "status": "Error with query"});
            }

        }).post(async function (req, res) {

            /**** Create new LikeInfo ****/

            const tmpLikeInfo = MyLikeInfo.LikeInfoBuilder()
                .setCommentId(req.body.CommentID)
                .setUsersWhoLiked(req.body.UsersWhoLiked)
                .build();

            try {

                let myConnection = await pool.getConnection();
                let myQuery = await myConnection.query('INSERT INTO likes_per_comment SET ?', tmpLikeInfo);
                myConnection.release();
                res.json({status: 'OK', insertId: myQuery.insertId});

            } catch (e) {

                console.log(e);
                res.json({status: 'NOT OK'});
            }

        }).put(async function (req, res) {

            /**** Update existing LikeInfo ****/

            const tmpLikeInfo = MyLikeInfo.LikeInfoBuilder()
                .setId(req.body.ID)
                .setCommentId(req.body.CommentID)
                .setUsersWhoLiked(req.body.UsersWhoLiked)
                .build();

            try {

                let myConnection = await pool.getConnection();
                let myQuery = await myConnection.query('UPDATE likes_per_comment SET ? WHERE ID = ?', [tmpLikeInfo, req.body.ID]);
                myConnection.release();
                res.json({status: 'OK', insertId: myQuery.insertId});

            } catch (e) {

                console.log(e);
                res.json({status: 'NOT OK'});
            }
        });


        apiRouter.route('/likes_per_comment/:ID').delete(async function (req, res) {

            /**** Delete existing CommentLikeInfo ****/

            try {

                let myConnection = await pool.getConnection();
                let myQuery = await myConnection.query('DELETE FROM likes_per_comment WHERE ID = ?', req.params.ID);
                myConnection.release();
                res.json({status: 'OK', affectedRows: myQuery.affectedRows});

            } catch (e) {

                res.json({status: 'NOT OK'});
            }
        });

    }
}