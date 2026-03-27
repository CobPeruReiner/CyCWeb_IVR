import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import JsSIP from "jssip"; // npm i jssip
import { SIPContext } from "../../context/JsSIP/JsSIPContext";

const SIP_EXT = "1000";
const SIP_PASS = "1000";
const SIP_HOST = "cycwebcobperu.net:8443";
const WS_URL = `wss://${SIP_HOST}/ws`;

export const PhoneModal = () => {
    const { modalVisible, hidePhone } = useContext(SIPContext);

    // ===== Refs a objetos JsSIP =====
    const uaRef = useRef(null);
    const sessionRef = useRef(null);

    // ===== Estado UI =====
    const [status, setStatus] = useState({ text: "Desconectado", cls: "bg-secondary" });
    const [numero, setNumero] = useState("");
    const [callMode, setCallMode] = useState("idle"); // "idle" | "dialing" | "inCall"
    const [annex, setAnnex] = useState("");
    const [callStatus, setCallStatus] = useState("");
    const [setupMs, setSetupMs] = useState(null);
    const [liveSeconds, setLiveSeconds] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(null);

    // Timers
    const tDialStart = useRef(null);
    const liveStart = useRef(null);
    const liveTimer = useRef(null);

    // Audio remoto
    const remoteAudioRef = useRef(null);

    // ===== helpers =====
    const sanitize = (s) => (s || "").replace(/[^0-9*#]/g, "");
    const msFmt = (ms) => (ms == null ? "—" : ms < 1000 ? `${ms} ms` : `${(ms / 1000).toFixed(2)} s`);
    const secFmt = (s) => {
        if (s == null) return "—";
        const n = Math.max(0, Math.trunc(s));
        const m = Math.floor(n / 60);
        const ss = String(n % 60).padStart(2, "0");
        return `${m}:${ss}`;
    };
    const setBadge = (text, cls) => setStatus({ text, cls });

    const setCallUI = (mode) => {
        setCallMode(mode);
        if (mode === "dialing") {
            setCallStatus("Iniciando llamada…");
            setSetupMs(null);
            setLiveSeconds(0);
            setTotalSeconds(null);
        } else if (mode === "idle") {
            setCallStatus("");
            stopLiveTimer();
        }
    };

    const startLiveTimer = () => {
        liveStart.current = Date.now();
        stopLiveTimer();
        liveTimer.current = window.setInterval(() => {
            if (liveStart.current) {
                setLiveSeconds((Date.now() - liveStart.current) / 1000);
            }
        }, 500);
    };
    const stopLiveTimer = () => {
        if (liveTimer.current) {
            window.clearInterval(liveTimer.current);
            liveTimer.current = null;
        }
    };

    // ===== Teclado =====
    const digits = useMemo(() => ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"], []);
    const onDigit = (d) => setNumero((v) => sanitize(v + d));
    const onClear = () => setNumero("");

    // ===== Inicializa UA cuando el modal se abre =====
    useEffect(() => {
        setAnnex(`Anexo: ${SIP_EXT} @ ${SIP_HOST}`);

        if (!modalVisible) return;

        const socket = new JsSIP.WebSocketInterface(WS_URL);
        const ua = new JsSIP.UA({
            sockets: [socket],
            uri: `sip:${SIP_EXT}@${SIP_HOST}`,
            password: SIP_PASS,
            register: true,
            session_timers: false,
        });

        uaRef.current = ua;

        // Eventos de registro/conexión
        ua.on("connected", () => setBadge("WS conectado", "bg-primary"));
        ua.on("disconnected", () => setBadge("Desconectado", "bg-secondary"));
        ua.on("registered", () => setBadge("Registrado", "bg-success"));
        ua.on("unregistered", () => setBadge("No registrado", "bg-warning"));
        ua.on("registrationFailed", () => setBadge("Registro fallido", "bg-danger"));

        ua.start();

        return () => {
            try {
                if (sessionRef.current) sessionRef.current.terminate();
            } catch {}
            try {
                ua.stop();
            } catch {}
            stopLiveTimer();
            setCallUI("idle");
            setBadge("Desconectado", "bg-secondary");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalVisible]);

    // ===== Acciones =====
    const llamar = () => {
        const num = sanitize(numero.trim());
        if (!num) {
            alert("Ingresa un número válido");
            return;
        }
        const ua = uaRef.current;
        if (!ua) return;

        setCallUI("dialing");
        tDialStart.current = Date.now();

        const session = ua.call(`sip:${num}@${SIP_HOST}`, {
            mediaConstraints: { audio: true, video: false },
        });
        sessionRef.current = session;

        // Flujo de medios
        session.on("peerconnection", (e) => {
            const pc = e.peerconnection;
            pc.ontrack = (ev) => {
                const stream = ev.streams[0];
                if (remoteAudioRef.current) {
                    remoteAudioRef.current.srcObject = stream;
                    remoteAudioRef.current.play().catch(() => {});
                }
            };
        });

        session.on("confirmed", () => {
            setCallUI("inCall");
            if (tDialStart.current) {
                const setup = Date.now() - tDialStart.current;
                setSetupMs(setup);
                setCallStatus(`Conectado en ${msFmt(setup)}`);
            }
            startLiveTimer();
        });

        session.on("ended", () => {
            setCallUI("idle");
            if (liveStart.current) {
                const total = Math.round((Date.now() - liveStart.current) / 1000);
                setTotalSeconds(total);
            }
        });

        session.on("failed", () => {
            setCallUI("idle");
            setCallStatus("Llamada fallida");
        });
    };

    const colgar = () => {
        if (sessionRef.current) {
            try {
                sessionRef.current.terminate();
            } catch {}
            sessionRef.current = null;
        }
        setCallUI("idle");
    };

    const alternarMute = () => {
        const s = sessionRef.current;
        if (!s) return;
        const muted = s.isMuted(); // { audio: boolean, video: boolean }
        if (muted && muted.audio) s.unmute({ audio: true });
        else s.mute({ audio: true });
    };

    const alternarHold = () => {
        const s = sessionRef.current;
        if (!s) return;
        if (s.isOnHold().local) s.unhold();
        else s.hold();
    };

    // Cerrar sesión (unregister + stop)
    const cerrarSesion = async () => {
        const ua = uaRef.current;
        setBadge("Desconectando…", "bg-warning");

        if (sessionRef.current) {
            try {
                sessionRef.current.terminate();
            } catch {}
            sessionRef.current = null;
        }

        if (ua && ua.isRegistered()) {
            await new Promise((resolve) => {
                const onUnreg = () => {
                    ua.removeListener("unregistered", onUnreg);
                    resolve();
                };
                ua.on("unregistered", onUnreg);
                try {
                    ua.unregister({ all: true });
                } catch {
                    resolve();
                }
                setTimeout(resolve, 3000);
            });
        }
        if (ua) {
            try {
                ua.stop();
            } catch {}
        }
        setBadge("No registrado", "bg-secondary");
        setCallStatus("Sesión cerrada correctamente");
    };

    // ===== Render =====
    const footer = (
        <div className="d-flex gap-2">
            <span className={`badge rounded-pill ${status.cls}`}>{status.text}</span>
            <button className="p-button p-button-danger p-button-sm p-button-outlined p-button-rounded" onClick={cerrarSesion}>
                Cerrar sesión
            </button>
        </div>
    );

    return (
        <Dialog visible={modalVisible} modal={false} draggable resizable={false} header="Llamada WebRTC" closable={false} style={{ width: "min(960px, 95vw)" }} position="top-right" footer={footer} onHide={hidePhone}>
            <style>{`
        :root{ --card-w: 960px; }
        .app-card{border-radius:1.2rem; max-width:var(--card-w); margin:auto}
        .btn-pill{border-radius:999px}
        .dial-display{font-size: clamp(20px, 4vw, 32px); letter-spacing:.04em; font-weight:600;}
        .dial-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:.6rem}
        .dial-btn{padding:1.1rem 0; font-size:1.35rem; border-radius:1rem}
        .ice-state{font-size:.8em;margin-top:2px}
      `}</style>

            <div className="card shadow app-card p-3 p-md-4 w-100">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                        <div className="fw-semibold"></div>
                        <div className="text-muted small">{annex}</div>
                        <div className="ice-state text-warning"></div>
                    </div>
                </div>

                <div>
                    <input value={numero} onChange={(e) => setNumero(sanitize(e.target.value))} type="text" className="form-control text-center dial-display mb-3" placeholder="Número" inputMode="tel" autoComplete="off" spellCheck={false} aria-label="Número a marcar" maxLength={32} />

                    <div className="dial-grid mb-3">
                        {digits.map((d) => (
                            <button key={d} className="btn btn-outline-secondary dial-btn" onClick={() => onDigit(d)}>
                                {d}
                            </button>
                        ))}
                    </div>

                    <div className="d-flex flex-wrap gap-2">
                        <button onClick={onClear} className="btn btn-outline-dark btn-pill">
                            🧹 Limpiar
                        </button>
                        <button onClick={llamar} disabled={callMode !== "idle"} className={`btn btn-${callMode === "inCall" ? "secondary" : "success"} btn-pill`}>
                            {callMode === "dialing" ? "⏳ Marcando…" : callMode === "inCall" ? "✅ En llamada" : "📞 Llamar"}
                        </button>
                        <button onClick={colgar} className="btn btn-danger btn-pill">
                            🧩 Colgar
                        </button>
                        <button onClick={alternarMute} className="btn btn-warning btn-pill">
                            🔇 Mute
                        </button>
                        <button onClick={alternarHold} className="btn btn-info btn-pill">
                            ⏸️ Hold
                        </button>
                    </div>

                    <div className="row mt-3 g-2">
                        <div className="col-12 col-md-4">
                            <div className="small text-muted">Establecimiento</div>
                            <div className="fw-semibold">{msFmt(setupMs)}</div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="small text-muted">Duración (en vivo)</div>
                            <div className="fw-semibold">{secFmt(Math.trunc(liveSeconds))}</div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="small text-muted">Duración final</div>
                            <div className="fw-semibold">{secFmt(totalSeconds)}</div>
                        </div>
                    </div>

                    <div className="mt-3">
                        <div className="progress" style={{ height: 4 }}>
                            <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: callMode === "idle" ? "0%" : callMode === "dialing" ? "30%" : "100%" }} />
                        </div>
                        <div className="text-center small text-muted mt-1">{callStatus}</div>
                    </div>
                </div>
            </div>

            <audio ref={remoteAudioRef} autoPlay playsInline preload="auto" />
        </Dialog>
    );
};
