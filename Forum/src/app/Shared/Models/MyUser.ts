export class MyUser {

  ID: number | undefined;
  Username: string = "";
  Password: string = "";
  Name: string = "";
  Email: string = "";
  Salt: string = "";
  Level: number = 0;


  constructor(tmpDataObject: { id?: number, username?: string, password?: string, name?: string, email?: string, salt?: string, level?: number }) {

    this.ID = tmpDataObject.id;

    if (tmpDataObject.username) {
      this.Username = tmpDataObject.username;
    }
    if (tmpDataObject.password) {
      this.Password = tmpDataObject.password;
    }
    if (tmpDataObject.name) {
      this.Name = tmpDataObject.name;
    }
    if (tmpDataObject.email) {
      this.Email = tmpDataObject.email;
    }
    if (tmpDataObject.salt) {
      this.Salt = tmpDataObject.salt;
    }
    if (tmpDataObject.level) {
      this.Level = tmpDataObject.level;
    }

  }


  //Pattern Builder
  public static MyUserBuilder() {

    let tmpId: number | undefined;
    let tmpUsername: string | undefined;
    let tmpPassword: string | undefined;
    let tmpName: string | undefined;
    let tmpEmail: string | undefined;
    let tmpSalt: string | undefined;
    let tmpLevel: number | undefined;

    return {
      setId: function (_id ?: number) {
        tmpId = _id;
        return this;
      },
      setUsername: function (_username ?: string) {
        tmpUsername = _username;
        return this;
      },
      setPassword: function (_password ?: string) {
        tmpPassword = _password;
        return this;
      },
      setName: function (_name ?: string) {
        tmpName = _name;
        return this;
      },
      setEmail: function (_email ?: string) {
        tmpEmail = _email;
        return this;
      },
      setSalt: function (_salt ?: string) {
        tmpSalt = _salt;
        return this;
      },
      setLevel: function (_level ?: number) {
        tmpLevel = _level;
        return this;
      },
      build: function () {
        return new MyUser({
          id: tmpId,
          username: tmpUsername,
          password: tmpPassword,
          name: tmpName,
          email: tmpEmail,
          salt: tmpSalt,
          level: tmpLevel
        });
      }
    }
  }


  public static createNewCopyOfUser(tmpUser: MyUser | undefined): MyUser {
    if (tmpUser == undefined) {
      return new MyUser({});
    }

    return MyUser.MyUserBuilder()
      .setId(tmpUser.ID)
      .setUsername(tmpUser.Username)
      .setPassword(tmpUser.Password)
      .setName(tmpUser.Name)
      .setEmail(tmpUser.Email)
      .setSalt(tmpUser.Salt)
      .setLevel(tmpUser.Level)
      .build();
  }


  isEqualTo(otherUser: MyUser) {

    let booleanID = this.ID == otherUser.ID;
    let booleanUsername = this.Username == otherUser.Username;
    let booleanPassword = this.Password == otherUser.Password;
    let booleanName = this.Name == otherUser.Name;
    let booleanEmail = this.Email == otherUser.Email;
    let booleanSalt = this.Salt == otherUser.Salt;
    let booleanLevel = this.Level == otherUser.Level;

    return booleanID && booleanUsername && booleanPassword && booleanName && booleanEmail && booleanSalt && booleanLevel;
  }
}
