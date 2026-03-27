import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";

export const HMedCautelar = ({ visible, data, closeInfoMedidaCautelar, viewInfoMedidaCautelar }) => {
    const IMAGE_URL = `${process.env.REACT_APP_ROUTE_IMAGE}`;

    const fechaSolicitudTemplate = (rowData) => (rowData.SJFechaSolicitud ? new Date(rowData.SJFechaSolicitud).toLocaleDateString() : "-");

    const adjuntoTemplate = (ruta) =>
        ruta ? (
            <a href={`${IMAGE_URL}${ruta}`} target="_blank" rel="noopener noreferrer">
                Ver archivo
            </a>
        ) : (
            "-"
        );

    return (
        <Dialog header="Detalle de la Medida Cautelar" visible={visible} style={{ width: "70vw" }} modal onHide={closeInfoMedidaCautelar} className="text-sm">
            <DataTable value={data} paginator rows={5} responsiveLayout="scroll" emptyMessage="No hay registros">
                <Column field="SJJuzgado" header="JUZGADO" />
                <Column field="SJNumeroExpediente" header="NRO EXPEDIENTE" />
                <Column field="SJFechaSolicitud" header="FECHA SOLICITUD" body={fechaSolicitudTemplate} />
                <Column header="ADJUNTO FECHA" body={(rowData) => adjuntoTemplate(rowData.SJAdjuntoFechaSolicitud)} />
                <Column field="SJObservacion" header="OBSERVACIÓN" />
                <Column header="ADJUNTO CALIFICACIÓN" body={(rowData) => adjuntoTemplate(rowData.SJAdjuntoMCautelar)} />
                <Column field="SJTipoEscritoMCautelar" header="TIPO DE ESCRITO" />
                <Column field="SJObservacionMCautelar" header="OBS. CALIFICACIÓN" />
                <Column header="ACCIONES" body={(rowData) => <Button icon="pi pi-eye" className="p-button-text p-button-sm" tooltip="Ver detalle" onClick={() => viewInfoMedidaCautelar(rowData)} />} />
            </DataTable>
        </Dialog>
    );
};
