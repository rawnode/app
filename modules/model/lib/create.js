const db = connect("mongodb://localhost:27017/models");
db.users.insertOne( {"firstname":"Deman","lastname":"Deman","email":"deman@gmail.com"} );
