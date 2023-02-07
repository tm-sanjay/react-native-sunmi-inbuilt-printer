import { NativeModules } from 'react-native';

const InbuiltPrinter = NativeModules.SunmiInbuiltPrinter;

export function multiply(a: number, b: number): Promise<number> {
  return InbuiltPrinter.multiply(a, b);
}

type InbuiltPrinterType = {
  multiply(a: number, b: number): Promise<number>;

  printerInit: () => void;
  printerSelfChecking: () => void;
};

export default InbuiltPrinter as InbuiltPrinterType;

