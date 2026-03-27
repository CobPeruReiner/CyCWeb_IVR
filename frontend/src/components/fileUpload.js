import { Button } from "primereact/button";

export const FileUploadButton = ({ id, onFileSelect, disabled }) => {
    return (
        <>
            <input
                type="file"
                id={id}
                style={{ display: "none" }}
                onChange={(e) => {
                    const file = e.target.files[0];
                    onFileSelect(file);
                }}
            />
            <Button disabled={disabled} icon="pi pi-file" className="p-button-sm p-button-text p-button-plain" style={{ fontSize: "0.75rem", width: "1.2rem", height: "1.2rem", padding: 0 }} onClick={() => document.getElementById(id).click()} />
        </>
    );
};
