import { io } from "socket.io-client";

let socket = null;

export function connectSocket(token) {
    if (socket?.connected) {
        if (socket.auth?.token === token) return socket;
        try {
            socket.disconnect();
        } catch (e) {}
    }

    // socket = io("/", {
    //     path: "/api/socket.io",
    //     auth: { token },
    //     transports: ["websocket"],
    //     autoConnect: true,
    // });

    const API_URL = process.env.REACT_APP_ROUTE_API || "http://192.168.1.24:3005";

    socket = io(API_URL, {
        path: "/api/socket.io",
        auth: { token },
        transports: ["websocket"],
        autoConnect: true,
    });

    return socket;
}

export function onForceLogout(handler) {
    if (!socket) return;
    socket.on("force-logout", handler);
}

export function offForceLogout(handler) {
    if (!socket) return;
    socket.off("force-logout", handler);
}

export function disconnectSocket() {
    if (socket) {
        try {
            socket.disconnect();
        } catch (e) {}
        socket = null;
    }
}

export function getSocket() {
    return socket;
}
