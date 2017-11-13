import React, { Component } from 'react';
import Noise from './Noise';
import { AppRegistry, StyleSheet, Text, View, Button, Image } from 'react-native';


export default class DrawerContent extends Component {
    render() {
        return (
            <Noise />
        )
    }
}

AppRegistry.registerComponent('DrawerContent', () => DrawerContent);