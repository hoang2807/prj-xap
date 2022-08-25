import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import {takePicture, listImages, oscState, status} from './src/helper';

export default function App() {
  const [info, setInfo] = useState('');
  useEffect(() => {
    const getInfo = async () => {
      const response = await fetch('http://192.168.1.1/osc/info');
      const body = await response.json();
      setInfo(body);
      // console.log(body)
    };

    getInfo().catch(e => console.log(e));
  }, []);
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(info)}</Text>
      <View style={{marginTop: 10}} />
      <Button onPress={takePicture} title="take picture" />
      <View style={{marginTop: 10}} />
      <Button onPress={oscState} title="camera state" />
      <View style={{marginTop: 10}} />
      <Button onPress={listImages} title="list images" />
      <View style={{marginTop: 10}} />
      <Button onPress={status} title="status" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
