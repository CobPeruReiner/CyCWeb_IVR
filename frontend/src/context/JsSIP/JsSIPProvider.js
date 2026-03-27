/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import JsSIP from "jssip";
import { SIPContext } from "./JsSIPContext";
import PanelContext from "../Panel/PanelContext";

const isChrome = () => {
    const ua = navigator.userAgent || "";
    return /Chrome\//.test(ua) && !/OPR\//.test(ua) && !/Edg\//.test(ua);
};

const isCellular = () => {
    try {
        const nc = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const type = ((nc && (nc.type || nc.effectiveType)) || "").toString().toLowerCase();
        const ua = navigator.userAgent || "";
        return /cellular|2g|3g|4g|5g|slow-2g/.test(type) || /Android|iPhone|Mobile/i.test(ua);
    } catch (_) {
        return false;
    }
};

const getIceServers = () => {
    const stun = { urls: "stun:stun.l.google.com:19302" };
    const turnU = { urls: "turn:cycwebcobperu.net:3478", username: "webrtc", credential: "webrtc123" };
    const turnT = { urls: "turn:cycwebcobperu.net:3478?transport=tcp", username: "webrtc", credential: "webrtc123" };
    const turnTS = { urls: "turns:cycwebcobperu.net:5349", username: "webrtc", credential: "webrtc123" };
    return isChrome() || isCellular() ? [turnTS, turnT, turnU, stun] : [turnU, turnT, turnTS, stun];
};

const FORCE_RELAY = localStorage.getItem("force_relay") === "1";

const sanitize = (s) => (s || "").replace(/[^0-9*#]/g, "");

const preferOpus = (sdp) => {
    try {
        const lines = sdp.split("\n");
        const mIdx = lines.findIndex((l) => l.startsWith("m=audio"));
        if (mIdx < 0) return sdp;
        const mapLine = lines.find((l) => /a=rtpmap:(\d+)\s+opus\/48000/i.test(l));
        const pt = mapLine ? mapLine.match(/a=rtpmap:(\d+)/i)[1] : null;
        if (!pt) return sdp;
        lines[mIdx] = lines[mIdx].replace(/^m=audio\s+\d+\s+([A-Z\/-]+)\s+(.+)$/i, (all, transport, payloads) => {
            const arr = payloads.trim().split(/\s+/);
            const uniq = [pt, ...arr.filter((p) => p !== pt)];
            return `m=audio 9 ${transport} ${uniq.join(" ")}`;
        });
        const hasPtime = lines.some((l) => /^a=ptime:/.test(l));
        if (!hasPtime) lines.splice(mIdx + 1, 0, "a=ptime:20");
        return lines.join("\n");
    } catch (e) {
        console.warn("SDP modification failed:", e);
        return sdp;
    }
};

export const SIPProvider = ({ children }) => {
    // const panelContext = useContext(PanelContext);

    const { userLogin, setSelectedPhone: setPanelSelectedPhone } = useContext(PanelContext);

    // Toast (expuesto para que montes <Toast ref={toastJsIP} /> donde prefieras)
    const toast = useRef(null);
    const toastJsIP = useRef(null);
    const notify = useCallback((opts) => toastJsIP.current?.show({ life: 3000, ...opts }), []);

    // Credenciales: anexo como user/pass
    // const anexo = panelContext?.userLogin?.ANEXO_BACKUP ?? "";
    // const SIP_EXT = anexo;
    // const SIP_PASS = anexo;

    const SIP_EXT = useMemo(() => userLogin?.ANEXO_BACKUP ?? "", [userLogin?.ANEXO_BACKUP]);

    const SIP_PASS = SIP_EXT;

    // Host/WS (tal como lo tenías)
    const SIP_HOST = "cycwebcobperu.net:8443";
    const WS_URL = `wss://${SIP_HOST}/ws`;

    // Refs
    const uaRef = useRef(null);
    const sessionRef = useRef(null);
    const micStreamRef = useRef(null);
    const iceFallbackTimerRef = useRef(null);
    const latencyIntervalRef = useRef(null);
    const latencyAbortRef = useRef(null);
    const callStartRef = useRef(null); // inicio de marcado (ms)
    const talkStartRef = useRef(null); // inicio de conversación (ms)
    const audioRef = useRef(null);
    const talkingTimerRef = useRef(null);
    const establishedRef = useRef(false); // evita doble “establecida”

    // Estado UI
    const [estado, setEstado] = useState({ text: "Desconectado", color: "#9e9e9e" });
    const [who, setWho] = useState("");
    const [ann, setAnn] = useState("");
    const [latency, setLatency] = useState({ text: "Latencia: -- ms", cls: "text-info", show: false });
    const [iceState, setIceState] = useState("");

    const [dialNumber, setDialNumber] = useState("");

    const [selectedPhone, setSelectedPhone] = useState(null);
    const [showInfoCampo, setShowInfoCampo] = useState(true);
    const [formGestionType, setFormGestionType] = useState(0);
    const [dialogGestion, setDialogGestion] = useState(false);
    const [formNewGestionRTC, setFormNewGestionRTC] = useState(false);

    const [dialing, setDialing] = useState(false);
    const [inCall, setInCall] = useState(false);
    const [isMute, setIsMute] = useState(false);
    const [isHold, setIsHold] = useState(false);

    const [callBarPct, setCallBarPct] = useState(0);
    const [callStatusText, setCallStatusText] = useState("");
    const [setupMs, setSetupMs] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);
    const showPhone = () => setModalVisible(true);

    const [callMode, setCallMode] = useState("idle");
    const [duracionHablando, setDuracionHablando] = useState(0); // ms
    const [duracionFinal, setDuracionFinal] = useState(null); // ms

    const [session, setSession] = useState(null);

    const ICE = useMemo(() => getIceServers(), []);
    const numeroBloqueado = useMemo(() => dialing || inCall, [dialing, inCall]);

    // Guardar último badge de red para restaurarlo al cerrar modal
    const netBadgeRef = useRef({ text: "Desconectado", color: "#9e9e9e" });
    const NET_BADGES = useMemo(() => new Set(["WS conectado", "Registrado", "No registrado", "Registro fallido", "Desconectado"]), []);

    /* ===== Helpers ===== */
    const setBadge = useCallback(
        (ev) => {
            const map = {
                "WS conectado": "#1976d2",
                Registrado: "#2e7d32",
                "No registrado": "#f57c00",
                "Registro fallido": "#d32f2f",
                Desconectado: "#9e9e9e",
                Marcando: "#1976d2",
                Hablando: "#2e7d32",
                Finalizada: "#9e9e9e",
            };
            const next = { text: ev, color: map[ev] || "#9e9e9e" };
            setEstado(next);
            if (NET_BADGES.has(ev)) netBadgeRef.current = next; // recuerda último estado de red
        },
        [NET_BADGES]
    );

    const msFmt = (ms) => (ms == null ? "—" : ms < 1000 ? `${ms} ms` : `${(ms / 1000).toFixed(2)} s`);

    const stopLiveTimer = useCallback(() => {
        if (talkingTimerRef.current) {
            clearInterval(talkingTimerRef.current);
            talkingTimerRef.current = null;
        }
    }, []);

    const setCallUI = useCallback(
        (mode) => {
            setCallMode(mode);
            if (mode === "dialing") {
                setBadge("Marcando");
                setCallBarPct(30);
                setCallStatusText("Iniciando llamada…");
                setInCall(false);
                setDuracionHablando(0);
                setDuracionFinal(null);
                setSetupMs(null);
                establishedRef.current = false;
                talkStartRef.current = null;
                stopLiveTimer();
            } else if (mode === "inCall") {
                setBadge("Hablando");
                setCallBarPct(100);
                setCallStatusText("Llamada establecida");
                setInCall(true);
                if (!talkStartRef.current) talkStartRef.current = Date.now();
                if (!talkingTimerRef.current) {
                    talkingTimerRef.current = setInterval(() => {
                        setDuracionHablando(Date.now() - (talkStartRef.current || Date.now()));
                    }, 1000);
                }
            } else if (mode === "idle") {
                setCallBarPct(0);
                setCallStatusText("");
                setInCall(false);
                stopLiveTimer();
            }
        },
        [setBadge, stopLiveTimer]
    );

    const formatTiempo = (ms) => {
        if (ms == null) return "—";
        const totalSec = Math.max(0, Math.floor(ms / 1000));
        const mm = Math.floor(totalSec / 60);
        const ss = String(totalSec % 60).padStart(2, "0");
        return `${mm}:${ss}`;
    };

    // 👉 NUEVO: limpia UI y restaura badge de red
    const resetPhoneUI = useCallback(() => {
        setCallMode("idle");
        setCallBarPct(0);
        setCallStatusText("");
        setInCall(false);
        stopLiveTimer();

        setDialNumber("");
        setDuracionHablando(0);
        setDuracionFinal(null);
        establishedRef.current = false;
        talkStartRef.current = null;

        // restaurar último estado de red
        setEstado(netBadgeRef.current);

        // liberar audio (el <audio> suele vivir en el modal)
        try {
            if (audioRef.current) audioRef.current.srcObject = null;
        } catch {}
    }, [stopLiveTimer]);

    const hidePhone = useCallback(() => {
        if (sessionRef.current) {
            try {
                sessionRef.current.terminate();
            } catch {}
            sessionRef.current = null;

            if (iceFallbackTimerRef.current) {
                clearTimeout(iceFallbackTimerRef.current);
                iceFallbackTimerRef.current = null;
            }

            if (talkStartRef.current) {
                setDuracionFinal(Date.now() - talkStartRef.current);
            }
        }

        try {
            if (audioRef.current) audioRef.current.srcObject = null;
        } catch {}

        setDialing(false);
        setInCall(false);
        setCallMode("idle");
        setIceState("");

        resetPhoneUI();

        setModalVisible(false);

        // notify?.({ severity: "warn", summary: "Llamada", detail: "Finalizada al cerrar el panel" });
    }, [resetPhoneUI, notify]);

    // const startLatencyTest = useCallback(() => {
    //     if (latencyIntervalRef.current) return;
    //     latencyIntervalRef.current = setInterval(async () => {
    //         try {
    //             latencyAbortRef.current?.abort();
    //             const ctrl = new AbortController();
    //             latencyAbortRef.current = ctrl;
    //             const t0 = Date.now();
    //             await fetch(`/api/history?ext=${encodeURIComponent(SIP_EXT)}&limit=1&today=1`, { cache: "no-store", signal: ctrl.signal });
    //             const ms = Date.now() - t0;
    //             setLatency({ text: `Latencia: ${ms}ms`, cls: ms > 150 ? "text-danger" : ms > 100 ? "text-warning" : "text-success", show: true });
    //         } catch (e) {
    //             if (e?.name !== "AbortError") setLatency({ text: "Latencia: Error", cls: "text-danger", show: true });
    //         }
    //     }, 10000);
    // }, [SIP_EXT]);

    const stopLatencyTest = useCallback(() => {
        latencyAbortRef.current?.abort();
        latencyAbortRef.current = null;
        if (latencyIntervalRef.current) {
            clearInterval(latencyIntervalRef.current);
            latencyIntervalRef.current = null;
        }
    }, []);

    const callOptions = useCallback(
        (forceRelay = false) => {
            const policy = forceRelay || FORCE_RELAY ? "relay" : "all";
            return {
                mediaStream: micStreamRef.current || undefined,
                mediaConstraints: micStreamRef.current
                    ? undefined
                    : {
                          audio: { echoCancellation: true, noiseSuppression: true },
                          video: false,
                      },
                rtcOfferConstraints: { offerToReceiveAudio: true },
                pcConfig: {
                    iceServers: ICE,
                    iceTransportPolicy: policy,
                    bundlePolicy: "max-bundle",
                    rtcpMuxPolicy: "require",
                    iceCandidatePoolSize: 0,
                },
            };
        },
        [ICE]
    );

    const isCurrentSession = useCallback((s) => sessionRef.current && s === sessionRef.current, []);

    /* ===== Attach de sesión ===== */
    const attach = useCallback(
        (s, isOutbound = false, attempt = 1) => {
            setDialing(true);
            setSession(s);

            s.on("sdp", (e) => {
                if (!isCurrentSession(s)) return;
                if (e.originator === "local" && e.sdp) e.sdp = preferOpus(e.sdp);
            });

            // Mantener “Marcando” con 180/183
            s.on("progress", () => {
                if (isCurrentSession(s)) setBadge("Marcando");
            });

            const pc = s.connection;
            const remoteEl = audioRef.current;

            // Autoplay en primer gesto
            let playedOnce = false;
            async function resumeAudioOnce() {
                if (playedOnce) return;
                playedOnce = true;
                try {
                    if (remoteEl && remoteEl.srcObject) await remoteEl.play();
                } catch (e) {
                    console.warn("Audio play failed:", e);
                }
            }
            window.addEventListener("touchstart", resumeAudioOnce, { once: true });
            window.addEventListener("click", resumeAudioOnce, { once: true });

            if (pc) {
                pc.addEventListener("iceconnectionstatechange", () => {
                    if (!isCurrentSession(s)) return;
                    const state = pc.iceConnectionState;
                    setIceState(state + (attempt > 1 ? ` (retry#${attempt})` : ``));
                    if (state === "connected" || state === "completed") {
                        if (iceFallbackTimerRef.current) clearTimeout(iceFallbackTimerRef.current);
                        const t = Date.now() - (callStartRef.current || Date.now());
                        setCallStatusText(`Conectado en ${t}ms`);
                    }
                });

                pc.addEventListener("track", (e) => {
                    if (!isCurrentSession(s)) return;
                    // Puede ser early media; NO cambiar a “inCall” aquí
                    const el = audioRef.current;
                    if (!el) return;
                    let stream = e.streams?.[0];
                    if (!stream) {
                        stream = new MediaStream();
                        stream.addTrack(e.track);
                    }
                    el.srcObject = stream;
                    el.muted = false;
                    el.play().catch((err) => console.warn("Audio play error:", err));
                });
            }

            // Solo accepted/confirmed ⇒ “Hablando”
            const onEstablished = () => {
                if (!isCurrentSession(s) || establishedRef.current) return;
                establishedRef.current = true;
                const ms = Date.now() - (callStartRef.current || Date.now());
                setSetupMs(ms);
                talkStartRef.current = Date.now();
                setCallUI("inCall");
                notify({ severity: "success", summary: "Llamada", detail: `Establecida en ${msFmt(ms)}` });
            };
            s.on("accepted", onEstablished);
            s.on("confirmed", onEstablished);

            const finalize = (label = "Finalizada") => {
                setDialing(false);
                setCallUI("idle");
                setBadge(label);
                setIceState("");
                setIsMute(false);
                setIsHold(false);
                try {
                    if (audioRef.current) audioRef.current.srcObject = null;
                } catch {}
                if (talkStartRef.current) setDuracionFinal(Date.now() - talkStartRef.current);
                setSession(null);
                establishedRef.current = false;
                talkStartRef.current = null;
            };

            s.on("ended", () => {
                if (isCurrentSession(s)) finalize("Finalizada");
            });
            s.on("failed", () => {
                if (isCurrentSession(s)) finalize("Finalizada");
            });
        },
        [isCurrentSession, notify, setCallUI, setBadge]
    );

    /* ===== Acciones ===== */
    const call = useCallback(
        (numeroParam) => {
            const numeroLimpio = sanitize((numeroParam ?? dialNumber).trim());
            if (!numeroLimpio) return alert("Ingresa un número válido (0-9, *, #)");
            if (dialing) return alert("Ya hay una llamada en curso.");
            const ua = uaRef.current;
            if (!ua) return;

            if (!numeroParam) setDialNumber(numeroLimpio);
            callStartRef.current = Date.now();
            setCallUI("dialing");
            notify({ severity: "info", summary: "Llamando", detail: `Marcando al número: ${numeroLimpio}` });

            if (iceFallbackTimerRef.current) clearTimeout(iceFallbackTimerRef.current);

            // intento normal
            const s1 = ua.call(`sip:${numeroLimpio}@${SIP_HOST}`, callOptions(false));
            sessionRef.current = s1;
            attach(s1, true, 1);

            // fallback TURN-only
            const RETRY_MS = isCellular() || isChrome() ? 2500 : 4000;
            iceFallbackTimerRef.current = setTimeout(() => {
                try {
                    const ses = sessionRef.current;
                    if (!ses) return;
                    const st = ses.connection?.iceConnectionState || "";
                    if (st && st !== "connected" && st !== "completed" && st !== "checking") {
                        console.warn("ICE no conectado (" + st + "), reintentando con TURN-only…");
                        ses.terminate();
                        setTimeout(() => {
                            if (!dialing) return;
                            setCallUI("dialing");
                            if (iceFallbackTimerRef.current) {
                                clearTimeout(iceFallbackTimerRef.current);
                                iceFallbackTimerRef.current = null;
                            }
                            const s2 = ua.call(`sip:${numeroLimpio}@${SIP_HOST}`, callOptions(true));
                            sessionRef.current = s2;
                            attach(s2, true, 2);
                            iceFallbackTimerRef.current = setTimeout(() => {
                                const st2 = s2?.connection?.iceConnectionState;
                                if (st2 && st2 !== "connected" && st2 !== "completed" && st2 !== "checking") {
                                    console.warn("TURN-only tampoco conectó, colgando…");
                                    s2?.terminate();
                                }
                            }, 6000);
                        }, 500);
                    }
                } catch (e) {
                    console.error("Error en fallback:", e);
                }
            }, RETRY_MS);
        },
        [dialNumber, dialing, callOptions, attach, setCallUI, notify]
    );

    const hangup = useCallback(() => {
        try {
            sessionRef.current?.terminate();
        } catch {}
        sessionRef.current = null;
        setDialing(false);
        setCallUI("idle");
        setBadge("Finalizada");
        setIceState("");
        if (iceFallbackTimerRef.current) clearTimeout(iceFallbackTimerRef.current);
        notify({ severity: "warn", summary: "Colgado", detail: "La llamada fue terminada" });

        hidePhone();
    }, [setCallUI, setBadge, notify]);

    const appendNumero = useCallback(
        (label) => {
            if (numeroBloqueado) return;
            setDialNumber((prev) => sanitize(prev + String(label)));
        },
        [numeroBloqueado]
    );

    const deleteLastDigit = useCallback(() => {
        if (numeroBloqueado) return;
        setDialNumber((prev) => prev.slice(0, -1));
    }, [numeroBloqueado]);

    const showPhoneAndFocus = useCallback(() => {
        showPhone();
    }, []);

    const closeSession = useCallback(() => {
        try {
            sessionRef.current?.terminate();
        } catch {}
        sessionRef.current = null;

        try {
            uaRef.current?.stop();
        } catch {}
        uaRef.current = null;

        if (iceFallbackTimerRef.current) {
            clearTimeout(iceFallbackTimerRef.current);
            iceFallbackTimerRef.current = null;
        }
        if (latencyIntervalRef.current) {
            clearInterval(latencyIntervalRef.current);
            latencyIntervalRef.current = null;
        }
        latencyAbortRef.current?.abort();
        latencyAbortRef.current = null;

        try {
            micStreamRef.current?.getTracks()?.forEach((t) => t.stop());
        } catch {}
        micStreamRef.current = null;

        stopLiveTimer();
        try {
            if (audioRef.current) audioRef.current.srcObject = null;
        } catch {}

        setDialing(false);
        setInCall(false);
        setCallMode("idle");
        setIceState("");
        setBadge("Desconectado");
        setDuracionHablando(0);
        setDuracionFinal(null);
        setDialNumber("");
        notify({ severity: "info", summary: "Sesión", detail: "Cerrada" });

        setModalVisible(false);
        setDialogGestion(false);
    }, [stopLiveTimer, setBadge, notify]);

    const showFormNewGestionRTC = useCallback(
        (rawNumero) => {
            const num = sanitize(String(rawNumero || "").trim());
            if (!num) {
                notify?.({ severity: "warn", summary: "Número inválido", detail: "Ingresa un número válido" });
                return;
            }
            setDialNumber(num);
            setSelectedPhone(num);
            // panelContext.setSelectedPhone(num);
            setPanelSelectedPhone?.(num);

            setFormNewGestionRTC(true);
            setFormGestionType(1);
            setShowInfoCampo(false);
            setDialogGestion(true);

            showPhone();
            // Si quisieras llamar directo:
            call(num);
        },
        // [notify, panelContext]
        [notify, setPanelSelectedPhone, showPhone]
    );

    /* ===== Init / cleanup ===== */
    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                if (!SIP_EXT || !SIP_PASS) {
                    // console.warn("No hay anexo/cuenta válida.");
                    return;
                }

                try {
                    micStreamRef.current = await navigator.mediaDevices.getUserMedia({
                        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: false },
                        video: false,
                    });
                } catch (e) {
                    console.warn("MIC error:", e);
                }

                const socket = new JsSIP.WebSocketInterface(WS_URL);
                const ua = new JsSIP.UA({
                    sockets: [socket],
                    uri: `sip:${SIP_EXT}@${SIP_HOST}`,
                    password: SIP_PASS,
                    session_timers: false,
                    register_expires: 300,
                    register: true,
                    connection_recovery_min_interval: 2,
                    connection_recovery_max_interval: 30,
                });
                uaRef.current = ua;

                // setWho(String(panelContext?.userLogin?.NOMBRES ? `${panelContext.userLogin.NOMBRES} ${panelContext.userLogin.APELLIDOS ?? ""}`.trim() : `Ext ${SIP_EXT}`));
                setWho(String(userLogin?.NOMBRES ? `${userLogin.NOMBRES} ${userLogin.APELLIDOS ?? ""}`.trim() : `Ext ${SIP_EXT}`));
                // setAnn(`Anexo: ${SIP_EXT} @ ${SIP_HOST}`);
                setAnn(`Anexo: ${SIP_EXT} @ ${SIP_HOST}`);

                ua.start();

                ua.on("connected", () => {
                    if (!mounted) return;
                    setBadge("WS conectado");
                    notify({ severity: "info", summary: "WebSocket", detail: "Conectado" });
                });
                ua.on("disconnected", () => mounted && setBadge("Desconectado"));
                ua.on("registered", () => {
                    if (!mounted) return;
                    setBadge("Registrado");
                    // startLatencyTest();
                });
                ua.on("unregistered", () => {
                    if (!mounted) return;
                    setBadge("No registrado");
                    stopLatencyTest();
                });
                ua.on("registrationFailed", (e) => {
                    if (!mounted) return;
                    setBadge("Registro fallido");
                    console.error(e);
                });

                ua.on("newRTCSession", (data) => {
                    if (!mounted) return;
                    const s = data.session;
                    sessionRef.current = s;
                    if (s.direction === "incoming") {
                        s.answer(callOptions());
                        attach(s, false, 1);
                    }
                });
            } catch (e) {
                console.error("Init error:", e);
            }
        })();

        return () => {
            try {
                uaRef.current?.removeAllListeners?.();
                uaRef.current?.stop();
            } catch {}
            stopLatencyTest();
            try {
                sessionRef.current?.terminate();
            } catch {}
            if (iceFallbackTimerRef.current) clearTimeout(iceFallbackTimerRef.current);
            stopLiveTimer();
            try {
                micStreamRef.current?.getTracks()?.forEach((t) => t.stop());
            } catch {}
            micStreamRef.current = null;
            try {
                if (audioRef.current) audioRef.current.srcObject = null;
            } catch {}
            mounted = false;
        };
        // }, [WS_URL, SIP_EXT, SIP_PASS, SIP_HOST, startLatencyTest, stopLatencyTest, callOptions, attach, notify, setBadge, stopLiveTimer]);
    }, [WS_URL, SIP_EXT, SIP_PASS, SIP_HOST, stopLatencyTest, callOptions, attach, notify, setBadge, stopLiveTimer]);

    /* ===== Value expuesto ===== */
    const value = useMemo(
        () => ({
            // estado
            estado,
            who,
            ann,
            latency,
            iceState,
            callMode,
            dialing,
            inCall,
            isMute,
            isHold,
            callBarPct,
            callStatusText,
            setupMs,
            modalVisible,
            duracionHablando,
            duracionFinal,

            // UI
            numero: dialNumber,
            numeroBloqueado,
            session,

            // refs
            audioRef,

            // acciones
            showPhone,
            hidePhone, // ← ahora limpia UI
            showPhoneAndFocus,
            setDialNumber: (v) => setDialNumber(sanitize(v)),
            appendNumero,
            deleteLastDigit,
            call,
            hangup,
            closeSession,

            // util
            formatTiempo,
            msFmt,
            toast,
            toastJsIP,
            notify,
            showFormNewGestionRTC,
            selectedPhone,
            setSelectedPhone,
            showInfoCampo,
            setShowInfoCampo,
            formGestionType,
            setFormGestionType,
            dialogGestion,
            setDialogGestion,
            formNewGestionRTC,
            setFormNewGestionRTC,
        }),
        [
            estado,
            who,
            ann,
            latency,
            iceState,
            callMode,
            dialing,
            inCall,
            isMute,
            isHold,
            callBarPct,
            callStatusText,
            setupMs,
            modalVisible,
            duracionHablando,
            duracionFinal,
            dialNumber,
            numeroBloqueado,
            session,
            showPhone,
            hidePhone,
            showPhoneAndFocus,
            appendNumero,
            deleteLastDigit,
            call,
            hangup,
            closeSession,
        ]
    );

    return <SIPContext.Provider value={value}>{children}</SIPContext.Provider>;
};
