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

// Sound.setCategory('Playback');

// const drumSound = new Sound('./assets/sounds/1.wav', (error) => {
//   if (error) {
//     console.log('failed to load the sound', error);
//     return;
//   }
//   console.log('duration in secondes: ', drumSound.getDuration(), 'number of channels: ', drumSound.getNumberOfChannels());
// })

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
        <Button title="DRUM" onPress={() => {console.log('Hahahahaha!!!!!!!!')
        // drumSound.play((success) => {
        //   if (success) {
        //     console.log('successfully finished playing')
        //   } else {
        //     console.log('playback failed du to audio decoding errors')
        //   }
        // })
      }}/>
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
