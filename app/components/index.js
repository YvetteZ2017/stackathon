import React, { Component } from 'react';
import Sound from 'react-native-sound';
import axios from 'axios';
import { AppRegistry, StatusBar, StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { fetchWeatherByCityName, fetchWeatherByCoords } from '../api'
import Noise from './Noise';
require('../../secret.js');


const DEFAULT_ZIPCODE = 10004;
const DEFAULT_CITY = 'New York';


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
          metric: true,
          inputValue: ''
      }
    this.onChangeText = this.onChangeText.bind(this);
    this.getWeatherByCityName = this.getWeatherByCityName.bind(this);
    this.getWeatherByCoords = this.getWeatherByCoords.bind(this);
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

  getWeatherByCityName(input, metric) {
    const inputArr = input.split(',')
    const cityName = inputArr[0].split(' ').map(e => e.slice(0, 1).toUpperCase() + e.slice(1).toLowerCase()).join('');
    const countryName = inputArr[1].replace(/\s/g, '').toUpperCase()
    console.log('cityName: ', cityName, 'countryName: ', countryName)
      fetchWeatherByCityName(cityName, metric, countryName)
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

  onChangeText(input) {
    this.setState({inputValue: input})
  }

  render() {
    
    return (
      <View style={styles.container}>
      <View style={styles.border}>
        <StatusBar 
          backgroundColor="#F5FCFF"
          barStyle="dark-content"
          translucent={true} />
        <Image
          style={{width: 350, height: 350}}
          source={require('../../assets/images/default.jpg')}
          />
        <Button title="GET WEATHER" onPress={() => {this.getWeatherByCoords(this.state.latitude, this.state.longitude, this.state.metric)}} />
        <Text style={styles.welcome}>{this.state.city}</Text>
        <Text style={styles.weather}>{this.state.weather}</Text>
        <Text style={styles.temp}>{this.state.temp} °C</Text>
        <TextInput style={styles.texpinput}
                   onChangeText={this.onChangeText}
                   onSubmitEditing={event => this.getWeatherByCityName(this.state.inputValue, this.state.metric)}
                   placeholder="City name, Country Abbreviation (optional)"
                   clearButtonMode={"always"}
                   clearTextOnFocus={true}
                   enablesReturnKeyAutomatically={true}
                   returnKeyType={"search"} />
        <Noise />
      
      </View>
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
    marginTop: 20,
  },
  border: {
    backgroundColor: '#F5FCFF',
    margin: 20,
    borderColor: "black",
    borderWidth: 3
  },
  textinput: {
    height: 40,
    borderColor: '#666',
    borderWidth: 1,
    padding: 20,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: "#5D707F"
  },
  temp: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    color: "#5D707F"
  },
  weather: {
    fontSize: 18,
    textAlign: 'center',
    margin: 2,
    color: "#5D707F"
  },
  weatherImg: {
    padding: 10,
  }
});

AppRegistry.registerComponent('Main', () => Main);
