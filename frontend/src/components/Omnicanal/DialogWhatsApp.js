import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Card } from "primereact/card";
import { ProgressBar } from "primereact/progressbar";

export const DialogWhatsApp = ({ visible, setVisible, texto, setTexto, toast }) => {
    const [loading, setLoading] = useState(false);

    const enviarSimulado = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);

            toast.current.show({
                severity: "success",
                summary: "WhatsApp enviado",
                detail: "El mensaje fue enviado correctamente.",
                life: 3000,
            });

            setVisible(false);
            setTexto("");
        }, 1500);
    };

    return (
        <Dialog header={<div className="p-card-title-form">REDACTAR WHATSAPP</div>} visible={visible} modal style={{ width: "650px" }} onHide={() => setVisible(false)} footer={<Button label="Enviar" className="p-button-primary" disabled={loading || !texto} onClick={enviarSimulado} />}>
            {loading && <ProgressBar mode="indeterminate" style={{ height: "4px" }} className="p-mb-3" />}

            <div className="p-grid">
                <div className="p-col">
                    <Card style={{ background: "#f8f9fa", fontSize: "12px" }}>
                        <div className="p-fluid">
                            <div className="p-field">
                                <label className="p-d-block p-mb-2">Mensaje:</label>
                                <InputTextarea value={texto} rows={6} disabled={loading} className="p-inputtext-sm" onChange={(e) => setTexto(e.target.value)} />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Dialog>
    );
};
