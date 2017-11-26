import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image } from 'react-native';

export default class WeatherImage extends Component {

    render() {
        const id = this.props.weatherId;
        const requireImg = (id) => {
          if (id === 800) {
            return require('../../assets/images/sunny.jpg')
          } else if (id>=200 && id<300 ) {
            return require('../../assets/images/rain2.jpg')            
          } else if (id>= 300 && id<400) {
            return require('../../assets/images/drizzle.jpg')
          } else if (id>=500 && id<600) {
            return require('../../assets/images/rain.jpg')
          } else if (id>=600 && id<700) {
            return require('../../assets/images/snow.jpg')
          } else if (id===741) {
            return require('../../assets/images/fog.jpg')
          } else if (id>=800 && id<900) {
            return require('../../assets/images/cloudy.jpg')
          } else if (id>=900 && id<903) {
            return require('../../assets/images/extreme.jpg')
          } else if (id===904) {
            return require('../../assets/images/hot.jpg')
          } else if (id===905) {
            return require('../../assets/images/windy.jpg')
          } else if (id===903 || id===906) {
            return require('../../assets/images/cold.jpg')
          } else if (id<=952 && id<957) {
            return require('../../assets/images/breeze.jpg')
          } else {
            return require('../../assets/images/hot.jpg')
          
          }
        }
        let url = requireImg(id);
        return (
            <Image
            style={styles.weatherImg}
            source={url}
          />
        )
    }

}  

const styles = StyleSheet.create({
    weatherImg: {
      padding: 10,
      width: 320, 
      height: 320
    },
  });

AppRegistry.registerComponent('WeatherImage', () => WeatherImage);
