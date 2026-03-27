import { useReducer } from "react";
import { GET_BIODIVERSITIES, SET_USERLOGIN, SET_ETIQUETAS, SET_TELEFONOS, SET_SELECTEDCUSTOMER, SET_SELECTEDPHONE, SET_SELECTEDENTITYID, SET_SELECTEDCARTERAID } from "../../types";
import PanelContext from "./PanelContext";
import PanelReducer from "./PanelReducer";

const PanelState = (props) => {
    const initialState = {
        userLogin: null,
        biodiversities: [],
        dataTelefonos: [],
        etiquetas: [],
        selectedEntityId: null,
        selectedCarteraId: null,
        selectedCustomer: null,
        selectedPhone: null,
    };
    const [state, dispatch] = useReducer(PanelReducer, initialState);

    const getBiosystems = () => {
        dispatch({
            type: GET_BIODIVERSITIES,
            payload: [
                { id: 1, name: "aa" },
                { id: 2, name: "vvv" },
                { id: 3, name: "ccc" },
            ],
        });
    };

    const setUserLogin = (e) => {
        dispatch({ type: SET_USERLOGIN, payload: e });
    };

    const setEtiquetas = (e) => {
        dispatch({ type: SET_ETIQUETAS, payload: e });
    };

    const setTelefonos = (e) => {
        dispatch({ type: SET_TELEFONOS, payload: e });
    };

    const setSelectedEntityId = (e) => {
        dispatch({ type: SET_SELECTEDENTITYID, payload: e });
    };

    const setSelectedCarteraId = (e) => {
        dispatch({ type: SET_SELECTEDCARTERAID, payload: e });
    };

    const setSelectedCustomer = (e) => {
        dispatch({ type: SET_SELECTEDCUSTOMER, payload: e });
    };

    const setSelectedPhone = (e) => {
        dispatch({ type: SET_SELECTEDPHONE, payload: e });
    };

    return (
        <PanelContext.Provider
            value={{
                userLogin: state.userLogin,
                biodiversities: state.biodiversities,
                selectedEntityId: state.selectedEntityId,
                selectedCarteraId: state.selectedCarteraId,
                etiquetas: state.etiquetas,
                dataTelefonos: state.dataTelefonos,
                selectedCustomer: state.selectedCustomer,
                selectedPhone: state.selectedPhone,
                getBiosystems,
                setEtiquetas,
                setTelefonos,
                setSelectedCustomer,
                setSelectedPhone,
                setSelectedEntityId,
                setSelectedCarteraId,
                setUserLogin,
            }}
        >
            {props.children}
        </PanelContext.Provider>
    );
};
export default PanelState;
