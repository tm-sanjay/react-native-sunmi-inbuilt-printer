import * as React from 'react';

import { StyleSheet, View, Text, TouchableOpacity ,Alert} from 'react-native';
import InbuiltPrinter, {AlignValue} from 'react-native-sunmi-inbuilt-printer';

export default function App() {
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