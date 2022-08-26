import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, Image} from 'react-native';
import { takePicture, listImages, oscState, listFiles, status, action, setOption } from './src/helper';

export default function App() {
  const [info, setInfo] = useState('');
  const [url, setUrl] = useState('https://picsum.photos/300');
  useEffect(() => {
    const getInfo = async () => {
      const response = await fetch('http://192.168.1.1/osc/info');
      const body = await response.json();
      setInfo(body);

      const clientVersion = body.firmwareVersion.toString().split('')
      if(clientVersion[3] >= 6 && clientVersion[4] >= 2) {
        action.setClientVersion(2)
        setOption()
      }
    };

    getInfo().catch(e => console.log(e));
  }, []);

  const state = () => {
    oscState()
    console.log(`State: ${action.getLatestFileUrl()}`)
    setUrl(action.getLatestFileUrl())
  }

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(info)}</Text>
      <Image source={{uri: url}}
      style={{width: 300, height: 300}} />
      <View style={{ marginTop: 10 }}></View>
      <Button onPress={takePicture} title="take picture" />
      <View style={{ marginTop: 10 }}></View>
      <Button onPress={state} title="camera state" />
      <View style={{ marginTop: 10 }}></View>
      <Button onPress={listImages} title="list images" />
      <View style={{ marginTop: 10 }}></View>
      <Button onPress={listFiles} title="list files" />
      <View style={{ marginTop: 10 }}></View>
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
