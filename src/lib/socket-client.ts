// "use client";

// import io, { Socket } from "socket.io-client";
// import { EventEmitter } from "events";

// interface SocketConfig {
//   url: string;
//   token?: string;
// }

// export default class SocketIoClient extends EventEmitter {
//   private socket: Socket | null;
//   private config: SocketConfig;

//   constructor(config: SocketConfig) {
//     super();
//     this.config = config;
//     this.socket = null;
//     this._connect();
//   }

//   get connected(): boolean {
//     return !!this.socket && this.socket.connected;
//   }
//   get userId(): string | undefined {
//     return this.socket?.id;
//   }

//   private _connect() {

//     const options = {
//       autoConnect: true,
//       forceNew: false,
//       auth: {
//         token: this.config.token,
//       },
//       reconnection: true,
//       reconnectionAttempts: Infinity,
//       reconnectionDelay: 3000,
//       withCredentials: true,
//       transports: ["websocket"],
//     };
//     this.socket = io(this.config.url, options);

//     //this.socket = io(this.config.url);

//     this.socket.on("connect", () => {
//       console.log("Connected to server : ", this.socket?.id);
//     });

//     this.socket.on("disconnect", (reason: string) => {
//       console.log("Disconnected from server : ", reason);
//     });

//     this.socket.on("connect_error", (error: Error) => {
//       console.error("Error connecting to server : ", error.message);
//     });
//   }

//   subscribe(event: string, callback: (arg: any) => void) {
//     this.socket?.on(event, (arg) => callback(arg));
//   }

//   send<T>(event: string, data: T) {
//     this.socket?.emit(event, data);
//   }

//   disconnect() {
//     this.socket?.disconnect();
//     this.socket = null;
//   }
// }