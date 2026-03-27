import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Panel } from 'primereact/panel';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from 'primereact/button';
import PanelContext from './context/Panel/PanelContext';
import PanelState from './context/Panel/PanelState';
import { Divider } from 'primereact/divider';
import { Skeleton } from 'primereact/skeleton';
import { SkeletonTable } from './components/SkeletonTable';
export const AppConfig = (props) => {

    const [active, setActive] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedPhone, setSelectedPhone] = useState(null);
    const panelContext = useContext(PanelContext);
    const dataTelefonos_nuevos = [

    ]



    const config = useRef(null);
    let outsideClickListener = useRef(null);

    const unbindOutsideClickListener = useCallback(() => {
        if (outsideClickListener.current) {
            document.removeEventListener('click', outsideClickListener.current);
            outsideClickListener.current = null;
        }
    }, []);

    const hideConfigurator = useCallback((event) => {
        setActive(false);
        unbindOutsideClickListener();
        event.preventDefault();
    }, [unbindOutsideClickListener]);

    const bindOutsideClickListener = useCallback(() => {
        if (!outsideClickListener.current) {
            outsideClickListener.current = (event) => {
                if (active && isOutsideClicked(event)) {
                    hideConfigurator(event);
                }
            };
            document.addEventListener('click', outsideClickListener.current);
        }
    }, [active, hideConfigurator]);

    /*
    useEffect(() => {
        if (active) {
            bindOutsideClickListener()
        }
        else {
            unbindOutsideClickListener()
        }
    }, [active, bindOutsideClickListener, unbindOutsideClickListener]);
    */
    useEffect(() => {

    }, []);


    const isOutsideClicked = (event) => {
        return !(config.current.isSameNode(event.target) || config.current.contains(event.target));
    }

    const toggleConfigurator = (event) => {
        setActive(prevState => !prevState);
    }

    const configClassName = classNames('layout-config', {
        'layout-config-active': active
    });
    const stateBodyTemplate = (rowData) => {

        return <span className={`state-row status-${rowData.color}`}>{rowData.NUMERO}</span>
    };
    return (
        <div ref={config} className={configClassName}>
            <div className="layout-config-content-wrapper">
                <button className="layout-config-button p-link" onClick={toggleConfigurator}>
                    <i className="pi pi-phone"></i>
                </button>
                <button className="layout-config-close p-link" onClick={hideConfigurator}>
                    <i className="pi pi-times"></i>
                </button>
            </div>

            < div className="layout-config-content">



                <div className="p-pt-4" style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Cliente</div>
                {panelContext.selectedCustomer &&
                    <div>
                        <p>Nombre : {panelContext.selectedCustomer.nom_cliente}</p>
                        <p>Documento : {panelContext.selectedCustomer.documento}</p>

                        <div className="p-grid p-justify-center">
                            <Button label="Actualizar Teléfono" icon="pi pi-phone"
                                onClick={() => { props.onDialogActualizarTelefono(panelContext.selectedCustomer) }}
                                className="p-button-raised p-button-secondary p-mt-2" />
                            <Button label="Actualizar Dirección" icon="pi pi-book"
                                onClick={() => { props.onDialogActualizarDireccion(panelContext.selectedCustomer) }} className="p-button-raised p-button-secondary p-mt-2 p-ml-2" />
                        </div>
                    </div>

                }
                <Divider />
                <div className="p-pt-4" style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Teléfonos</div>
                {panelContext.selectedCustomer &&
                    <React.Fragment>
                        {panelContext.dataTelefonos == null ? <SkeletonTable /> :
                            <DataTable value={panelContext.dataTelefonos}
                                scrollable scrollHeight="200px"
                                loading={loading}
                                selection={selectedPhone}
                                selectionMode="single"
                                emptyMessage="No se encontró información."
                                onSelectionChange={e => {
                                    setSelectedPhone(e.value);
                                    panelContext.setSelectedPhone(e.value);
                                }}
                                dataKey="IDTELEFONO"
                                style={{ fontSize: '12px' }}
                                stripedRows className="p-datatable-sm p-datatable-gridlines">
                                <Column selectionMode="single" headerStyle={{ width: '3em' }}></Column>
                                <Column body={stateBodyTemplate} header="TELEFONO"></Column>
                                <Column field="FUENTE" header="FUENTE"></Column>
                                <Column field="TIPO" header="TIPO"></Column>
                            </DataTable>}

                    </React.Fragment>
                }
               

            </div>


        </div >
    );
}
