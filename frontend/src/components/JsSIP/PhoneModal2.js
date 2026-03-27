import { useContext } from "react";
import { Dialog } from "primereact/dialog";
import { SIPContext } from "../../context/JsSIP/JsSIPContext";
import { Keypad } from "./Componentes/KeyPad";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import PanelContext from "../../context/Panel/PanelContext";

export const PhoneModal2 = () => {
    const {
        modalVisible,
        hidePhone,

        estado,
        numero,
        session,

        duracionHablando,
        formatTiempo,

        call,
        hangup,
    } = useContext(SIPContext);

    const panelContext = useContext(PanelContext);

    return (
        <Dialog
            visible={modalVisible}
            onHide={() => {
                hidePhone();
            }}
            modal={false}
            draggable={true}
            resizable={false}
            header="Llamada WebRTC"
            style={{ width: "350px" }}
            position="top-right"
        >
            <div
                style={{
                    backgroundColor: estado.color,
                    color: "white",
                    padding: "0.5rem",
                    textAlign: "center",
                    borderRadius: "6px",
                    fontWeight: "bold",
                }}
            >
                {estado.text} - {panelContext?.userLogin?.SIP_USER || "-"}
                {estado.text === "Hablando" && <div style={{ fontSize: "1.2rem", marginTop: "0.25rem" }}>{formatTiempo(duracionHablando)}</div>}
            </div>

            <div className="p-field">
                <div
                    style={{
                        marginTop: "1rem",
                        border: "1px solid #ccc",
                        padding: "0.5rem",
                        fontSize: "1.5rem",
                        textAlign: "center",
                        borderRadius: "4px",
                        backgroundColor: "#f9f9f9",
                    }}
                >
                    {numero || "—"}
                </div>
            </div>

            <Keypad />
            <Divider />

            <div className="p-d-flex p-jc-center p-mt-2">
                {!session || session.isEnded?.() ? (
                    <Button
                        icon="pi pi-phone"
                        className="p-button-rounded"
                        style={{
                            backgroundColor: "#4caf50",
                            borderColor: "#4caf50",
                            width: 60,
                            height: 60,
                            fontSize: "1.2rem",
                        }}
                        onClick={() => call(numero)}
                        disabled={!numero || numero.length < 3}
                    />
                ) : (
                    <Button
                        icon="pi pi-phone"
                        className="p-button-rounded"
                        style={{
                            backgroundColor: "#f44336",
                            borderColor: "#f44336",
                            width: 60,
                            height: 60,
                            fontSize: "1.2rem",
                            transform: "rotate(135deg)",
                        }}
                        onClick={hangup}
                    />
                )}
            </div>
        </Dialog>
    );
};
