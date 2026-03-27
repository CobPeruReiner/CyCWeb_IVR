import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { ProgressBar } from "primereact/progressbar";
import { Card } from "primereact/card";

export const DialogSMS = ({ visible, setVisible, texto, setTexto, toast }) => {
    const [loading, setLoading] = useState(false);

    const enviarSimulado = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);

            toast.current.show({
                severity: "success",
                summary: "SMS enviado",
                detail: "El SMS fue enviado correctamente.",
                life: 3000,
            });

            setVisible(false);
            setTexto("");
        }, 1500);
    };

    return (
        <Dialog header={<div className="p-card-title-form">ENVIAR SMS</div>} visible={visible} modal style={{ width: "650px" }} onHide={() => setVisible(false)} footer={<Button label="Enviar" className="p-button-primary" disabled={loading || !texto} onClick={enviarSimulado} />}>
            {loading && <ProgressBar mode="indeterminate" style={{ height: "4px" }} className="p-mb-3" />}

            <div className="p-grid">
                <div className="p-col">
                    <Card style={{ background: "#f8f9fa", fontSize: "12px" }}>
                        <div className="p-fluid">
                            <div className="p-field">
                                <label className="p-d-block p-mb-2">Texto SMS:</label>
                                <InputTextarea value={texto} rows={5} disabled={loading} className="p-inputtext-sm" onChange={(e) => setTexto(e.target.value)} />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Dialog>
    );
};
