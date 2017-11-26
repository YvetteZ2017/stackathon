import React, { Component } from 'react';
import Sound from 'react-native-sound';
import axios from 'axios';
import {Pages} from 'react-native-pages';
import Drawer from 'react-native-drawer';
import { AppRegistry, StatusBar, StyleSheet, Text, View, Button, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { fetchWeatherByCoords, fetchForecastByCoords } from '../api';
import Noise from './Noise';
import DrawerContent from './DrawerContent';
import AutoComplete from './AutoComplete';
import Forecast from './Forecast';
import WeatherImage from './WeatherImage';


const DEFAULT_CITY = 'New York';


export default class Main extends Component {
  constructor() {
      super();
      this.state = {
          city: DEFAULT_CITY,
          latitude: null,
          longitude: null,
          geo_error: null,
          temp: null,
          weather: null,
          weather_description: '',
          weatherId: null,
          metric: false,
          forecastList: [],
      }
    this.getWeatherByCoords = this.getWeatherByCoords.bind(this);
    this.getForecastByCoords = this.getForecastByCoords.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          geo_error: null,
        });
        this.getWeatherByCoords(this.state.latitude, this.state.longitude, this.state.metric);
        this.getForecastByCoords(this.state.latitude, this.state.longitude, this.state.metric);
      },
      (error) => this.setState({
        geo_error: error.message
      }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  
  getWeatherByCoords(lat, lon, metric) {
    fetchWeatherByCoords(lat, lon, metric)
    .then(res => {
      this.setState({
        city: res.name,
        temp: res.main.temp,
        weather: res.weather[0].main,
        weather_description: res.weather[0].description,
        weatherId: res.weather[0].id
      })
    })
  }

  getForecastByCoords(lat, lon, metric) {
    fetchForecastByCoords(lat, lon, metric)
    .then(res => {
      this.setState({
        forecastList: res.list
      })
    })
  }

  onUpdate (data) {
    this.setState({metric: data});
  }


  render() {
    let shorterList = [];
    this.state.forecastList.forEach((x, i) => {if((i%3)===0) {shorterList.push(x)}});

    return (
      <Drawer
      type="overlay"
      content={<DrawerContent metric={this.state.metric} getFunc={this.getWeatherByCoords} getWeatherByCoords={this.getWeatherByCoords} lat={this.state.latitude} lon={this.state.longitude} onUpdate={this.onUpdate}/>}
      tapToClose={true}
      openDrawerOffset={0.382}
      panCloseMask={0.2}
      closedDrawerOffset={0.015}
      styles={drawerStyles}
      tweenHandler={(ratio) => ({
        main: { opacity:(2-ratio)/2 }
      })}
      >
      <Pages>
        <View style={{flex: 1}}>
          <StatusBar 
            backgroundColor="white"
            barStyle="dark-content"
            translucent={true} />

          <View style={styles.container}>
          <View style={styles.border}>
        
            <WeatherImage weatherId={this.state.weatherId}/>

            <View style={{flex: 1}}>
              <Text style={styles.large}>{this.state.weather}</Text>
            </View>

            <View style={{flex: 2}}>
              {
                this.state.metric ? 
                <Text style={styles.small}>{this.state.city} | {this.state.temp} °C</Text> 
                : <Text style={styles.small}>{this.state.city} | {this.state.temp} °F</Text>
              }
              <Text style={styles.small}>{this.state.weather_description}</Text>
            </View>

          </View>
          </View>
        </View>

        <View style={{flex: 1, backgroundColor: '#08327d'}}>
          <Forecast shorterList={shorterList} metric={this.state.metric}/>
        </View> 

      </Pages>
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
    marginVertical: 20,
    marginLeft: 15,
    marginRight: 15,
    borderColor: "white",
  },
  large: {
    fontSize: 40,
    margin: 10,
    color: "black"
  },
  small: {
    fontSize: 16,
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
  drawer: { opacity: 0.9, backgroundColor: '#08327d'},
  main: {
    paddingRight: 2,
  },
}

AppRegistry.registerComponent('Main', () => Main);
