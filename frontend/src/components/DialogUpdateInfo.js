import React, { useState, useEffect, useRef, useContext } from 'react';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { CommonService } from '../service/CommonService';
import { GestionService } from '../service/GestionService';
import { Dialog } from 'primereact/dialog';
import { Skeleton } from 'primereact/skeleton';
import { InputNumber } from 'primereact/inputnumber';
import { ProgressBar } from 'primereact/progressbar';
import PanelContext from '../context/Panel/PanelContext';
import { LocalStorageService } from '../service/LocalStorageService';

export const DialogUpdateInfo = (props) => {

    const [submitted, setSubmitted] = useState(false);
    const panelContext = useContext(PanelContext);

    const [formTelefono, setFormTelefono] = useState({ number: "", company: null });
    const [formDireccion, setFormDireccion] = useState({ address: "", ref: "" });

    const [listCompanies, setListCompanies] = useState([]);
    const [listDeparamentos, setListDeparamentos] = useState([]);
    const [listProvincias, setListProvincias] = useState([]);
    const [listDistritos, setListDistritos] = useState([]);
    const [showLoading, setShowLoading] = useState(false);

    const buttonsFooterDialog = (nameLeft, actionLeft, nameRight, actionRight) => {
        return (
            <>
                <Button label={nameLeft} icon="pi pi-times" className="p-button-text" onClick={actionLeft} />
                <Button label={nameRight} icon="pi pi-check" className="p-button-text" onClick={actionRight} />
            </>
        );
    }
    const handleChange = (e) => {
        setFormDireccion({ ...formDireccion, [e.target.name]: e.target.value });
    };
    // const handleChangeTelefono = (e) => {
    //     setFormTelefono({ ...formTelefono, [e.target.name]: e.target.value });
    // };
    const handleChangeTelefono = (e) => {
        const { name, value } = e.target;
        let newValue = value
        if (name === 'number') {
            newValue = value.replace(/\D/g, ''); // Elimina todos los caracteres que no sean dígitos
        }
        setFormTelefono({ ...formTelefono, [name]: newValue });
    };
    
    const handleChangeList = (e, index) => {
        let _formDireccion = { ...formDireccion };
        if (index === 1) {
            _formDireccion.provincia = null;
            _formDireccion.distrito = null;
        } else if (index === 2) {
            _formDireccion.distrito = null;
        }

        setFormDireccion({ ..._formDireccion, [e.target.name]: e.target.value });
    };
    //actualizacion de informacion (Telefonos, direcciones)
    
    const handleSave = () => {
        setSubmitted(true);

        if (props.showInfoDireccion) {
            if (typeof formDireccion.address === 'undefined' || formDireccion.address === null || formDireccion.address === "") return;
            if (typeof formDireccion.deparamento === 'undefined' || formDireccion.deparamento === null || formDireccion.deparamento === "") return;
            if (typeof formDireccion.provincia === 'undefined' || formDireccion.provincia === null || formDireccion.provincia === "") return;
            if (typeof formDireccion.distrito === 'undefined' || formDireccion.distrito === null || formDireccion.distrito === "") return;
            if (typeof formDireccion.type === 'undefined' || formDireccion.type === null || formDireccion.type === "") return;
            
        }
        else {
            // if (typeof formTelefono.number === 'undefined' || formTelefono.number === null || formTelefono.number === "") return;
            if (
                typeof formTelefono.number === 'undefined' || 
                formTelefono.number === null || 
                formTelefono.number === "" ||
                !/^9\d{8}$/.test(formTelefono.number)
              ) return
            // company (no longer required 'cause of static data in backend)
            // if (typeof formTelefono.company === 'undefined' || formTelefono.company === null || formTelefono.company === "") return;
        }
        
        setShowLoading(true);
        if (props.showInfoDireccion) {
            formDireccion.origin = "SISTEMA";
            formDireccion.departament = listDeparamentos.find(e => e.id_ubigeo === formDireccion.deparamento).nombre_ubigeo;
            formDireccion.province = listProvincias[formDireccion.deparamento].find(e => e.id_ubigeo === formDireccion.provincia).nombre_ubigeo;
            formDireccion.district = listDistritos[formDireccion.provincia].find(e => e.id_ubigeo === formDireccion.distrito).nombre_ubigeo;
            formDireccion.userId = panelContext.userLogin.IDPERSONAL;
            formDireccion.document = props.customer.documento;
            new GestionService().addDirecciones(formDireccion).then(
                (reponse) => {
                    props.setDialogActualizar(false);
                    setShowLoading(false);
                }
            );
        } else {
            formTelefono.origin = "SISTEMA";
            //formTelefono.company = 1;
            formTelefono.userId = panelContext.userLogin.IDPERSONAL;
            formTelefono.document = props.customer.documento;

            // adding icartera (23062024)
            const oLogin = new LocalStorageService().getUserLogin();
            formTelefono.idcartera = oLogin.carteraId
            
            // new GestionService().addTelefono(formTelefono).then(
            //     (reponse) => {
            //         panelContext.setTelefonos(reponse);
            //         props.setDialogActualizar(false);
            //         setShowLoading(false);
            //     }
            // );
            new GestionService().addTelefono(formTelefono)
            .then(response => {
                panelContext.setTelefonos(response);
                props.setDialogActualizar(false);
                setShowLoading(false);
            })
            .catch(error => {
                if (error.response) {
                    // El servidor respondió con un estado fuera del rango 2xx
                    console.error('Error de respuesta:', error.response.data);
                    // Muestra el mensaje de error de la respuesta
                    alert(error.response.data.message);
                } else if (error.request) {
                    // La solicitud fue hecha pero no se recibió respuesta
                    console.error('Error de solicitud:', error.request);
                    // alert('No se recibió respuesta del servidor.');
                } else {
                    // Algo ocurrió al configurar la solicitud que disparó un Error
                    console.error('Error', error.message);
                }
                setShowLoading(false);
            })



        }
    }
    useEffect(() => {

        if (props.customer !== null && props.dialogActualizar) {
            setSubmitted(false);
            if (props.showInfoDireccion) {
                setFormDireccion({ address: "", ref: "" });
                new CommonService().getDepartamento().then(
                    data => { setListDeparamentos(data); }
                )
                new CommonService().getProvincia().then(
                    data => { setListProvincias(data); }
                )
                new CommonService().getDistritos().then(
                    data => { setListDistritos(data); }
                )
            } else {
                setFormTelefono({ number: "", company: null });
                new CommonService().getCompanies().then(
                    data => setListCompanies(data)
                )

            }


        }

    }, [props.dialogActualizar]);


    return (
        <React.Fragment>
            <Dialog
                autoZIndex="false"
                visible={props.dialogActualizar}
                style={{ width: "750px" }}
                header="Actualizar información" modal
                footer={buttonsFooterDialog("Cancelar", () => { props.setDialogActualizar(false) }, "Guardar", handleSave)}
                onHide={() => { props.setDialogActualizar(false); }} >
                <div className="confirmation-content">
                    {showLoading &&
                        <ProgressBar mode="indeterminate" className="p-mb-2" style={{ height: '6px' }} />
                    }
                    {props.showInfoDireccion ?
                        <div className="p-fluid">
                            <div className="p-field">
                                <label htmlFor="firstname1">Dirección</label>
                                <InputText id="address" name="address" value={formDireccion.address} onChange={handleChange} type="text" />
                                {submitted && !formDireccion.address && <small className="p-invalid">Dirección es requerido.</small>}
                            </div>
                            <div className="p-field">
                                <label htmlFor="firstname1">Referencia</label>
                                <InputText id="ref" name="ref" value={formDireccion.ref} onChange={handleChange} type="text" />
                            </div>
                            <div className="p-field">
                                <label htmlFor="lastname1">Departamento</label>
                                <Dropdown name="deparamento"
                                    optionLabel="nombre_ubigeo"
                                    value={formDireccion.deparamento}
                                    appendTo={document.body}
                                    options={listDeparamentos} 
                                    optionValue="id_ubigeo" 
                                    onChange={(e) => { handleChangeList(e, 1) }} placeholder="SELECCIONE" />
                                {submitted && !formDireccion.deparamento && <small className="p-invalid">Departamento es requerido.</small>}
                            </div>
                            <div className="p-field">
                                <label htmlFor="lastname1">Provincia</label>
                                <Dropdown name="provincia"
                                    value={formDireccion.provincia}
                                    appendTo={document.body}
                                    options={formDireccion.deparamento && listProvincias[formDireccion.deparamento]}
                                    optionLabel="nombre_ubigeo"
                                    optionValue="id_ubigeo"
                                    onChange={(e) => { handleChangeList(e, 2) }}
                                    placeholder="SELECCIONE" />
                                {submitted && !formDireccion.provincia && <small className="p-invalid">Provincia es requerido.</small>}
                            </div>
                            <div className="p-field">
                                <label htmlFor="lastname1">Distrito</label>
                                <Dropdown name="distrito"
                                    value={formDireccion.distrito}
                                    appendTo={document.body}
                                    options={formDireccion.provincia && listDistritos[formDireccion.provincia]}
                                    optionLabel="nombre_ubigeo"
                                    optionValue="id_ubigeo"
                                    onChange={(e) => { handleChangeList(e, 3) }}
                                    placeholder="SELECCIONE" />
                                {submitted && !formDireccion.distrito && <small className="p-invalid">Provincia es requerido.</small>}
                            </div>
                            <div className="p-field">
                                <label htmlFor="lastname1">Tipo</label>
                                <Dropdown optionLabel="name" value={formDireccion.type} optionValue="name" name="type" appendTo={document.body} options={[{ name: 'LABORAL' }, { name: 'DOMICILIO' }]} onChange={handleChange} placeholder="SELECCIONE" />
                                {submitted && !formDireccion.type && <small className="p-invalid">Tipo es requerido.</small>}
                            </div>
                        </div>
                        :
                        <div className="p-fluid">
                            
                            <div className="p-field">
                                <label htmlFor="firstname1">Teléfono del contacto</label>
                                <InputText keyfilter="int" name="number" value={formTelefono.number} onChange={handleChangeTelefono}/>
                                {submitted && !formTelefono.number && <small className="p-invalid">Teléfono es requerido.</small>}
                                {submitted && formTelefono.number && !/^9\d{8}$/.test(formTelefono.number) && (
                                    <small className="p-invalid">El teléfono debe empezar por 9 y tener 9 dígitos.</small>
                                )}
                            </div>
                            <div className="p-field">
                                <label htmlFor="firstname1">Operador</label>
                                <Dropdown  value={formTelefono.company} name="company" appendTo={document.body} options={listCompanies} optionLabel="nombre" optionValue="id" onChange={handleChangeTelefono} placeholder="SELECCIONE" />
                                {/* {submitted && !formTelefono.company && <small className="p-invalid">Operador es requerido.</small>} */}
                            </div>
                        </div>

                    }

                </div>
            </Dialog>
        </React.Fragment>
    )

}