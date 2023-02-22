# react-native-sunmi-inbuilt-printer

Sunmi inbuilt thermal printer

## Installation

```sh
npm install react-native-sunmi-inbuilt-printer
```

## Usage

```js
import InbuiltPrinter from 'react-native-sunmi-inbuilt-printer';

// ...

const _pritnerTest = () => {
  //init printer, def font size 24, def font weight false, def alignment left
  InbuiltPrinter.printerInit();
  InbuiltPrinter.setFontSize(30);
  InbuiltPrinter.setFontWeight(true);
  InbuiltPrinter.printerText('WELCOME TEST\n');
}

const _cashDrawer = () => {
  InbuiltPrinter.openDrawer();
}

const _cashDrawerStatus = () => {
  InbuiltPrinter.getDrawerStatus().then((r) => {
    console.log(r) //boolien
  });
}

//example template of a receipt
const _temp1 = () => {
  const template1 = new Template1("My Store", "Store address, no 123", "+1234567890");
  template1.addItem("Item 1", 1, 10, 0); //name, qty, price, tax
  template1.addItem("Item 2", 1, 10, 10);
  template1.addItem("Item 3", 1, 10, 12);
  template1.printTemplate();

  //card payment template1
  const cardTemplate = new CardTemplate1("108.0", "17969", "************0119", "Test User", "MASTERCARD", "CREDIT", "CHIP_ENTRY");
  cardTemplate.printTemplate();

  //thank you message
  InbuiltPrinter.setFontSize(24);
  InbuiltPrinter.printerText('Thank you for shopping with us\n');
  InbuiltPrinter.printerText('------------------------------\n');
  InbuiltPrinter.cutPaper();
}

```


## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
