const config = require("../../config");
const jwt = require('jsonwebtoken');

module.exports = {

    createToken: (myObject, myObjectProperties) => {

        let tmpObject = {};

        if (myObjectProperties.length > 0) {
            myObjectProperties.forEach((element, index) => tmpObject[myObjectProperties[index]] = myObject[myObjectProperties[index]]);
        }

        return jwt.sign({tmpObject}, config.secret, {expiresIn: 6000 /** In seconds **/});
    },

    verifyMyToken: (myToken) => {

        if (myToken) {

            return jwt.verify(myToken, config.secret, function (err, decoded) {
                if (err) {
                    return 0;
                } else {
                    return 1;
                }
            });
        }
        return 0;
    }

}