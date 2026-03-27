import React, { useContext } from "react";
import NumberFormat from "react-number-format";
import PanelContext from "../context/Panel/PanelContext";

export const TotalNumber = (props) => {
    // let customers = props.customers;

    const panelContext = useContext(PanelContext);

    let montos = props.customers.reduce(
        (counter, obj) => {
            counter.montot_sol += obj.MONEDA == "SOL" && parseFloat(obj.MONTOACOBRAR);
            counter.montot_dol += obj.MONEDA == "USD" && parseFloat(obj.MONTOACOBRAR);
            counter.montoc_sol += obj.MONEDA == "SOL" && parseFloat(obj.MONTOCAMPANA);
            counter.montoc_dol += obj.MONEDA == "USD" && parseFloat(obj.MONTOCAMPANA);
            return counter;
        },
        { montot_sol: 0, montot_dol: 0, montoc_sol: 0, montoc_dol: 0 }
    );
    return (
        <React.Fragment>
            <span style={{ background: "#f8f9fa", fontSize: 12, fontWeight: 700 }}>
                {panelContext.selectedCarteraId && panelContext.selectedCarteraId === 75 ? "LINEA ACOTADA" : "MONTO A COBRAR"} :<label> SOLES S/.</label>
                <NumberFormat value={montos.montot_sol} displayType={"text"} thousandSeparator={true} prefix={""} />
                <label> | DOLARES $ </label>
                <NumberFormat value={montos.montot_dol} displayType={"text"} thousandSeparator={true} prefix={""} />
            </span>
            <br />
            <span style={{ background: "#f8f9fa", fontSize: 12, fontWeight: 700 }}>
                MONTO DE CAMPAÑA :<label> SOLES S/.</label>
                <NumberFormat value={montos.montoc_sol} displayType={"text"} thousandSeparator={true} prefix={""} />
                <label> | DOLARES $ </label>
                <NumberFormat value={montos.montoc_dol} displayType={"text"} thousandSeparator={true} prefix={""} />
            </span>
        </React.Fragment>
    );
};
