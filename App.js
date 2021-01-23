import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Alert, Image, TextInput,Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function App() {
const [selected, setSelected] = useState();
const [rates, setRates] = useState([]);
const [amount, setAmount] = useState('');
const [keys, setKeys] = useState([]);
const [result, setResult] = useState('');


const getRates= () => {
const access_key = '77b1f22fa980fbd7adeebc5c29cf4154';
const url = 'http://data.fixer.io/api/latest?access_key=' + access_key;
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
React.useEffect(() => getRates(),[]);

const convert = () => {
  const amountEur = Number(amount) / rates[selected];
  setResult(`${amountEur.toFixed(2)}€`);
}

  return (
    <View style={styles.container}>
      <Image style={{height:100, width:150}} source={{uri:'https://preview.pixlr.com/images/800wm/1195/1/11951502686.jpg'}}></Image>
      <Text>{result} </Text>
      <View style={{ flexDirection: 'row'}}> 
      <TextInput 
      keyboardType="number-pad"
      value={amount}
      onChangeText={(val) => setAmount(val)}
      style={{ borderBottomWidth:1, borderColor:'blue', width:70, height:30}}></TextInput>
     <Picker 
     selectedValue={selected}
      style={{height: 50, width: 200}}
      onValueChange={(itemValue, ItemIndex) => setSelected(itemValue)}>
    
         {codes}
      </Picker> 
      </View>
      <Button onPress={convert} title="Convert"></Button>
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
