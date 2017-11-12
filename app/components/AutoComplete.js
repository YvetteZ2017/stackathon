import React, { Component } from 'react';
import { View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const { google_places_api_key } = require('../../secret.js');

 

export default class GooglePlacesInput extends Component {

    render() {
      return (
        <GooglePlacesAutocomplete
            placeholder='Search'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed='auto'    // true/false/undefined
            fetchDetails={true}
            renderDescription={(row) => row.description} // custom description render
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                console.log(data);
                console.log(details);
                this.props.getFunc(details.geometry.location.lat, details.geometry.location.lng, this.props.metric)
            }}
            getDefaultValue={() => {
                return ''; // text input default value
            }}
            query={{
                key: google_places_api_key,
                language: 'en', 
                types: '(cities)'
            }}
            styles={{
                textInputContainer: {
                    backgroundColor: 'white',
                    borderTopWidth: 0,
                    borderBottomWidth:0
                },
                textInput: {
                    height: 38,
                    color: '#5d5d5d',
                    fontSize: 16
                },
            }}
        
            currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            debounce={0} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        />
    );
    }
}

