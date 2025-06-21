// "use client";

// import SocketIoClient from "@/lib/socket-client";
// import React, { createContext, useRef, useState, useEffect } from "react";

// interface SocketIoContextValue {
//   socketIoClient: SocketIoClient | null;
//   connected: boolean;
//   isLoading: boolean;
// }

// interface Props {
//   children: React.ReactNode;
// }

// export const socketIoContext = createContext<SocketIoContextValue>({
//   socketIoClient: null,
//   connected: false,
//   isLoading: true,
// });

// export function ProvideSocketIoClient({ children }: Props) {
//   const socketIo = useProvideSocketIoClient();
//   useEffect(() => {
//     return () => {
//       if (socketIo?.client) {
//         socketIo.client.disconnect();
//       }
//     };
//   }, [socketIo]);
//   return (
//     <socketIoContext.Provider
//       value={{
//         socketIoClient: socketIo?.client || null,
//         connected: socketIo?.connected || false,
//         isLoading: socketIo?.isLoading || false,
//       }}
//     >
//       {children}
//     </socketIoContext.Provider>
//   );
// }

// function useProvideSocketIoClient() {
//   const clientRef = useRef<SocketIoClient | null>(null);
//   const [connected, setConnected] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState(true);

//   if (typeof window === "undefined") return;

//   const url = process.env.NEXT_PUBLIC_SOCKET_URL || "";
//   const config = {
//     url: url,
//     token: "",
//   };

//   if (!clientRef.current) {
//     clientRef.current = new SocketIoClient(config);
//     clientRef.current.on("connect", () => {
//       setConnected(true);
//       setIsLoading(false);
//       console.log("Socket.io client connected");
//     });
//     clientRef.current.on("disconnect", () => {
//       setConnected(false);
//       console.log("Socket.io client disconnected");
//     });
//   }
//   return { client: clientRef.current, connected, isLoading };
// }
