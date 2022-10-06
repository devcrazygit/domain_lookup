import http from "http";
import app from "./app";

const port = process.env.PORT || 3080;

app.set("port", port);
const server = http.createServer(app);
server.listen(port);

server.on("listening", function (): void {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
  console.log(`Listening on ${bind}`, null);
});
