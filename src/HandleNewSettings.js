import Global from "./Global";
/**
 * 处理没有改动过的新设置
 */
export default function handleNewSettings() {
    var settings = {};
    if (Global.settings != undefined) settings = Global.settings;
    //OutOfSchool
    if (settings.outOfSchool == undefined) Global.settings.outOfSchool = false;
    //Theme
    if (settings.theme == undefined) Global.settings.theme = {};
    if (settings.theme.index == undefined) Global.settings.theme.index = 0;
    if (settings.theme.color == undefined)
        Global.settings.theme.color = "#ffffff";
    if (settings.theme.backgroundColor == undefined)
        Global.settings.theme.backgroundColor = "#2089dc";
    if (settings.theme.nightMode == undefined)
        Global.settings.theme.nightMode = false;
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
    if (settings.options == undefined) Global.settings.options = {};
    if (settings.options.firstUseEval == undefined)
        Global.settings.options.firstUseEval = true;
    if (settings.weather == undefined) Global.settings.weather = {};
    if (settings.weather.city == undefined)
        Global.settings.weather.city = "CN101060101";
    if (settings.weather.name == undefined)
        Global.settings.weather.name = "长春";
    return;
}
