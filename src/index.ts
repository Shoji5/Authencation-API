import Server from "./App";
import { port } from "./config/index.config";

const server = new Server(port);

server.start();
