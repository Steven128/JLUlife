package com.brady.jlulife;

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
import com.brady.feedback.FeedBackPackage;
import com.facebook.react.ReactApplication;

import cn.reactnative.modules.update.UpdatePackage;

import com.bugly.RNBuglyPackage;
import com.githang.statusbar.StatusBarCompat;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.horcrux.svg.SvgPackage;
import com.mehcode.reactnative.splashscreen.SplashScreenPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import org.json.JSONException;
import org.json.JSONObject;

import cn.reactnative.modules.update.UpdateContext;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.Callable;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected String getJSBundleFile() {
            return UpdateContext.getBundleUrl(MainApplication.this);
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(new MainReactPackage(),
                    new UpdatePackage(), new RNBuglyPackage(), new PickerPackage(),
                    new SvgPackage(), new SplashScreenPackage(), new RNCWebViewPackage(), new VectorIconsPackage(), new FeedBackPackage());
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        this.initFeedbackService();
    }

    public void initFeedbackService() {
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
         * 建议放在此处做初始化
         */
        //默认初始化
        FeedbackAPI.init(this, "25549009", "752153d95fa67bea90b787a491688e7f ");
        /**
         * 在Activity的onCreate中执行的代码
         * 可以设置状态栏背景颜色和图标颜色，这里使用com.githang:status-bar-compat来实现
         */
        FeedbackAPI.setActivityCallback(new IActivityCallback() {
            public void onCreate(Activity activity) {
                StatusBarCompat.setStatusBarColor(activity, Color.parseColor("#fff"), true);
            }
        });
        FeedbackAPI.setTranslucent(true);
        // //设置返回按钮图标
        FeedbackAPI.setBackIcon(R.drawable.ali_feedback_common_back_btn_bg);
        // //设置标题栏"历史反馈"的字号，需要将控制台中此字号设置为0
        FeedbackAPI.setHistoryTextSize(16);
        // //设置标题栏高度，单位为像素
        FeedbackAPI.setTitleBarHeight(160);
    }


}
