import React, { Component } from 'react';
import Sound from 'react-native-sound';
import axios from 'axios';
import { AppRegistry, StatusBar, StyleSheet, Text, View, ScrollView, Button, Image, TextInput, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { fetchWeatherByCityName, fetchWeatherByCoords } from '../api'
import Drawer from 'react-native-drawer';
import Noise from './Noise';
import DrawerContent from './DrawerContent';
import AutoComplete from './AutoComplete';



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
    let countryName = '';
    if(inputArr.length>1) {
      countryName = inputArr[1].replace(/\s/g, '').toUpperCase();
    }
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
      <Drawer content={<DrawerContent />}
      type="overlay"
      openDrawerOffset={0.382}
      closedDrawerOffset={0.02}
      tapToClose={true}
      styles={drawerStyles}
      tweenHandler={(ratio) => ({
        drawerOverlay: { opacity: ratio, backgroundColor: "#08327d" }
      })}
>
      <KeyboardAwareScrollView
        style={{backgroundColor: "white"}}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
        >
      <StatusBar 
        backgroundColor="white"
        barStyle="dark-content"
        translucent={true} />
      <ScrollView>
      <View style={styles.container}>
      <View style={styles.border}>
       
        <Image
          style={styles.weatherImg}
          source={require('../../assets/images/default.jpg')}
          />
        <Button title="GET WEATHER" onPress={() => {this.getWeatherByCoords(this.state.latitude, this.state.longitude, this.state.metric)}} />
        <AutoComplete metric={this.state.metric} getFunc={this.getWeatherByCoords}/>
        <Text style={styles.welcome}>{this.state.city}</Text>
        <Text style={styles.weather}>{this.state.weather}</Text>
        <Text style={styles.temp}>{this.state.temp} °C</Text>
        <Noise />
      
      </View>
      </View>
      </ScrollView>
      </KeyboardAwareScrollView>
     
     
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 10,
  },
  border: {
    backgroundColor: 'white',
    margin: 20,
    borderColor: "white",
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
    marginHorizontal: 2,
    marginVertical: 10,
    color: "#5D707F"
  },
  temp: {
    fontSize: 40,
    // textAlign: 'center',
    margin: 10,
    color: "#5D707F"
  },
  weather: {
    fontSize: 18,
    // textAlign: 'center',
    margin: 2,
    color: "#5D707F"
  },
  weatherImg: {
    padding: 10,
    width: 320, 
    height: 320
  }
});
const drawerStyles = {
  // drawer: { shadowColor: 'white', shadowOpacity: 0.7, shadowRadius: 1},
  main: {
    paddingLeft: 3,
  },
}

AppRegistry.registerComponent('Main', () => Main);
