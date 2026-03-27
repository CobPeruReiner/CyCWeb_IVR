import React, { useEffect, useState } from "react";
import { Skeleton } from 'primereact/skeleton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export const SkeletonTable = (props) => {
    const temp = new Array(5);
    const bodyTemplate = () => {
        return <Skeleton></Skeleton>
    }
    return (
        <>
            <DataTable value={temp}
                scrollable scrollHeight="200px"
                selectionMode="single"
                emptyMessage="No se encontró información."
                style={{ fontSize: '12px' }}
                stripedRows className="p-datatable-sm p-datatable-gridlines">
                <Column selectionMode="single" headerStyle={{ width: '3em' }}></Column>
                <Column headerStyle={{ width: '100px' }} body={bodyTemplate} header="TELEFONO"></Column>
                <Column headerStyle={{ width: '100px' }} body={bodyTemplate} header="OPERADOR"></Column>
                <Column headerStyle={{ width: '100px' }} body={bodyTemplate} header="FUENTE"></Column>
                <Column headerStyle={{ width: '100px' }} body={bodyTemplate} header="TIPO"></Column>
                <Column headerStyle={{ width: '250px' }} body={bodyTemplate} header="PERSONAL"></Column>
            </DataTable>

        </>
    );
};
