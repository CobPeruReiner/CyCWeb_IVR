import axios from "axios";
import { LocalStorageService } from "./LocalStorageService";
const api = axios.create({
    baseURL: process.env.REACT_APP_ROUTE_API,
});

api.interceptors.request.use(
    (config) => {
        const token = new LocalStorageService().getAccessToken();
        if (token) {
            config.headers.common["api_token"] = token;
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

export class CommonService {
    getCompanies() {
        return api.get("telefono/companies").then((res) => res.data);
    }

    getDepartamento() {
        return axios.get("assets/demo/data/departamentos.json").then((res) => res.data);
    }

    getProvincia() {
        return axios.get("assets/demo/data/provincias.json").then((res) => res.data);
    }

    getDistritos() {
        return axios.get("assets/demo/data/distritos.json").then((res) => res.data);
    }
    getAccionAll() {
        return api.get("accion").then((res) => res.data);
    }

    getAccion(tipo) {
        return api.get("accion/" + tipo).then((res) => res.data);
    }
    getAccionByCartera(tipo, idtabla) {
        return api.get("accion/" + tipo + "/" + idtabla).then((res) => res.data);
    }
    getEfecto(idAccion) {
        return api.get("efecto/" + idAccion).then((res) => res.data);
    }
    getEfectoByArrayAccion(listAccion) {
        return api.post("efecto", { ids: listAccion }).then((res) => res.data);
    }
    getMotivo(idEfecto) {
        return api.get("motivo/" + idEfecto).then((res) => res.data);
    }
    getMotivoByArrayEfecto(listEfecto) {
        return api.post("motivo", { ids: listEfecto }).then((res) => res.data);
    }
    getContacto(idEfecto) {
        return api.get("contacto/" + idEfecto).then((res) => res.data);
    }
    getCategoria() {
        return api.get("categoria").then((res) => res.data);
    }
    getTiendasAV() {
        return api.get("tiendaAV").then((res) => res.data);
    }
    getAgendamientosByIdentificador(identificador) {
        return api.get("tiendaAV/agendamientos/" + identificador).then((res) => res.data);
    }
}
