import React, { useContext, useRef } from "react";
import { Menu } from "primereact/menu";
import { LocalStorageService } from "./service/LocalStorageService";
import PanelContext from "./context/Panel/PanelContext";
import { useHistory } from "react-router-dom";
import { SIPContext } from "./context/JsSIP/JsSIPContext";
import { disconnectSocket } from "./Socket/Socket";
import { LoginService } from "./service/LoginService";
import moment from "moment";

export const AppTopbar = (props) => {
    const panelContext = useContext(PanelContext);

    const { closeSession } = useContext(SIPContext);

    let history = useHistory();

    const menu = useRef(null);

    const items = [
        {
            label: "Opciones",
            items: [
                {
                    label: "Logout",
                    icon: "pi pi-power-off",
                    command: async () => {
                        const localCleanup = () => {
                            const localStorageService = new LocalStorageService();
                            sessionStorage.removeItem("usrm");
                            localStorageService.clearToken();
                            panelContext.setUserLogin(null);
                            panelContext.setSelectedEntityId(null);
                        };

                        // Ahora si ejecutamos el cerrar sesion xd
                        try {
                            await new LoginService().logOut({ userId: panelContext.userLogin.IDPERSONAL, dateSolicitud: moment().format("YYYY-MM-DD"), timeSolicitud: moment().format("HH:mm:ss"), user: panelContext.userLogin.USUARIO, password: panelContext.userLogin.PASSWORD });
                        } catch (e) {
                            console.error("Fallo en logout del backend:", e);
                        } finally {
                            try {
                                await disconnectSocket?.();
                            } catch {}
                            closeSession && closeSession();
                            localCleanup();
                            history.replace("/");
                        }
                    },
                },
            ],
        },
    ];

    return (
        <>
            <Menu model={items} popup ref={menu} id="popup_menu" />
            <div className="layout-topbar clearfix">
                <button type="button" className="p-link layout-menu-button" onClick={props.onToggleMenu}>
                    <span className="pi pi-bars" />
                </button>
                <span className="p-ml-4" style={{ fontSize: 14 }}>
                    COBRANZAS PERÚ{" "}
                </span>
                <div className="layout-topbar-icons">
                    <span className="layout-topbar-search" style={{ fontSize: 14 }}>
                        {props.user.NOMBRES} {props.user.APELLIDOS}
                    </span>

                    <button type="button" className="p-link" onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup>
                        <span className="layout-topbar-icon pi pi-user" />
                    </button>
                </div>
            </div>
        </>
    );
};
