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
        <Button title="NOISE" color="#5D707F" onPress={this.playNoise} />
    );
  }
}

AppRegistry.registerComponent('Noise', () => Noise);

