import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";

export const HPropiedad = ({ visible, data, closeInfoPropiedad, viewInfoPropiedad }) => {
    const IMAGE_URL = `${process.env.REACT_APP_ROUTE_IMAGE}`;

    const fechaRegistroTemplate = (rowData) => (rowData.SJFechaReg ? new Date(rowData.SJFechaReg).toLocaleDateString() : "-");

    const adjuntoTemplate = (ruta) =>
        ruta ? (
            <a href={`${IMAGE_URL}${ruta}`} target="_blank" rel="noopener noreferrer">
                Ver archivo
            </a>
        ) : (
            "-"
        );

    return (
        <Dialog header="Detalle de Información de Propiedad" visible={visible} style={{ width: "70vw" }} modal onHide={closeInfoPropiedad} className="text-sm">
            <DataTable value={data} paginator rows={5} responsiveLayout="scroll" emptyMessage="No hay registros">
                <Column field="EstadoPropiedadDescripcion" header="ESTADO PROPIEDAD" />
                <Column field="GravamenDescripcion" header="GRAVAMEN" />
                <Column field="TipoGravamenDescripcion" header="TIPO GRAVAMEN" />
                <Column field="RangoGravamenDescripcion" header="RANGO" />
                <Column field="SJMontoGravamen" header="MONTO" />
                <Column header="FOTO" body={(rowData) => adjuntoTemplate(rowData.SJFoto)} />
                <Column header="PARTIDA" body={(rowData) => adjuntoTemplate(rowData.SJPartida)} />
                <Column field="SJDetalleBien" header="DETALLE DEL BIEN" />
                <Column field="SJEstadoPropiedadObs" header="OBS. ESTADO PROPIEDAD" />
                <Column field="SJTipoGravamenObs" header="OBS. TIPO GRAVAMEN" />
                <Column field="SJFechaReg" header="FECHA REGISTRO" body={fechaRegistroTemplate} />
                <Column header="ACCIONES" body={(rowData) => <Button icon="pi pi-eye" className="p-button-text p-button-sm" tooltip="Ver detalle" onClick={() => viewInfoPropiedad(rowData)} />} />
            </DataTable>
        </Dialog>
    );
};
