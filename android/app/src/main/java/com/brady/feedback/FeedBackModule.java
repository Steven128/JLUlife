package com.brady.feedback;

import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.graphics.Color;
import android.util.Log;
import android.widget.Toast;

import com.alibaba.sdk.android.feedback.impl.FeedbackAPI;
import com.alibaba.sdk.android.feedback.impl.IActivityCallback;
import com.alibaba.sdk.android.feedback.util.ErrorCode;
import com.alibaba.sdk.android.feedback.util.FeedbackErrorCallback;
import com.alibaba.sdk.android.feedback.util.IUnreadCountCallback;
import com.brady.jlulife.MainApplication;
import com.brady.jlulife.R;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.githang.statusbar.StatusBarCompat;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.concurrent.Callable;

/**
 * 反馈交互Module
 * Created by Song on 2017/11/13.
 */
public class FeedBackModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext mReactContext;
    private static final String MODULE_NAME = "FeedbackModule";

    public FeedBackModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mReactContext = reactContext;
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    /**
     * 跳转到反馈界面
     */
    @ReactMethod
    public void openFeedbackActivity(ReadableMap poiData) {
        if (poiData != null) {
            JSONObject jsonObject = new JSONObject();
            ReadableMapKeySetIterator iterator = poiData.keySetIterator();
            while (iterator.hasNextKey()) {
                String key = iterator.nextKey();
                try {
                    jsonObject.put(key, poiData.getString(key));
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
            FeedbackAPI.setAppExtInfo(jsonObject);
        } else {
            FeedbackAPI.setAppExtInfo(null);
        }
        FeedbackAPI.setTitleBarHeight(80);
        FeedbackAPI.setTranslucent(false);
        FeedbackAPI.openFeedbackActivity();
    }

    @ReactMethod
    private void init(String userName) {
        if (!userName.equals("")) {
            FeedbackAPI.setUserNick(userName);
        }
        /**
         * 添加自定义的error handler
         */
        FeedbackAPI.addErrorCallback(new FeedbackErrorCallback() {
            @Override
            public void onError(Context context, String errorMessage, ErrorCode code) {
                Toast.makeText(context, "ErrMsg is: " + errorMessage, Toast.LENGTH_SHORT).show();
            }
        });
        FeedbackAPI.addLeaveCallback(new Callable() {
            @Override
            public Object call() throws Exception {
                Log.d("DemoApplication", "custom leave callback");
                return null;
            }
        });
        /**
         * 在Activity的onCreate中执行的代码
         * 可以设置状态栏背景颜色和图标颜色，这里使用com.githang:status-bar-compat来实现
         */
        FeedbackAPI.setActivityCallback(new IActivityCallback() {
            public void onCreate(Activity activity) {
                StatusBarCompat.setStatusBarColor(activity, Color.parseColor("#ffffff"), true);
            }
        });
        FeedbackAPI.setTranslucent(true);
        // //设置返回按钮图标
        FeedbackAPI.setBackIcon(R.drawable.ali_feedback_common_back_btn_bg);
        // //设置标题栏"历史反馈"的字号，需要将控制台中此字号设置为0
        FeedbackAPI.setHistoryTextSize(14);
        // //设置标题栏高度，单位为像素
        FeedbackAPI.setTitleBarHeight(80);
    }

}
