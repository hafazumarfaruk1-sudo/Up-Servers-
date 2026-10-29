package bd.upservice.app

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class SafeAreaModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "SafeAreaModule"
    }

    @ReactMethod
    fun getInsets(promise: Promise) {
        try {
            val resources = reactApplicationContext.resources
            val density = resources.displayMetrics.density

            var statusBarHeight = 0f
            val statusBarId = resources.getIdentifier("status_bar_height", "dimen", "android")
            if (statusBarId > 0) {
                statusBarHeight = resources.getDimensionPixelSize(statusBarId) / density
            }

            var navBarHeight = 0f
            val navBarId = resources.getIdentifier("navigation_bar_height", "dimen", "android")
            if (navBarId > 0) {
                navBarHeight = resources.getDimensionPixelSize(navBarId) / density
            }

            val map = Arguments.createMap()
            map.putDouble("top", statusBarHeight.toDouble())
            map.putDouble("bottom", navBarHeight.toDouble())
            map.putDouble("left", 0.0)
            map.putDouble("right", 0.0)

            promise.resolve(map)
        } catch (e: Exception) {
            promise.reject("SAFE_AREA_ERROR", e.message)
        }
    }
}