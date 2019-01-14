package com.brady.jlulife;

import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactContext;
import com.mehcode.reactnative.splashscreen.SplashScreen;
import com.bugly.RNBuglyModule;
import com.bugly.RNBuglyPackage;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is
     * used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "jlulife";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Show the js-controlled splash screen
        SplashScreen.show(this, getReactInstanceManager()); // **********需要添加的************
        RNBuglyModule.init(this, "be7918c35a", true);

        super.onCreate(savedInstanceState);
    }
}
