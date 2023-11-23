const config = require("../../../config");


module.exports = function (express, mysql, crypto, myToken) {

    let pool;

    async function initDb() {pool = await mysql.createPool(config.pool);}
    initDb();

    const authRouter = express.Router();

    authRouter.post('/', async function (req, res) {

        try {

            let myConnection = await pool.getConnection();
            let rows = await myConnection.query('SELECT * FROM users WHERE Username =?', req.body.Username);
            myConnection.release();

            let compare = false;
            if (rows[0].Salt) {
                let hash = crypto.pbkdf2Sync(req.body.Password, rows[0].Salt, 1000, 64, `sha512`).toString(`hex`);
                compare = hash === rows[0].Password;
            }

            if (rows.length > 0 && compare == true) {

                let tmpdozvola = (rows[0].Level == 1) ? "OK" : "NOT OK";
                const tmpToken = myToken.createToken(rows[0], ["Username", "Password"]);

                res.json({status: 'OK', dozvola: tmpdozvola, token : tmpToken, user: rows[0]});

            } else if (rows.length > 0) {

                res.json({status: 'NOT OK', description: 'Wrong password'});
            } else {

                res.json({status: 'NOT OK', description: 'Username doesnt exist'});
            }

        } catch (error) {

            console.log(error);
            return res.json({"code": 100, "status": "Error with query"});
        }
    });

    return authRouter;
};
