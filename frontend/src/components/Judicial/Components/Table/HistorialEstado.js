import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";

export const HistorialEstado = ({ visible, data, closeEstadoProcesal, viewEstadoProcesal }) => {
    const IMAGE_URL = `${process.env.REACT_APP_ROUTE_IMAGE}`;

    return (
        <Dialog header="Detalle del Estado Procesal" visible={visible} style={{ width: "70vw" }} modal onHide={closeEstadoProcesal}>
            <DataTable value={data} paginator rows={5} responsiveLayout="scroll">
                <Column field="SJFechaEstadoProcesal" header="FECHA" body={(rowData) => new Date(rowData.SJFechaEstadoProcesal).toLocaleDateString()} />
                <Column field="SJTipoEscrito" header="TIPO DE ESCRITO" />
                <Column field="SJObservacion" header="OBSERVACIÓN" />
                <Column
                    field="SJEPAdjunto"
                    header="ADJUNTO"
                    body={(rowData) =>
                        rowData.SJEPAdjunto ? (
                            <a href={`${IMAGE_URL}${rowData.SJEPAdjunto}`} target="_blank" rel="noopener noreferrer">
                                Ver archivo
                            </a>
                        ) : (
                            "-"
                        )
                    }
                />
                <Column header="ACCIONES" body={(rowData) => <Button icon="pi pi-eye" className="p-button-text p-button-sm" tooltip="Ver detalle" onClick={() => viewEstadoProcesal(rowData)} />} />
            </DataTable>
        </Dialog>
    );
};
