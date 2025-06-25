import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import path from "path";
import fs from "fs"; // for checking/creating local folders
import { fetchDir, fetchFileContent, saveFile } from "./fs";
import { TerminalManager } from "./pty";

const terminalManager = new TerminalManager();

export function initWs(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", async (socket: Socket) => {
    const replId = socket.handshake.query.roomId as string;

    if (!replId) {
      socket.disconnect();
      terminalManager.clear(socket.id);
      return;
    }

    // ✅ Create local repl directory if not exists
    const replPath = path.join(__dirname, `../tmp/${replId}`);
    if (!fs.existsSync(replPath)) {
      fs.mkdirSync(replPath, { recursive: true });
    }

    // ❌ REMOVED: AWS S3 call
    // await fetchS3Folder(`code/${replId}`, replPath);

    socket.emit("loaded", {
      rootContent: await fetchDir(replPath, ""),
    });

    initHandlers(socket, replId);
  });
}

function initHandlers(socket: Socket, replId: string) {
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("fetchDir", async (dir: string, callback: (data: any) => void) => {
    const dirPath = path.join(__dirname, `../tmp/${replId}/${dir}`);
    const contents = await fetchDir(dirPath, dir);
    callback(contents);
  });

  socket.on(
    "fetchContent",
    async (
      { path: filePath }: { path: string },
      callback: (data: any) => void
    ) => {
      const fullPath = path.join(__dirname, `../tmp/${replId}/${filePath}`);
      const data = await fetchFileContent(fullPath);
      callback(data);
    }
  );

  socket.on(
    "updateContent",
    async ({ path: filePath, content }: { path: string; content: string }) => {
      const fullPath = path.join(__dirname, `../tmp/${replId}/${filePath}`);
      await saveFile(fullPath, content);

      // ❌ REMOVED: save to AWS
      // await saveToS3(`code/${replId}`, filePath, content);
    }
  );

  socket.on("requestTerminal", async () => {
    terminalManager.createPty(socket.id, replId, (data: string) => {
      socket.emit("terminal", {
        data: Buffer.from(data, "utf-8"),
      });
    });
  });

  socket.on(
    "terminalData",
    async ({
      data,
    }: {
      data: string;
      terminalId: number;
    }) => {
      terminalManager.write(socket.id, data);
    }
  );
}
