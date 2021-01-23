import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Alert, Image, TextInput,Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function App() {
const [code, setCode] = useState();
const [rates, setRates] = useState([]);
const [amount, setAmount] = useState('');
const [keys, setKeys] = useState([]);
const [result, setResult] = useState('');

//React.useEffect(() => getRates(),[]);

const getRates= () => {
const access_key = '77b1f22fa980fbd7adeebc5c29cf4154';
const url = 'http://data.fixer.io/api/convert?access_key=' + access_key + 
'&from=' + code + '&to=EUR&amount=' + amount;
  fetch(url)
  .then((res) => res.json())
  .then((data) => {
    setRates(data.rates);
    console.log(url)
    setKeys(Object.keys(data.rates))

  })
.catch((error) => {
  Alert.alert('Error', error.message);
})
}
let codes = 
keys.map((s, i) => {
  return <Picker.Item key={i} value={s} label={s} />
  //{keys.map((s, i) => {
    //return <Picker.Item key={s} value={i} label={i} />
  
});


  return (
    <View style={styles.container}>
      <Image style={{height:100, width:150}} source={{uri:'https://preview.pixlr.com/images/800wm/1195/1/11951502686.jpg'}}></Image>
      <Text>{result} €</Text>
      <TextInput 
      keyboardType="number-pad"
      value={amount}
      onChangeText={(val) => setAmount(val)}
      style={{borderWidth:1, borderColor:'black', width:50}}></TextInput>
     <Picker 
      style={{height: 50, width: 200}}
      onValueChange={(val) => setCode(val)}>
     
    
      </Picker> 
      <Button onPress={getRates} title="Convert"></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
