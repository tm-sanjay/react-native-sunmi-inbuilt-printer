import { NativeModules } from 'react-native';

const InbuiltPrinter = NativeModules.SunmiInbuiltPrinter;

export function multiply(a: number, b: number): Promise<number> {
  return InbuiltPrinter.multiply(a, b);
}

export enum PrinterStyleKey {
  // text double width
  ENABLE_DOUBLE_WIDTH = 1000,
  // text double height
  ENABLE_DOUBLE_HEIGHT = 1001,
  // text bold
  ENABLE_BOLD = 1002,
  // text underline
  ENABLE_UNDERLINE = 1003,
  // text highlight
  ENABLE_ANTI_WHITE = 1004,
  // text strikethrough
  ENABLE_STRIKETHROUGH = 1005,
  // text italics
  ENABLE_ILALIC = 1006,
  // text reflection
  ENABLE_INVERT = 1007,
  // Set text left and right spacing
  SET_TEXT_RIGHT_SPACING = 2000,
  // set relative position
  SET_RELATIVE_POSITION = 2001,
  // set absolute position
  SET_ABSOLUATE_POSITION = 2002,
  // set line spacing
  SET_LINE_SPACING = 2003,
  // set left margin
  SET_LEFT_SPACING = 2004,
  // Set strikethrough style
  SET_STRIKETHROUGH_STYLE = 2005,
}

export enum PrinterStyleValue {
  ENABLE = 1,
  DISABLE = 2,
}

export enum AlignValue {
  LEFT = 0,
  CENTER = 1,
  RIGHT = 2,
}

type InbuiltPrinterType = {
  multiply(a: number, b: number): Promise<number>;

  /**
   * Initialize the printer, reset the printing logic program, but do not clear the buffer data
   * so Unfinished print jobs will continue after reset
   */
  printerInit: () => void;
  
  /**
   * self checking
   */
  printerSelfChecking: () => void;

  /**
   * Get printer serial number
   */
  getPrinterSerialNo: () => Promise<string>;

  /**
   * Get printer firmware version
   */
  getPrinterVersion: () => Promise<string>;

  /**
   * Get printer model
   */
  getPrinterModal: () => Promise<string>;

  /**
   * Get the printer's current paper size
   * The default paper specification is 58mm for handheld printers, and 80mm for desktop printers, but you can increase the
   * board and set the printer configuration to use the paper size of 58mm, this interface will return the paper size set by the current printer
   */
  getPrinterPaper: () => Promise<string>;

  /**
   * Get the latest status of your printer
   */
  updatePrinterState: () => Promise<string>;

  /**
   * Get the printer service version number
   * The return value of this interface is applicable to all commercial machine judgments, but some states cannot be obtained due to hardware configuration
   * (for example, mobile phones do not support Open cover detection)
   */
  getServiceVersion: () => Promise<string>;

  /**
   * Get print head print length
   * At present, the print length since power-on can be obtained. Due to the hardware difference between the desktop computer and the mobile phone, the return of the print result is slightly different.
   * Different, that is, the mobile phone obtains the printing length through the ICallback callback interface, and the desktop directly obtains the length through the return value.
   */
  getPrintedLength: () => void;

  /**
   * Is there a printer service
   */
  hasPrinter: () => Promise<boolean>;

  /**
   * Print ESC/POS format instructions
   * data byte[]
   */
  sendRAWData: (data: string) => void;

  /**
   * Set custom font
   */
  setFontName: (typeface: string) => void;

  /**
   * @param key
   * @param value
   */
  setPrinterStyle: (key: PrinterStyleKey, val: PrinterStyleValue | number) => void;

  /**
   * Set alignment mode
   * Global method, affecting subsequent execution, canceling related settings when printer is initialized.
   */
  setAlignment: (align: AlignValue) => void;

  /**
   * Set font size
   * The global method has an impact on subsequent printing,initialization can cancel the setting,
   * and the font size is a printing method that exceeds the standard international order.
   * Adjusting the font size will affect the character width, and the number of characters per line will also change accordingly,
   * so the typesetting formed by monospaced fonts may be disordered.
   * @param fontSize
   */
  setFontSize: (size: number) => void;

  /**
   * Set bold
   * @param isWeight
   */
  setFontWeight: (isWeight: boolean) => void;

  /**
   * Print text
   * To modify the style of the printed text (such as: alignment method, font size, bold, etc.),
   * please set before calling the printText method.
   * @param text
   */
  printerText: (text: string) => void;

  /**
   * Print text with specified font and size
   * The font setting is only valid for this time.
   * @param text
   * @param typeface
   * @param fontsize
   */
  printTextWithFont: (text: string, typeface: string, fontsize: number) => void;

  /**
   * Print vector text
   * The text is output in the original width of the vector text, that is, each character is not monospaced.
   * @param text
   */
  printOriginalText: (text: string) => void;

  /**
   * Print a row of a table
   * @param colrsTextAir
   * @param colsWidthArr
   * @param colsAlign
   */
  // printColumnsText: (texts: string[], widths: number[], aligns: number[]) => void;

  /**
   * Print a row of the table, you can specify the column width and alignment
   * @param colsTextArr
   * @param colsWidthArr
   * @param colsAlign
   */
  // printColumnsString: (texts: string[], widths: number[], aligns: number[]) => void;

  /**
   * print pictures
   * The maximum pixel of the picture needs to be less than 2.5 million in width x height, and the width is set according to the paper specification (58 is 384 pixels, 80 is 576 pixels),
   * It will not be displayed if it exceeds the paper width
   * @param encodedString
   * @param pixelWidth
   */
  printBitmap: (encodedString: string, pixelWidth: number) => void;

  /**
   * Print Bitmap image with specified width and height
   * @param encodedString
   * @param width
   * @param height
   * @param newLine
   */
  printBitmapImage: (encodedString: string, w: number, h: number, newline: boolean) => void;

  /**
   * Print pictures(2)
   * The picture pixel resolution is less than 2 million, and the width is set according to the paper specification (58 is 384 pixels, 80 is 576 pixels), if it exceeds
   * Over the paper width will not be displayed
   * @param bitmap
   * @param type
   */
  printBitmapCustom: (bitmap: any, type: number) => void;

  /**
   * Print 1D barcode
   * @param data
   * @param symbology
   * @param height
   * @param width
   * @param textPosition
   */
  printBarCode: (data: string, symbology: number, height: number, width: number, textPosition: number) => void;

  /**
   * Print QR code
   * In the normal printing state, after calling this method, it will directly output and print, and each QR code block is 4 pixels
   * (less than 4 may fail). The maximum supported mode is version19 (93*93).
   * @param data
   * @param modulesize
   * @param errorlevel
   */
  printQRCode: (data: string, modulesize: number, errorlevel: number) => void;

  /**
   * Print 2D barcode
   * @param data
   * @param symbology
   * @param modulesize
   * @param errorlevel
   */
  print2DCode: (data: string, sysmbology: number, modulesize: number, errorlevel: number) => void;

  /**
   * Package transaction printing dedicated interface
   * @param tranBean
   */
  commitPrint: (list: any) => void;

  /**
   * Enter transaction mode
   * @param clear
   */
  enterPrinterBuffer: (clear: boolean) => void;

  /**
   * Exit transaction mode
   * @param commit
   */
  exitPrinterBuffer: (commit: boolean) => void;

  /**
   * Submit transaction print
   * Commits and prints everything in the transaction queue, and remains in transactional printing mode afterwards
   */
  commitPrinterBuffer: () => void;

  /**
   * Submit the transaction to print and call back the result
   */
  commitPrinterBufferWithCallbacka: () => void;

  /**
   * print n lines
   * @param n
   */
  lineWrap: (num: number) => void;

  /**
   * cut paper
   * @throws RemoteException
   */
  cutPaper: () => void;

  /**
   * open cash drawer
   */
  openDrawer: () => void;

  /**
   * Cash drawer status
   * @param promise
   */
  getDrawerStatus: () => Promise<Boolean>;

};


export class Template1 {
  //store name
  storeName: string;
  //address
  address: string;
  //phone number
  phoneNumber: string;

  //         item, quantity, price, tax
  // ex:     banana, 2, 2.00, 0.00
  //         apple, 1, 1.00, 0.00

  //dictionary for items, quantity, price, tax
  itemdetails: Map<string, [number, number, number]> = new Map();

  //total, subtotal
  total: number = 0;
  subtotal: number = 0;

  //constructor
  constructor(storeName: string, address: string, phoneNumber: string) {
    this.storeName = storeName;
    this.address = address;
    this.phoneNumber = phoneNumber;
  }

  //add item to the dictionary
  addItem(item: string, quantity: number, price: number, tax: number) {
    this.itemdetails.set(item, [quantity, price, tax]);
  }

  //calculate subtotal and return it
  _calculateSubtotal() {
    this.subtotal = 0;
    this.itemdetails.forEach((value, key) => {
      this.subtotal += value[0] * value[1];
    });
    return this.subtotal;
  }

  //calculate total by adding tax and return it
  _calculateTotal() {
    this.total = 0;
    let itemAfterTax = 0;
    this.itemdetails.forEach((value, key) => {
      itemAfterTax = value[0] * value[1] + value[0] * value[1] * value[2]/100;
      this.total += itemAfterTax;
      //log
      console.log(
        "item: " + key + " quantity: " + value[0] + " price: " + value[1] + " tax: " + value[2] + " itemAfterTax: " + itemAfterTax
      );
    }
    );
    console.log(" total: " + this.total);
    return this.total;
  }


  //this method for print all template
  printTemplate() {
    InbuiltPrinter.printerInit();
    
    //Store name
    InbuiltPrinter.setFontSize(40);
    InbuiltPrinter.setFontWeight(true);
    InbuiltPrinter.setAlignment(AlignValue.CENTER);
    InbuiltPrinter.printerText(this.storeName + "\n");
    // InbuiltPrinter.lineWrap(1);

    //Store address
    InbuiltPrinter.setFontSize(24);
    InbuiltPrinter.setFontWeight(false);
    InbuiltPrinter.setAlignment(AlignValue.CENTER);
    InbuiltPrinter.printerText(this.address + "\n");
    // InbuiltPrinter.lineWrap(1);

    //Store phone number
    InbuiltPrinter.setFontSize(24);
    InbuiltPrinter.setFontWeight(false);
    InbuiltPrinter.setAlignment(AlignValue.CENTER);
    InbuiltPrinter.printerText(this.phoneNumber + "\n");
    InbuiltPrinter.lineWrap(1);

    //Receipt type
    InbuiltPrinter.setFontSize(24);
    InbuiltPrinter.setFontWeight(true);
    InbuiltPrinter.setAlignment(AlignValue.LEFT);
    // InbuiltPrinter.printerText('PRE AUTHORIZED RECEIPT\n');
    // InbuiltPrinter.setFontWeight(false);
    InbuiltPrinter.printerText('Customer copy\n');
    InbuiltPrinter.lineWrap(1);

    //items column header
    InbuiltPrinter.setFontSize(24);
    InbuiltPrinter.setFontWeight(false);
    InbuiltPrinter.printColumnsString(
      ['Description', 'Quantity', `Amount`],
      [120, 60, 60],
      [AlignValue.LEFT, AlignValue.RIGHT, AlignValue.RIGHT],
    );
    InbuiltPrinter.printColumnsString(
      ['-----------', '--------', `------`],
      [120, 60, 60],
      [AlignValue.LEFT, AlignValue.RIGHT, AlignValue.RIGHT],
    );

    //items
    this.itemdetails.forEach((value, key) => {
      InbuiltPrinter.printColumnsString(
        [key, value[0].toString(), value[1].toFixed(2)],
        [120, 60, 60],
        [AlignValue.LEFT, AlignValue.RIGHT, AlignValue.RIGHT],
      );
    }
    );

    //subtotal and tax
    InbuiltPrinter.printColumnsString(
      [' ', ' ', `--------`],
      [120, 60, 60],
      [AlignValue.LEFT, AlignValue.RIGHT, AlignValue.RIGHT],
    );

    InbuiltPrinter.printColumnsString(
      [' ', 'Subtotal', this._calculateSubtotal().toFixed(2)],
      [120, 60, 60],
      [AlignValue.LEFT, AlignValue.RIGHT, AlignValue.RIGHT],
    );

    let tax = this._calculateTotal() - this._calculateSubtotal();
    // tax to tax.toFixed(2);
    
    InbuiltPrinter.printColumnsString(
      [' ', 'Tax', tax.toFixed(2)],
      [120, 60, 60],
      [AlignValue.LEFT, AlignValue.RIGHT, AlignValue.RIGHT],
    );

    //total
    InbuiltPrinter.setFontSize(40);
    InbuiltPrinter.setFontWeight(true);
    InbuiltPrinter.printColumnsString(
      [' ', 'Total', this._calculateTotal().toFixed(2)],
      [60, 60, 60],
      [AlignValue.LEFT, AlignValue.RIGHT, AlignValue.RIGHT],
    );

    //(cash)
    InbuiltPrinter.setFontSize(24);
    InbuiltPrinter.setFontWeight(false);
    InbuiltPrinter.printColumnsString(
      [' ', 'Cash $', this._calculateTotal().toFixed(2)],
      [120, 60, 60],
      [AlignValue.LEFT, AlignValue.RIGHT, AlignValue.RIGHT],
    );
    InbuiltPrinter.lineWrap(1);
  }

}


export default InbuiltPrinter as InbuiltPrinterType;

