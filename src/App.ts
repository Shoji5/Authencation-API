import { mongo_url } from "./config/index.config";
import Express, { Application, json, urlencoded } from "express";
import notFound from "./middlewares/notFound.middleware";
import mongose from "mongoose";
import cors from "cors";
import UserRoute from "./routes/user.route";

export default class Server {
  private app: Application;
  constructor(private port: number) {
    this.app = Express();
    this.settings();
    this.middlewaresInput();
    this.routes();
    this.middlewaresOutput();
  }
  private settings() {
    mongose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () =>
      console.log("✅ connected to mongoDB")
    );
  }
  private middlewaresInput() {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }
  private routes() {
    this.app.use("/api/user", UserRoute);
  }
  private middlewaresOutput() {
    this.app.use(notFound);
  }
  public start() {
    this.app.listen(this.port, () => console.log(`✅ server is running on http://localhost:${this.port}/`));
  }
}
