//@ts-ignore
import { fork, IPty } from 'node-pty';
import path from "path";

const SHELL = "cmd.exe"; // ✅ use cmd for Windows

export class TerminalManager {
    private sessions: { [id: string]: { terminal: IPty, replId: string } } = {};

    constructor() {
        this.sessions = {};
    }

    createPty(id: string, replId: string, onData: (data: string, id: number) => void) {
        const term = fork(SHELL, [], {
            cols: 100,
            name: 'xterm',
            cwd: path.join(__dirname, `../tmp/${replId}`),
            env: process.env,
        });

        term.on('data', (data: string) => onData(data, term.pid));
        this.sessions[id] = { terminal: term, replId };

        term.on('exit', () => {
            delete this.sessions[id];
        });

        return term;
    }

    write(terminalId: string, data: string) {
        this.sessions[terminalId]?.terminal.write(data);
    }

    clear(terminalId: string) {
        this.sessions[terminalId]?.terminal.kill();
        delete this.sessions[terminalId];
    }
}
