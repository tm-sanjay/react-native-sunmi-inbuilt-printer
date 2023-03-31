import * as React from 'react';

import { StyleSheet, View, Text, TouchableOpacity ,Alert} from 'react-native';
import InbuiltPrinter,  {AlignValue, Template1, CardTemplate1} from 'react-native-sunmi-inbuilt-printer';

export default function App() {

  const _temp1 = () => {
    // Template1
    const template1 = new Template1("My Store", "Store address, no 123", "+1234567890");
    template1.data = "31/03/2023";
    template1.time = "12:00:00";
    template1.transactionId = "123456";
    template1.change = 0.5;

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

  const _pritnerTest = () => {
    //init printer, def font size 24, def font weight false, def alignment left
    InbuiltPrinter.printerInit();
    InbuiltPrinter.setFontSize(30);
    InbuiltPrinter.setFontWeight(true);
    InbuiltPrinter.setAlignment(AlignValue.CENTER);
    InbuiltPrinter.printerText('WELCOME TEST\n');
    InbuiltPrinter.cutPaper();
  }
  const _cashDrawer = () => {
    InbuiltPrinter.openDrawer();
  }
  const _cashDrawerStatus = () => {
    InbuiltPrinter.getDrawerStatus().then((r) => {
      console.log(r);
      //toast
      alert("Cash Drawer Status: " + r);
    });
    
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ ...styles.button, marginTop: 10 }} 
        onPress={_pritnerTest}>
        <Text style={styles.buttonText}>Check printer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ ...styles.button, marginTop: 10 }} 
        onPress={_temp1}>
        <Text style={styles.buttonText}>Template 1</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ ...styles.button, marginTop: 10 }} 
        onPress={_cashDrawer}>
        <Text style={styles.buttonText}>Open Cash Drawer</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={{ ...styles.button, marginTop: 10 }} 
        onPress={_cashDrawerStatus}>
        <Text style={styles.buttonText}>Cash Drawer Status</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 20,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});