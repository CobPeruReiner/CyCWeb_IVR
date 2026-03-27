import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";

export const TSegProcesalPositivo = ({ visible, onHide, data, title, viewSeguimientoProcesal }) => {
    const IMAGE_URL = `${process.env.REACT_APP_ROUTE_IMAGE}`;

    const fechaTemplate = (rowData) => (rowData.SJFechaEstado ? new Date(rowData.SJFechaEstado).toLocaleDateString() : "-");

    const adjuntoTemplate = (rowData) =>
        rowData.SJAdjuntoEstado ? (
            <a href={`${IMAGE_URL}${rowData.SJAdjuntoEstado}`} target="_blank" rel="noopener noreferrer">
                Ver archivo
            </a>
        ) : (
            "-"
        );

    return (
        <Dialog header={title} visible={visible} style={{ width: "800px" }} modal onHide={onHide} footer={<Button label="Cerrar" icon="pi pi-times" className="p-button-text" onClick={onHide} />}>
            <div className="p-card" style={{ background: "#e9ecef", padding: "1rem" }}>
                <DataTable value={data} paginator rows={5} emptyMessage="Sin registros">
                    <Column field="SJFechaEstado" header="FECHA" body={fechaTemplate} />
                    <Column field="SJTipoEscrito" header="TIPO DE ESCRITO" />
                    <Column field="SJObservacion" header="OBSERVACIÓN" />
                    <Column header="ADJUNTO" body={adjuntoTemplate} />
                    <Column header="ACCIONES" body={(rowData) => <Button icon="pi pi-eye" className="p-button-text p-button-sm" tooltip="Ver detalle" onClick={() => viewSeguimientoProcesal(rowData)} />} />
                </DataTable>
            </div>
        </Dialog>
    );
};
