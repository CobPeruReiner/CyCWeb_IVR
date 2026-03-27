import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";

export const FormBottomPositivo = ({ form, setForm, handleInputChange, tiposBienes }) => {
    return (
        <div className="p-col-12">
            <Card style={{ background: "#f8f9fa", fontSize: 12 }}>
                <div className="p-card-title-form p-pb-3">Datos del Bien</div>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <Dropdown value={form.tipo} options={tiposBienes} onChange={(e) => handleInputChange(e, "tipo")} placeholder="Tipo" className="p-inputtext-sm" />
                        </span>
                    </div>

                    <div className="p-field p-col-12 p-md-6">
                        <InputText placeholder="Detalle del bien" value={form.detalleBien} onChange={(e) => handleInputChange(e, "detalleBien")} className="p-inputtext-sm" />
                    </div>

                    <div className="p-field p-col-12 p-md-6">
                        <InputText placeholder="Tipo de bien" value={form.tipoBien} onChange={(e) => handleInputChange(e, "tipoBien")} className="p-inputtext-sm" />
                    </div>

                    <div className="p-field p-col-12 p-md-6">
                        <FileUpload
                            key={`foto-${form.foto?.name || ""}`}
                            mode="basic"
                            name="foto"
                            chooseLabel=""
                            icon="pi pi-camera"
                            className="p-button-text p-button-plain p-button-sm file-upload-icon-only"
                            customUpload
                            onSelect={(e) => {
                                const file = e.files[0];
                                setForm((prev) => ({
                                    ...prev,
                                    foto: file,
                                }));
                            }}
                        />
                    </div>

                    <div className="p-field p-col-12 p-md-6">
                        <InputText placeholder="Valor" value={form.valor} onChange={(e) => handleInputChange(e, "valor")} className="p-inputtext-sm" />
                    </div>

                    <div className="p-field p-col-12 p-md-6">
                        <InputText placeholder="Partida" value={form.partida} onChange={(e) => handleInputChange(e, "partida")} className="p-inputtext-sm" />
                    </div>
                </div>
            </Card>
        </div>
    );
};
