import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";

export const HSolDemanda = ({ visible, data, closeSolDemandaPositivo, viewSolDemandaPositivo }) => {
    const IMAGE_URL = `${process.env.REACT_APP_ROUTE_IMAGE}`;

    const fechaTemplate = (rowData) => (rowData.SJFechaDemanda ? new Date(rowData.SJFechaDemanda).toLocaleDateString() : "-");

    const adjuntoTemplate = (rowData) =>
        rowData.SJDemandaAdjunto ? (
            <a href={`${IMAGE_URL}${rowData.SJDemandaAdjunto}`} target="_blank" rel="noopener noreferrer">
                Ver archivo
            </a>
        ) : (
            "-"
        );

    return (
        <Dialog header="Detalle de la Solicitud de Demanda" visible={visible} style={{ width: "70vw" }} modal onHide={closeSolDemandaPositivo} className="text-sm">
            <DataTable value={data} paginator rows={5} responsiveLayout="scroll" emptyMessage="No hay registros">
                <Column field="SJFechaDemanda" header="FECHA DEMANDA" body={fechaTemplate} />
                <Column field="SJTipoEscrito" header="TIPO DE ESCRITO" />
                <Column field="SJObservacion" header="OBSERVACIÓN" />
                <Column field="SJObservacionCal" header="OBS. CALIFICACIÓN" />
                <Column field="SJJuzgado" header="JUZGADO" />
                <Column field="SJNumeroExpediente" header="NRO EXPEDIENTE" />
                <Column field="SJDemandaAdjunto" header="ADJUNTO" body={adjuntoTemplate} />
                <Column header="ACCIONES" body={(rowData) => <Button icon="pi pi-eye" className="p-button-text p-button-sm" tooltip="Ver detalle" onClick={() => viewSolDemandaPositivo(rowData)} />} />
            </DataTable>
        </Dialog>
    );
};
