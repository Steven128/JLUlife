import cheerio from "cheerio";

function getEduList(targetPage, index, callback) {
    //获取总页数
    var targetIndex = "";
    getPageLength(targetPage, pageLength => {
        if (index == 1) targetIndex = "";
        else {
            targetIndex = pageLength - index + 1;
            if (targetIndex <= 0) {
                callback("nomore");
                return;
            }
            targetIndex = "/" + targetIndex;
        }
        //获取教务通知列表
        let edu_url =
            "http://jwc.jlu.edu.cn/zxzx/" + targetPage + targetIndex + ".htm";
        fetch(edu_url, {
            method: "GET"
        })
            .then(response => response.text())
            .then(responseHTML => {
                var educationText = htmlToJson(responseHTML);
                callback(educationText);
            })
            .catch(error => {
                console.error(error);
            });
    });
}

function getPageLength(targetPage, callback) {
    let edu_url = "http://jwc.jlu.edu.cn/zxzx/" + targetPage + ".htm";
    fetch(edu_url, {
        method: "GET"
    })
        .then(response => response.text())
        .then(responseHTML => {
            const $ = cheerio.load(responseHTML);
            var pageLength = $("#fanye126963").html();
            pageLength = unescape(
                pageLength.replace(/&#x/g, "%u").replace(/;/g, "")
            );
            pageLength = pageLength.replace(/%uA0/g, "");
            pageLength = pageLength.match(/1\/(.*?)$/)[1];
            callback(pageLength);
        })
        .catch(error => {
            console.error(error);
        });
}

function htmlToJson(_document) {
    const $ = cheerio.load(_document);
    var itemContainer = $(".clearfix li");
    var itemList = [];
    for (var i = 0; i < itemContainer.length; i++) {
        var item = {};
        var title = $(itemContainer[i])
            .find("a")
            .attr("title");
        if (title == undefined) continue;
        title = unescape(title.replace(/&#x/g, "%u").replace(/;/g, ""));
        var href = $(itemContainer[i])
            .find("a")
            .attr("href");
        href = "http://jwc.jlu.edu.cn/" + href.substring(3, href.length);
        var time = $(itemContainer[i])
            .find("span.time")
            .html();
        time = unescape(
            time
                .replace(/&#x/g, "%u")
                .replace(/;/g, "")
                .replace(/%uA0/g, " ")
        );
        time = time.replace("[", "");
        time = time.replace("]", "");
        item.title = title;
        item.href = href;
        item.time = time;
        itemList.push(item);
    }
    return itemList;
}

export default getEduList;
