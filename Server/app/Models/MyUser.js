class MyUser {

    constructor(tmpDataObject = { id: undefined , username: "", password: "", name: "", email: "", salt: "", level: 0}) {

        this.ID = tmpDataObject.id;
        this.Username = tmpDataObject.username;
        this.Password = tmpDataObject.password;
        this.Name = tmpDataObject.name;
        this.Email = tmpDataObject.email;
        this.Salt = tmpDataObject.salt;
        this.Level = tmpDataObject.level;
    }

}


module.exports = {

    UserBuilder : function () {

        let tmpId = undefined;
        let tmpUsername = undefined;
        let tmpPassword = undefined;
        let tmpName = undefined;
        let tmpEmail = undefined;
        let tmpSalt = undefined;
        let tmpLevel = undefined;

        return {
            setId: function (_id) { tmpId = _id; return this; },
            setUsername: function (_username) { tmpUsername = _username; return this; },
            setPassword: function (_password) { tmpPassword = _password; return this; },
            setName: function (_name) { tmpName = _name; return this; },
            setEmail: function (_email) { tmpEmail = _email; return this; },
            setSalt: function (_salt) { tmpSalt = _salt; return this; },
            setLevel: function (_level) { tmpLevel = _level; return this; },
            build: function () { return new MyUser({id: tmpId, username: tmpUsername, password: tmpPassword, name: tmpName, email: tmpEmail, salt: tmpSalt, level: tmpLevel}); }
        }

    }
}



