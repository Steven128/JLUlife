import LoginInterfaceInside from "./LoginInterface.inside";
import LoginInterfaceOutside from "./LoginInterface.outside";
import Global from "../Global";
export default function loginHandler(j_username, j_password, callback) {
    if (Global.settings.outOfSchool) {
        return LoginInterfaceOutside(j_username, j_password, callback);
    } else {
        return LoginInterfaceInside(j_username, j_password, callback);
    }
}
