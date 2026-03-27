import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import React, { useRef } from "react";
import { TEjecForzadaPositivo } from "../Table/TEjecForzadaPositivo";
import { TSegProcesalPositivo } from "../Table/TSegProcesalPositivo";
import { FileUploadButton } from "../../../fileUpload";
import { Skeleton } from "primereact/skeleton";

export const MDetalleProcesal = ({
    visible,
    onHide,
    form,
    setForm,
    estadoProc,
    loadingEstadoProcPositivo,
    ejecucionForzada,
    bloqueos,
    submitted,
    tSegProcesalPositivoData,
    seguimientoProcesal,
    loadSeguimientoProcesal,
    closeSeguimientoProcesal,
    viewSeguimientoProcesal,
    handleNuevoSeguimientoProcesal,
    tEjecForzadaPositivo,
    ejecucionForzadaData,
    loadInicioEjecucion,
    closeInicioEjecucion,
    viewInicioEjecucion,
    handleNuevoInicioEjecucion,
    submitedSegProcesal,
    submitedInEjecForzada,
}) => {
    const dpActivo = form.tipoBusqueda === 2 && !bloqueos.bloqueaPosteriorCalDemanda && form.calificacionMCautelar === 3 && form.calDemandaSC === 3;

    const toast = useRef(null);

    const resetDetalleProcesal = () => {
        const campos = ["estadoProcesalDP", "detalleEstadoFechaDP", "detalleEstadoTipoEscritoDP", "detalleEstadoAdjuntoDP", "detalleEstadoObservacionDP", "inicioEjecucion", "detalleInicioFechaDP", "detalleInicioTipoEscritoDP", "detalleInicioAdjuntoDP", "detalleInicioObservacionDP"];

        const limpieza = campos.reduce((acc, campo) => {
            acc[campo] = null;
            return acc;
        }, {});

        setForm((prev) => ({
            ...prev,
            ...limpieza,
        }));
    };

    const handleInputChange = (e, name) => {
        const value = (e.target && e.target.value) || e.value || "";
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (e, name) => {
        setForm((prev) => ({ ...prev, [name]: e.value }));
    };

    const handleAceptarDetalleProcesal = () => {
        const dpActivo = form.tipoBusqueda === 2 && form.calificacionMCautelar === 3 && form.calDemandaSC === 3 && !bloqueos.bloqueaPosteriorCalDemanda;

        if (dpActivo) {
            const camposObligatoriosVacios = !form.estadoProcesalDP || !form.detalleEstadoFechaDP || !form.detalleEstadoTipoEscritoDP || !form.detalleEstadoAdjuntoDP || !form.inicioEjecucion || !form.detalleInicioFechaDP || !form.detalleInicioTipoEscritoDP || !form.detalleInicioAdjuntoDP;

            if (camposObligatoriosVacios) {
                toast.current?.show({
                    severity: "warn",
                    summary: "Campos incompletos",
                    detail: "Debe completar todos los campos requeridos antes de continuar.",
                    life: 4000,
                });
                return;
            }
        }

        onHide();
    };

    return (
        <React.Fragment>
            <Toast ref={toast} />

            <Dialog
                header="Detalle del Proceso Judicial"
                visible={visible}
                style={{ width: "700px" }}
                modal
                onHide={() => {
                    resetDetalleProcesal();
                    onHide();
                }}
                footer={
                    <div>
                        <Button
                            disabled={bloqueos.bloqueaCargaSeguimientoProcesal || bloqueos.bloqueaCargaEjecucionForzada}
                            label="Cancelar"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={() => {
                                resetDetalleProcesal();
                                onHide();
                            }}
                        />
                        <Button disabled={bloqueos.bloqueaCargaSeguimientoProcesal || bloqueos.bloqueaCargaEjecucionForzada} label="Aceptar" icon="pi pi-check" className="p-button-text" onClick={handleAceptarDetalleProcesal} />
                    </div>
                }
            >
                <div className="confirmation-content">
                    <div className="p-grid">
                        {/* SEGUIMIENTO PROCESAL */}
                        <div className="p-col-12">
                            <Card style={{ background: "#f8f9fa", fontSize: 12 }}>
                                <div className="p-d-flex p-jc-between p-ai-center p-mb-3">
                                    <div className="p-card-title-form">Seguimiento Procesal</div>
                                    <Button icon="pi pi-plus" label="Agregar Seguimiento" className="p-button-sm p-button-success" onClick={handleNuevoSeguimientoProcesal} />
                                </div>

                                {/* Body form */}
                                <div className="p-fluid p-formgrid p-grid">
                                    {/* ESTADO PROCESAL */}
                                    <div className="p-field p-col-12 p-md-6">
                                        {loadingEstadoProcPositivo ? (
                                            <Skeleton className="p-mb-2" height="2.3rem" />
                                        ) : (
                                            <>
                                                <span className="p-float-label">
                                                    <Dropdown disabled={bloqueos.bloqueaCargaSeguimientoProcesal} value={form.estadoProcesalDP} options={estadoProc} onChange={(e) => handleInputChange(e, "estadoProcesalDP")} placeholder="Estado Procesal" />
                                                </span>
                                                {submitedSegProcesal && dpActivo && !form.estadoProcesalDP && <small className="p-error">Campo obligatorio</small>}
                                            </>
                                        )}
                                    </div>

                                    {/* ADJUNTO */}
                                    <div className="p-field p-col-12 p-md-6">
                                        <div className="p-inputgroup">
                                            <span className="p-float-label">
                                                <InputText disabled placeholder="Adjunto" value={form.detalleEstadoAdjuntoDP?.name || ""} className="p-inputtext-sm" />
                                                <span className="p-inputgroup-addon">
                                                    <FileUploadButton
                                                        disabled={bloqueos.bloqueaCargaSeguimientoProcesal}
                                                        id="detalleEstadoAdjuntoDP"
                                                        onFileSelect={(file) => {
                                                            setForm((prev) => ({
                                                                ...prev,
                                                                detalleEstadoAdjuntoDP: file,
                                                            }));
                                                        }}
                                                    />
                                                </span>
                                            </span>
                                        </div>
                                        {submitedSegProcesal && dpActivo && !form.detalleEstadoAdjuntoDP && <small className="p-error">Campo obligatorio</small>}
                                    </div>

                                    {/* FECHA */}
                                    <div className="p-field p-col-12 p-md-6">
                                        <div className="p-inputgroup">
                                            <span className="p-float-label">
                                                <Calendar disabled={bloqueos.bloqueaCargaSeguimientoProcesal} value={form.detalleEstadoFechaDP} onChange={(e) => handleDateChange(e, "detalleEstadoFechaDP")} placeholder="Fecha" />
                                                <span className="p-inputgroup-addon">
                                                    <i className="pi pi-calendar"></i>
                                                </span>
                                            </span>
                                        </div>
                                        {submitedSegProcesal && dpActivo && !form.detalleEstadoFechaDP && <small className="p-error">Campo obligatorio</small>}
                                    </div>

                                    {/* TIPO DE ESCRITO */}
                                    <div className="p-field p-col-12 p-md-6">
                                        <span className="p-float-label">
                                            <InputText disabled={bloqueos.bloqueaCargaSeguimientoProcesal} value={form.detalleEstadoTipoEscritoDP} onChange={(e) => handleInputChange(e, "detalleEstadoTipoEscritoDP")} placeholder="Tipo de escrito" />
                                        </span>
                                        {submitedSegProcesal && dpActivo && !form.detalleEstadoTipoEscritoDP && <small className="p-error">Campo obligatorio</small>}
                                    </div>

                                    {/* OBSERVACION */}
                                    <div className="p-field p-col-12">
                                        <div className="p-inputgroup" style={{ alignItems: "flex-end" }}>
                                            <span className="p-float-label">
                                                <InputTextarea disabled={bloqueos.bloqueaCargaSeguimientoProcesal} value={form.detalleEstadoObservacionDP} onChange={(e) => handleInputChange(e, "detalleEstadoObservacionDP")} placeholder="Observación" rows={2} />
                                            </span>
                                            <span className="p-inputgroup-addon" style={{ cursor: "pointer" }} onClick={() => loadSeguimientoProcesal()}>
                                                <i className="pi pi-eye"></i>
                                            </span>
                                        </div>
                                        {submitedSegProcesal && dpActivo && !form.detalleEstadoObservacionDP && <small className="p-error">Campo obligatorio</small>}
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* INICIO DE EJECUCION FORZADA */}
                        <div className="p-col-12">
                            <Card style={{ background: "#f8f9fa", fontSize: 12 }}>
                                <div className="p-d-flex p-jc-between p-ai-center p-mb-3">
                                    <div className="p-card-title-form">Inicio de Ejecución Forzada</div>
                                    <Button icon="pi pi-plus" label="Agregar Ejecución" className="p-button-sm p-button-success" onClick={handleNuevoInicioEjecucion} />
                                </div>

                                {/* Body form */}
                                <div className="p-fluid p-formgrid p-grid">
                                    {/* EJECUCION FORZADA */}
                                    <div className="p-field p-col-12 p-md-6">
                                        <span className="p-float-label">
                                            <Dropdown disabled={bloqueos.bloqueaCargaEjecucionForzada} value={form.inicioEjecucion} options={ejecucionForzada} onChange={(e) => handleInputChange(e, "inicioEjecucion")} placeholder="Ejec. Forzada" />
                                        </span>
                                        {submitedInEjecForzada && dpActivo && !form.inicioEjecucion && <small className="p-error">Campo obligatorio</small>}
                                    </div>

                                    {/* ADJUNTO */}
                                    <div className="p-field p-col-12 p-md-6">
                                        <div className="p-inputgroup">
                                            <span className="p-float-label">
                                                <InputText disabled placeholder="Adjunto" value={form.detalleInicioAdjuntoDP?.name || ""} className="p-inputtext-sm" />
                                                <span className="p-inputgroup-addon">
                                                    <FileUploadButton
                                                        disabled={bloqueos.bloqueaCargaEjecucionForzada}
                                                        id="detalleInicioAdjuntoDP"
                                                        onFileSelect={(file) => {
                                                            setForm((prev) => ({
                                                                ...prev,
                                                                detalleInicioAdjuntoDP: file,
                                                            }));
                                                        }}
                                                    />
                                                </span>
                                            </span>
                                        </div>
                                        {submitedInEjecForzada && dpActivo && !form.detalleInicioAdjuntoDP && <small className="p-error">Campo obligatorio</small>}
                                    </div>

                                    {/* FECHA */}
                                    <div className="p-field p-col-12 p-md-6">
                                        <div className="p-inputgroup">
                                            <span className="p-float-label">
                                                <Calendar disabled={bloqueos.bloqueaCargaEjecucionForzada} value={form.detalleInicioFechaDP} onChange={(e) => handleDateChange(e, "detalleInicioFechaDP")} placeholder="Fecha" />
                                                <span className="p-inputgroup-addon">
                                                    <i className="pi pi-calendar"></i>
                                                </span>
                                            </span>
                                        </div>
                                        {submitedInEjecForzada && dpActivo && !form.detalleInicioFechaDP && <small className="p-error">Campo obligatorio</small>}
                                    </div>

                                    {/* TIPO DE ESCRITO */}
                                    <div className="p-field p-col-12 p-md-6">
                                        <span className="p-float-label">
                                            <InputText disabled={bloqueos.bloqueaCargaEjecucionForzada} value={form.detalleInicioTipoEscritoDP} onChange={(e) => handleInputChange(e, "detalleInicioTipoEscritoDP")} placeholder="Tipo de escrito" />
                                        </span>
                                        {submitedInEjecForzada && dpActivo && !form.detalleInicioTipoEscritoDP && <small className="p-error">Campo obligatorio</small>}
                                    </div>

                                    {/* DETALLE */}
                                    <div className="p-field p-col-12">
                                        <div className="p-inputgroup" style={{ alignItems: "flex-end" }}>
                                            <span className="p-float-label">
                                                <InputTextarea disabled={bloqueos.bloqueaCargaEjecucionForzada} value={form.detalleInicioObservacionDP} onChange={(e) => handleInputChange(e, "detalleInicioObservacionDP")} placeholder="Detalle" rows={2} />
                                            </span>
                                            <span className="p-inputgroup-addon" style={{ cursor: "pointer" }} onClick={() => loadInicioEjecucion()}>
                                                <i className="pi pi-eye"></i>
                                            </span>
                                        </div>
                                        {submitedInEjecForzada && dpActivo && !form.detalleInicioObservacionDP && <small className="p-error">Campo obligatorio</small>}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </Dialog>

            <TEjecForzadaPositivo viewInicioEjecucion={viewInicioEjecucion} data={ejecucionForzadaData} visible={tEjecForzadaPositivo} onHide={closeInicioEjecucion} title={"Detalles de Ejecución Forzada"} />
            <TSegProcesalPositivo viewSeguimientoProcesal={viewSeguimientoProcesal} data={seguimientoProcesal} visible={tSegProcesalPositivoData} onHide={closeSeguimientoProcesal} title={"Detalles de Seguimiento Procesal"} />
        </React.Fragment>
    );
};
