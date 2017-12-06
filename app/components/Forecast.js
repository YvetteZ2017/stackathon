import React, { Component } from 'react';
import { ART, AppRegistry, StyleSheet, Text, View, Button, Image } from 'react-native';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
const { Surface, Group, Shape } = ART;
const d3 = { scale, shape };

export default class Forecast extends Component {

  constructor() {
    super();
    this.state = {
      curve: ''
    }
    this.generateCurve = this.generateCurve.bind(this)
  }

  componentDidMount() {
    const curve = this.generateCurve();
    this.setState({ curve })
  }

  generateCurve() {
    const shorterList = this.props.shorterList;
    const lastElement = shorterList.pop();
    const width = 300;
    
    if(shorterList.length) {
      const scaleX = scale.scaleLinear()
      .domain([shorterList[0].dt, lastElement.dt])
      .range([0, width]);

      const rangeY = shorterList.reduce((all, cur) => {
        return [Math.min(all[0], cur.main.temp), Math.max(all[1], cur.main.temp)]
      },[400, -100]);

      const domainY = [Math.round(rangeY[0]-5), Math.round(rangeY[1]+5)];

      const scaleY = scale.scaleLinear()
      .domain(domainY)
      .range([0, width]);
      
        
      const curveLine = shape.line()
      .x(d => scaleX(d.dt))
      .y(d => scaleY(d.main.temp))
      .curve(shape.curveNatural);

      const curve = curveLine(shorterList)
      return curve;
    }
  }

  render() {
    
    const shorterList = this.props.shorterList;
    const lastElement = shorterList.pop();
    const width = 300;
    let curve = ''
    
    if(shorterList.length) {
      const scaleX = scale.scaleLinear()
      .domain([shorterList[0].dt, lastElement.dt])
      .range([0, width]);

      const rangeY = shorterList.reduce((all, cur) => {
        return [Math.min(all[0], cur.main.temp), Math.max(all[1], cur.main.temp)]
      },[400, -100]);

      const domainY = [Math.round(rangeY[0]-5), Math.round(rangeY[1]+5)];

      const scaleY = scale.scaleLinear()
      .domain(domainY)
      .range([0, width]);
      
        
      const curveLine = shape.line()
      .x(d => scaleX(d.dt))
      .y(d => scaleY(d.main.temp))
      .curve(shape.curveNatural);

      curve = curveLine(shorterList)

    }

        return (
          <View style={styles.container_secondPage}>
          <Text style={styles.title}>Forecast</Text>
          {
            (shorterList.length) ?
          <Surface width={320} height={320}>
            <Group x={0} y={0}>
                <Shape
                d={curve}
                stroke="#000"
                strokeWidth={1}
              />
            </Group>
          </Surface> : null
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