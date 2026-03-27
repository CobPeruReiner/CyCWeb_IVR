import { Calendar } from "primereact/calendar";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { FileUploadButton } from "../../../fileUpload";
import { InputTextarea } from "primereact/inputtextarea";
import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";

export const FormTopPositiva = ({
    submitted,
    bloqueos,
    handleSolicitudCautelarChange,
    handleTipoBienesChange,
    handleCalificacionDemandaChange,
    handleCalificacionMCautelarChange,
    form,
    setForm,
    handleDateChange,
    handleInputChange,
    modoLectura,
    tipoBUsqueda,
    handleTipoBusquedaChange,
    formaSolCautelar,
    embargoSolCautelar,
    secuestroSolCautelar,
    tipoBienOptions,
    estadoPropiedadSolCautelar,
    gravamenSolCautelar,
    tipoGravamenSolCautelar,
    rangoSolCautelar,
    loadingSolicitudCautelar,
    soliCautelar,

    // Calificacion demanda
    calificacionDemandaOptions,
    loadingCalDemanda,

    // SUBMITED
    submitedPropiedad,
    submitedSolMedCautelar,
    submitedSolDemanda,

    // HISTORICO
    loadInfoMedidaCautelar,
    loadInfoPropiedad,
    loadSolDemandaPositivo,
    handleNuevoInfoMedidaCautelar,
    handleNuevoInfoPropiedad,
    handleNuevoSolDemandaPositivo,
}) => {
    return (
        <div className="p-grid">
            {/* INFORMACION DE LA GESTION */}
            <div className="p-col-12 p-md-6">
                <Card style={{ background: "#f8f9fa", fontSize: 12 }}>
                    <div className="p-card-title-form p-pb-3">INFORMACIÓN DE LA GESTIÓN</div>

                    {/* FORMULARIO */}
                    <div className="p-fluid p-formgrid p-grid">
                        {/* FECHA DE INGRESO */}
                        <div className="p-field p-col-12 p-md-6">
                            <div className="p-inputgroup">
                                <span className="p-float-label">
                                    <Calendar disabled={bloqueos.bloquearSaveInfoGestion} id="fechaIngresoSC" className="p-inputtext-sm" placeholder="Fecha de ingreso" appendTo={document.body} value={form.fechaIngresoSC} onChange={(e) => handleDateChange(e, "fechaIngresoSC")} />
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-calendar"></i>
                                    </span>
                                </span>
                            </div>
                            {submitted && !form.fechaIngresoSC && <small className="p-invalid">Fecha de ingreso es requerida.</small>}
                        </div>

                        {/* NUMERO CARGO EXPEDIENTE ADM */}
                        <div className="p-field p-col-12 p-md-6">
                            <div className="p-inputgroup">
                                <InputText disabled={bloqueos.bloquearSaveInfoGestion} id="nroCargoExpAdmSC" placeholder="N° de Cargo de Expediente Adm" value={form.nroCargoExpAdmSC} onChange={(e) => handleInputChange(e, "nroCargoExpAdmSC")} className="p-inputtext-sm" />
                                <span className="p-inputgroup-addon">
                                    <FileUploadButton
                                        disabled={bloqueos.bloquearSaveInfoGestion}
                                        id="nroCargoExpAdmAdjuntoSC"
                                        onFileSelect={(file) => {
                                            setForm((prev) => ({
                                                ...prev,
                                                nroCargoExpAdmAdjuntoSC: file,
                                            }));
                                        }}
                                    />
                                </span>
                            </div>
                            {submitted && !form.nroCargoExpAdmSC && <small className="p-invalid">N° de Cargo de Exp Adm es requerido.</small>}
                            {submitted && !form.nroCargoExpAdmAdjuntoSC && <small className="p-invalid">Adjunto es requerido.</small>}
                        </div>

                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                                <Dropdown disabled={bloqueos.bloquearSaveInfoGestion} value={form.tipoBusqueda} options={tipoBUsqueda} onChange={handleTipoBusquedaChange} placeholder="Tipo búsqueda" className="p-inputtext-sm" />
                                {submitted && !form.tipoBusqueda && <small className="p-invalid">Tipo de busqueda es requerido.</small>}
                            </span>
                        </div>

                        {/* SOLICITUD DE CAUTELAR */}
                        <div className="p-field p-col-12 p-md-6">
                            <div className="p-inputgroup">
                                {loadingSolicitudCautelar ? (
                                    <Skeleton className="p-mb-2" height="2.3rem" />
                                ) : (
                                    <span className="p-float-label">
                                        <Dropdown disabled={bloqueos.bloquearSaveInfoGestion} value={form.solicitudCautelar} options={soliCautelar} onChange={handleSolicitudCautelarChange} placeholder="Solicitud cautelar" className="p-inputtext-sm" />
                                        <span className="p-inputgroup-addon">
                                            <FileUploadButton disabled={bloqueos.bloquearSaveInfoGestion} id="adjuntoSolicitudCautelar" onFileSelect={(file) => setForm((prev) => ({ ...prev, adjuntoSolicitudCautelar: file }))} />
                                        </span>
                                    </span>
                                )}
                            </div>
                            {submitted && !form.solicitudCautelar && <small className="p-invalid">Solicitud cautelar es requerido.</small>}
                            {submitted && !form.adjuntoSolicitudCautelar && <small className="p-invalid">Adjunto es requerido.</small>}
                        </div>

                        {/* FORMA */}
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                                <Dropdown disabled={bloqueos.bloquearSaveInfoGestion} value={form.formaSC} options={formaSolCautelar} onChange={(e) => handleInputChange(e, "formaSC")} placeholder="Forma" className="p-inputtext-sm" />
                                {submitted && !form.formaSC && <small className="p-invalid">Forma es requerido.</small>}
                            </span>
                        </div>

                        {/* EMBARGO */}
                        {form.formaSC === 1 && (
                            <div className="p-field p-col-12 p-md-6">
                                <div className="p-inputgroup">
                                    <span className="p-float-label">
                                        <Dropdown disabled={bloqueos.bloquearSaveInfoGestion} value={form.embargoSC} options={embargoSolCautelar} onChange={(e) => handleInputChange(e, "embargoSC")} placeholder="Embargo" className="p-inputtext-sm" />
                                        <span className="p-inputgroup-addon">
                                            <FileUploadButton
                                                disabled={bloqueos.bloquearSaveInfoGestion}
                                                id="fileEmbargo"
                                                onFileSelect={(file) => {
                                                    setForm((prev) => ({
                                                        ...prev,
                                                        adjuntoEmbargoSC: file,
                                                    }));
                                                }}
                                            />
                                        </span>
                                    </span>
                                </div>
                                {form.formaSC === 1 && submitted && !form.embargoSC && <small className="p-invalid">Embargo es requerido.</small>}
                                {form.formaSC === 1 && submitted && !form.adjuntoEmbargoSC && <small className="p-invalid">Adjunto es requerido.</small>}
                            </div>
                        )}

                        {/* SECUESTRO */}
                        {form.formaSC === 2 && (
                            <div className="p-field p-col-12 p-md-6">
                                <div className="p-inputgroup">
                                    <span className="p-float-label">
                                        <Dropdown disabled={bloqueos.bloquearSaveInfoGestion} value={form.secuestroSC} options={secuestroSolCautelar} onChange={(e) => handleInputChange(e, "secuestroSC")} placeholder="Secuestro" className="p-inputtext-sm" />
                                        <span className="p-inputgroup-addon">
                                            <FileUploadButton
                                                disabled={bloqueos.bloquearSaveInfoGestion}
                                                id="fileSecuestro"
                                                onFileSelect={(file) => {
                                                    setForm((prev) => ({ ...prev, adjuntoSecuestroSC: file }));
                                                }}
                                            />
                                        </span>
                                    </span>
                                </div>
                                {form.formaSC === 2 && submitted && !form.secuestroSC && <small className="p-invalid">Secuestro es requerido.</small>}
                                {form.formaSC === 2 && submitted && !form.adjuntoSecuestroSC && <small className="p-invalid">Adjunto es requerido.</small>}
                            </div>
                        )}

                        {/* TIPO DE BIENES */}
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                                <Dropdown disabled={bloqueos.bloquearSaveInfoGestion} value={form.tipoBienesSC} options={tipoBienOptions} onChange={handleTipoBienesChange} placeholder="Tipo de Bienes" className="p-inputtext-sm" />
                                {submitted && !form.tipoBienesSC && <small className="p-invalid">Tipo de bienes es requerido.</small>}
                            </span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* =========== INFORMACION DE LA PROPIEDAD =========== */}
            <div className="p-col-12 p-md-6">
                <Card style={{ background: "#f8f9fa", fontSize: 12 }}>
                    <div className="p-d-flex p-jc-between p-ai-center p-mb-3">
                        <div className="p-card-title-form">INFORMACIÓN DE PROPIEDAD</div>
                        <Button icon="pi pi-plus" label="Agregar Propiedad" className="p-button-sm p-button-success" onClick={handleNuevoInfoPropiedad} />
                    </div>

                    {/* FORMULARIO */}
                    <div className="p-fluid p-formgrid p-grid">
                        {/* ESTADO DE PROPIEDAD */}
                        <div className="p-field p-col-12 p-md-3">
                            <span className="p-float-label">
                                <Dropdown
                                    disabled={bloqueos.bloqueaInfoPropiedad || bloqueos.bloquearCargaPropiedad}
                                    value={form.estadoPropiedadSC}
                                    options={estadoPropiedadSolCautelar}
                                    onChange={(e) => handleInputChange(e, "estadoPropiedadSC")}
                                    placeholder="Estado de Propiedad"
                                    className="p-inputtext-sm"
                                />
                            </span>
                            {submitedPropiedad && !bloqueos.bloqueaInfoPropiedad && !form.estadoPropiedadSC && <small className="p-invalid">Est. propiedad es requerido.</small>}
                        </div>

                        {/* GRAVAMEN */}
                        <div className="p-field p-col-12 p-md-3">
                            <span className="p-float-label">
                                <Dropdown disabled={bloqueos.bloqueaInfoPropiedad || bloqueos.bloquearCargaPropiedad} value={form.gravamenSC} options={gravamenSolCautelar} onChange={(e) => handleInputChange(e, "gravamenSC")} placeholder="Gravamen" className="p-inputtext-sm" />
                            </span>
                            {submitedPropiedad && !bloqueos.bloqueaInfoPropiedad && !form.gravamenSC && <small className="p-invalid">Gravamen es requerido.</small>}
                        </div>

                        {/* TIPO DE GRAVAMEN */}
                        <div className="p-field p-col-12 p-md-3">
                            <span className="p-float-label">
                                <Dropdown
                                    disabled={form.gravamenSC !== 1 || bloqueos.bloqueaInfoPropiedad || bloqueos.bloquearCargaPropiedad}
                                    value={form.tipoGravamenSC}
                                    options={tipoGravamenSolCautelar}
                                    onChange={(e) => handleInputChange(e, "tipoGravamenSC")}
                                    placeholder="Tipo de Gravamen"
                                    className="p-inputtext-sm"
                                />
                            </span>
                            {submitedPropiedad && form.gravamenSC === 1 && !bloqueos.bloqueaInfoPropiedad && !form.tipoGravamenSC && <small className="p-invalid">T. gravamen es requerido.</small>}
                        </div>

                        {/* RANGO */}
                        <div className="p-field p-col-12 p-md-3">
                            <span className="p-float-label">
                                <Dropdown
                                    disabled={form.gravamenSC !== 1 || bloqueos.bloqueaInfoPropiedad || bloqueos.bloquearCargaPropiedad}
                                    value={form.rangoGravamenSC}
                                    options={rangoSolCautelar}
                                    onChange={(e) => handleInputChange(e, "rangoGravamenSC")}
                                    placeholder="Rango"
                                    className="p-inputtext-sm"
                                />
                            </span>
                            {submitedPropiedad && form.gravamenSC === 1 && !bloqueos.bloqueaInfoPropiedad && !form.rangoGravamenSC && <small className="p-invalid">Rango es requerido.</small>}
                        </div>

                        {/* MONTO */}
                        <div className="p-field p-col-12 p-md-4">
                            <span className="p-float-label">
                                <InputText
                                    disabled={form.gravamenSC !== 1 || bloqueos.bloqueaInfoPropiedad || bloqueos.bloquearCargaPropiedad}
                                    id="montoGravamenSC"
                                    placeholder="Monto de Gravamen"
                                    value={form.montoGravamenSC}
                                    onChange={(e) => handleInputChange(e, "montoGravamenSC")}
                                    className="p-inputtext-sm"
                                />
                            </span>
                            {submitedPropiedad && form.gravamenSC === 1 && !bloqueos.bloqueaInfoPropiedad && !form.montoGravamenSC && <small className="p-invalid">Monto es requerido.</small>}
                        </div>

                        {/* FOTOS */}
                        <div className="p-field p-col-12 p-md-4">
                            <div className="p-inputgroup">
                                <span className="p-float-label">
                                    <InputText disabled value={form.fotoSC ? form.fotoSC.name : ""} placeholder="Foto" className="p-inputtext-sm" />
                                    <span className="p-inputgroup-addon">
                                        <FileUploadButton
                                            disabled={bloqueos.bloqueaInfoPropiedad || bloqueos.bloquearCargaPropiedad}
                                            id="fotoSC"
                                            onFileSelect={(file) => {
                                                setForm((prev) => ({ ...prev, fotoSC: file }));
                                            }}
                                        />
                                    </span>
                                </span>
                            </div>
                            {submitedPropiedad && !bloqueos.bloqueaInfoPropiedad && !form.fotoSC && <small className="p-invalid">Foto es requerida.</small>}
                        </div>

                        {/* PARTIDA */}
                        <div className="p-field p-col-12 p-md-4">
                            <div className="p-inputgroup">
                                <span className="p-float-label">
                                    <InputText disabled value={form.partidaSC ? form.partidaSC.name : ""} placeholder="Partida" className="p-inputtext-sm" />
                                    <span className="p-inputgroup-addon">
                                        <FileUploadButton
                                            disabled={bloqueos.bloqueaInfoPropiedad || bloqueos.bloquearCargaPropiedad}
                                            id="filePartida"
                                            onFileSelect={(file) => {
                                                setForm((prev) => ({ ...prev, partidaSC: file }));
                                            }}
                                        />
                                    </span>
                                </span>
                            </div>
                            {submitedPropiedad && !bloqueos.bloqueaInfoPropiedad && !form.partidaSC && <small className="p-invalid">Partida es requerida.</small>}
                        </div>

                        {/* OBS ESTADO DE PROPIEDAD */}
                        {form.estadoPropiedadSC === 4 && (
                            <div className="p-field p-col-12 p-md-4">
                                <span className="p-float-label">
                                    <InputTextarea
                                        disabled={bloqueos.bloqueaInfoPropiedad || bloqueos.bloquearCargaPropiedad}
                                        value={form.estadoPropiedadObsSC}
                                        onChange={(e) => handleInputChange(e, "estadoPropiedadObsSC")}
                                        placeholder="Detalle Estado de Propiedad"
                                        className="p-inputtext-sm"
                                        rows={2}
                                    />
                                </span>
                                {submitedPropiedad && !bloqueos.bloqueaInfoPropiedad && !form.estadoPropiedadObsSC && <small className="p-invalid">Detalle del estado es requerido.</small>}
                            </div>
                        )}

                        {/* OBS TIPO DE GRAVAMEN */}
                        {form.tipoGravamenSC === 3 && (
                            <div className="p-field p-col-12 p-md-4">
                                <span className="p-float-label">
                                    <InputTextarea disabled={bloqueos.bloqueaInfoPropiedad || bloqueos.bloquearCargaPropiedad} value={form.tipoGravamenObsSC} onChange={(e) => handleInputChange(e, "tipoGravamenObsSC")} placeholder="Detalle Tipo de Gravamen" className="p-inputtext-sm" rows={2} />
                                </span>
                                {submitedPropiedad && !bloqueos.bloqueaInfoPropiedad && !form.tipoGravamenObsSC && <small className="p-invalid">Detalle del tipo de gravamen es requerido.</small>}
                            </div>
                        )}

                        {/* DETALLE */}
                        <div className="p-field p-col-12 p-md-4">
                            <div className="p-inputgroup" style={{ alignItems: "flex-end" }}>
                                <span className="p-float-label">
                                    <InputTextarea disabled={bloqueos.bloqueaInfoPropiedad || bloqueos.bloquearCargaPropiedad} value={form.detalleDelBienSC} onChange={(e) => handleInputChange(e, "detalleDelBienSC")} placeholder="Detalle del Bien" className="p-inputtext-sm" rows={2} />
                                </span>
                                <span className="p-inputgroup-addon" style={{ cursor: "pointer" }} onClick={() => loadInfoPropiedad()}>
                                    <i className="pi pi-eye" style={{ fontSize: "1.2rem", opacity: 0.6 }} />
                                </span>
                            </div>
                            {submitedPropiedad && !bloqueos.bloqueaInfoPropiedad && !form.detalleDelBienSC && <small className="p-invalid">Detalle del bien es requerido.</small>}
                        </div>
                    </div>
                </Card>
            </div>
            {/* =========== INFORMACION DE LA PROPIEDAD =========== */}

            {/* SOLICITUD DE LA MEDIDA CAUTELAR */}
            <div className="p-col-12 p-md-6">
                <Card style={{ background: "#f8f9fa", fontSize: 12 }}>
                    <div className="p-d-flex p-jc-between p-ai-center p-mb-3">
                        <div className="p-card-title-form">SOLICITUD DE LA MEDIDA CAUTELAR</div>
                        <Button icon="pi pi-plus" label="Agregar Solicitud" className="p-button-sm p-button-success" onClick={handleNuevoInfoMedidaCautelar} />
                    </div>

                    {/* FORMULARIO */}
                    <div className="p-fluid p-formgrid p-grid">
                        {/* JUZGADO */}
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                                <InputText disabled={bloqueos.bloqueaPosteriorMedCautelar || bloqueos.bloquearCargaSolMedCautelar} id="jusgadoSC" placeholder="Juzgado" value={form.jusgadoSC} onChange={(e) => handleInputChange(e, "jusgadoSC")} className="p-inputtext-sm" />
                            </span>
                            {submitedSolMedCautelar && !bloqueos.bloqueaPosteriorMedCautelar && !form.jusgadoSC && <small className="p-invalid">Juzgado es requerido.</small>}
                        </div>

                        {/* NRO EXPEDIENTE */}
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                                <InputText disabled={bloqueos.bloqueaPosteriorMedCautelar || bloqueos.bloquearCargaSolMedCautelar} id="nroExpedienteSC" placeholder="N° de Expediente" value={form.nroExpedienteSC} onChange={(e) => handleInputChange(e, "nroExpedienteSC")} className="p-inputtext-sm" />
                            </span>
                            {submitedSolMedCautelar && !bloqueos.bloqueaPosteriorMedCautelar && !form.nroExpedienteSC && <small className="p-invalid">N° de expediente es requerido.</small>}
                        </div>

                        {/* FECHA + ADJUNTO */}
                        <div className="p-field p-col-12 p-md-6">
                            <div className="p-inputgroup">
                                <span className="p-float-label">
                                    <Calendar
                                        disabled={bloqueos.bloqueaPosteriorMedCautelar || bloqueos.bloquearCargaSolMedCautelar}
                                        id="fechaSC"
                                        className="p-inputtext-sm"
                                        placeholder="Fecha de la Solicitud Cautelar"
                                        appendTo={document.body}
                                        value={form.fechaSC}
                                        onChange={(e) => handleDateChange(e, "fechaSC")}
                                    />
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-calendar"></i>
                                    </span>
                                    <span className="p-inputgroup-addon">
                                        <FileUploadButton
                                            disabled={bloqueos.bloqueaPosteriorMedCautelar || bloqueos.bloquearCargaSolMedCautelar}
                                            id="adjuntoFechaSC"
                                            onFileSelect={(file) => {
                                                setForm((prev) => ({ ...prev, adjuntoFechaSC: file }));
                                            }}
                                        />
                                    </span>
                                </span>
                            </div>
                            {submitedSolMedCautelar && !bloqueos.bloqueaPosteriorMedCautelar && !form.fechaSC && <small className="p-invalid">Fecha es requerida.</small>}
                            {submitedSolMedCautelar && !bloqueos.bloqueaPosteriorMedCautelar && !form.adjuntoFechaSC && <small className="p-invalid">Adjunto es requerido.</small>}
                        </div>

                        {/* CALIFICACION */}
                        <div className="p-field p-col-12 p-md-6">
                            {loadingCalDemanda ? (
                                <Skeleton className="p-mb-2" height="2.3rem" />
                            ) : (
                                <span className="p-float-label">
                                    <Dropdown disabled={bloqueos.bloquearCargaSolMedCautelar} value={form.calificacionMCautelar} options={calificacionDemandaOptions} onChange={handleCalificacionMCautelarChange} placeholder="Calificación de la Medida Cautelar" className="p-inputtext-sm" />
                                </span>
                            )}
                            {submitedSolMedCautelar && !form.calificacionMCautelar && <small className="p-invalid">Calificación es requerida.</small>}
                        </div>

                        {/* OBS */}
                        <div className="p-field p-col-12">
                            <div className="p-inputgroup" style={{ alignItems: "flex-end" }}>
                                <span className="p-float-label">
                                    <InputTextarea
                                        disabled={bloqueos.bloqueaPosteriorMedCautelar || bloqueos.bloquearCargaSolMedCautelar}
                                        name="observacionSC"
                                        type="text"
                                        placeholder="Observación"
                                        value={form.observacionSC}
                                        onChange={(e) => handleInputChange(e, "observacionSC")}
                                        className="p-inputtext-sm"
                                        rows={2}
                                    />
                                </span>
                                <span className="p-inputgroup-addon" style={{ cursor: "pointer" }} onClick={() => loadInfoMedidaCautelar()}>
                                    <i className="pi pi-eye" style={{ fontSize: "1.2rem", opacity: 0.6 }} />
                                </span>
                            </div>
                            {submitedSolMedCautelar && !bloqueos.bloqueaPosteriorMedCautelar && !form.observacionSC && <small className="p-invalid">Observación es requerida.</small>}
                        </div>

                        {/* FECHA */}
                        {/* <div className="p-field p-col-12 p-md-6">
                            <div className="p-inputgroup">
                                <span className="p-float-label">
                                    <Calendar id="fechaMCautelar" className="p-inputtext-sm" placeholder="Fecha" appendTo={document.body} value={form.fechaMCautelar} onChange={(e) => handleDateChange(e, "fechaMCautelar")} />
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-calendar"></i>
                                    </span>
                                </span>
                            </div>
                            {submitted && !form.fechaMCautelar && <small className="p-invalid">Fecha es requerida.</small>}
                        </div> */}

                        {/* TIPO DE ESCRITO */}
                        {/* <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                                <InputText disabled={bloqueos.bloqueaPosteriorMedCautelar} id="tipoEscritoMCautelar" placeholder="Tipo de Escrito" value={form.tipoEscritoMCautelar} onChange={(e) => handleInputChange(e, "tipoEscritoMCautelar")} className="p-inputtext-sm" />
                            </span>
                            {submitted && !bloqueos.bloqueaPosteriorMedCautelar && !form.tipoEscritoMCautelar && <small className="p-invalid">Tipo de escrito es requerido.</small>}
                        </div> */}

                        {/* ADJUNTO */}
                        {/* <div className="p-field p-col-12 p-md-6">
                            <div className="p-inputgroup">
                                <span className="p-float-label">
                                    <InputText disabled value={form.adjuntoMCautelar ? form.adjuntoMCautelar.name : ""} placeholder="Adjunto" className="p-inputtext-sm" />
                                    <span className="p-inputgroup-addon">
                                        <FileUploadButton
                                            id="adjuntoMCautelar"
                                            onFileSelect={(file) => {
                                                setForm((prev) => ({ ...prev, adjuntoMCautelar: file }));
                                            }}
                                        />
                                    </span>
                                </span>
                            </div>
                            {submitted && !form.adjuntoMCautelar && <small className="p-invalid">Adjunto es requerido.</small>}
                        </div> */}

                        {/* OBS */}
                        {/* <div className="p-field p-col-12">
                            <span className="p-float-label">
                                <InputTextarea name="observacionMCautelar" type="text" placeholder="Observación" value={form.observacionMCautelar} onChange={(e) => handleInputChange(e, "observacionMCautelar")} className="p-inputtext-sm" rows={2} />
                            </span>
                            {submitted && !form.observacionMCautelar && <small className="p-invalid">Observación es requerida.</small>}
                        </div> */}
                    </div>
                </Card>
            </div>

            {/* SOLICITUD DE LA DEMANDA */}
            <div className="p-col-12 p-md-6">
                <Card style={{ background: "#f8f9fa", fontSize: 12 }}>
                    {/* TODO: ESTA INFORMACION SE GRABA EN LA TABLA SISTEMAGEST.SJ_DemandaDet */}
                    <div className="p-d-flex p-jc-between p-ai-center p-mb-3">
                        <div className="p-card-title-form">SOLICITUD DE LA DEMANDA</div>
                        <Button icon="pi pi-plus" label="Agregar Solicitud" className="p-button-sm p-button-success" onClick={handleNuevoSolDemandaPositivo} />
                    </div>

                    {/* FORMULARIO */}
                    <div className="p-fluid p-formgrid p-grid">
                        {/* JUZGADO */}
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                                <InputText
                                    id="juzgadoDemandaSC"
                                    placeholder="Juzgado"
                                    disabled={bloqueos.bloqueaPosteriorCalDemanda || bloqueos.bloqueaPosteriorMedCautelar || bloqueos.bloquearCargaSolDemanda}
                                    value={form.juzgadoDemandaSC}
                                    onChange={(e) => handleInputChange(e, "juzgadoDemandaSC")}
                                    className="p-inputtext-sm"
                                />
                            </span>
                            {submitedSolDemanda && !bloqueos.bloqueaPosteriorCalDemanda && !bloqueos.bloqueaPosteriorMedCautelar && !form.juzgadoDemandaSC && <small className="p-invalid">Juzgado es requerido.</small>}
                        </div>

                        {/* EXPEDIENTE */}
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                                <InputText
                                    id="nroExpedienteDemandaSC"
                                    placeholder="N° de Expediente"
                                    disabled={bloqueos.bloqueaPosteriorCalDemanda || bloqueos.bloqueaPosteriorMedCautelar || bloqueos.bloquearCargaSolDemanda}
                                    value={form.nroExpedienteDemandaSC}
                                    onChange={(e) => handleInputChange(e, "nroExpedienteDemandaSC")}
                                    className="p-inputtext-sm"
                                />
                            </span>
                            {submitedSolDemanda && !bloqueos.bloqueaPosteriorCalDemanda && !bloqueos.bloqueaPosteriorMedCautelar && !form.nroExpedienteDemandaSC && <small className="p-invalid">N° de expediente es requerido.</small>}
                        </div>

                        {/* CALIFICACION */}
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                                <Dropdown
                                    disabled={bloqueos.bloqueaDemanda || bloqueos.bloqueaPosteriorMedCautelar || bloqueos.bloquearCargaSolDemanda}
                                    value={form.calDemandaSC}
                                    options={calificacionDemandaOptions}
                                    onChange={handleCalificacionDemandaChange}
                                    placeholder="Calificación de la Demanda"
                                    className="p-inputtext-sm"
                                />
                            </span>
                            {submitedSolDemanda && !bloqueos.bloqueaPosteriorMedCautelar && !form.calDemandaSC && <small className="p-invalid">Calificación es requerida.</small>}
                        </div>

                        {/* OBS */}
                        <div className="p-field p-col-12">
                            <span className="p-float-label">
                                <InputTextarea
                                    name="observacionDemandaSC"
                                    type="text"
                                    placeholder="Observación"
                                    disabled={bloqueos.bloqueaDemanda || bloqueos.bloqueaPosteriorCalDemanda || bloqueos.bloqueaPosteriorMedCautelar || bloqueos.bloquearCargaSolDemanda}
                                    value={form.observacionDemandaSC}
                                    onChange={(e) => handleInputChange(e, "observacionDemandaSC")}
                                    className="p-inputtext-sm"
                                    rows={2}
                                />
                            </span>
                            {submitedSolDemanda && !bloqueos.bloqueaDemanda && !bloqueos.bloqueaPosteriorCalDemanda && !bloqueos.bloqueaPosteriorMedCautelar && !form.observacionDemandaSC && <small className="p-invalid">Observación es requerida.</small>}
                        </div>

                        {/* FECHA */}
                        <div className="p-field p-col-12 p-md-6">
                            <div className="p-inputgroup">
                                <span className="p-float-label">
                                    <Calendar
                                        id="fechaCalDemandaSC"
                                        className="p-inputtext-sm"
                                        placeholder="Fecha"
                                        appendTo={document.body}
                                        disabled={bloqueos.bloqueaDemanda || bloqueos.bloqueaPosteriorMedCautelar || bloqueos.bloquearCargaSolDemanda}
                                        value={form.fechaCalDemandaSC}
                                        onChange={(e) => handleDateChange(e, "fechaCalDemandaSC")}
                                    />
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-calendar"></i>
                                    </span>
                                </span>
                            </div>
                            {submitedSolDemanda && !bloqueos.bloqueaDemanda && !bloqueos.bloqueaPosteriorMedCautelar && !form.fechaCalDemandaSC && <small className="p-invalid">Fecha es requerida.</small>}
                        </div>

                        {/* TIPO ESCRITO */}
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                                <InputText
                                    id="tipoEscritoCalDemandaSC"
                                    placeholder="Tipo de Escrito"
                                    disabled={bloqueos.bloqueaDemanda || bloqueos.bloqueaPosteriorCalDemanda || bloqueos.bloqueaPosteriorMedCautelar || bloqueos.bloquearCargaSolDemanda}
                                    value={form.tipoEscritoCalDemandaSC}
                                    onChange={(e) => handleInputChange(e, "tipoEscritoCalDemandaSC")}
                                    className="p-inputtext-sm"
                                />
                            </span>
                            {submitedSolDemanda && !bloqueos.bloqueaDemanda && !bloqueos.bloqueaPosteriorCalDemanda && !bloqueos.bloqueaPosteriorMedCautelar && !form.tipoEscritoCalDemandaSC && <small className="p-invalid">Tipo de escrito es requerido.</small>}
                        </div>

                        {/* ADJUNTO */}
                        <div className="p-field p-col-12 p-md-6">
                            <div className="p-inputgroup">
                                <span className="p-float-label">
                                    <InputText disabled placeholder="Adjunto" value={form.adjuntoCalDemandaSC ? form.adjuntoCalDemandaSC.name : ""} className="p-inputtext-sm" />
                                    <span className="p-inputgroup-addon">
                                        <FileUploadButton
                                            disabled={bloqueos.bloqueaDemanda || bloqueos.bloqueaPosteriorMedCautelar || bloqueos.bloquearCargaSolDemanda}
                                            id="adjuntoCalDemandaSC"
                                            onFileSelect={(file) => {
                                                setForm((prev) => ({ ...prev, adjuntoCalDemandaSC: file }));
                                            }}
                                        />
                                    </span>
                                </span>
                            </div>
                            {submitedSolDemanda && !bloqueos.bloqueaDemanda && !bloqueos.bloqueaPosteriorMedCautelar && !form.adjuntoCalDemandaSC && <small className="p-invalid">Adjunto es requerido.</small>}
                        </div>

                        {/* OBS */}
                        <div className="p-field p-col-12">
                            <div className="p-inputgroup" style={{ alignItems: "flex-end" }}>
                                <span className="p-float-label">
                                    <InputTextarea
                                        name="observacionCalDemandaSC"
                                        type="text"
                                        placeholder="Observación"
                                        disabled={bloqueos.bloqueaDemanda || bloqueos.bloqueaPosteriorMedCautelar || bloqueos.bloquearCargaSolDemanda}
                                        value={form.observacionCalDemandaSC}
                                        onChange={(e) => handleInputChange(e, "observacionCalDemandaSC")}
                                        className="p-inputtext-sm"
                                        rows={2}
                                    />
                                </span>
                                <span className="p-inputgroup-addon" style={{ cursor: "pointer" }} onClick={() => loadSolDemandaPositivo()}>
                                    <i className="pi pi-eye" style={{ fontSize: "1.2rem", opacity: 0.6 }} />
                                </span>
                            </div>
                            {submitedSolDemanda && !bloqueos.bloqueaDemanda && !bloqueos.bloqueaPosteriorMedCautelar && !form.observacionCalDemandaSC && <small className="p-invalid">Observación es requerida.</small>}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
