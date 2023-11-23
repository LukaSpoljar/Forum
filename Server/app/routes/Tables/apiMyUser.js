
module.exports = {

    databaseTableUsers: (apiRouter, pool, crypto, myToken) => {

        const MyUser = require("../../Models/MyUser");

        /******************************************************************* DATABASE TABLE USERS ******************************************************************/
        apiRouter.route('/users').get(async function (req, res) {

            /**** Get all Users ****/

            try {

                let myConnection = await pool.getConnection();
                let rows = await myConnection.query('SELECT * FROM users');
                myConnection.release();

                res.json({status: 'OK', users: rows});

            } catch (e) {

                console.log(e);
                return res.json({"code": 100, "status": "Error with query"});
            }

        }).post(async function (req, res) {

            req.body.Salt = crypto.randomBytes(16).toString('hex');
            req.body.Password = crypto.pbkdf2Sync(req.body.Password, req.body.Salt, 1000, 64, `sha512`).toString(`hex`);
            req.body.Level = 0;

            /**** Create new User ****/

            const tmpUser = MyUser.UserBuilder()
                .setUsername(req.body.Username)
                .setPassword(req.body.Password)
                .setName(req.body.Name)
                .setEmail(req.body.Email)
                .setSalt(req.body.Salt)
                .setLevel(req.body.Level)
                .build();

            const tmpToken = myToken.createToken(tmpUser, ["Username", "Password"]);
            const tmpdozvola = "NOT OK";

            try {

                let myConnection = await pool.getConnection();
                let myQuery = await myConnection.query('INSERT INTO users SET ?', tmpUser);

                tmpUser.ID = myQuery.insertId;

                myConnection.release();
                res.json({status: 'OK', token : tmpToken, dozvola : tmpdozvola, user : tmpUser, insertId: myQuery.insertId});

            } catch (e) {

                console.log(e);
                res.json({status: 'NOT OK'});
            }
        });

    }
}