import ScoreInterfaceInside from "./ScoreInterface.inside";
import ScoreInterfaceOutside from "./ScoreInterface.outside";
import Global from "../Global";

export default function ScoreHandler(callback) {
    if (Global.settings.outOfSchool) {
        return ScoreInterfaceOutside(callback);
    } else {
        return ScoreInterfaceInside(callback);
    }
}
