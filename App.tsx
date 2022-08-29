import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, Image } from 'react-native';
import { takePicture, oscState, listFiles, status, action, getOption, getLivePreview } from './src/helper';

export default function App() {
  const [info, setInfo] = useState('');
  const [url, setUrl] = useState('https://picsum.photos/300');
  const [preview, setPreview] = useState('')
  useEffect(() => {
    const getInfo = async () => {
      const response = await fetch('http://192.168.1.1/osc/info');
      const body = await response.json();
      setInfo(body);

      const clientVersion = body.firmwareVersion.toString().split('')
      console.log(clientVersion)
      // if (clientVersion[3] > 6) {
      //   action.setClientVersion(2)
      //   console.log(action.getClientVersion())
      //   setOption()
      // }
      // else if (clientVersion[3] == 6 && clientVersion[4] >= 2) {
      //   action.setClientVersion(2)
      //   console.log(action.getClientVersion())
      //   setOption()
      // }
      getOption()
    };

    getInfo().catch(e => console.log(e));

    // startSession();
    // getLivePreview()
    setPreview(action.getBinaryData())
  }, []);

  const state = () => {
    oscState()
    console.log(`State: ${action.getLatestFileUrl()}`)
    setUrl(action.getLatestFileUrl())
  }

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(info)}</Text>
      {/* <Image source={{ uri: url }}
        style={{ width: 300, height: 300 }} /> */}
      <Image style={{ width: 300, height: 300, resizeMode: 'cover', borderWidth: 1, borderColor: 'red' }} source={{ uri: preview !== "" ? preview : undefined }} />
      <View style={{ marginTop: 10 }}></View>
      <Button onPress={takePicture} title="take picture" />
      <View style={{ marginTop: 10 }}></View>
      <Button onPress={state} title="camera state" />
      <View style={{ marginTop: 10 }}></View>
      <Button onPress={listFiles} title="list files" />
      <View style={{ marginTop: 10 }}></View>
      <Button onPress={status} title="status" />
      <View style={{ marginTop: 10 }}></View>
      <Button onPress={getLivePreview} title="live preview" />
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
