import cheerio from "cheerio";

/**
 * 获取校内通知列表
 * @param {int} page 页数
 * @param {function} callback 回调
 */
export function getOaList(page, callback) {
    let oa_url =
        "https://oa.jlu.edu.cn/defaultroot/PortalInformation!jldxList.action?1=1&channelId=179577&startPage=" +
        page;
    fetch(oa_url, {
        method: "GET"
    })
        .then(response => response.text())
        .then(responseHTML => {
            var notificationJson = htmlToJson(responseHTML);
            callback({ message: "success", content: notificationJson });
            return notificationJson;
        })
        .catch(error => {
            if (__DEV__) console.error(error);
            callback({ message: "error" });
        });
}

/**
 * 查询校内通知列表
 * @param {int} page 页数
 * @param {function} callback 回调
 */
export function searchOa(page, searchnr, searchlx, callback) {
    let oa_url =
        "https://oa.jlu.edu.cn/defaultroot/PortalInformation!jldxList.action?1=1&channelId=179577&searchnr=" +
        searchnr +
        "&searchlx=" +
        searchlx +
        "&startPage=" +
        page;
    fetch(oa_url, {
        method: "GET"
    })
        .then(response => response.text())
        .then(responseHTML => {
            var notificationJson = htmlToJson(responseHTML);
            callback({ message: "success", content: notificationJson });
            return notificationJson;
        })
        .catch(error => {
            if (__DEV__) console.error(error);
            callback({ message: "error" });
        });
}

function htmlToJson(_document) {
    const $ = cheerio.load(_document);
    var itemContainer = $("#itemContainer .rel");
    var itemList = [];
    for (var i = 0; i < itemContainer.length; i++) {
        var item = {};
        var title = $(itemContainer[i])
            .find("a.font14")
            .html();
        title = unescape(title.replace(/&#x/g, "%u").replace(/;/g, ""));
        var href = $(itemContainer[i])
            .find("a.font14")
            .attr("href");
        href = "https://oa.jlu.edu.cn/defaultroot/" + href;
        var comeFrom = $(itemContainer[i])
            .find("a.column")
            .html();
        comeFrom = unescape(comeFrom.replace(/&#x/g, "%u").replace(/;/g, ""));
        var time = $(itemContainer[i])
            .find("span.time")
            .html();
        time = unescape(
            time
                .replace(/&#x/g, "%u")
                .replace(/;/g, "")
                .replace(/%uA0/g, " ")
        );
        var toTop = false;
        if (title.indexOf("置顶") > -1) {
            toTop = true;
        }
        title = title.replace('<font class="red">[置顶]</font>', "");

        item.title = title;
        item.href = href;
        item.comeFrom = comeFrom;
        item.time = time;
        item.toTop = toTop;
        itemList.push(item);
    }
    return itemList;
}
