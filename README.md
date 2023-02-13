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

```


## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
