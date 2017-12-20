import React, { Component } from 'react';
import { ART, AppRegistry, StyleSheet, Text, View, Button, Image } from 'react-native';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
const { Surface, Group, Shape, Path } = ART;
const d3 = { scale, shape };

export default class Forecast extends Component {

  render() {
    
    const forecastList = this.props.forecastList;
    console.log('forcast: ', forecastList)
    const lastElement = forecastList.pop();
    const width = 320;
    const height = 380;
    let curve = '';
    let dot;
    let dataList;
    
    if(forecastList.length) {
      const scaleX = scale.scaleLinear()
      .domain([forecastList[0].dt, lastElement.dt])
      .range([5, width - 5]);

      const rangeY = forecastList.reduce((all, cur) => {
        return [Math.min(all[0], cur.main.temp), Math.max(all[1], cur.main.temp)]
      },[400, -100]);

      const domainY = [Math.round(rangeY[0]-2), Math.round(rangeY[1]+2)];

      const scaleY = scale.scaleLinear()
      .domain(domainY)
      .range([0, height]);
      
        
      const curveLine = shape.line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(shape.curveNatural);

      const dotPath = shape.symbol()
      .type(shape.symbolCircle)
      .size(1);

      dataList = forecastList.map(d => {
        return {x: scaleX(d.dt), y: scaleY(d.main.temp)}
      })

      curve = curveLine(dataList);      
      dot = dotPath();
      
      
    }

        return (
          <View style={styles.container_secondPage}>
          <Text style={styles.title}>Forecast</Text>
          {
            (forecastList.length) ?
          <Surface width={320} height={350} style={styles.surface}>
            <Group x={0} y={0}>
                <Shape
                d={curve}
                stroke="#a02518"
                strokeWidth={1}
              />
              
            </Group>
            {
              dataList.map((data, i) => {
                return (
                  <Group x={data.x} y={data.y} key={i}>
                    <Shape
                      d={dot}
                      stroke="#a02518"
                      strokeWidth={2}
                    />
                  </Group>
            )
              })
            }
          </Surface> : null
          }
          <Text style={styles.main_text}>Forecast of one time</Text>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container_secondPage: {
    justifyContent: 'center',
    // backgroundColor: '#a5b8c4',
    backgroundColor: '#fbfbfb',    
    margin: 10
  },
  title: {
    fontSize: 40,
    margin: 10,
    color: "black",
  },
  main_text: {
    fontSize: 16,
    margin: 4,
    color: "black",
  },
  surface: {
    justifyContent: 'center',
    backgroundColor: '#fbfbfb',    
    margin: 14
  }
})

AppRegistry.registerComponent('Forecast', () => Forecast);