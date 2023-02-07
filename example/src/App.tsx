import * as React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import InbuiltPrinter from 'react-native-sunmi-inbuilt-printer';

export default function App() {
  const _pritnerInit = () => {
    InbuiltPrinter.printerSelfChecking();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ ...styles.button, marginTop: 10 }} 
        onPress={_pritnerInit}>
        <Text style={styles.buttonText}>Check printer</Text>
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