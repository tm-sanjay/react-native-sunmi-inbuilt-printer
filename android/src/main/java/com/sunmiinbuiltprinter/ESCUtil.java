package com.sunmiinbuiltprinter;

public class ESCUtil {

  public static final byte ESC = 0x1B;  // Escape
  public static final byte FS = 0x1C;   // text separator
  public static final byte GS = 0x1D;   // group separator
  public static final byte DLE = 0x10;  // Data Connection Escape
  public static final byte EOT = 0x04;  // end of transmission
  public static final byte ENQ = 0x05;  // query character
  public static final byte SP = 0x20;   // space
  public static final byte HT = 0x09;   // horizontal list
  public static final byte LF = 0x0A;   // print and wrap (horizontally positioned)
  public static final byte CR = 0x0D;   // Home button
  public static final byte FF = 0x0C;   // Paper feed control (print and return to standard mode (in page mode))
  public static final byte CAN = 0x18;  // Void (cancel print data in page mode)


  /**
   * bold font
   */
  public static byte[] boldOn() {
    byte[] result = new byte[3];
    result[0] = ESC;
    result[1] = 69;
    result[2] = 0xF;
    return result;
  }

  /**
   * cancel font bold
   */
  public static byte[] boldOff() {
    byte[] result = new byte[3];
    result[0] = ESC;
    result[1] = 69;
    result[2] = 0;
    return result;
  }
}
