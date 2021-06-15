import React, {useContext} from "react";
import {NotificationContext} from "../../providers/NotificationProvider";

export default function NotificationApi() {
    return useContext(NotificationContext);
}
