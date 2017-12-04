import React, { Component } from 'react';
import { ART, AppRegistry, StyleSheet, Text, View, Button, Image } from 'react-native';
import * as d3 from 'd3';
const { Surface, Group, Shape } = ART;

export default class Forecast extends Component {
  
  render() {
    
    const shorterList = this.props.shorterList;

    const curve = d3.curveNatural()
    .x(function(d) { return x(d.dt); })
    .y(function(d) { return y(d.main.temp); });

    const scaleX = createScaleX(
      data[0].time,
      lastDatum.time,
      width
    );
  
  //       return (
  //           <View style={styles.container_secondPage}>
  //           <Text style={styles.title}>Forecast</Text>
  //           {
  //             shorterList.map((element,i) => ( 
  //               this.props.metric ? 
  //               <Text style={styles.main_text} key={element.dt}> {element.dt_txt.slice(5, 16)}    {Math.round(element.main.temp)} °C    {element.weather[0].main}</Text>
  //               : <Text style={styles.main_text} key={element.dt}> {element.dt_txt.slice(5, 16)}    {Math.round(element.main.temp * 9 / 5 - 459.67)} °F    {element.weather[0].main}</Text>            
              
  //             ))
  //           }
  //         </View>
  //       )

        return (
          <View style={styles.container_secondPage}>
          <Text style={styles.title}>Forecast</Text>
          <Surface width={320} height={320}>
            <Group x={0} y={0}>
              <Shape
                d={shorterList}
                stroke="#000"
                strokeWidth={1}
              />
            </Group>
          </Surface>
          {
            shorterList.map((element,i) => ( 
              this.props.metric ? 
              <Text style={styles.main_text} key={element.dt}> {element.dt_txt.slice(5, 16)}    {Math.round(element.main.temp)} °C    {element.weather[0].main}</Text>
              : <Text style={styles.main_text} key={element.dt}> {element.dt_txt.slice(5, 16)}    {Math.round(element.main.temp * 9 / 5 - 459.67)} °F    {element.weather[0].main}</Text>            
            
            ))
          }
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container_secondPage: {
    justifyContent: 'center',
    backgroundColor: '#a5b8c4',
    margin: 10
  },
  title: {
    fontSize: 40,
    margin: 10,
    color: "#fbfbfb",
  },
  main_text: {
    fontSize: 16,
    margin: 4,
    color: "white",
  }
})

AppRegistry.registerComponent('Forecast', () => Forecast);