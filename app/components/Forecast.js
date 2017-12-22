import React, { Component } from 'react';
import { ART, AppRegistry, StyleSheet, Text, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import * as shape from 'd3-shape';
import createDataList from '../utils/createDataList';
const { Surface, Group, Shape } = ART;

export default class Forecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 320,
      height: 380,      
      dataDisplaied: 0,
      dataList: [],
      forecastList: this.props.forecastList,
      lastElement: {},
      specialWeatherList: []
    }
    this.handleOnPress = this.handleOnPress.bind(this);
    this.filterSpecialWeather = this.filterSpecialWeather.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      forecastList: nextProps.forecastList,
      lastElement: nextProps.forecastList[nextProps.forecastList.length - 1],
      dataList: createDataList(nextProps.forecastList, this.state.width, this.state.height),
      specialWeatherList: this.filterSpecialWeather(nextProps.forecastList)
    });
  }

  handleOnPress(event) {
    event.preventDefault();
    const x = event.nativeEvent.pageX - 29;
    const differenceArr = this.state.dataList.map((d, i) => Math.abs(x - d.x))
    const index = differenceArr.indexOf(Math.min(...differenceArr));
    if (differenceArr[index] < 3) {
      this.setState({dataDisplaied: index});
    }
  }

  filterSpecialWeather(arr) {
    const specialWeatherList = [];
    arr.forEach((d, i) => {
      if (Number(d.weather[0].icon.slice(0,2)) > 8) {
        specialWeatherList.push(i);
      }
    });
    return specialWeatherList;
  }

  render() {
    
    const forecastList = this.state.forecastList;
    const lastElement = this.state.lastElement;
    
    const curvePath = shape.line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(shape.curveNatural);

    const dotPath = shape.symbol()
    .type(shape.symbolCircle)
    .size(1);

    const starPath = shape.symbol()
    .type(shape.symbolStar)
    .size(20);

    const dataList = this.state.dataList;
    const curve = curvePath(dataList);      
    const dot = dotPath();
    const star = starPath();
    const dataOnDisplaied = dataList[this.state.dataDisplaied];

    const specialWeathers = [];
    this.state.specialWeatherList.forEach(x => {
      specialWeathers.push(dataList[x])
    })

    return (
        
      <View style={styles.container_secondPage}>
        <Text style={styles.title}>Forecast</Text>
        {
          (forecastList.length) ?
        (
          <View>
          <TouchableOpacity onPress={this.handleOnPress}>
            <View>
            <Surface width={this.state.width} height={this.state.height} style={styles.surface}>
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
                    </Group>)
                })
              }
              {
                specialWeathers.map((data, i) => {
                  return (
                    <Group x={data.x} y={data.y} key={i}>
                      <Shape
                        d={star}
                        stroke="#a02518"
                        strokeWidth={2}
                      />
                    </Group>)
                })
              }
              <Group x={dataOnDisplaied.x} y={dataOnDisplaied.y}>
                <Shape
                  d={dot}
                  stroke="#a02518"
                  strokeWidth={10}
                />
              </Group>
          </Surface>
          </View>
          </TouchableOpacity>
        <View>
        <Text style={styles.main_text}>{forecastList[this.state.dataDisplaied].dt_txt}</Text>
        <Text style={styles.main_text}>{
          this.props.metric ? 
          Math.round(forecastList[this.state.dataDisplaied].main.temp) + '°C':
          Math.round((forecastList[this.state.dataDisplaied].main.temp) * 9 / 5 - 459.67) + '°F'
        }  {forecastList[this.state.dataDisplaied].weather[0].main}</Text>
        </View>
        </View>
        
      )
        : null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container_secondPage: {
    justifyContent: 'center',
    backgroundColor: '#fbfbfb',    
    margin: 10
  },
  title: {
    fontSize: 42,
    margin: 10,
    color: "black",
  },
  main_text: {
    fontSize: 18,
    margin: 14,
    color: "black",
  },
  surface: {
    justifyContent: 'center',
    backgroundColor: '#fbfbfb',    
    margin: 14
  }
})

AppRegistry.registerComponent('Forecast', () => Forecast);