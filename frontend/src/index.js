import "react-app-polyfill/ie11";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Route, Switch } from "react-router-dom";
//import * as serviceWorker from './serviceWorker';
import { HashRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import AppLogin from "./AppLogin";
import PanelState from "./context/Panel/PanelState";
import { SIPProvider } from "./context/JsSIP/JsSIPProvider";
import ProtectedSessionGuard from "./service/Protected/ProtectedSessionGuard";

ReactDOM.render(
    <HashRouter>
        <ScrollToTop>
            <Switch>
                <PanelState>
                    <SIPProvider>
                        <Route exact path="/" render={(props) => <AppLogin {...props} />} />
                        <Route
                            path="/admin"
                            render={(props) => (
                                <ProtectedSessionGuard>
                                    <App {...props} />
                                </ProtectedSessionGuard>
                            )}
                        />
                    </SIPProvider>
                </PanelState>
            </Switch>
        </ScrollToTop>
    </HashRouter>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
