export class MyCategory {

   ID: number | undefined;
   Title: string = "";

  constructor(tmpDataObject: { id?: number, title?: string }) {
    this.ID = tmpDataObject.id;

    if(tmpDataObject.title) {
      this.Title = tmpDataObject.title;
    }
  }


  //Pattern Builder
  public static MyCategoryBuilder() {

    let tmpId: number | undefined;
    let tmpTitle: string | undefined;

    return {
      setId: function (_id?: number) { tmpId = _id; return this; },
      setTitle: function (_title?: string) { tmpTitle = _title; return this; },
      build: function () { return new MyCategory({id: tmpId, title: tmpTitle}); }
    }
  }


  public static createNewCopyOfCategory(tmpCategory : MyCategory) : MyCategory
  {
    return MyCategory.MyCategoryBuilder()
      .setId(tmpCategory.ID)
      .setTitle(tmpCategory.Title)
      .build();
  }
}
