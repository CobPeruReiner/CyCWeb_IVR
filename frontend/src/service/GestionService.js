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
    },
);

export class GestionService {
    save(e) {
        return api.post("indice", e).then((res) => res.data);
    }

    update(e) {
        return api.put("indice" + e.codIndice, e).then((res) => res.data);
    }

    delete(e) {
        return api.delete("indice/" + e.codIndice).then((res) => res.data);
    }

    getAll() {
        return api.get("indices").then((res) => res.data);
    }

    getById(codIndice) {
        return api.get("indice/" + codIndice).then((res) => res.data);
    }

    getAllByEncuesta(codEncuesta) {
        return api.get("indices/encuesta/" + codEncuesta).then((res) => res.data);
    }

    async getByCodEncuestaAsync(codEncuesta) {
        const res = await api.get("parametro/encuesta/" + codEncuesta);
        return await res.data;
    }

    getFilter(filter, entityId) {
        return api.post("gestion", { filter: filter, id_table: entityId }).then((res) => res.data);
    }

    getEstructura(idTable) {
        return api.get("gestion/gui/" + idTable).then((res) => res.data);
    }
    getHistorialPromesa(idTable, idHistorial) {
        return api.get("gestion/historial/" + idTable + "/" + idHistorial).then((res) => res.data);
    }

    getProgramacion(idTable, idPersonal) {
        return api.get("gestion/programadas/" + idTable + "/user/" + idPersonal).then((res) => res.data);
    }

    getCuotasAutoplanNoAdjudicado(identificador) {
        return api.get("gestion/cuotas/autoplanna/" + identificador).then((res) => res.data);
    }

    // getTelefonos(documento) {
    //     return api.get("gestion/telefonos/" + documento).then((res) => res.data);
    // }

    getTelefonos(documento, carteraId) {
        return api.get(`gestion/telefonos/${documento}/${carteraId}`).then((res) => res.data);
    }

    //5600721
    // getCampanas(identificador) {
    //     return api.get("gestion/campanas/" + identificador).then((res) => res.data);
    // }

    getCampanas(identificador, idcartera) {
        return api.get(`gestion/campanas/${identificador}/${idcartera}`).then((res) => res.data);
    }

    //Obtener listado de direcciones
    getDirecciones(documento) {
        return api.get("gestion/direcciones/" + documento).then((res) => res.data);
    }

    //Obtener listado de direcciones
    getPagos(identificador, idcartera) {
        return api.get("gestion/pagos/" + identificador + "/" + idcartera).then((res) => res.data);
    }

    //Obtener listado de direcciones
    getCuotas(identificador) {
        return api.get("gestion/cuotas/" + identificador).then((res) => res.data);
    }

    addTelefono(data) {
        return api.post("gestion/telefono", data).then((res) => res.data);
    }
    addDirecciones(data) {
        return api.post("gestion/direccion", data).then((res) => res.data);
    }

    addGestion(data) {
        return api.post("gestion/save", data).then((res) => res.data);
    }

    filterGestion(data) {
        return api.post("gestion/filtros", data).then((res) => res.data);
    }

    // ======================= Obtener listado de terceros =======================
    getTerceros(identificador) {
        return api.get("gestion/terceros/" + identificador).then((res) => res.data);
    }
}
