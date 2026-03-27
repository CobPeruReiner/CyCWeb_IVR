/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { HistorialCalificacion } from "./Components/Table/HistorialCalificacion";
import { HistorialEstado } from "./Components/Table/HistorialEstado";
import { camposComunes, camposNegativa, camposPositiva, tiposBusqueda, valoresIniciales } from "./Components/Data/Data";
// import { FormBottomPositivo } from "./Components/Form/FormBottomPositivo";
import { FormBottom } from "./Components/Form/FormBottom";
import { FormTop } from "./Components/Form/FormTop";
import { MDetalleProcesal } from "./Components/Modal/MDetalleProcesal";
import { FormTopPositiva } from "./Components/Form/FormTopPositiva";
import { ProgressBar } from "primereact/progressbar";
import { HMedCautelar } from "./Components/Table/HMedCautelar";
import { HSolDemanda } from "./Components/Table/HSolDemanda";
import { HPropiedad } from "./Components/Table/HPropiedad";

// TODO: SIEMPRE VA HABER UNA DEMANDA ANTES DE CREAR UNA SOLICITUD CAUTELAR, EN CASO CONTRARIO NO SE PUEDE CREAR LA SOLICITUD
// EN CASO NO HAY Y SEA ADMITIDA, ENTONCES PRIMERO SE CREARA LA DEMANDA Y LUEGO SE CREARA LA SOLICITUD PARA TOMAR EL ID EDPEDIENTE

export const DialogFormJudicial = ({
    bloqueos,
    setBloqueos,
    handleSolicitudCautelarChange,
    handleTipoBienesChange,
    handleCalificacionMCautelarChange,
    handleCalificacionDemandaChange,
    form,
    setForm,
    visible,
    onHide,
    onSave,
    onSaveDemanda,
    modoLectura,
    handleCalificacionDemandaNegativaChange,
    loading,
    submitted,
    toast,
    historialCalificacionDemanda,
    loadDetallesDemandas,
    HDetDemandas,
    closeDetallesDemandas,
    viewDetallesDemandas,
    handleNuevoDetalleDemanda,
    loadEstadoProcesal,
    historialEstadoProcesal,
    HEstadoProcesal,
    closeEstadoProcesal,
    viewEstadoProcesal,
    handleNuevoEstadoProcesal,
    onSaveDetEstadoProcesal,
    submitedDemanda,
    submitedEstadoProcesal,
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

    // SUBMITED
    submitedPropiedad,
    submitedSolMedCautelar,
    submitedSolDemanda,
    submitedSegProcesal,
    submitedInEjecForzada,

    hSolMedidaCautelar,
    mSolMedidaCautelar,
    loadInfoMedidaCautelar,
    closeInfoMedidaCautelar,
    viewInfoMedidaCautelar,
    handleNuevoInfoMedidaCautelar,
    hSolPropiedad,
    mSolPropiedad,
    loadInfoPropiedad,
    closeInfoPropiedad,
    viewInfoPropiedad,
    handleNuevoInfoPropiedad,
    hSolDemandaPositivo,
    mSolDemandaPositivo,
    loadSolDemandaPositivo,
    closeSolDemandaPositivo,
    viewSolDemandaPositivo,
    handleNuevoSolDemandaPositivo,
}) => {
    const API_URL_JUDICIAL = `${process.env.REACT_APP_ROUTE_API}judicial`;

    // console.log("Modal Propiedad: ", mSolPropiedad);

    // Combos seleccionables
    const [tipoBUsqueda, setTipoBUsqueda] = useState([]);

    // Calificacion de la demanda
    const [loadingCalDemanda, setLoadingCalDemanda] = useState(false);
    const [calDemanda, setCalDemanda] = useState([]);

    // Estado procesal (positivo y negativo)
    const [loadingEstadoProcNegativo, setLoadingEstadoProcNegativo] = useState(false);
    const [estadoProc, setEstadoProc] = useState([]);
    const [loadingEstadoProcPositivo, setLoadingEstadoProcPositivo] = useState(false);
    const [estadoProcPositivo, setEstadoProcPositivo] = useState([]);

    // Solicitud de cautelar
    const [loadingSolicitudCautelar, setLoadingSolicitudCautelar] = useState(false);
    const [soliCautelar, setSoliCautelar] = useState([]);

    const [loadingFormaSolCautelar, setLoadingFormaSolCautelar] = useState(false);
    const [formaSolCautelar, setFormaSolCautelar] = useState([]);

    const [loadingEmbargo, setLoadingEmbargo] = useState(false);
    const [embargo, setEmbargo] = useState([]);

    const [loadingSecuestro, setLoadingSecuestro] = useState(false);
    const [secuestro, setSecuestro] = useState([]);

    const [loadingTipoBienes, setLoadingTipoBienes] = useState(false);
    const [tiposBienes, setTiposBienes] = useState([]);

    const [loadingEstadoPropiedad, setLoadingEstadoPropiedad] = useState(false);
    const [estadoPropiedad, setEstadoPropiedad] = useState([]);

    const [loadingGravamen, setLoadingGravamen] = useState(false);
    const [gravamen, setGravamen] = useState([]);

    const [loadingTipoGravamen, setLoadingTipoGravamen] = useState(false);
    const [tipoGravamen, setTipoGravamen] = useState([]);

    const [loadingRangoGravamen, setLoadingRangoGravamen] = useState(false);
    const [rangoGravamen, setRangoGravamen] = useState([]);

    const [loadingEjecForzada, setLoadingEjecForzada] = useState(false);
    const [ejecucionForzada, setEjecucionForzada] = useState([]);

    // Modal detalle procesal
    const [visibleModalDP, setVisibleModalDP] = useState(false);

    // Capturar inputs
    const handleInputChange = (e, name) => {
        const value = (e.target && e.target.value) || e.value || "";

        setForm((prevForm) => {
            let updatedForm = { ...prevForm, [name]: value };

            // Limpieza automática al cambiar estadoPropiedadSC
            if (name === "estadoPropiedadSC" && value !== 4) {
                updatedForm.estadoPropiedadObsSC = "";
            }

            // Limpieza automática al cambiar tipoGravamenSC
            if (name === "tipoGravamenSC" && value !== 3) {
                updatedForm.tipoGravamenObsSC = "";
            }

            // Limpieza automática al cambiar formaSC
            if (name === "formaSC") {
                if (value !== 1) {
                    updatedForm.embargoSC = null;
                    updatedForm.adjuntoEmbargoSC = null;
                }
                if (value !== 2) {
                    updatedForm.secuestroSC = null;
                    updatedForm.adjuntoSecuestroSC = null;
                }
            }

            if (name === "gravamenSC" && value !== 1) {
                updatedForm.tipoGravamenSC = null;
                updatedForm.rangoGravamenSC = null;
                updatedForm.montoGravamenSC = "";
                updatedForm.tipoGravamenObsSC = "";
            }

            return updatedForm;
        });
    };

    // Capturar fechas
    const handleDateChange = (e, name) => {
        setForm((prevForm) => ({ ...prevForm, [name]: e.value }));
    };

    // Capturar tipo de busqueda
    const handleTipoBusquedaChange = (e) => {
        const nuevoTipo = e.value;
        const anteriorTipo = form.tipoBusqueda;

        let camposALimpiar = [];

        if (anteriorTipo === null) {
            // Primera vez que se selecciona un tipo => no limpio los campos comunes
            if (nuevoTipo === 1) {
                camposALimpiar = camposNegativa;
            } else if (nuevoTipo === 2) {
                camposALimpiar = camposPositiva;
            }
        } else {
            // Ya había un tipo de búsqueda previo => limpio TODO (incluye comunes)
            camposALimpiar = [...camposComunes, ...(nuevoTipo === 1 ? camposNegativa : camposPositiva)];
        }

        const limpieza = camposALimpiar.reduce((acc, campo) => {
            acc[campo] = valoresIniciales[campo] ?? null;
            return acc;
        }, {});

        setForm((prev) => ({
            ...prev,
            tipoBusqueda: nuevoTipo,
            ...limpieza,
        }));

        setBloqueos({
            bloqueaDemanda: false,
            bloqueaInfoPropiedad: !(valoresIniciales.tipoBienesSC === 2 || valoresIniciales.tipoBienesSC === 1),
            bloqueaPosteriorMedCautelar: false,
            bloqueaPosteriorCalDemanda: false,
            bloqueaPosteriorCalDemandaNegativa: false,
        });
    };

    // Cargar combo de calificacion
    const loadOptionCalificacion = async () => {
        setLoadingCalDemanda(true);

        try {
            const { data } = await axios.get(`${API_URL_JUDICIAL}/options-calificacion`);

            if (data.ok && Array.isArray(data.options)) {
                const opciones = data.options.map((item) => ({
                    label: item.SJDescripcion,
                    value: item.SJIdDemanda,
                }));

                setCalDemanda(opciones);
            } else {
                setCalDemanda([]);
            }
        } catch (error) {
            console.error("Error al cargar opciones de calificación:", error);
            setCalDemanda([]);
        } finally {
            setLoadingCalDemanda(false);
        }
    };

    // Cargar combos de estado procesal
    const loadOptionsEstProcNegativo = async () => {
        setLoadingEstadoProcNegativo(true);

        try {
            const { data } = await axios.get(`${API_URL_JUDICIAL}/estado-proceso-negativo`);

            if (data.ok && Array.isArray(data.options)) {
                const opciones = data.options.map((item) => ({
                    label: item.SJDescripcion,
                    value: item.SJIdEstadoProcesal,
                }));

                setEstadoProc(opciones);
            } else {
                setEstadoProc([]);
            }
        } catch (error) {
            console.error("Error al cargar opciones de estado procesal:", error);
            setEstadoProc([]);
        } finally {
            setLoadingEstadoProcNegativo(false);
        }
    };

    // Cargar combos de estado procesal
    const loadOptionsEstProcPositiva = async () => {
        setLoadingEstadoProcPositivo(true);

        try {
            const { data } = await axios.get(`${API_URL_JUDICIAL}/estado-proceso-positivo`);

            if (data.ok && Array.isArray(data.options)) {
                const opciones = data.options.map((item) => ({
                    label: item.SJDescripcion,
                    value: item.SJIdEstadoProcesal,
                }));

                setEstadoProcPositivo(opciones);
            } else {
                setEstadoProcPositivo([]);
            }
        } catch (error) {
            console.error("Error al cargar opciones de estado procesal:", error);
            setEstadoProcPositivo([]);
        } finally {
            setLoadingEstadoProcPositivo(false);
        }
    };

    const loadOptionsTipoSolCautelar = async () => {
        setLoadingSolicitudCautelar(true);

        try {
            const { data } = await axios.get(`${API_URL_JUDICIAL}/tipo-sol-cautelar`);

            if (data.ok && Array.isArray(data.options)) {
                const opciones = data.options.map((item) => ({
                    label: item.SJDescripcion,
                    value: item.SJIdSolicitudCautelarTipo,
                }));

                setSoliCautelar(opciones);
            } else {
                setSoliCautelar([]);
            }
        } catch (error) {
            console.error("Error al cargar opciones de solicitud de cautelar:", error);
            setSoliCautelar([]);
        } finally {
            setLoadingSolicitudCautelar(false);
        }
    };

    const loadOptionsFormaSolCautelar = async () => {
        setLoadingFormaSolCautelar(true);

        try {
            const { data } = await axios.get(`${API_URL_JUDICIAL}/forma-sol-cautelar`);

            if (data.ok && Array.isArray(data.options)) {
                const opciones = data.options.map((item) => ({
                    label: item.SJDescripcion,
                    value: item.SJIdFormaSolCautelar,
                }));

                setFormaSolCautelar(opciones);
            } else {
                setFormaSolCautelar([]);
            }
        } catch (error) {
            console.error("Error al cargar opciones de solicitud de cautelar:", error);
            setFormaSolCautelar([]);
        } finally {
            setLoadingFormaSolCautelar(false);
        }
    };

    const loadOptionsEmbargo = async () => {
        setLoadingEmbargo(true);

        try {
            const { data } = await axios.get(`${API_URL_JUDICIAL}/tipo-embargo`);

            if (data.ok && Array.isArray(data.options)) {
                const opciones = data.options.map((item) => ({
                    label: item.SJDescripcion,
                    value: item.SJIdEmbargo,
                }));

                setEmbargo(opciones);
            } else {
                setEmbargo([]);
            }
        } catch (error) {
            console.error("Error al cargar opciones de embargo:", error);
            setEmbargo([]);
        } finally {
            setLoadingEmbargo(false);
        }
    };

    const loadOptionsSecuestro = async () => {
        setLoadingSecuestro(true);

        try {
            const { data } = await axios.get(`${API_URL_JUDICIAL}/tipo-secuestro`);

            if (data.ok && Array.isArray(data.options)) {
                const opciones = data.options.map((item) => ({
                    label: item.SJDescripcion,
                    value: item.SJIdSecuestro,
                }));

                setSecuestro(opciones);
            } else {
                setSecuestro([]);
            }
        } catch (error) {
            console.error("Error al cargar opciones de secuestro:", error);
            setSecuestro([]);
        } finally {
            setLoadingSecuestro(false);
        }
    };

    const loadOptionsTipoBienes = async () => {
        setLoadingTipoBienes(true);

        try {
            const { data } = await axios.get(`${API_URL_JUDICIAL}/tipo-bienes`);

            if (data.ok && Array.isArray(data.options)) {
                const opciones = data.options.map((item) => ({
                    label: item.SJDescripcion,
                    value: item.SJIdTipoBienes,
                }));

                setTiposBienes(opciones);
            } else {
                setTiposBienes([]);
            }
        } catch (error) {
            console.error("Error al cargar opciones de tipos de bienes:", error);
            setTiposBienes([]);
        } finally {
            setLoadingTipoBienes(false);
        }
    };

    const loadOptionsEstadoPropiedad = async () => {
        setLoadingEstadoPropiedad(true);

        try {
            const { data } = await axios.get(`${API_URL_JUDICIAL}/estado-propiedad`);

            if (data.ok && Array.isArray(data.options)) {
                const opciones = data.options.map((item) => ({
                    label: item.SJDescripcion,
                    value: item.SJIdEstadoPropiedad,
                }));

                setEstadoPropiedad(opciones);
            } else {
                setEstadoPropiedad([]);
            }
        } catch (error) {
            console.error("Error al cargar opciones de estado de propiedad:", error);
            setEstadoPropiedad([]);
        } finally {
            setLoadingEstadoPropiedad(false);
        }
    };

    const loadOptionsGravamen = async () => {
        setLoadingGravamen(true);

        try {
            const { data } = await axios.get(`${API_URL_JUDICIAL}/gravamen`);

            if (data.ok && Array.isArray(data.options)) {
                const opciones = data.options.map((item) => ({
                    label: item.SJDescripcion,
                    value: item.SJIdGravamen,
                }));

                setGravamen(opciones);
            } else {
                setGravamen([]);
            }
        } catch (error) {
            console.error("Error al cargar opciones de gravamen:", error);
            setGravamen([]);
        } finally {
            setLoadingGravamen(false);
        }
    };

    const loadOptionsTipoGravamen = async () => {
        setLoadingTipoGravamen(true);

        try {
            const { data } = await axios.get(`${API_URL_JUDICIAL}/tipo-gravamen`);

            if (data.ok && Array.isArray(data.options)) {
                const opciones = data.options.map((item) => ({
                    label: item.SJDescripcion,
                    value: item.SJIdTipoGravamen,
                }));

                setTipoGravamen(opciones);
            } else {
                setTipoGravamen([]);
            }
        } catch (error) {
            console.error("Error al cargar opciones de tipo de gravamen:", error);
            setTipoGravamen([]);
        } finally {
            setLoadingTipoGravamen(false);
        }
    };

    const loadOptionsRangoGravamen = async () => {
        setLoadingRangoGravamen(true);

        try {
            const { data } = await axios.get(`${API_URL_JUDICIAL}/rango-gravamen`);

            if (data.ok && Array.isArray(data.options)) {
                const opciones = data.options.map((item) => ({
                    label: item.SJDescripcion,
                    value: item.SJIdRangoGravamen,
                }));

                setRangoGravamen(opciones);
            } else {
                setRangoGravamen([]);
            }
        } catch (error) {
            console.error("Error al cargar opciones de rango de gravamen:", error);
            setRangoGravamen([]);
        } finally {
            setLoadingRangoGravamen(false);
        }
    };

    const loadOptionsEjecucionForzada = async () => {
        setLoadingEjecForzada(true);

        try {
            const { data } = await axios.get(`${API_URL_JUDICIAL}/options-ejecucion-forzada`);

            if (data.ok && Array.isArray(data.options)) {
                const opciones = data.options.map((item) => ({
                    label: item.SJDescripcion,
                    value: item.SJIdEjecucionForzada,
                }));

                setEjecucionForzada(opciones);
            } else {
                setEjecucionForzada([]);
            }
        } catch (error) {
            console.error("Error al cargar opciones de ejecución forzada:", error);
            setEjecucionForzada([]);
        } finally {
            setLoadingEjecForzada(false);
        }
    };

    // Simular carga de datos
    useEffect(() => {
        setTipoBUsqueda(tiposBusqueda);
        // Cargar options de calificacion de la demanda
        loadOptionCalificacion();
        loadOptionsEstProcNegativo();
        loadOptionsEstProcPositiva();
        loadOptionsTipoSolCautelar();
        loadOptionsFormaSolCautelar();
        loadOptionsEmbargo();
        loadOptionsSecuestro();
        loadOptionsTipoBienes();
        loadOptionsEstadoPropiedad();
        loadOptionsGravamen();
        loadOptionsTipoGravamen();
        loadOptionsRangoGravamen();
        loadOptionsEjecucionForzada();
    }, []);

    const footer = (
        <div>
            {form.tipoBusqueda === 2 && <Button disabled={form.calificacionMCautelar === 1 || form.calificacionMCautelar === 2 || form.calDemandaSC === 1 || form.calDemandaSC === 2} label="DP" icon="pi pi-file" className="p-button-text" onClick={() => setVisibleModalDP(true)} />}
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={onHide} />
            <Button label={`${form.tipoBusqueda === 2 ? (form.SJIdExpediente ? "Guardar" : "Continuar") : "Guardar"}`} icon="pi pi-check" className="p-button-text" onClick={() => onSave(form)} />
        </div>
    );

    return (
        <React.Fragment>
            <Toast ref={toast} />

            <Dialog header="Formulario de gestión judicial" visible={visible} style={{ width: form.tipoBusqueda === 2 ? "1200px" : "900px" }} footer={footer} modal onHide={onHide}>
                <div className="confirmation-content">
                    {loading && <ProgressBar mode="indeterminate" className="p-mb-2" style={{ height: "6px" }} />}
                    <div className="p-grid">
                        <div className="p-col-12">
                            {form.tipoBusqueda === 2 && form.SJIdExpediente ? (
                                <FormTopPositiva
                                    submitted={submitted}
                                    handleCalificacionMCautelarChange={handleCalificacionMCautelarChange}
                                    handleSolicitudCautelarChange={handleSolicitudCautelarChange}
                                    handleTipoBienesChange={handleTipoBienesChange}
                                    handleCalificacionDemandaChange={handleCalificacionDemandaChange}
                                    bloqueos={bloqueos}
                                    form={form}
                                    setForm={setForm}
                                    handleDateChange={handleDateChange}
                                    handleInputChange={handleInputChange}
                                    modoLectura={modoLectura}
                                    handleTipoBusquedaChange={handleTipoBusquedaChange}
                                    tipoBUsqueda={tipoBUsqueda}
                                    // SOLICITUD CAUTELAR
                                    loadingSolicitudCautelar={loadingSolicitudCautelar}
                                    soliCautelar={soliCautelar}
                                    // FORMA SOL CAUTELAR
                                    loadingFormaSolCautelar={loadingFormaSolCautelar}
                                    formaSolCautelar={formaSolCautelar}
                                    // EMBARGO
                                    loadingEmbargo={loadingEmbargo}
                                    embargoSolCautelar={embargo}
                                    // SECUESTRO
                                    loadingSecuestro={loadingSecuestro}
                                    secuestroSolCautelar={secuestro}
                                    // TIPO Bienes
                                    loadingTipoBienes={loadingTipoBienes}
                                    tipoBienOptions={tiposBienes}
                                    // ESTADO DE PROPIEDAD
                                    loadingEstadoPropiedad={loadingEstadoPropiedad}
                                    estadoPropiedadSolCautelar={estadoPropiedad}
                                    // GRAVAMEN
                                    loadingGravamen={loadingGravamen}
                                    gravamenSolCautelar={gravamen}
                                    // TIPO GRAVAMEN
                                    loadingTipoGravamen={loadingTipoGravamen}
                                    tipoGravamenSolCautelar={tipoGravamen}
                                    // RANGO
                                    loadingRango={loadingRangoGravamen}
                                    rangoSolCautelar={rangoGravamen}
                                    // Calificacion demanda
                                    calificacionDemandaOptions={calDemanda}
                                    loadingCalDemanda={loadingCalDemanda}
                                    // SUBMITED
                                    submitedPropiedad={submitedPropiedad}
                                    submitedSolMedCautelar={submitedSolMedCautelar}
                                    submitedSolDemanda={submitedSolDemanda}
                                    submitedSegProcesal={submitedSegProcesal}
                                    submitedInEjecForzada={submitedInEjecForzada}
                                    // HISTORICOS
                                    loadInfoMedidaCautelar={loadInfoMedidaCautelar}
                                    loadInfoPropiedad={loadInfoPropiedad}
                                    loadSolDemandaPositivo={loadSolDemandaPositivo}
                                    handleNuevoInfoMedidaCautelar={handleNuevoInfoMedidaCautelar}
                                    handleNuevoInfoPropiedad={handleNuevoInfoPropiedad}
                                    handleNuevoSolDemandaPositivo={handleNuevoSolDemandaPositivo}
                                />
                            ) : (
                                <FormTop submitted={submitted} form={form} handleDateChange={handleDateChange} handleInputChange={handleInputChange} handleTipoBusquedaChange={handleTipoBusquedaChange} setForm={setForm} tipoBUsqueda={tipoBUsqueda} modoLectura={modoLectura} />
                            )}
                        </div>

                        {form.tipoBusqueda === 2 ? (
                            <></>
                        ) : (
                            <FormBottom
                                handleCalificacionDemandaNegativaChange={handleCalificacionDemandaNegativaChange}
                                bloqueos={bloqueos}
                                form={form}
                                setForm={setForm}
                                handleInputChange={handleInputChange}
                                handleDateChange={handleDateChange}
                                // Calificacion demanda
                                calDemanda={calDemanda}
                                loadingCalDemanda={loadingCalDemanda}
                                // Estado procesal
                                estadoProc={estadoProc}
                                loadingEstadoProcNegativo={loadingEstadoProcNegativo}
                                submitted={submitted}
                                onSaveDemanda={onSaveDemanda}
                                loadDetallesDemandas={loadDetallesDemandas}
                                handleNuevoDetalleDemanda={handleNuevoDetalleDemanda}
                                loadEstadoProcesal={loadEstadoProcesal}
                                handleNuevoEstadoProcesal={handleNuevoEstadoProcesal}
                                onSaveDetEstadoProcesal={onSaveDetEstadoProcesal}
                                submitedDemanda={submitedDemanda}
                                submitedEstadoProcesal={submitedEstadoProcesal}
                            />
                        )}
                    </div>
                </div>
            </Dialog>

            <HistorialCalificacion visible={historialCalificacionDemanda} onHide={closeDetallesDemandas} data={HDetDemandas} viewDetallesDemandas={viewDetallesDemandas} />

            <HistorialEstado visible={historialEstadoProcesal} data={HEstadoProcesal} closeEstadoProcesal={closeEstadoProcesal} viewEstadoProcesal={viewEstadoProcesal} />

            <HPropiedad visible={mSolPropiedad} data={hSolPropiedad} closeInfoPropiedad={closeInfoPropiedad} viewInfoPropiedad={viewInfoPropiedad} />

            <HMedCautelar visible={mSolMedidaCautelar} data={hSolMedidaCautelar} viewInfoMedidaCautelar={viewInfoMedidaCautelar} closeInfoMedidaCautelar={closeInfoMedidaCautelar} />

            <HSolDemanda visible={mSolDemandaPositivo} data={hSolDemandaPositivo} viewSolDemandaPositivo={viewSolDemandaPositivo} closeSolDemandaPositivo={closeSolDemandaPositivo} />

            <MDetalleProcesal
                submitted={submitted}
                visible={visibleModalDP}
                onHide={() => setVisibleModalDP(false)}
                form={form}
                setForm={setForm}
                estadoProc={estadoProcPositivo}
                loadingEstadoProcPositivo={loadingEstadoProcPositivo}
                loadingEjecForzada={loadingEjecForzada}
                ejecucionForzada={ejecucionForzada}
                bloqueos={bloqueos}
                tSegProcesalPositivoData={tSegProcesalPositivoData}
                seguimientoProcesal={seguimientoProcesal}
                loadSeguimientoProcesal={loadSeguimientoProcesal}
                closeSeguimientoProcesal={closeSeguimientoProcesal}
                viewSeguimientoProcesal={viewSeguimientoProcesal}
                handleNuevoSeguimientoProcesal={handleNuevoSeguimientoProcesal}
                tEjecForzadaPositivo={tEjecForzadaPositivo}
                ejecucionForzadaData={ejecucionForzadaData}
                loadInicioEjecucion={loadInicioEjecucion}
                closeInicioEjecucion={closeInicioEjecucion}
                viewInicioEjecucion={viewInicioEjecucion}
                handleNuevoInicioEjecucion={handleNuevoInicioEjecucion}
                // SUBMITED
                submitedSegProcesal={submitedSegProcesal}
                submitedInEjecForzada={submitedInEjecForzada}
            />
        </React.Fragment>
    );
};
