const db = connect("mongodb://localhost:27017/city");
printjson(db.cities.findOne({_id: ObjectId("635919e22bc9cdd44701ee89")}));
