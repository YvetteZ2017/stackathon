import React, { Component } from 'react';
import Sound from 'react-native-sound';
import axios from 'axios';
import { AppRegistry, StatusBar, StyleSheet, Text, View, ScrollView, Button, Image, TextInput, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { fetchWeatherByCoords, fetchForecastByCoords } from '../api'
import {Pages} from 'react-native-pages';
import Noise from './Noise';
import AutoComplete from './AutoComplete';
import WeatherImage from './WeatherImage'


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
          sunrise: null,
          sunset: null,
          metric: true,
          forecastList: [],
      }
    this.getWeatherByCoords = this.getWeatherByCoords.bind(this);
    this.getForecastByCoords = this.getForecastByCoords.bind(this);    
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


  render() {
    let shorterList = [];
    this.state.forecastList.forEach((x, i) => {if((i%3)===0) {shorterList.push(x)}});

    return (
      <Pages>
        <View style={{flex: 1}}>
        
          <StatusBar 
            backgroundColor="white"
            barStyle="dark-content"
            translucent={true} />

          <View style={styles.container}>
          <View style={styles.border}>
        
            <WeatherImage weatherId={this.state.weatherId}/>
            <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={styles.large}>{this.state.weather}</Text>
            </View>
            <View style={{flex: 2, flexDirection: 'row'}}>
              {
                this.state.metric ? 
                <Text style={styles.small}>{this.state.city} | {this.state.temp} °C</Text> 
                : <Text style={styles.small}>{this.state.city} | {this.state.temp} °F</Text>
              }
              <Text style={styles.small}> | {this.state.weather_description}</Text>
            </View>
            
          </View>
          </View>

        </View>
            
        <View style={{flex: 1, backgroundColor: '#08327d'}}>
          
          <View style={styles.container_secondPage}>
            <Text style={{
              fontSize: 40,
              margin: 10,
              color: "#fbfbfb",
              
            }}>Forecast</Text>
            {
              shorterList.map((element,i) => ( 
                this.state.metric ? 
                <Text style={{
                  fontSize: 14,
                  margin: 4,
                  color: "white",
                }} key={element.dt}>- {element.dt_txt}    {element.main.temp} °C    {element.weather[0].main}</Text>
                : <Text style={{fontSize: 12, margin: 0.5, color: "#558a86",}} key={element.dt}>- {element.dt_txt}    {element.main.temp} °F    {element.weather[0].main}</Text>            
              
              ))
            }
          </View>
        </View> 
            
        <View style={{flex: 1}}>
        <KeyboardAwareScrollView
          style={{backgroundColor: "white"}}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          scrollEnabled={false}
          >
          <View style={styles.container}>
          <View style={styles.border}>
            <AutoComplete metric={this.state.metric} getFunc={this.getWeatherByCoords}/>        
            <Button title="LOCAL WEATHER" color="#5D707F" onPress={() => {this.getWeatherByCoords(this.state.latitude, this.state.longitude, this.state.metric)}} />
            <Noise />
          </View>
          </View>
          </KeyboardAwareScrollView>
        </View>  

      </Pages>
     
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
  textinput: {
    height: 40,
    borderColor: '#666',
    borderWidth: 1,
    padding: 20,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  middle: {
    fontSize: 18,
    marginHorizontal: 2,
    marginVertical: 10,
    color: "#5D707F"
  },
  large: {
    fontSize: 40,
    // textAlign: 'center',
    margin: 10,
    color: "black"
  },
  small: {
    fontSize: 16,
    margin: 2,
    color: "#5D707F"
  },
  small2: {
    fontSize: 16,
    margin: 2,
    color: "white"
  },
  weatherImg: {
    padding: 10,
    width: 320, 
    height: 320
  },
  container_secondPage: {
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#08327d',
    margin: 10
  },
  container_control: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 10,
  },
});
const drawerStyles = {
  // drawer: { shadowColor: 'white', shadowOpacity: 0.7, shadowRadius: 1},
  main: {
    paddingLeft: 3,
  },
}

AppRegistry.registerComponent('Main', () => Main);
