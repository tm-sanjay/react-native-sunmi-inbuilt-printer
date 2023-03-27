import { NativeModules } from 'react-native';

const InbuiltPrinter = NativeModules.SunmiInbuiltPrinter;

export function multiply(a: number, b: number): Promise<number> {
  return InbuiltPrinter.multiply(a, b);
}

export function printLine(blod: boolean, size: number): void {
  InbuiltPrinter.setFontSize(size);
  InbuiltPrinter.setFontWeight(blod);
  InbuiltPrinter.printerText('───────────────────────────────────────────────\n');
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
    this.itemdetails.forEach((value) => {
      this.subtotal += value[0] * value[1];
    });
    return this.subtotal;
  }

  //calculate total by adding tax and return it
  _calculateTotal() {
    this.total = 0;
    let itemAfterTax = 0;
    this.itemdetails.forEach((value) => {
      itemAfterTax = value[0] * value[1] + value[0] * value[1] * value[2]/100;
      this.total += itemAfterTax;
    }
    );
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
        [key, value[0].toString(), (value[0] * value[1]).toFixed(2)],
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

export class Template2 {
//store name, address, phone number
  storeName: string;
  
  add1: string = '';
  add2: string = '';
  add3: string = '';
  phoneNumber: string = '';

  gstNumber: string = '';

  invoiceNumber: string = '';

  date: string = '';
  tokenNumber: string = '';
  time: string = '';
  tableNumber: string = '';

  cgstRate: number = 2.5;
  sgstRate: number = 2.5;
  serviceChargeRate: number = 5;

  //         item, quantity, rate, disc, value
  // ex:     banana, 2, 2.00, 0.00, 4.00
  //         apple, 1, 1.00, 0.00, 1.00

  //dictionary for items, quantity, rate, disc, value
  itemdetails: Map<string, [number, number, number, number]> = new Map();

  //total, subtotal
  grandTotal: number = 0;
  subtotal: number = 0;


  constructor(storeName: string) {
    this.storeName = storeName;
  }

  //add item to the dictionary
  addItem(item: string, quantity: number, rate: number, disc: number, tax: number) {
    this.itemdetails.set(item, [quantity, rate, disc, tax]);
  }

  //calculate subtotal
  _calculateSubtotal() {
    this.subtotal = 0;
    this.itemdetails.forEach((value) => {
      let itemSubtotal = value[0] * value[1];
      this.subtotal += itemSubtotal;
    });
    return this.subtotal;
  }

  //calculate cgst
  _calculateCGST() {
    return this._calculateSubtotal() * (this.cgstRate / 100);
  }

  //calculate sgst
  _calculateSGST() {
    return this._calculateSubtotal() * (this.sgstRate / 100);
  }

  //calculate service charge
  _calculateServiceCharge() {
    return this._calculateSubtotal() * (this.serviceChargeRate / 100);
  }

  //calculate total
  _calculateTotal() {
    this.grandTotal = 0;
    this.grandTotal = this._calculateSubtotal() + this._calculateCGST() + this._calculateSGST() + this._calculateServiceCharge();
    return this.grandTotal;
  }
  
  printTemplate() {
    InbuiltPrinter.printerInit();
    
    //Store name
    InbuiltPrinter.setFontSize(32);
    InbuiltPrinter.setFontWeight(true);
    InbuiltPrinter.setAlignment(AlignValue.CENTER);
    InbuiltPrinter.printerText(this.storeName + '\n');

    //Address line 1
    InbuiltPrinter.setFontSize(32);
    InbuiltPrinter.setFontWeight(false);
    InbuiltPrinter.setAlignment(AlignValue.CENTER);
    InbuiltPrinter.printerText(this.add1 + '\n');
    InbuiltPrinter.printerText(this.add2 + '\n');
    InbuiltPrinter.printerText(this.add3 + '\n');
    InbuiltPrinter.printerText(this.gstNumber + '\n');
    InbuiltPrinter.printerText(this.phoneNumber + '\n');
    InbuiltPrinter.lineWrap(1);

    //Invoice No
    InbuiltPrinter.setFontSize(32);
    InbuiltPrinter.setFontWeight(true);
    InbuiltPrinter.setAlignment(AlignValue.CENTER);
    InbuiltPrinter.printerText(this.invoiceNumber + '\n');

    //2 column
    InbuiltPrinter.setFontSize(24);
    InbuiltPrinter.setFontWeight(false);
    InbuiltPrinter.printColumnsString(
      ['  ' + 'Token No.:' + this.tokenNumber, 'Date: ' +this.date+ '  '],
      [120, 120],
      [AlignValue.LEFT, AlignValue.RIGHT],
    );
    InbuiltPrinter.printColumnsString(
      ['  ' + 'Cashier:2022', 'Time:' +this.time+ '  '],
      [120, 120],
      [AlignValue.LEFT, AlignValue.RIGHT],
    );
    InbuiltPrinter.printColumnsString(
      ['  ' + 'Table No:' + this.tableNumber, ''],
      [120, 120],
      [AlignValue.LEFT, AlignValue.RIGHT],
    );

    //items header
    printLine(true, 24);
    InbuiltPrinter.setFontSize(24);
    InbuiltPrinter.setFontWeight(false);
    //5 column
    InbuiltPrinter.printColumnsString(
      ['Item', 'Qty', 'Rate', 'Disc', 'Value'],
      [48, 20, 20, 20, 20],
      [AlignValue.CENTER, AlignValue.CENTER, AlignValue.CENTER, AlignValue.CENTER, AlignValue.CENTER],
    );


    //items
    printLine(true, 24);
    InbuiltPrinter.setFontSize(24);
    InbuiltPrinter.setFontWeight(true);
    
    this.itemdetails.forEach((value, key) => {
      InbuiltPrinter.printColumnsString(
        ['  ' +key, value[0].toFixed(2), value[1].toFixed(2), value[2].toFixed(2), value[3].toFixed(2)],
        [48, 20, 20, 20, 20],
        [AlignValue.CENTER, AlignValue.CENTER, AlignValue.CENTER, AlignValue.CENTER, AlignValue.CENTER],
      );
    }
    );

    //subtotal
    printLine(true, 24);
    InbuiltPrinter.setFontSize(22);
    InbuiltPrinter.setFontWeight(false);
    InbuiltPrinter.printColumnsString(
      ['   ' + 'Subtotal:', this._calculateSubtotal().toFixed(2) + '   '],
      [120, 120],
      [AlignValue.LEFT, AlignValue.RIGHT],
    );
    printLine(true, 24);

    //tax
    InbuiltPrinter.setFontSize(24);
    InbuiltPrinter.setFontWeight(false);
    InbuiltPrinter.printColumnsString(
      ['   ' + 'CGST(2.5%)', this._calculateCGST().toFixed(2)+ '   '],
      [120, 120],
      [AlignValue.LEFT, AlignValue.RIGHT],
    );
    InbuiltPrinter.printColumnsString(
      ['   ' + 'SGST(2.5%)', this._calculateSGST().toFixed(2)+ '   '],
      [120, 120],
      [AlignValue.LEFT, AlignValue.RIGHT],
    );
    InbuiltPrinter.printColumnsString(
      ['   ' + 'SERVICE CHARGE 5%', this._calculateServiceCharge().toFixed(2)+ '   '],
      [120, 120],
      [AlignValue.LEFT, AlignValue.RIGHT],
    );
    InbuiltPrinter.printColumnsString(
      ['   ' + 'Rounded Off(-)', '0.00'+ '   '],
      [120, 120],
      [AlignValue.LEFT, AlignValue.RIGHT],
    );
    printLine(true, 24);

    //total
    InbuiltPrinter.setFontSize(26);
    InbuiltPrinter.setFontWeight(true);
    InbuiltPrinter.printColumnsString(
      ['   ' + 'Grand Total:', this._calculateTotal().toFixed(2)+ '   '],
      [120, 120],
      [AlignValue.LEFT, AlignValue.CENTER],
    );
    //cash tendered
    InbuiltPrinter.setFontSize(24);
    InbuiltPrinter.setFontWeight(false);
    InbuiltPrinter.printColumnsString(
      ['   ' + 'Cash Tendered:', '0.00'+ '   '],
      [120, 120],
      [AlignValue.LEFT, AlignValue.RIGHT],
    );
    //change
    InbuiltPrinter.printColumnsString(
      ['   ' + 'Change:', '0.00'+ '   '],
      [120, 120],
      [AlignValue.LEFT, AlignValue.RIGHT],
    );
    InbuiltPrinter.setFontSize(22);
    InbuiltPrinter.setFontWeight(false);
    InbuiltPrinter.setAlignment(AlignValue.RIGHT);
    InbuiltPrinter.printerText('**Reference Bill-Payment Awaited**    \n');

    InbuiltPrinter.setFontSize(24);
    InbuiltPrinter.setFontWeight(false);
    InbuiltPrinter.setAlignment(AlignValue.CENTER);
    printLine(true, 24);
    InbuiltPrinter.printerText(' \n');
    printLine(true, 24);
    
    InbuiltPrinter.setFontSize(22);
    InbuiltPrinter.setFontWeight(true);
    InbuiltPrinter.setAlignment(AlignValue.CENTER);
    InbuiltPrinter.printerText('**** Thank You - Visit Again ****\n');

    printLine(true, 24);
    InbuiltPrinter.setFontSize(24);
    InbuiltPrinter.setFontWeight(true);
    InbuiltPrinter.setAlignment(AlignValue.LEFT);
    InbuiltPrinter.printerText('   Printed On: ' + this.date + ' ' + this.time + '\n');
  }
} 

export class Template3 {
  //store name
  storeName: string;
  //address
  add1: string = '';
  add2: string = '';
  add3: string = '';
  //         item, quantity, price, amount
  // ex:     banana, 2, 2.00, 4.00
  //         apple, 1, 1.00, 1.00

  //dictionary for items, quantity, price, amount
  itemdetails: Map<string, [number, number, number]> = new Map();

  //total, subtotal
  total: number = 0;
  subtotal: number = 0;

  //date and time
  date: string = '';
  time: string = '';
  tokenNumber: string = '';
  billNumber: string = '';
  
  //constructor
  constructor(storeName: string) {
    this.storeName = storeName;
  }

  //add item to the dictionary
  addItem(item: string, quantity: number, price: number, tax: number) {
    this.itemdetails.set(item, [quantity, price, tax]);
  }

  //calculate subtotal add all 'amount'
  _calculateSubtotal() {
    this.subtotal = 0;
    this.itemdetails.forEach((value) => {
      this.subtotal += value[0] * value[1];
    }
    );
    return this.subtotal;
  }

  _totalQnt() {
    let totalQnt = 0;
    this.itemdetails.forEach((value) => {
      totalQnt += value[0];
    }
    );
    return totalQnt;
  };

  //this method for print all template
  printTemplate() {
    InbuiltPrinter.printerInit();
    
    //Store name
    InbuiltPrinter.setFontSize(32);
    InbuiltPrinter.setFontWeight(true);
    InbuiltPrinter.setAlignment(AlignValue.CENTER);
    InbuiltPrinter.printerText(this.storeName + "\n");
    // InbuiltPrinter.lineWrap(1);

    //Store address
    InbuiltPrinter.setFontSize(24);
    InbuiltPrinter.setFontWeight(false);
    InbuiltPrinter.setAlignment(AlignValue.CENTER);
    InbuiltPrinter.printerText(this.add1 + "\n");
    InbuiltPrinter.printerText(this.add2 + "\n");
    // InbuiltPrinter.printerText(this.add3 + "\n");
    // InbuiltPrinter.lineWrap(1);

    //line
    printLine(false, 24);
    InbuiltPrinter.setFontSize(24);
    InbuiltPrinter.setFontWeight(false);
    InbuiltPrinter.setAlignment(AlignValue.LEFT);
    InbuiltPrinter.printerText('  '+'Name:\n');
    printLine(false, 24);

    //2column
    InbuiltPrinter.setFontSize(24);
    InbuiltPrinter.setFontWeight(false);
    InbuiltPrinter.setAlignment(AlignValue.LEFT);
    InbuiltPrinter.printColumnsString(
      ['  '+'Date:'+this.date+' '+this.time, 'SELF SERVICE: A4'+ '  '],
      [120, 120],
      [AlignValue.LEFT, AlignValue.LEFT],
    );
    InbuiltPrinter.printColumnsString(
      ['  '+'Cashier: biller', 'Bill No:'+this.billNumber +'  '],
      [120, 120],
      [AlignValue.LEFT, AlignValue.LEFT],
    );
    
    InbuiltPrinter.setFontSize(24);
    InbuiltPrinter.setFontWeight(true);
    InbuiltPrinter.setAlignment(AlignValue.LEFT);
    InbuiltPrinter.printerText('  '+'Token No.:'+this.tokenNumber+'\n');

    //items column header
    printLine(false, 24);
    InbuiltPrinter.setFontSize(24);
    InbuiltPrinter.setFontWeight(false);
    InbuiltPrinter.printColumnsString(
      ['  '+'No.Items', 'Qty', 'Price', 'Amount'+ '  '],
      [80, 40, 40, 40],
      [AlignValue.LEFT, AlignValue.RIGHT, AlignValue.RIGHT, AlignValue.RIGHT],
    );
    printLine(false, 24);

    //items
    this.itemdetails.forEach((value, key) => {
      InbuiltPrinter.setFontSize(24);
      InbuiltPrinter.setFontWeight(false);
      InbuiltPrinter.printColumnsString(
        ['  '+key, value[0].toString(), value[1].toFixed(2), (value[0] * value[1]).toFixed(2)+ '  '],
        [80, 40, 40, 40],
        [AlignValue.LEFT, AlignValue.RIGHT, AlignValue.RIGHT, AlignValue.RIGHT],
      );
    }
    );

    

    //line
    printLine(false, 24);
    //subtotal
    InbuiltPrinter.setFontSize(24);
    InbuiltPrinter.setFontWeight(false);
    InbuiltPrinter.printColumnsString(
      ['  '+'Total Qty:'+this._totalQnt().toString(), 'Sub Total', this._calculateSubtotal().toFixed(2)+'  '],
      [80, 80, 40],
      [AlignValue.LEFT, AlignValue.RIGHT, AlignValue.RIGHT],
    );
    printLine(false, 24);

    //total 
    InbuiltPrinter.setFontSize(30);
    InbuiltPrinter.setFontWeight(true);
    InbuiltPrinter.setAlignment(AlignValue.RIGHT);
    InbuiltPrinter.printerText('Grand Total  ₹' + this._calculateSubtotal().toFixed(2) + '   \n');
    printLine(false, 24);

    //thanks
    InbuiltPrinter.setFontSize(24);
    InbuiltPrinter.setFontWeight(true);
    InbuiltPrinter.setAlignment(AlignValue.CENTER);
    InbuiltPrinter.printerText('Thank You | Please Order Us Again..!!\n');
  }

}

export class CardTemplate1 {
  // "data": {
  //   "amount": 108.0,
  //   "txnId": "17969",
  //   "cardNumber": "************0119",
  //   "cardName": "Test User",
  //   "cardBrand": "MASTERCARD",
  //   "paymentType": "CREDIT",
  //   "cardEntryMode": "CHIP_ENTRY"
  // }

  //amount
  amount: string;
  //transaction id
  txnId: string;
  //card number
  cardNumber: string;
  //card holder name
  cardHolderName: string;
  //card brand
  cardBrand: string;
  //payment type
  paymentType: string;
  //card entry mode
  cardEntryMode: string;


  //constructor
  constructor(amount: string, txnId: string, cardNumber: string, cardHolderName: string, cardBrand: string, paymentType: string, cardEntryMode: string) {
    this.amount = amount;
    this.txnId = txnId;
    this.cardNumber = cardNumber;
    this.cardHolderName = cardHolderName;
    this.cardBrand = cardBrand;
    this.paymentType = paymentType;
    this.cardEntryMode = cardEntryMode;
  }

  //this method for print all template
  printTemplate() {
    //Receipt type
    InbuiltPrinter.setFontSize(24);
    InbuiltPrinter.setFontWeight(true);
    InbuiltPrinter.setAlignment(AlignValue.LEFT);
    InbuiltPrinter.printerText('CARD RECEIPT\n');
    InbuiltPrinter.printerText('--------------\n');

    //------------------------------------------
    //card type and number
    //price and masked card number
    InbuiltPrinter.setFontSize(24);
    InbuiltPrinter.setFontWeight(true);
    InbuiltPrinter.printColumnsString(
      ['USD $' + this.amount, this.cardNumber],
      [60, 80],
      [AlignValue.LEFT, AlignValue.LEFT],
    );

    //Footer (card type/name )
    InbuiltPrinter.setFontWeight(false);
    InbuiltPrinter.printColumnsString(
      [this.cardBrand, 'Acct/Card'],
      [60, 80],
      [AlignValue.LEFT, AlignValue.LEFT],
    );

    // ------------------------------------------

    //Entry method, auth code, response code
    InbuiltPrinter.setFontWeight(true);
    InbuiltPrinter.printColumnsString(
      [this.cardEntryMode, this.txnId],
      [60, 80],
      [AlignValue.LEFT, AlignValue.LEFT],
    );
    
    //footer
    InbuiltPrinter.setFontWeight(false);
    InbuiltPrinter.printColumnsString(
      ['Entry Method', 'Txn ID'],
      [60, 80],
      [AlignValue.LEFT, AlignValue.LEFT],
    );
    
    // ------------------------------------------
    
    //card holder name, card type
    InbuiltPrinter.setFontWeight(true);
    InbuiltPrinter.printColumnsString(
      [this.cardHolderName, this.paymentType],
      [60, 80],
      [AlignValue.LEFT, AlignValue.LEFT],
    );

    //footer
    InbuiltPrinter.setFontWeight(false);
    InbuiltPrinter.printColumnsString(
      ['Card Holder Name', 'Card Type'],
      [60, 80],
      [AlignValue.LEFT, AlignValue.LEFT],
    );
    }
}
export default InbuiltPrinter as InbuiltPrinterType;

