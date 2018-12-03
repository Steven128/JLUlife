import React, { Component } from "react";
import Storage from "react-native-storage";
import { AsyncStorage } from "react-native";
import Global from "./Global";

var storage;
var defaultExpires = 1000 * 30 * 3600 * 24;
var size = 1000;

export default class AppStorage extends Component {
    static _getStorage() {
        if (storage == undefined) {
            storage = new Storage({
                size: size,
                storageBackend: AsyncStorage,
                defaultExpires: defaultExpires,
                enableCache: true
                // sync: SYNC
            });
        }
        return storage;
    }

    static isInit() {
        if (storage == undefined) {
            throw "请先调用_getStorage()进行初始化";
        }
    }
    /**
    key:保存的key值
    object：保存的value
    expires：有效时间，
  */

    static _save_with_expires(key, object, expires) {
        this.isInit();
        storage.save({
            key: key, // 注意:请不要在key中使用_下划线符号!
            data: object,
            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: expires
        });
    }

    static _save(key, object) {
        this._save_with_expires(key, object, defaultExpires);
    }

    static _remove(key) {
        this.isInit();
        // 删除单个数据
        storage.remove({
            key: key
        });
    }

    static _removeAll() {
        this.isInit();
        // 移除所有"key-id"数据（但会保留只有key的数据）
        storage.clearMap();
    }

    static _clearDataByKey(key) {
        this.isInit();
        // !! 清除某个key下的所有数据
        storage.clearMapForKey(key);
    }

    /**
    查询数据
  */

    static _load(key, callBack) {
        this.isInit();
        storage
            .load({
                key: key,
                autoSync: true,
                syncInBackground: true
            })
            .then(res => {
                res = { message: "success", content: res };
                callBack(res);
                return res;
            })
            .catch(err => {
                err = { message: "error", content: err };
                callBack(err);
                if (__DEV__) {
                    console.warn("warn in AppStorage （" + key + "）");
                    console.warn(err.message);
                }
                switch (err.name) {
                    case "NotFoundError":
                        // TODO;
                        break;
                    case "ExpiredError":
                        // TODO
                        break;
                }
            });
    }

    /**
     * 获取数据并写入全局变量
     * @param {string} key key值
     * @param {string} globalValueName 全局变量名称（Global.*）
     */
}
