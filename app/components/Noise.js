import React, { Component } from 'react';
import Sound from 'react-native-sound';
import { AppRegistry, StyleSheet, Text, View, Button, Image } from 'react-native';


Sound.setCategory('Playback', true);

const songUrl1 = require('../../assets/sounds/4.mp3');


const noiseSong = new Sound(songUrl1, undefined, error => {
  if (error) {
    console.log('error loading sound', error)
    return
  }
  noiseSong.play(() => {
    // noiseSong.stop()
  })
})

export default class Noise extends Component {
  constructor() {
      super();
      this.playNoise = this.playNoise.bind(this);
  }

  playNoise() {
      noiseSong.play((success) => {
          if (success) {
          noiseSong.stop()
          } else {
          console.log('playback failed due to audio decoding errors')
          }
    })
  }

  render() {

    return (
      <View style={styles.container}>
        <Button title="NOISE" onPress={this.playNoise} />
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
    color: "#5D707F"
  },
});

AppRegistry.registerComponent('Noise', () => Noise);


/*
<Button title="NOISE" onPress={() => {
        noiseSong.play((success) => {
            if (success) {
            noiseSong.stop()
            } else {
            console.log('playback failed due to audio decoding errors')
            }
        })
        }}
        />

        */