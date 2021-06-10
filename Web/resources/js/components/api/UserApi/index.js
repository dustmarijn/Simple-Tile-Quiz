import React, {useContext} from "react";
import {UserContext} from "../../providers/UserProvider";

export default function UserApi() {
    return useContext(UserContext);
}
