const mongoose = require("mongoose");

module.exports = dbConnecct = db => {
  mongoose
    .connect(
      `mongodb://localhost/${db}?keepAlive=true&poolSize=30&autoReconnect=true&socketTimeoutMS=360000&connectTimeoutMS=360000`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      },
      //() => {
      console.log("MongoDb Running..")
      //}
    )
    .catch(err => {
      console.log(err.message);
      process.exit(1);
    });
};
