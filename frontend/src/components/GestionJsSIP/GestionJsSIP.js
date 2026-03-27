import { useContext } from "react";
import { DialogFormGestion } from "../DialogFormGestion";
import { PhoneModal } from "../JsSIP/PhoneModal";
import { PhoneModal2 } from "../JsSIP/PhoneModal2";
import { SIPContext } from "../../context/JsSIP/JsSIPContext";
import { PhoneModal3 } from "../JsSIP/PhoneModal3";

export const GestionJsSIP = (props) => {
    // const { modalVisible, hidePhone } = useContext(SIPContext);

    return (
        <>
            <DialogFormGestion {...props} />

            {/* <PhoneModal /> */}

            {/* <PhoneModal2 /> */}

            <PhoneModal3 />
        </>
    );
};
