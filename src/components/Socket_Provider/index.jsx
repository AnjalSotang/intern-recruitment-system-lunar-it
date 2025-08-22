
// import { jwtDecode } from 'jwt-decode';
// import React, { useState, useEffect, createContext, useContext } from 'react';
// import { io } from 'socket.io-client';

// const SocketContext = createContext();

// export const useSocket = () => {
//     return useContext(SocketContext);
// };

// export default function SocketProvider({ children }) {
//     const [socket, setSocket] = useState(null);
//     const [adminId,setAdminId]=useState(null);
//     const authStorage = localStorage.getItem('auth_storage');
//     const token = JSON.parse(authStorage)?.state?.token;


//     useEffect(()=>{
//         if (token) {
//     try {
//       const decoded = jwtDecode(token);
//       const id = decoded?.id|| null;
//       if(id){
//         setAdminId(id);
//       } 
//     } catch (error) {
//       console.error("Invalid token", error);
//     }
//      }
//     },[token])
  
//     useEffect(() => {
//         if (adminId && !socket) {
//             console.log("Initializing socket...");
//             const newSocket = io("http://localhost:3000", {
//                 withCredentials: true,
//                 query: { userId: adminId },
//                 autoConnect: true,
//                 reconnection: true,
//                 reconnectionAttempts: 5,
//                 reconnectionDelay: 1000,
//             });
            
//             newSocket.on("connect", () => {
//                 console.log("Socket connected");
//             });

//             newSocket.on("disconnect", () => {
//                 console.log("Socket disconnected");
//             });

//             newSocket.on("error", (err) => {
//                 console.error("Socket error:", err);
//             });

//             setSocket(newSocket);
//         }
//         return () => {
//             if (socket) {
//                 console.log("Disconnecting socket...");
//                 socket.disconnect();
//                 setSocket(null);
//             }
//         };
//     }, [adminId]);

//     return (
//         <SocketContext.Provider value={{ socket }}>
//             {children}
//         </SocketContext.Provider>
//     );
// }
