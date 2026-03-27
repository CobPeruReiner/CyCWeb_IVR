import { useContext } from "react";
// import { Button } from "primereact/button";
import { SIPContext } from "../../../context/JsSIP/JsSIPContext";

export const Keypad = () => {
    const { numeroBloqueado, appendNumero, deleteLastDigit } = useContext(SIPContext);

    const keys = [{ label: "1" }, { label: "2" }, { label: "3" }, { label: "4" }, { label: "5" }, { label: "6" }, { label: "7" }, { label: "8" }, { label: "9" }, { label: "*" }, { label: "0" }, { borrar: true }];

    return (
        <div className="p-grid p-justify-center p-mt-3" style={{ maxWidth: 260, margin: "auto" }}>
            {keys.map((key, index) => (
                <div className="p-col-4 p-text-center" key={index}>
                    <div
                        onClick={() => {
                            if (numeroBloqueado) return;
                            key.borrar ? deleteLastDigit() : appendNumero(key.label);
                        }}
                        style={{
                            width: 65,
                            height: 65,
                            borderRadius: "50%",
                            backgroundColor: numeroBloqueado ? "#e0e0e0" : "#f5f5f5",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "1.6rem",
                            fontWeight: "bold",
                            cursor: numeroBloqueado ? "not-allowed" : "pointer",
                            userSelect: "none",
                            margin: "auto",
                            opacity: numeroBloqueado ? 0.5 : 1,
                            transition: "all 0.15s ease-in-out",
                        }}
                        title={numeroBloqueado ? "Teclado bloqueado" : key.borrar ? "Borrar" : `Número ${key.label}`}
                        onMouseDown={(e) => {
                            if (!numeroBloqueado) e.currentTarget.style.transform = "scale(0.95)";
                        }}
                        onMouseUp={(e) => {
                            if (!numeroBloqueado) e.currentTarget.style.transform = "scale(1)";
                        }}
                    >
                        {key.borrar ? "⌫" : key.label}
                    </div>
                </div>
            ))}
        </div>
    );
};
