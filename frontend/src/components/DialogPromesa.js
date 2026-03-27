import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from 'primereact/dialog';
import { Skeleton } from 'primereact/skeleton';
import { MultiSelect } from 'primereact/multiselect';

export const ButtonDialogPromesa = (props) => {


    useEffect(() => {
    },  [props.dialogGestion]);
    
    return (
        <React.Fragment>
            <Dialog
                autoZIndex="false"
                visible={props.visible}
                style={{ width: "750px" }}
                header="Cronograma de promesas" modal
                onHide={() => { props.setDialogPromesas(false); }} >
                <div className="confirmation-content">
                    <DataTable value={props.data} style={{ fontSize: '12px' }} className="p-datatable-sm p-datatable-gridlines">
                        <Column field="fecha_promesa" header="FECHA"></Column>
                        <Column field="moneda" header="MONEDA"></Column>
                        <Column field="monto_promesa" header="MONTO"></Column>
                        <Column field="personal" header="ESTADO"></Column>
                    </DataTable>
                </div>
            </Dialog>
        </React.Fragment>
    )

}