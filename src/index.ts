import http from "http";
import app from "./app";
import { prisma } from "./models";

const port = process.env.PORT || 3000;

app.set("port", port);
const server = http.createServer(app);
server.listen(port);

server.on("listening", function (): void {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
  console.log(`Listening on ${bind}`);
});

process.on("SIGTERM", () => {
  console.log("Closing api server");
  prisma.$disconnect();
  server.close();
});
