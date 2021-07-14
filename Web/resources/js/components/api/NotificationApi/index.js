import React, {useContext} from "react";
import {NotificationContext} from "../../providers/NotificationProvider";

/**
 * Notificatie API, zorgt ervoor dat je in andere componenten bij de
 * states kan van de NotificatieProvider.
 */
export default function NotificationApi() {
    return useContext(NotificationContext);
}
