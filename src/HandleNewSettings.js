import Global from "./Global";
/**
 * 处理没有改动过的新设置
 */
export default function handleNewSettings() {
    var settings = {};
    if (Global.settings != undefined) settings = Global.settings;
    //Theme
    if (settings.theme == undefined) Global.settings.theme = {};
    if (settings.theme.index == undefined) Global.settings.theme.index = 0;
    if (settings.theme.color == undefined)
        Global.settings.theme.color = "#ffffff";
    if (settings.theme.backgroundColor == undefined)
        Global.settings.theme.backgroundColor = "#2089dc";
    //ClassTable
    if (settings.class == undefined) Global.settings.class = {};
    if (settings.class.classLength == undefined)
        Global.settings.class.classLength = 11;
    if (settings.class.navColor == undefined)
        Global.settings.class.navColor = "#808080";
    if (settings.class.backgroundOpacity == undefined)
        Global.settings.class.backgroundOpacity = 0;
    if (settings.class.itemOpacity == undefined)
        Global.settings.class.itemOpacity = 1;
    if (settings.class.itemHeight == undefined)
        Global.settings.class.itemHeight = 70;
    if (settings.class.fontSize == undefined)
        Global.settings.class.fontSize = 14;
    if (settings.class.backgroundImage == undefined)
        Global.settings.class.backgroundImage = "";
    return;
}
