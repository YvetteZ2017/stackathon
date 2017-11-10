/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

var Sound = require('react-native-sound');
var songUrl1 = require('./assets/sounds/1.mp3')
var songUrl2 = require('./assets/sounds/long.mp3')

// var songUrl = require('./2.mp3')

Sound.setCategory('Playback', true);



const drumSound1 = new Sound(songUrl1, undefined, error => {
  if (error) {
    console.log('error loading sound', error)
    return
  }
  drumSound1.play(() => {

    // drumSound.stop()
  })
})

const drumSound2 = new Sound(songUrl1, undefined, error => {
  if (error) {
    console.log('error loading sound', error)
    return
  }
  drumSound2.play(() => {

    // drumSound.stop()
  })
})

const testArr = [];



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <Button title="TIME" onPress={() => {
          console.log('!!!!!!!', new Date().getTime())
          testArr.push(new Date().getTime())
          // drumSound.play((success) => {
          // if (success) {
          //   // drumSound.stop()
          //   // drumSound.release()
          //   // console.log('successfully finished playing')
          // } else {
          //   console.log('playback failed due to audio decoding errors', drumSound)
          // }
        // })
       
      }}/>
      <Button title="Calculate" onPress={() => {
        const zero = testArr[0]
        console.log(testArr.map((x,i) => x-testArr[i-1]))
      }} />
      <Button title="DRUM1" onPress={() => {
        drumSound1.play((success) => {
          if (success) {
            drumSound1.stop()
          } else {
            console.log('playback failed due to audio decoding errors')
          }
        })
      }}
      />
      <Button title="DRUM2" onPress={() => {
        drumSound2.play((success) => {
          if (success) {
            drumSound2.stop()
          } else {
            console.log('playback failed due to audio decoding errors')
          }
        })
      }}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
