import Global from "./Global";
/**
 * 处理没有改动过的新设置
 */
export default function handleNewSettings() {
    var settings = Global.settings;
    if (settings.class.classLength == undefined)
        settings.class.classLength = 11;
    if (settings.class.navColor == undefined) settings.class.navColor = "#888";
    if (settings.class.navBackgroundColor == undefined)
        settings.class.navBackgroundColor = "transparent";
    if (settings.class.navOpacity == undefined) settings.class.navOpacity = 1;
    if (settings.class.itemOpacity == undefined) settings.class.itemOpacity = 1;
    if (settings.class.itemHeight == undefined) settings.class.itemHeight = 70;
    if (settings.class.fontSize == undefined) settings.class.fontSize = 14;
}
