class MyCategory {

    constructor(tmpDataObject = {id: undefined, title: ""}) {
        this.ID = tmpDataObject.id;
        this.Title = tmpDataObject.title;
    }

}


module.exports = {

    CategoryBuilder: function () {

        let tmpId = undefined;
        let tmpTitle = "";

        return {
            setId: function (_id) {
                tmpId = _id;
                return this;
            }
            ,
            setTitle: function (_title) {
                tmpTitle = _title;
                return this;
            }
            ,
            build: function () {
                return new MyCategory({id: tmpId, title: tmpTitle});
            }
        }
    }
}



