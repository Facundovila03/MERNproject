import mongoose, { mongo } from "mongoose";
import app from "./app";
const { PORT, MONGO_CONNECTION_STRING } = process.env;

mongoose
  .connect(MONGO_CONNECTION_STRING!)
  .then(() => {
    console.log("mongoose connected");
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  })
  .catch(console.error);
