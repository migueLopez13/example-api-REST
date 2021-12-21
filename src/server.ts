import app from "./app";
import mongoose from 'mongoose'

const url = 'mongodb://localhost/contacts-book'

export const server = app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  mongoose.connect(url, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
    .then(() => console.log("CONECTED TO MONGO"))
    .catch((e) => console.log("ERROR:" + e))
});

