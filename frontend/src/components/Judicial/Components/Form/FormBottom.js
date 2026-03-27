import { Calendar } from "primereact/calendar";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Skeleton } from "primereact/skeleton";
import { FileUploadButton } from "../../../fileUpload";
import { Button } from "primereact/button";

export const FormBottom = ({
    bloqueos,
    form,
    setForm,
    handleInputChange,
    handleDateChange,
    loadingCalDemanda,
    calDemanda,
    loadingEstadoProcNegativo,
    estadoProc,
    submitted,
    submitedDemanda,
    submitedEstadoProcesal,
    handleCalificacionDemandaNegativaChange,
    onSaveDemanda,
    loadDetallesDemandas,
    handleNuevoDetalleDemanda,
    loadEstadoProcesal,
    handleNuevoEstadoProcesal,
    onSaveDetEstadoProcesal,
}) => {
    return (
        <div className="p-col-12">
            <Card style={{ background: "#f8f9fa", fontSize: 12 }}>
                <div className="p-card-title-form p-pb-3">DETALLE DEL PROCESO JUDICIAL</div>

                <div className="p-grid">
                    <div className="p-col-12 p-md-6">
                        <div className="p-d-flex p-jc-end p-mb-2">
                            <Button icon="pi pi-plus" label="Agregar Demanda" className="p-button-sm p-button-success" onClick={handleNuevoDetalleDemanda} />
                        </div>

                        {/* Form */}
                        <div className="p-fluid p-formgrid p-grid">
                            {/* CALIFICACION DEMANDA */}
                            <div className="p-field p-col-12 p-md-6">
                                {loadingCalDemanda ? (
                                    <Skeleton className="p-mb-2" height="2.3rem" />
                                ) : (
                                    <>
                                        <span className="p-float-label">
                                            <Dropdown disabled={bloqueos.bloqueaCargaHistorialDemanda} value={form.calificacionDemanda} options={calDemanda} onChange={handleCalificacionDemandaNegativaChange} className="p-inputtext-sm" placeholder="Calificación de la demanda" />
                                            {submitedDemanda && !form.calificacionDemanda && <small className="p-invalid">Calificación es requerida.</small>}
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* FECHA DEMANDA */}
                            <div className="p-field p-col-12 p-md-6">
                                <div className="p-inputgroup">
                                    <Calendar disabled={bloqueos.bloqueaCargaHistorialDemanda} id="detalleFecha" className="p-inputtext-sm" placeholder="FECHA" appendTo={document.body} value={form.detalleFecha} onChange={(e) => handleDateChange(e, "detalleFecha")} />
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-calendar"></i>
                                    </span>
                                </div>
                                {submitedDemanda && !form.detalleFecha && <small className="p-invalid">Fecha es requerida.</small>}
                            </div>

                            {/* TIPO DE ESCRITO DEMANDA */}
                            <div className="p-field p-col-12 p-md-6">
                                <span className="p-float-label">
                                    <InputText
                                        disabled={bloqueos.bloqueaPosteriorCalDemandaNegativa || bloqueos.bloqueaCargaHistorialDemanda}
                                        name="detalleTipoEscrito"
                                        placeholder="Tipo de escrito"
                                        value={form.detalleTipoEscrito}
                                        onChange={(e) => handleInputChange(e, "detalleTipoEscrito")}
                                        className="p-inputtext-sm"
                                    />
                                </span>
                                {submitedDemanda && !bloqueos.bloqueaPosteriorCalDemandaNegativa && !form.detalleTipoEscrito && <small className="p-invalid">Tipo de escrito es requerido.</small>}
                            </div>

                            {/* ADJUNTO DEMANDA */}
                            <div className="p-field p-col-12 p-md-6">
                                <div className="p-inputgroup">
                                    <span className="p-float-label">
                                        <InputText disabled value={form.detalleAdjunto?.name || ""} placeholder="Adjunto" className="p-inputtext-sm" />
                                        <span className="p-inputgroup-addon">
                                            <FileUploadButton
                                                disabled={bloqueos.bloqueaCargaHistorialDemanda}
                                                id="detalleAdjunto"
                                                onFileSelect={(file) => {
                                                    setForm((prev) => ({ ...prev, detalleAdjunto: file }));
                                                }}
                                            />
                                        </span>
                                    </span>
                                </div>
                                {submitedDemanda && !form.detalleAdjunto && <small className="p-invalid">Debe adjuntar un archivo.</small>}
                            </div>

                            {/* OBSERVACION DEMANDA */}
                            <div className="p-field p-col-12">
                                <div className="p-inputgroup" style={{ alignItems: "flex-end" }}>
                                    <InputTextarea disabled={bloqueos.bloqueaCargaHistorialDemanda} name="detalleObservacion" placeholder="Observación" value={form.detalleObservacion} onChange={(e) => handleInputChange(e, "detalleObservacion")} className="p-inputtext-sm" rows={2} cols={30} />
                                    <span disabled={!form.SJIdExpediente} className="p-inputgroup-addon" style={{ cursor: "pointer" }} onClick={() => loadDetallesDemandas()}>
                                        <i className="pi pi-eye"></i>
                                    </span>
                                </div>
                                {submitedDemanda && !form.detalleObservacion && <small className="p-invalid">Observación es requerida.</small>}
                            </div>
                        </div>

                        {/* GUARDAR */}
                        <div className="p-d-flex p-jc-end p-mt-3">
                            <Button icon="pi pi-save" label="Guardar" className="p-button-sm p-button-primary" onClick={onSaveDemanda} disabled={bloqueos.bloqueaCargaHistorialDemanda} />
                        </div>
                    </div>

                    <div className="p-col-12 p-md-6">
                        <div className="p-d-flex p-jc-end p-mb-2">
                            <Button icon="pi pi-plus" label="Agregar Estado Procesal" className="p-button-sm p-button-success" onClick={handleNuevoEstadoProcesal} />
                        </div>

                        {/* FORMULARIO */}
                        <div className="p-fluid p-formgrid p-grid">
                            {/* ESTADO PROCESAL */}
                            <div className="p-field p-col-12 p-md-6">
                                {loadingEstadoProcNegativo ? (
                                    <Skeleton className="p-mb-2" height="2.3rem" />
                                ) : (
                                    <span className="p-float-label">
                                        <Dropdown
                                            disabled={bloqueos.bloqueaPosteriorCalDemandaNegativa || bloqueos.bloqueaCargaEstadoProcesal}
                                            value={form.estadoProcesal}
                                            options={estadoProc}
                                            onChange={(e) => handleInputChange(e, "estadoProcesal")}
                                            className="p-inputtext-sm"
                                            placeholder="Estado procesal"
                                        />
                                        {submitedEstadoProcesal && !bloqueos.bloqueaPosteriorCalDemandaNegativa && !form.estadoProcesal && <small className="p-invalid">Estado procesal es requerido.</small>}
                                    </span>
                                )}
                            </div>

                            {/* FECHA ESTADO PROCESAL */}
                            <div className="p-field p-col-12 p-md-6">
                                <div className="p-inputgroup">
                                    <Calendar
                                        disabled={bloqueos.bloqueaPosteriorCalDemandaNegativa || bloqueos.bloqueaCargaEstadoProcesal}
                                        id="detalleEstadoFecha"
                                        className="p-inputtext-sm"
                                        placeholder="FECHA"
                                        appendTo={document.body}
                                        value={form.detalleEstadoFecha}
                                        onChange={(e) => handleDateChange(e, "detalleEstadoFecha")}
                                    />
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-calendar"></i>
                                    </span>
                                </div>
                                {submitedEstadoProcesal && !bloqueos.bloqueaPosteriorCalDemandaNegativa && !form.detalleEstadoFecha && <small className="p-invalid">Fecha es requerida.</small>}
                            </div>

                            {/* TIPO DE ESCRITO ESTADO PROCESAL */}
                            <div className="p-field p-col-12 p-md-6">
                                <span className="p-float-label">
                                    <InputText
                                        disabled={bloqueos.bloqueaPosteriorCalDemandaNegativa || bloqueos.bloqueaCargaEstadoProcesal}
                                        name="detalleEstadoTipoEscrito"
                                        placeholder="Tipo de escrito"
                                        value={form.detalleEstadoTipoEscrito}
                                        onChange={(e) => handleInputChange(e, "detalleEstadoTipoEscrito")}
                                        className="p-inputtext-sm"
                                    />
                                </span>
                                {submitedEstadoProcesal && !bloqueos.bloqueaPosteriorCalDemandaNegativa && !form.detalleEstadoTipoEscrito && <small className="p-invalid">Tipo de escrito es requerido.</small>}
                            </div>

                            {/* ADJUNTO ESTADO PROCESAL */}
                            <div className="p-field p-col-12 p-md-6">
                                <div className="p-inputgroup">
                                    <span className="p-float-label">
                                        <InputText disabled value={form.detalleEstadoAdjunto?.name || ""} placeholder="Adjunto" className="p-inputtext-sm" />
                                        <span className="p-inputgroup-addon">
                                            <FileUploadButton
                                                disabled={bloqueos.bloqueaPosteriorCalDemandaNegativa || bloqueos.bloqueaCargaEstadoProcesal}
                                                id="detalleEstadoAdjunto"
                                                onFileSelect={(file) => {
                                                    setForm((prev) => ({ ...prev, detalleEstadoAdjunto: file }));
                                                }}
                                            />
                                        </span>
                                    </span>
                                </div>
                                {submitedEstadoProcesal && !bloqueos.bloqueaPosteriorCalDemandaNegativa && !form.detalleEstadoAdjunto && <small className="p-invalid">Debe adjuntar un archivo.</small>}
                            </div>

                            {/* OBSERVACION ESTADO PROCESAL */}
                            <div className="p-field p-col-12">
                                <div className="p-inputgroup" style={{ alignItems: "flex-end" }}>
                                    <InputTextarea
                                        disabled={bloqueos.bloqueaPosteriorCalDemandaNegativa || bloqueos.bloqueaCargaEstadoProcesal}
                                        name="detalleEstadoObservacion"
                                        placeholder="Observación"
                                        value={form.detalleEstadoObservacion}
                                        onChange={(e) => handleInputChange(e, "detalleEstadoObservacion")}
                                        className="p-inputtext-sm"
                                        rows={2}
                                        cols={30}
                                    />
                                    <span disabled={!form.SJIdExpediente} className="p-inputgroup-addon" style={{ cursor: "pointer" }} onClick={() => loadEstadoProcesal()}>
                                        <i className="pi pi-eye"></i>
                                    </span>
                                </div>
                                {submitedEstadoProcesal && !bloqueos.bloqueaPosteriorCalDemandaNegativa && !form.detalleEstadoObservacion && <small className="p-invalid">Observación es requerida.</small>}
                            </div>
                        </div>

                        {/* GUARDAR */}
                        <div className="p-d-flex p-jc-end p-mt-3">
                            <Button icon="pi pi-save" label="Guardar" className="p-button-sm p-button-primary" onClick={onSaveDetEstadoProcesal} disabled={bloqueos.bloqueaCargaEstadoProcesal} />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};
