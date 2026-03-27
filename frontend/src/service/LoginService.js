import axios from "axios";
import { LocalStorageService } from "./LocalStorageService";
const api_login = axios.create({
    baseURL: process.env.REACT_APP_ROUTE_API,
});
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
export class LoginService {
    logIn(e) {
        // console.log("Api URL:", process.env.REACT_APP_ROUTE_API);

        return api_login.post("login", e).then((res) => res.data);
    }

    logOut(e) {
        return api.post("logout", e).then((res) => res.data);
    }
}
