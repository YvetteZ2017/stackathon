import React, { Component } from 'react';
var Sound = require('react-native-sound');
import axios from 'axios';
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native';
import { fetchWeatherByCityName } from '../api'
require('../../secret.js');


Sound.setCategory('Playback', true);

const songUrl1 = require('../../assets/sounds/4.mp3');
const DEFAULT_ZIPCODE = 10004;
const DEFAULT_CITY = 'New York';

const noiseSong = new Sound(songUrl1, undefined, error => {
  if (error) {
    console.log('error loading sound', error)
    return
  }
  noiseSong.play(() => {
    // noiseSong.stop()
  })
})

export default class Main extends Component {
  constructor() {
      super();
      this.state = {
          zipcode: DEFAULT_ZIPCODE,
          city: DEFAULT_CITY,
          days: [],
          temp: null,
          main: {
              temp: null,
            temp_min: null,
            tem_max: null,
            pressure: null,
            humidity: null
            },
        weather: null
      }
  }

  getForcastByCityName(city, metric) {
    //   this.setState({city})
    const cityName = city.replace(/\s/g, '');
    console.log('city name: ', cityName)
      fetchWeatherByCityName(cityName, true)
      .then(res => {
          console.log('weather data fetched. temp: ', res.list[0].main.temp, 'weather: ', res.list[0].weather.main)
          const { main, weather } = res.list[0]
          this.setState({
            city: res.city.name,
            temp: main.temp,
            weather: weather[0].main
          })
      })
  }

  componentDidMount () {
      this.getForcastByCityName(this.state.city, true)
  }

  render() {
    
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to My Noise App!
        </Text>
        <Button title="GET WEATHER" onPress={() => {this.getForcastByCityName(this.state.city, true)}} />
        <Text style={styles.welcome}>{this.state.city}</Text>
        <Text style={styles.weather}>{this.state.weather}</Text>
        <Text style={styles.temp}>{this.state.temp} °C</Text>
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
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5D707F',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: "#F5FCFF"
  },
  temp: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    color: "#F5FCFF"
  },
  weather: {
    fontSize: 18,
    textAlign: 'center',
    margin: 2,
    color: "#F5FCFF"
  },
});

AppRegistry.registerComponent('Main', () => Main);
