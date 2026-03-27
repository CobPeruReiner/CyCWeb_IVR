import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";

export const TCalDemandaPositivo = ({ visible, onHide, data, title }) => {
    const adjuntoTemplate = (rowData) => {
        return rowData.adjunto ? (
            <a href={rowData.adjunto} target="_blank" rel="noopener noreferrer">
                Ver archivo
            </a>
        ) : (
            "-"
        );
    };

    return (
        <Dialog header={title} visible={visible} style={{ width: "800px" }} modal onHide={onHide} footer={<Button label="Cerrar" icon="pi pi-times" className="p-button-text" onClick={onHide} />}>
            <div className="p-card" style={{ background: "#e9ecef", padding: "1rem" }}>
                <DataTable value={data} paginator rows={5} emptyMessage="Sin registros">
                    <Column field="fecha" header="FECHA" />
                    <Column field="tipoEscrito" header="TIPO DE ESCRITO" />
                    <Column field="observacion" header="OBSERVACIÓN" />
                    <Column header="ADJUNTO" body={adjuntoTemplate} />
                </DataTable>
            </div>
        </Dialog>
    );
};
