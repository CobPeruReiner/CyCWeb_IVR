import { GET_BIODIVERSITIES, SET_USERLOGIN, SET_ETIQUETAS, SET_TELEFONOS, SET_SELECTEDCUSTOMER, SET_SELECTEDPHONE ,SET_SELECTEDENTITYID, SET_SELECTEDCARTERAID} from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_BIODIVERSITIES:
      return {
        ...state,
        biodiversities: payload,
      };
    case SET_USERLOGIN:
      return {
        ...state,
        userLogin: payload
      };
    case SET_ETIQUETAS:
      return {
        ...state,
        etiquetas: payload,
      };
    case SET_TELEFONOS:
      return {
        ...state,
        dataTelefonos: payload,
      };
    case SET_SELECTEDCUSTOMER:
      return {
        ...state,
        selectedCustomer: payload,
      };
    case SET_SELECTEDPHONE:
      return {
        ...state,
        selectedPhone: payload,
      };
    case SET_SELECTEDENTITYID:
      return {
        ...state,
        selectedEntityId: payload,
      };
    case SET_SELECTEDCARTERAID:
      return {
        ...state,
        selectedCarteraId: payload,
      };
    default:
      return state;
  }
};
