const config = require("../../config");

module.exports = function (express, mysql, crypto, mytoken) {

    let pool;
    const apiRouter = express.Router();

    async function initDb() {
        pool = await mysql.createPool(config.pool);

        require("./Tables/apiMyUser").databaseTableUsers(apiRouter, pool, crypto, mytoken);
        require("./Tables/apiMyComment").databaseTableComments(apiRouter, pool, mytoken);
        require("./Tables/apiMyCommentLikeInfo").databaseTableNumberOfLikes(apiRouter, pool);
    }
    initDb();

    return apiRouter;
};