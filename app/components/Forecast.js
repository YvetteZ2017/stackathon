import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button, Image } from 'react-native';

export default class Forecast extends Component {
    render() {
        return (
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
        )
    }
}

AppRegistry.registerComponent('Forecast', () => Forecast);