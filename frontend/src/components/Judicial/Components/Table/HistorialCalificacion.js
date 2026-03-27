import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import moment from "moment";
import { Button } from "primereact/button";

export const HistorialCalificacion = ({ visible, onHide, data, viewDetallesDemandas }) => {
    const formatFecha = (rowData) => {
        return rowData.SJFechaDemanda ? moment(rowData.SJFechaDemanda).format("DD/MM/YYYY") : "-";
    };

    const IMAGE_URL = `${process.env.REACT_APP_ROUTE_IMAGE}`;

    return (
        <Dialog header="Detalle de la Calificación de la Demanda" visible={visible} style={{ width: "70vw" }} modal onHide={onHide}>
            <DataTable value={data} paginator rows={5} responsiveLayout="scroll">
                <Column header="FECHA" body={formatFecha} />
                <Column field="SJTipoEscrito" header="TIPO DE ESCRITO" />
                <Column field="SJObservacion" header="OBSERVACIÓN" />
                <Column
                    field="SJDemandaAdjunto"
                    header="ADJUNTO"
                    body={(rowData) =>
                        rowData.SJDemandaAdjunto ? (
                            <a href={`${IMAGE_URL}${rowData.SJDemandaAdjunto}`} target="_blank" rel="noopener noreferrer">
                                Ver archivo
                            </a>
                        ) : (
                            "-"
                        )
                    }
                />
                <Column header="ACCIONES" body={(rowData) => <Button icon="pi pi-eye" className="p-button-text p-button-sm" onClick={() => viewDetallesDemandas(rowData)} tooltip="Cargar en el formulario" />} />
            </DataTable>
        </Dialog>
    );
};
