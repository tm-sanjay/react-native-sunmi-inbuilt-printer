package com.sunmiinbuiltprinter;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import android.content.ComponentName;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.RemoteException;
import android.util.Base64;
import android.util.Log;

import androidx.annotation.NonNull;

import com.sunmi.peripheral.printer.InnerPrinterCallback;
import com.sunmi.peripheral.printer.InnerPrinterException;
import com.sunmi.peripheral.printer.InnerPrinterManager;
import com.sunmi.peripheral.printer.InnerResultCallback;
import com.sunmi.peripheral.printer.SunmiPrinterService;
import com.sunmi.peripheral.printer.TransBean;
import com.sunmi.peripheral.printer.WoyouConsts;

import java.util.Map;

@ReactModule(name = SunmiInbuiltPrinterModule.NAME)
public class SunmiInbuiltPrinterModule extends ReactContextBaseJavaModule {
  public static final String NAME = "SunmiInbuiltPrinter";

  private Promise p;

  private SunmiPrinterService printerService;

  private static final String TAG = "SunmiPrinter_Error";

  private InnerResultCallback innerResultCallback = new InnerResultCallback() {
    @Override
    public void onRunResult(boolean isSuccess) throws RemoteException {
      if (isSuccess) {
        p.resolve(200);
      } else {
        p.reject("" + 0);
      }
    }
    
    @Override
    public void onReturnString(String result) throws RemoteException {

    }

    @Override
    public void onRaiseException(int code, String msg) throws RemoteException {

    }

    @Override
    public void onPrintResult(int code, String msg) throws RemoteException {

    }
  };

  InnerPrinterCallback innerPrinterCallback = new InnerPrinterCallback() {
    @Override
    protected void onConnected(SunmiPrinterService service) {
      printerService = service;
    }

    @Override
    protected void onDisconnected() {
    }
  };

  public SunmiInbuiltPrinterModule(ReactApplicationContext reactContext) {
    super(reactContext);
    try {
      InnerPrinterManager.getInstance().bindService(reactContext, innerPrinterCallback);
    } catch (RemoteException e) {
      Log.i(TAG, "ERROR: " + e.getMessage());
    }
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }


  @ReactMethod
  public void multiply(double a, double b, Promise promise) {
    promise.resolve(a * b);
  }

  // printer functions
  /**
   * Initialize the printer, reset the printing logic program, but do not clear the buffer data
   * so Unfinished print jobs will continue after reset
   */
  @ReactMethod
  public void printerInit() throws RemoteException {
    printerService.printerInit(innerResultCallback);
  }

  /**
   * self checking
   */
  @ReactMethod
  public void printerSelfChecking() throws RemoteException {
    printerService.printerSelfChecking(innerResultCallback);
  }
}
