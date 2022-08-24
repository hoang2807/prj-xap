import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default function App() {
  const [info, setInfo] = useState('')
  useEffect(() => {
    const getInfo = async () => {
      const response = await fetch('http://192.168.1.1/osc/info');
      const body = await response.json()
      setInfo(body)
    }

    getInfo()
      .catch(e => console.log(e))
  }, [])
  return (
    <View style={styles.container}>
      <Text>{info}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})