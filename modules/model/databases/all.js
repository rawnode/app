const db = connect("mongodb://localhost:27017/new_raw_nodejs");
db.users.find({}).pretty();
