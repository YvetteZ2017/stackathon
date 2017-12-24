import React, { Component } from 'react';
import AutoComplete from './AutoComplete'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppRegistry, StyleSheet, Text, View, Button, Switch } from 'react-native';


export default class DrawerContent extends Component {
    render() {
        return (
            <KeyboardAwareScrollView>
            <View style={styles.container}>
            <Button title="LOCAL WEATHER" color="white" onPress={() => {
                this.props.getLocalWeather();
            }} />
            <View style={styles.metric_view}>
                <Text style={styles.switch_text}>METRIC</Text>
                <Switch
                style={{flex: 1}}
                onValueChange={(value) => this.props.onUpdate(value)}
                value={this.props.metric} />
            </View>
            <View>
                <AutoComplete metric={this.props.metric} getWeather={this.props.getWeather} getForecast={this.props.getForecast} onSearch={this.props.onSearch}/> 
            </View>
        
            </View>
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        marginHorizontal: 10
    },
    metric_view:{
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20
    },
    switch_text: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        color: 'white'
    }
});

AppRegistry.registerComponent('DrawerContent', () => DrawerContent);