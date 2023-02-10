package com.sunmiinbuiltprinter;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.bridge.ReadableArray;

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

  /**
   * Get printer serial number
   */
  @ReactMethod
  public void getPrinterSerialNo(Promise promise) {
    try {
      promise.resolve(printerService.getPrinterSerialNo());
    } catch (RemoteException e) {
      e.printStackTrace();
      Log.i(TAG, "ERROR: " + e.getMessage());
      promise.reject("" + 0, e.getMessage());
    }
  }

  /**
   * Get printer firmware version
   */
  @ReactMethod
  public void getPrinterVersion(Promise promise) {
    try {
      promise.resolve(printerService.getPrinterVersion());
    } catch (RemoteException e) {
      e.printStackTrace();
      Log.i(TAG, "ERROR: " + e.getMessage());
      promise.reject("" + 0, e.getMessage());
    }
  }

  /**
   * Get printer model
   */
  @ReactMethod
  public void getPrinterModal(Promise promise) {
    try {
      promise.resolve(printerService.getPrinterModal());
    } catch (RemoteException e) {
      e.printStackTrace();
      Log.i(TAG, "ERROR: " + e.getMessage());
      promise.reject("" + 0, e.getMessage());
    }
  }

  /**
   * Get the printer's current paper size
   * The default paper specification is 58mm for handheld printers, and 80mm for desktop printers, but you can increase the
   * board and set the printer configuration to use the paper size of 58mm, this interface will return the paper size set by the current printer
   */
  @ReactMethod
  public void getPrinterPaper(Promise promise) {
    try {
      promise.resolve(printerService.getPrinterPaper());
    } catch (RemoteException e) {
      e.printStackTrace();
      Log.i(TAG, "ERROR: " + e.getMessage());
      promise.reject("" + 0, e.getMessage());
    }
  }

  /**
   * Get the latest status of your printer
   */
  @ReactMethod
  public void updatePrinterState(Promise promise) {
    try {
      promise.resolve(printerService.updatePrinterState());
    } catch (RemoteException e) {
      e.printStackTrace();
      Log.i(TAG, "ERROR: " + e.getMessage());
      promise.reject("" + 0, e.getMessage());
    }
  }

  /**
   * Get the printer service version number
   * The return value of this interface is applicable to all commercial machine judgments, but some states cannot be obtained due to hardware configuration
   * (for example, mobile phones do not support Open cover detection)
   */
  @ReactMethod
  public void getServiceVersion(Promise promise) {
    try {
      promise.resolve(printerService.getServiceVersion());
    } catch (RemoteException e) {
      e.printStackTrace();
      Log.i(TAG, "ERROR: " + e.getMessage());
      promise.reject("" + 0, e.getMessage());
    }
  }

  /**
   * Get print head print length
   * At present, the print length since power-on can be obtained. Due to the hardware difference between the desktop computer and the mobile phone, the return of the print result is slightly different.
   * Different, that is, the mobile phone obtains the printing length through the ICallback callback interface, and the desktop directly obtains the length through the return value.
   */
  @ReactMethod
  public void getPrintedLength() throws RemoteException {
    printerService.getPrintedLength(innerResultCallback);
  }

  /**
   * Is there a printer service
   */
  @ReactMethod
  public void hasPrinter(Promise promise) {
    final boolean hasPrinterService = printerService != null;
    promise.resolve(hasPrinterService);
  }

  /**
   * Print ESC/POS format instructions
   * data byte[]
   */
  @ReactMethod
  public void sendRAWData(String base64Data) throws RemoteException {
    final byte[] d = Base64.decode(base64Data, Base64.DEFAULT);
    printerService.sendRAWData(d, innerResultCallback);
  }

  /**
   * Set custom font
   */
  @ReactMethod
  public void setFontName(String typeface) throws RemoteException {
    printerService.setFontName(typeface, innerResultCallback);
  }

  /**
   * @param key
   * @param value
   */
  @ReactMethod
  public void setPrinterStyle(int key, int value) throws RemoteException {
    printerService.setPrinterStyle(key, value);
  }

  /**
   * Set alignment mode
   * Global method, affecting subsequent execution, canceling related settings when printer is initialized.
   */
  @ReactMethod
  public void setAlignment(int alignment) throws RemoteException {
    printerService.setAlignment(alignment, innerResultCallback);
  }

  /**
   * Set font size
   * The global method has an impact on subsequent printing,initialization can cancel the setting,
   * and the font size is a printing method that exceeds the standard international order.
   * Adjusting the font size will affect the character width, and the number of characters per line will also change accordingly,
   * so the typesetting formed by monospaced fonts may be disordered.
   * @param fontSize
   */
  @ReactMethod
  public void setFontSize(float fontSize) throws RemoteException {
    printerService.setFontSize(fontSize, innerResultCallback);
  }

  /**
   * Set bold
   * @param isWeight
   */
  @ReactMethod
  public void setFontWeight(boolean isWeight) throws RemoteException {
    if (isWeight) {
      printerService.sendRAWData(ESCUtil.boldOn(), null);
    } else {
      printerService.sendRAWData(ESCUtil.boldOff(), null);
    }
  }

  /**
   * Print text
   * To modify the style of the printed text (such as: alignment method, font size, bold, etc.),
   * please set before calling the printText method.
   * @param text
   */
  @ReactMethod
  public void printerText(String text) throws RemoteException {
    printerService.printText(text, null);
  }

  /**
   * Print text with specified font and size
   * The font setting is only valid for this time.
   * @param text
   * @param typeface
   * @param fontsize
   */
  @ReactMethod
  public void printTextWithFont(String text, String typeface, float fontsize) throws RemoteException {
    printerService.printTextWithFont(text, typeface, fontsize, null);
  }

  /**
   * Print vector text
   * The text is output in the original width of the vector text, that is, each character is not monospaced.
   * @param text
   */
  @ReactMethod
  public void printOriginalText(String text) throws RemoteException {
    printerService.printOriginalText(text, null);
  }

  /**
   * Print a row of a table
   * @param colrsTextAir
   * @param colsWidthArr
   * @param colsAlign
   */
  // @ReactMethod
  // public void printColumnsText(ReadableArray colrsTextAir, ReadableArray colsWidthArr, ReadableArray colsAlign) throws RemoteException {
  //   String[] texts = new String[colrsTextAir.size()];

  //   for (int j = 0; j < colrsTextAir.size(); ++j) {
  //     texts[j] = colrsTextAir.getString(j);
  //   }

  //   int[] widths = new int[colsWidthArr.size()];
  //   for (int j = 0; j < colsWidthArr.size(); ++j) {
  //     widths[j] = colsWidthArr.getInt(j);
  //   }

  //   int[] aligns = new int[colsAlign.size()];
  //   for (int j = 0; j < colsAlign.size(); ++j) {
  //     aligns[j] = colsAlign.getInt(j);
  //   }

  //   printerService.printColumnsText(texts, widths, aligns, null);
  // }

  /**
   * Print a row of the table, you can specify the column width and alignment
   * @param colsTextArr
   * @param colsWidthArr
   * @param colsAlign
   */
  @ReactMethod
  public void printColumnsString(ReadableArray colsTextArr, ReadableArray colsWidthArr, ReadableArray colsAlign) throws
    RemoteException {
    String[] texts = new String[colsTextArr.size()];

    for (int j = 0; j < colsTextArr.size(); ++j) {
      texts[j] = colsTextArr.getString(j);
    }

    int[] widths = new int[colsWidthArr.size()];
    for (int j = 0; j < colsWidthArr.size(); ++j) {
      widths[j] = colsWidthArr.getInt(j);
    }

    int[] aligns = new int[colsAlign.size()];
    for (int j = 0; j < colsAlign.size(); ++j) {
      aligns[j] = colsAlign.getInt(j);
    }
    printerService.printColumnsString(texts, widths, aligns, null);
  }

  /**
   * print pictures
   * The maximum pixel of the picture needs to be less than 2.5 million in width x height, and the width is set according to the paper specification (58 is 384 pixels, 80 is 576 pixels),
   * It will not be displayed if it exceeds the paper width
   * @param encodedString
   * @param pixelWidth
   */
  @ReactMethod
  public void printBitmap(String encodedString, int pixelWidth) throws RemoteException {
    final String pureBase64Encoded = encodedString.substring(encodedString.indexOf(",")  + 1);
    final byte[] decodedBytes = Base64.decode(pureBase64Encoded, Base64.DEFAULT);
    Bitmap decodedBitmap = BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.length);
    int w = decodedBitmap.getWidth();
    Integer h = decodedBitmap.getHeight();
    Bitmap scaledImage = Bitmap.createScaledBitmap(decodedBitmap, pixelWidth, (pixelWidth / w) * h, false);
    printerService.printBitmap(scaledImage, innerResultCallback);
  }

  /**
   * Print Bitmap image with specified width and height
   * @param encodedString
   * @param width
   * @param height
   * @param newLine
   */
  @ReactMethod
  public void printBitmapImage(String encodedString, int w, int h, boolean newLine) throws RemoteException {
    final String pureBase64Encoded = encodedString.substring(encodedString.indexOf(",")  + 1);
    final byte[] decodedBytes = Base64.decode(pureBase64Encoded, Base64.DEFAULT);
    Bitmap decodedBitmap = BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.length);
    Bitmap scaledImage = Bitmap.createScaledBitmap(decodedBitmap, w, h, false);
    printerService.printBitmap(scaledImage, innerResultCallback);
    //go to next line

    if (newLine) {
      printerService.lineWrap(1, null);
    }
  }

  /**
   * Print pictures(2)
   * The picture pixel resolution is less than 2 million, and the width is set according to the paper specification (58 is 384 pixels, 80 is 576 pixels), if it exceeds
   * Over the paper width will not be displayed
   * @param bitmap
   * @param type
   */
  @ReactMethod
  public void printBitmapCustom(Bitmap bitmap, int type) throws RemoteException {
    printerService.printBitmapCustom(bitmap, type, innerResultCallback);
  }

  /**
   * Print 1D barcode
   * @param data
   * @param symbology
   * @param height
   * @param width
   * @param textPosition
   */
  @ReactMethod
  public void printBarCode(String data, int symbology, int height, int width, int textPosition) throws
    RemoteException {
    printerService.printBarCode(data, symbology, height, width, textPosition, innerResultCallback);
  }


  /**
   * Print QR code
   * In the normal printing state, after calling this method, it will directly output and print, and each QR code block is 4 pixels
   * (less than 4 may fail). The maximum supported mode is version19 (93*93).
   * @param data
   * @param modulesize
   * @param errorlevel
   */
  @ReactMethod
  public void printQRCode(String data, int modulesize, int errorlevel) throws RemoteException {
    printerService.printQRCode(data, modulesize, errorlevel, innerResultCallback);
  }

  /**
   * Print 2D barcode
   * @param data
   * @param symbology
   * @param modulesize
   * @param errorlevel
   */
  @ReactMethod
  public void print2DCode(String data, int symbology, int modulesize, int errorlevel) throws
    RemoteException {
    printerService.print2DCode(data, symbology, modulesize, errorlevel, innerResultCallback);
  }

  /**
   * Package transaction printing dedicated interface
   * @param tranBean
   */
  @ReactMethod
  public void commitPrint(TransBean[] tranBean) throws RemoteException {
    printerService.commitPrint(tranBean, innerResultCallback);
  }

  /**
   * Enter transaction mode
   * @param clear
   */
  @ReactMethod
  public void enterPrinterBuffer(Boolean clear) throws RemoteException {
    printerService.enterPrinterBuffer(clear);
  }

  /**
   * Exit transaction mode
   * @param commit
   */
  @ReactMethod
  public void exitPrinterBuffer(Boolean commit) throws RemoteException {
    printerService.exitPrinterBuffer(commit);
  }


  /**
   * Submit transaction print
   * Commits and prints everything in the transaction queue, and remains in transactional printing mode afterwards
   */
  @ReactMethod
  public void commitPrinterBuffer() throws RemoteException {
    printerService.commitPrinterBuffer();
  }


  /**
   * Submit the transaction to print and call back the result
   */
  @ReactMethod
  public void commitPrinterBufferWithCallbacka() throws RemoteException {
    printerService.commitPrinterBufferWithCallback(innerResultCallback);
  }

  /**
   * print n lines
   * @param n
   */
  @ReactMethod
  public void lineWrap(int n) throws RemoteException {
    printerService.lineWrap(n, innerResultCallback);
  }

  /**
   * cut paper
   * @throws RemoteException
   */
  @ReactMethod
  public void cutPaper() throws RemoteException {
    printerService.cutPaper(innerResultCallback);
  }

  /**
   * open cash drawer
   */
  @ReactMethod
  public void openDrawer() throws RemoteException {
    printerService.openDrawer(innerResultCallback);
  }

  /**
   * Cash drawer status
   * @param promise
   */
  @ReactMethod
  public void getDrawerStatus(Promise promise) {
    try {
      promise.resolve(printerService.getDrawerStatus());
    } catch (RemoteException e) {
      e.printStackTrace();
      Log.i(TAG, "ERROR: " + e.getMessage());
      promise.reject("" + 0, e.getMessage());
    }
  }

}
