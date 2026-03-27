import { Calendar } from "primereact/calendar";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUploadButton } from "../../../fileUpload";

export const FormTop = ({ submitted, form, setForm, handleDateChange, handleInputChange, tipoBUsqueda, handleTipoBusquedaChange, modoLectura }) => {
    return (
        <Card style={{ background: "#f8f9fa", fontSize: 12 }}>
            <div className="p-card-title-form p-pb-3">INFORMACIÓN DE LA GESTIÓN</div>
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-6">
                    <div className="p-inputgroup">
                        <span className="p-float-label">
                            <Calendar disabled={modoLectura} id="fechaIngreso" className="p-inputtext-sm" placeholder="Fecha de ingreso" appendTo={document.body} value={form.fechaIngreso} onChange={(e) => handleDateChange(e, "fechaIngreso")} />
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-calendar"></i>
                            </span>
                        </span>
                    </div>
                    {submitted && !form.fechaIngreso && <small className="p-invalid">Fecha de ingreso es requerida.</small>}
                </div>

                <div className="p-field p-col-12 p-md-6">
                    <span className="p-float-label">
                        <InputText disabled={modoLectura} id="juzgado" placeholder="Juzgado" value={form.juzgado} onChange={(e) => handleInputChange(e, "juzgado")} className="p-inputtext-sm" />
                        {submitted && !form.juzgado && <small className="p-invalid">Juzgado es requerido.</small>}
                    </span>
                </div>

                <div className="p-field p-col-12 p-md-6">
                    <div className="p-inputgroup">
                        <InputText disabled={modoLectura} id="nroCargoExpediente" placeholder="N° de cargo de expediente" value={form.nroCargoExpediente} onChange={(e) => handleInputChange(e, "nroCargoExpediente")} className="p-inputtext-sm" />
                        <span className="p-inputgroup-addon">
                            <FileUploadButton
                                disabled={modoLectura}
                                id="adjuntoNroCargoExpediente"
                                onFileSelect={(file) => {
                                    setForm((prev) => ({
                                        ...prev,
                                        adjuntoNroCargoExpediente: file,
                                    }));
                                }}
                            />
                        </span>
                    </div>
                    {submitted && !form.nroCargoExpediente && <small className="p-invalid">Número de cargo es requerido.</small>}
                    {submitted && !form.adjuntoNroCargoExpediente && <small className="p-invalid">Debe adjuntar el archivo del cargo.</small>}
                </div>

                <div className="p-field p-col-12 p-md-6">
                    <span className="p-float-label">
                        <InputText disabled={modoLectura} id="nroExpediente" placeholder="N° de expediente" value={form.nroExpediente} onChange={(e) => handleInputChange(e, "nroExpediente")} className="p-inputtext-sm" />
                        {submitted && !form.nroExpediente && <small className="p-invalid">Número de expediente es requerido.</small>}
                    </span>
                </div>

                <div className="p-field p-col-12 p-md-6">
                    <span className="p-float-label">
                        <Dropdown disabled={modoLectura} value={form.tipoBusqueda} options={tipoBUsqueda} onChange={handleTipoBusquedaChange} placeholder="Tipo búsqueda" className="p-inputtext-sm" />
                        {submitted && !form.tipoBusqueda && <small className="p-invalid">Tipo de búsqueda es requerido.</small>}
                    </span>
                </div>

                <div className="p-field p-col-12 p-md-6">
                    <div className="p-inputgroup">
                        <span className="p-float-label">
                            <Calendar disabled={modoLectura} id="fechaDemanda" className="p-inputtext-sm" placeholder="Fecha de la demanda" appendTo={document.body} value={form.fechaDemanda} onChange={(e) => handleDateChange(e, "fechaDemanda")} />
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-calendar"></i>
                            </span>
                            <span className="p-inputgroup-addon">
                                <FileUploadButton
                                    disabled={modoLectura}
                                    id="adjuntoFechaDemanda"
                                    onFileSelect={(file) => {
                                        setForm((prev) => ({
                                            ...prev,
                                            adjuntoFechaDemanda: file,
                                        }));
                                    }}
                                />
                            </span>
                        </span>
                    </div>
                    {submitted && !form.fechaDemanda && <small className="p-invalid">Fecha de demanda es requerida.</small>}
                    {submitted && !form.adjuntoFechaDemanda && <small className="p-invalid">Debe adjuntar el archivo de demanda.</small>}
                </div>

                <div className="p-field p-col-12">
                    <span className="p-float-label">
                        <InputTextarea disabled={modoLectura} name="observacion" type="text" placeholder="Observación" value={form.observacion} onChange={(e) => handleInputChange(e, "observacion")} className="p-inputtext-sm" rows={2} />
                        {submitted && !form.observacion && <small className="p-invalid">Observación es requerida.</small>}
                    </span>
                </div>
            </div>
        </Card>
    );
};
