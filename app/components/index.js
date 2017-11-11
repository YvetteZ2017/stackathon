import React, { Component } from 'react';
import Sound from 'react-native-sound';
import axios from 'axios';
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native';
import { fetchWeatherByCityName, fetchWeatherByCoords } from '../api'
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
          latitude: null,
          longitude: null,
          geo_error: null,
          days: [],
          temp: null,
          temp_min: null,
          tem_max: null,
          pressure: null,
          humidity: null,
          weather: null,
          sunrise: null,
          sunset: null,
          metric: true
      }
  }

  getWeatherByCityName(city, metric) {
    const cityName = city.replace(/\s/g, '');
      fetchWeatherByCityName(cityName, metric)
      .then(res => {
          console.log('weather data fetched. temp: ', res.main.temp, 'weather: ', res.weather[0].main)
          console.log('coords: ', this.state.latitude, ',', this.state.longitude)
          this.setState({
            city: res.name,
            temp: res.main.temp,
            weather: res.weather[0].main
          })
      })
  }

  getWeatherByCoords(lat, lon, metric) {
    fetchWeatherByCoords(lat, lon, metric)
    .then(res => {
      this.setState({
        city: res.name,
        temp: res.main.temp,
        weather: res.weather[0].main
      })
    })
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          geo_error: null,
        });
        this.getWeatherByCoords(this.state.latitude, this.state.longitude, this.state.metric);
      },
      (error) => this.setState({
        geo_error: error.message
      }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  render() {
    
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to My Noise App!
        </Text>
        <Button title="GET WEATHER" onPress={() => {this.getWeatherByCoords(this.state.latitude, this.state.longitude, this.state.metric)}} />
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
