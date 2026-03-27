import React, { useState, useEffect, useRef, useContext } from "react";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { Panel } from "primereact/panel";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { CommonService } from "../service/CommonService";
import { GestionService } from "../service/GestionService";
import { Dialog } from "primereact/dialog";
import { Skeleton } from "primereact/skeleton";
import { InputNumber } from "primereact/inputnumber";
import { ProgressBar } from "primereact/progressbar";
import moment from "moment";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
import PanelContext from "../context/Panel/PanelContext";
import { LocalStorageService } from "../service/LocalStorageService";
export const DialogFormAgenVentas = ({ dialogFormAgenVentas, setDialogFormAgenVentas, handleChange, formGestion, setFormGestion }) => {
    const [listTienda, setListTienda] = useState([]);

    const [showLoading, setShowLoading] = useState(false);

    const panelContext = useContext(PanelContext);

    const [isDisabled, setIsDisabled] = useState(false);
    const [selectedProgramarVisita, setSelectedProgramarVisita] = useState({});
    const [selectedProgramarCita, setSelectedProgramarCita] = useState({});
    const [selectedVenta, setSelectedVenta] = useState({});
    const [selectedDesembolso, setSelectedDesembolso] = useState({});

    const buttonsFooterDialog = (name, action) => {
        return (
            <>
                <Button label={name} icon="pi pi-check" className="p-button-text" onClick={action} disabled={isDisabled} />
            </>
        );
    };

    useEffect(() => {
        if (dialogFormAgenVentas) {
            setIsDisabled(false);

            let service = new CommonService();
            service.getTiendasAV().then((data) => {
                setListTienda(data);
            });
        }
    }, [dialogFormAgenVentas]);

    const endOfMonth = moment().endOf("month").toDate();

    const handleTiendaAV = (e) => {
        handleChange(e);

        const currentDirection = listTienda.find((x) => x.idTienda === e.target.value);

        const currentDirectionObject = {
            target: {
                name: "iddireccion_av",
                value: currentDirection.DireccionTienda,
            },
        };

        handleChange(currentDirectionObject);
        // let _formGestion = { ...formGestion, iddireccion_av: currentDirection.DireccionTienda};
        // setFormGestion(_formGestion);
    };

    // RESTRICCION FECHA Y MORA AGENDAMIENTO (24H)

    // CON ESTA VARIABLE YA SE ESTABA TRABAJANDO
    // const minDate = moment().add(24, "hours").toDate();

    // ESTA ES MI VARIABLE DE PRUEBA
    const minDate = formGestion.idefecto == 13519 ? moment().add(24, "hours").toDate() : moment().toDate();

    // Calcula la fecha máxima (5 días desde hoy)
    const maxDate = moment().add(4, "days").toDate();

    const nowPlus24Hours = moment().add(24, "hours"); // Fecha y hora actuales + 24 horas.
    // const minDate = nowPlus24Hours.startOf('day').toDate(); // Día mínimo permitido.
    const minTime = nowPlus24Hours.toDate(); // Hora mínima en el día permitido.

    const isNextDay = (date) => {
        return moment(date).isSame(moment().add(1, "day"), "day");
    };

    const handleTime = (e) => {
        const nuevaFecha = e.target.value;
        setFormGestion({ ...formGestion, fecha_av: nuevaFecha });
        // console.log(formGestion.idefecto)

        // Si la fecha seleccionada es hoy, reinicia la hora.
        if (formGestion.idefecto == 13519 && isNextDay(nuevaFecha)) {
            // console.log('aplicar bloqueo')
            setFormGestion((prev) => ({ ...prev, hora_av: null }));
        }
    };

    const getTodayAt8PM = () => {
        return moment().set({ hour: 20, minute: 0, second: 0, millisecond: 0 }).toDate();
    };

    const getTodayAt9AM = () => {
        return moment().set({ hour: 9, minute: 0, second: 0, millisecond: 0 }).toDate();
    };

    const calculateMinDate = (idefecto) => {
        const now = moment();
        const todayAt9AM = moment().set({ hour: 9, minute: 0 }).toDate();

        if (idefecto === 13519 && isNextDay(formGestion.fecha_av)) {
            return now.isBefore(moment().set({ hour: 9, minute: 0 })) ? todayAt9AM : new Date();
        }

        return todayAt9AM; // Valor por defecto
    };

    return (
        <React.Fragment>
            <Dialog
                autoZIndex="false"
                visible={dialogFormAgenVentas}
                style={{ width: "400px" }}
                header="AGENDAMIENTO DE VENTAS"
                modal
                onHide={() => {
                    setDialogFormAgenVentas(false);
                }}
                footer={buttonsFooterDialog("Aceptar", () => {
                    setDialogFormAgenVentas(false);
                })}
            >
                <div className="confirmation-content">
                    {showLoading && <ProgressBar mode="indeterminate" className="p-mb-2" style={{ height: "6px" }} />}
                    <div className="p-grid">
                        <div className="p-col">
                            <Card style={{ background: "#f8f9fa", fontSize: 12 }}>
                                {
                                    <React.Fragment>
                                        {/* <div className="p-card-title-form"  >INFORMACIÓN DE AGENDAMIENTO</div>
                                        <Divider /> */}
                                        <div className="p-fluid">
                                            <div className="p-field">
                                                <label htmlFor="tienda_av">Tienda / Agencia</label>
                                                <Dropdown name="tienda_av" options={listTienda} value={formGestion.tienda_av} optionLabel="NombreTienda" optionValue="idTienda" onChange={handleTiendaAV} placeholder="TIENDA" className="p-inputtext-sm" />
                                            </div>
                                            <div className="p-field">
                                                <label htmlFor="iddireccion_av">Dirección</label>
                                                <InputText name="iddireccion_av" value={formGestion.iddireccion_av} type="text" className="p-inputtext-sm" disabled={true} />
                                            </div>
                                            <Divider />
                                            <div className="p-field">
                                                <label htmlFor="programar_visita_av">Programar Visitar / Atención</label>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <div className="field-radiobutton" style={{ marginRight: "20px" }}>
                                                        <RadioButton inputId="programar_visita_av_yes" name="programar_visita_av" value="1" onChange={handleChange} checked={formGestion.programar_visita_av === "1"} />
                                                        <label htmlFor="programar_visita_av_yes" style={{ marginLeft: "5px" }}>
                                                            Sí
                                                        </label>
                                                    </div>
                                                    <div className="field-radiobutton">
                                                        <RadioButton inputId="programar_visita_av_no" name="programar_visita_av" value="0" onChange={handleChange} checked={formGestion.programar_visita_av === "0"} />
                                                        <label htmlFor="programar_visita_av_no" style={{ marginLeft: "5px" }}>
                                                            No
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            {![13520, 13537].includes(formGestion.idefecto) && (
                                                <div className="p-fluid p-formgrid p-grid">
                                                    <div className="p-field  p-col">
                                                        <div className="p-inputgroup">
                                                            <Calendar id="time12" className="p-inputtext-sm" placeholder="FECHA" appendTo={document.body} value={formGestion.fecha_av} minDate={minDate} maxDate={maxDate} onChange={handleTime} />
                                                            <span className="p-inputgroup-addon">
                                                                <i className="pi pi-calendar"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: "none" }} className="p-field p-col">
                                                        <div className="p-inputgroup">
                                                            <Calendar
                                                                id="time12"
                                                                className="p-inputtext-sm"
                                                                placeholder="HORA"
                                                                appendTo={document.body}
                                                                value={formGestion.hora_av || getTodayAt9AM()}
                                                                // minDate={formGestion.idefecto == 13519 && isNextDay(formGestion.fecha_av) ? new Date() : getTodayAt9AM()}
                                                                minDate={calculateMinDate(formGestion.idefecto)}
                                                                onChange={(e) => setFormGestion({ ...formGestion, hora_av: e.target.value })}
                                                                timeOnly
                                                                hourFormat="24"
                                                                maxDate={getTodayAt8PM()}
                                                            />
                                                            <span className="p-inputgroup-addon">
                                                                <i className="pi pi-clock"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {/* <Divider /> */}
                                            <div style={{ display: "none" }} className="p-field">
                                                <label htmlFor="firstname2">Confirma cita</label>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <div className="field-radiobutton" style={{ marginRight: "20px" }}>
                                                        <RadioButton inputId="programar_cita_av_yes" name="programar_cita_av" value="1" onChange={handleChange} checked={formGestion.programar_cita_av === "1"} />
                                                        <label htmlFor="programar_cita_av_yes" style={{ marginLeft: "5px" }}>
                                                            Sí
                                                        </label>
                                                    </div>
                                                    <div className="field-radiobutton">
                                                        <RadioButton inputId="programar_cita_av_no" name="programar_cita_av" value="0" onChange={handleChange} checked={formGestion.programar_cita_av === "0"} />
                                                        <label htmlFor="programar_cita_av_no" style={{ marginLeft: "5px" }}>
                                                            No
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: "none" }} className="p-field">
                                                <label htmlFor="firstname2">Venta</label>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <div className="field-radiobutton" style={{ marginRight: "20px" }}>
                                                        <RadioButton inputId="venta_av_yes" name="venta_av" value="1" onChange={handleChange} checked={formGestion.venta_av === "1"} />
                                                        <label htmlFor="venta_av_yes" style={{ marginLeft: "5px" }}>
                                                            Sí
                                                        </label>
                                                    </div>
                                                    <div className="field-radiobutton">
                                                        <RadioButton inputId="venta_av_no" name="venta_av" value="0" onChange={handleChange} checked={formGestion.venta_av === "0"} />
                                                        <label htmlFor="venta_av_no" style={{ marginLeft: "5px" }}>
                                                            No
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: "none" }} className="p-field">
                                                <label htmlFor="firstname2">Desembolso</label>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <div className="field-radiobutton" style={{ marginRight: "20px" }}>
                                                        <RadioButton inputId="desembolso_av_yes" name="desembolso_av" value="1" onChange={handleChange} checked={formGestion.desembolso_av === "1"} />
                                                        <label htmlFor="desembolso_av_yes" style={{ marginLeft: "5px" }}>
                                                            Sí
                                                        </label>
                                                    </div>
                                                    <div className="field-radiobutton">
                                                        <RadioButton inputId="desembolso_av_no" name="desembolso_av" value="0" onChange={handleChange} checked={formGestion.desembolso_av === "0"} />
                                                        <label htmlFor="desembolso_av_no" style={{ marginLeft: "5px" }}>
                                                            No
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <Divider /> */}
                                            <div style={{ display: "none" }} className="p-field p-col">
                                                <label htmlFor="importe_av">Importe</label>
                                                <div className="p-inputgroup">
                                                    <InputNumber name="importe_av" placeholder="MONTO" className="p-inputtext-sm" value={formGestion.importe_av} onValueChange={handleChange} mode="decimal" minFractionDigits={2} maxFractionDigits={2} />
                                                    <span className="p-inputgroup-addon">
                                                        <i className="pi pi-money-bill"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <Divider />
                                            <div className="p-field p-col">
                                                <label htmlFor="firstname2">Observaciones y/o comentarios</label>
                                                <InputTextarea value={formGestion.observaciones_av} name="observaciones_av" type="text" onChange={handleChange} rows={2} cols={30} />
                                            </div>
                                            {/* <Divider /> */}
                                            <div style={{ display: "none" }} className="p-field">
                                                <label htmlFor="firstname2">Derivación canal digital</label>
                                                <InputText name="derivacion_canal_av" value={formGestion.derivacion_canal_av} type="text" onChange={handleChange} className="p-inputtext-sm" />
                                            </div>
                                        </div>
                                    </React.Fragment>
                                }
                            </Card>
                        </div>
                    </div>
                </div>
            </Dialog>
        </React.Fragment>
    );
};
