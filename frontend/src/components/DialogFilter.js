import React, { useState, useEffect, useRef } from 'react';
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
import { MultiSelect } from 'primereact/multiselect';

export const DialogFilter = (props) => {

    const [listAccion, setListAccion] = useState([]);
    const [listEfecto, setListEfecto] = useState([]);
    const [listMotivo, setListMotivo] = useState([]);

    const [listCustom, setListCustom] = useState([]);

    const [basicFilter, setBasicFilter] = useState({});

    const [conditions, setConditions] = useState([
        { val: '0', text: 'Igual a', type: "TEXT" },
        { val: '0', text: 'Igual a', type: "CALENDAR" },
        { val: '1', text: 'Igual a', type: "NUMBER" },
        { val: '2', text: 'Mayor igual', type: "NUMBER" },
        { val: '3', text: 'Menor igual', type: "NUMBER" },
        { val: '4', text: 'Mayor que', type: "NUMBER" },
        { val: '5', text: 'Menor que', type: "NUMBER" },
    ]);
    //acciones filtros
    const [filters, setFilters] = useState([]);
    /*
    const fieldsFilterCustom = [
        { name: 'Fecha de Gestión', code: 'FG', type: 'CALENDAR' },
        { name: 'Fecha de Asignación', code: 'FA', type: 'CALENDAR' },
        { name: 'Plaza', code: 'PLAZA', type: 'ITEMS' },
        { name: 'Campo 1', code: 'IST', type: 'TEXT' },
        { name: 'Campo 2', code: 'PRS', type: 'TEXT' }
    ];
    */
    const [fieldsFilterCustom, setFieldsFilterCustom] = useState([]);
    const [loadingEfecto, setLoadingEfecto] = useState(false);
    const [loadingMotivo, setLoadingMotivo] = useState(false);

    const handleAddCustomControl = (e) => {
        let _filters = [...filters];
        _filters.push({ id: filters.length + 1, type: 'TEXT', value: null, optionSelect: null });
        setFilters(_filters);
    }
    const handleRemoveCustomControl = (control) => {
        let _filters = [...filters].filter(e => e.id != control.id);
        setFilters(_filters);
    }
    const handleAsignCustomControl = (e, control) => {
        let _filters = [...filters];
        let valueSelected = e.target.value;
        let _filterIndex = _filters.findIndex(e => e.id === control.id);

        let _field = [...fieldsFilterCustom].find(e => e.code === valueSelected);

        let _control = filters[_filterIndex];
        _control.optionSelect = valueSelected;
        _control.type = _field.type;
        _control.value = null;
        _filters[_filterIndex] = _control;
        setFilters(_filters);
    }
    const handleAsignCustomConditionControl = (e, control) => {
        let _filters = [...filters];
        let valueSelected = e.target.value;
        let _filterIndex = _filters.findIndex(e => e.id === control.id);

        //let _field = [...fieldsFilterCustom].find(e => e.code === valueSelected);

        let _control = filters[_filterIndex];
        //_control.optionSelect = valueSelected;
        //_control.type = _field.type;
        _control.condition = valueSelected;
        //_control.value = null;
        _filters[_filterIndex] = _control;
        setFilters(_filters);
    }
    const handleAsignValueCustomControl = (control, value) => {
        let _filters = [...filters];
        let _filterIndex = _filters.findIndex(e => e.id === control.id);
        let _control = filters[_filterIndex];
        _control.value = value;
        _filters[_filterIndex] = _control;
        setFilters(_filters);
    }

    const handleChangeControlBasic = (e) => {

        let _basicFilter = { ...basicFilter, [e.target.name]: e.target.value };
        setBasicFilter(_basicFilter);

        if (e.target.name === "idaccion") {
            setLoadingEfecto(true);
            new CommonService().getEfectoByArrayAccion(e.target.value).then(
                data => {
                    setListEfecto(data);
                    setBasicFilter({ ..._basicFilter, 'idefecto': null });
                    setLoadingEfecto(false);
                }
            )
        } else if (e.target.name === "idefecto") {
            setLoadingMotivo(true);
            new CommonService().getMotivoByArrayEfecto(e.target.value).then(
                data => {
                    setListMotivo(data);
                    setBasicFilter({ ..._basicFilter, 'idmotivo': null });
                    setLoadingMotivo(false);
                }
            )
        }


    }

    const listFilterCustom = filters.map((control) =>
        <React.Fragment>
            <div className="p-field p-col-12 p-md-4">
                <Dropdown
                    appendTo={document.body}
                    value={control.optionSelect}
                    optionValue="code"
                    optionLabel="name"
                    options={fieldsFilterCustom} onChange={(e) => { handleAsignCustomControl(e, control) }} />
            </div>
            <div className="p-field p-col-12 p-md-3">
                <Dropdown
                    appendTo={document.body}
                    value={control.condition}
                    optionValue="val"
                    optionLabel="text"
                    options={conditions.filter(e=>e.type == control.type)} onChange={(e) => { handleAsignCustomConditionControl(e, control) }} />
            </div>
            <div className="p-field p-col-12 p-md-3">

                {
                    {
                        'TEXT': <InputText appendTo={document.body} value={control.value} onChange={(e) => handleAsignValueCustomControl(control, e.target.value)} />,
                        'NUMBER': <InputText appendTo={document.body} value={control.value} onChange={(e) => handleAsignValueCustomControl(control, e.target.value)} />,
                        'CALENDAR': <Calendar id="range" appendTo={document.body} value={control.value} onChange={(e) => handleAsignValueCustomControl(control, e.value)} selectionMode="range" readOnlyInput />,
                        'ITEMS': <MultiSelect appendTo={document.body}
                            value={control.value} options={listCustom} onChange={(e) => handleAsignValueCustomControl(control, e.value)} optionLabel="name" placeholder="Seleccione motivo" />
                    }[control.type]
                }
            </div>
            <div className="p-field p-col-12 p-md-2">
                <Button label="Remove" onClick={() => handleRemoveCustomControl(control)} className="p-button-link" />

            </div>
        </React.Fragment>
    );
    const buttonsFooterDialog = (nameLeft, actionLeft, nameRight, actionRight) => {
        return (
            <>
                <Button label="Limpiar Filtro" icon="pi pi-times" className="p-button-text" onClick={() => setBasicFilter({})} />
                <Button label={nameLeft} icon="pi pi-times" className="p-button-text" onClick={actionLeft} />
                <Button label={nameRight} icon="pi pi-check" className="p-button-text" onClick={actionRight} />
            </>
        );
    }

    const handleFilter = () => {

        let post = {
            id_table: props.entityId
        };

        if (basicFilter.idaccion && basicFilter.idaccion.length > 0) {
            post.id_accion = basicFilter.idaccion
        }
        if (basicFilter.idefecto && basicFilter.idefecto.length > 0) {
            post.id_efecto = basicFilter.idefecto
        }
        if (basicFilter.idmotivo && basicFilter.idmotivo.length > 0) {
            post.id_motivo = basicFilter.idmotivo
        }


        let p_custom = filters.filter(e => e.optionSelect !== null && (e.type === "TEXT" || e.type === "NUMBER")  );
        if (p_custom && p_custom.length > 0) {
            post.custom = p_custom;
        }
       
        let p_fecha_gestion = filters.find(e => e.optionSelect === "FG" && e.type === "CALENDAR");
        if (p_fecha_gestion) {
            post.fecha_gestion = p_fecha_gestion;
        }
        let p_fecha_asignacion = filters.find(e => e.optionSelect === "FA" && e.type === "CALENDAR");
        if (p_fecha_asignacion) {
            post.fecha_asignacion = p_fecha_asignacion;
        }


        props.filterGestion(post);
    }

    useEffect(() => {

        if (props.dialogFiltro) {
            let service = new CommonService();
            service.getAccionAll().then(
                data => setListAccion(data)
            )

            let fieldsCustoms = [];
            fieldsCustoms.push({ name: 'Fecha de Gestión', code: 'FG', type: 'CALENDAR' });
            fieldsCustoms.push({ name: 'Fecha de Asignación', code: 'FA', type: 'CALENDAR' });

            props.columnsGridMain.filter(f => f.table == 1).forEach(col => {
                fieldsCustoms.push({ name: col.header.replaceAll('_', ' '), code: col.field, type: col.type });
            })

            setFieldsFilterCustom(fieldsCustoms);
        }

    }, [props.dialogFiltro]);


    return (
        <React.Fragment>
            <Dialog
                autoZIndex="false"
                visible={props.dialogFiltro}
                style={{ width: "800px" }}
                header="Filtro de gestión" modal
                onHide={() => { props.setDialogFiltro(false); }}

                footer={buttonsFooterDialog("Cancelar", () => { props.setDialogFiltro(false) }, "Filtrar", () => { props.setDialogFiltro(false); handleFilter() })} >
                <div className="p-fluid">
                    <div className="p-field">
                        <React.Fragment>
                            <div className="p-fluid p-formgrid p-grid p-mt-3">
                                <div className="p-field p-col-12 p-md-4">
                                    <Dropdown optionLabel="name" placeholder="ACCIÓN" disabled={true} />
                                </div>
                                <div className="p-field p-col-12 p-md-1">
                                    <label htmlFor="state" className="p-mt-2">igual a</label>
                                </div>
                                <div className="p-field p-col-12 p-md-7">
                                    <MultiSelect appendTo={document.body}
                                        name="idaccion" showClear
                                        value={basicFilter.idaccion} options={listAccion}
                                        onChange={handleChangeControlBasic}
                                        optionValue="IDACCION" optionLabel="ACCION"
                                        placeholder="Seleccione acción" />
                                </div>

                                <div className="p-field p-col-12 p-md-4">
                                    <Dropdown optionLabel="name" placeholder="EFECTO" disabled={true} />
                                </div>
                                <div className="p-field p-col-12 p-md-1">
                                    <label htmlFor="state" className="p-mt-2">igual a</label>
                                </div>
                                <div className="p-field p-col-12 p-md-7">
                                    {loadingEfecto ? <Skeleton className="p-mb-2" height="2.3rem" ></Skeleton> :
                                        <MultiSelect appendTo={document.body}
                                            name="idefecto" showClear
                                            value={basicFilter.idefecto} options={listEfecto}
                                            onChange={handleChangeControlBasic}
                                            optionValue="IDEFECTO" optionLabel="EFECTO"
                                            placeholder="Seleccione Efecto" />
                                    }
                                </div>

                                <div className="p-field p-col-12 p-md-4">
                                    <Dropdown optionLabel="name" placeholder="MOTIVO" disabled={true} />
                                </div>
                                <div className="p-field p-col-12 p-md-1">
                                    <label htmlFor="state" className="p-mt-2">igual a</label>
                                </div>
                                <div className="p-field p-col-12 p-md-7">
                                    {loadingMotivo ? <Skeleton className="p-mb-2" height="2.3rem" ></Skeleton> :
                                        <MultiSelect appendTo={document.body}
                                            name="idmotivo" showClear
                                            value={basicFilter.idmotivo} options={listMotivo}
                                            onChange={handleChangeControlBasic}
                                            optionValue="IDMOTIVO" optionLabel="MOTIVO"
                                            placeholder="Seleccione Efecto" />
                                    }
                                </div>
                                <div className="p-field p-col-12 p-md-4">
                                    <Button label="Agregar filtro" onClick={handleAddCustomControl} className="p-button-link" />
                                </div>
                                <div className="p-field p-col-12 p-md-1">

                                </div>
                                <div className="p-field p-col-12 p-md-7">

                                </div>


                            </div>
                        </React.Fragment>

                        <div className="p-fluid p-formgrid p-grid p-mt-3">
                            {listFilterCustom}
                        </div>
                    </div>
                </div>
            </Dialog>
        </React.Fragment>
    )

}