/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { SIPContext } from "../../context/JsSIP/JsSIPContext";
import PanelContext from "../../context/Panel/PanelContext";
import { LocalStorageService } from "../LocalStorageService";
import { connectSocket, disconnectSocket, offForceLogout, onForceLogout } from "../../Socket/Socket";
import { useIdleTimer } from "../../Hooks/useIdleTimer";
import moment from "moment";

export default function ProtectedSessionGuard({ children }) {
    const { closeSession } = useContext(SIPContext) || {};
    const panelContext = useContext(PanelContext);
    const history = useHistory();

    // useEffect(() => {
    //     const ls = new LocalStorageService();
    //     const token = ls.getAccessToken?.();
    //     if (!token) return;

    //     connectSocket(token);

    //     const handleForced = ({ reason }) => {
    //         try {
    //             closeSession?.();
    //         } catch {}
    //         sessionStorage.removeItem("usrm");
    //         ls.clearToken();
    //         panelContext.setUserLogin(null);
    //         panelContext.setSelectedEntityId?.(null);
    //         disconnectSocket();

    //         sessionStorage.setItem("forcedLogoutMsg", reason || "Se inició sesión en otro dispositivo.");

    //         history.replace("/");
    //     };

    //     onForceLogout(handleForced);
    //     return () => offForceLogout(handleForced);
    // }, []);

    // useEffect(() => {
    //     const ls = new LocalStorageService();
    //     const token = ls.getAccessToken?.();
    //     if (!token) return;

    //     const decode = (t) => {
    //         try {
    //             const base64 = t.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    //             const json = decodeURIComponent(
    //                 atob(base64)
    //                     .split("")
    //                     .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
    //                     .join(""),
    //             );
    //             return JSON.parse(json);
    //         } catch {
    //             return null;
    //         }
    //     };

    //     const payload = decode(token);
    //     const expMs = payload?.exp ? payload.exp * 1000 : null;
    //     if (!expMs) return;

    //     const now = Date.now();
    //     const msLeft = expMs - now;
    //     const WARN_MS = 60_000;

    //     if (msLeft <= 0) {
    //         sessionStorage.setItem("forcedLogoutMsg", "Tu sesión expiró por inactividad (token vencido).");

    //         // Cerrar sesion TELEFONITO
    //         try {
    //             closeSession?.();
    //         } catch {}

    //         // Cerrar sesion LOCAL
    //         ls.clearToken();
    //         panelContext.setUserLogin(null);
    //         panelContext.setSelectedEntityId?.(null);

    //         // Desconectamos socket y redirigimos
    //         disconnectSocket();
    //         history.replace("/");
    //         return;
    //     }

    //     let warnTimer, expireTimer;

    //     const showWarn = () => {
    //         console.warn("Sesión por expirar en ~1 minuto");
    //     };

    //     const doExpire = () => {
    //         sessionStorage.setItem("forcedLogoutMsg", "Tu sesión expiró por inactividad (token vencido).");
    //         try {
    //             closeSession?.();
    //         } catch {}
    //         ls.clearToken();
    //         panelContext.setUserLogin(null);
    //         panelContext.setSelectedEntityId?.(null);
    //         disconnectSocket();
    //         history.replace("/");
    //     };

    //     if (msLeft > WARN_MS) {
    //         warnTimer = setTimeout(showWarn, msLeft - WARN_MS);
    //     } else {
    //         showWarn();
    //     }

    //     expireTimer = setTimeout(doExpire, msLeft + 500);

    //     return () => {
    //         clearTimeout(warnTimer);
    //         clearTimeout(expireTimer);
    //     };
    // }, []);

    // const handleIdleLogout = async () => {
    //     const ls = new LocalStorageService();
    //     const token = ls.getAccessToken?.();

    //     try {
    //         const dateSolicitud = moment().format("YYYY-MM-DD");
    //         const timeSolicitud = moment().format("HH:mm:ss");

    //         await fetch(`${process.env.REACT_APP_ROUTE_API}logout-inactividad`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 ...(token ? { Authorization: `Bearer ${token}` } : {}),
    //             },
    //             body: JSON.stringify({
    //                 dateSolicitud,
    //                 timeSolicitud,
    //                 user: panelContext.userLogin?.USUARIO,
    //                 password: panelContext.userLogin?.PASSWORD,
    //             }),
    //         }).catch(() => {});
    //     } catch (e) {}

    //     sessionStorage.setItem("forcedLogoutMsg", "Tu sesión expiró por inactividad (token vencido).");

    //     try {
    //         closeSession?.();
    //     } catch {}

    //     sessionStorage.removeItem("usrm");
    //     ls.clearToken();
    //     panelContext.setUserLogin(null);
    //     panelContext.setSelectedEntityId?.(null);

    //     disconnectSocket();
    //     history.replace("/");
    // };

    // useIdleTimer({
    //     timeoutMs: 30 * 60 * 1000,
    //     onIdle: handleIdleLogout,
    // });

    return <>{children}</>;
}
