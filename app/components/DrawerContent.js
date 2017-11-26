import React, { Component } from 'react';
import Noise from './Noise';
import AutoComplete from './AutoComplete'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppRegistry, StyleSheet, Text, View, Button, Switch } from 'react-native';


export default class DrawerContent extends Component {
    render() {
        return (
            <KeyboardAwareScrollView>
            <View style={styles.container}>
            <Button title="LOCAL WEATHER" color="white" onPress={() => {this.props.getWeatherByCoords(this.props.lat, this.props.lon, this.props.metric)}} />
            <Noise />
            <Text>Metric</Text>
            <Switch
            onValueChange={(value) => this.props.onUpdate(value)}
            value={this.props.metric} />
            <View>
                <AutoComplete metric={this.props.metric} getFunc={this.props.getFunc} /> 
            </View>
        
            </View>
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      marginTop: 30,
      marginHorizontal: 10
    },
});

AppRegistry.registerComponent('DrawerContent', () => DrawerContent);