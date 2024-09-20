import "dotenv/config";
import express from "express";
import router from "./routes/root";
import morgan from "morgan";
import { morganFormat, morganOptions } from "./utilities/morganSetting";

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan(morganFormat, morganOptions));
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server Listening On Port ${port}`);
});
