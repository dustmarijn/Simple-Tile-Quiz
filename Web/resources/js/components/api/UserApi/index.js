import React, {useContext} from "react";
import {UserContext} from "../../providers/UserProvider";

/**
 * User API, zorgt ervoor dat je in andere componenten bij de
 * states kan van de UserProvider.
 */
export default function UserApi() {
    return useContext(UserContext);
}
