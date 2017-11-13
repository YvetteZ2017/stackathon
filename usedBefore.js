//in components/index.js

<TextInput style={styles.texpinput}
onChangeText={this.onChangeText}
onSubmitEditing={event => this.getWeatherByCityName(this.state.inputValue, this.state.metric)}
placeholder="City name, Country Abbreviation (optional)"
clearButtonMode={"always"}
clearTextOnFocus={true}
enablesReturnKeyAutomatically={true}
returnKeyType={"search"} />

getWeatherByCityName(input, metric) {
    const inputArr = input.split(',')
    const cityName = inputArr[0].split(' ').map(e => e.slice(0, 1).toUpperCase() + e.slice(1).toLowerCase()).join('');
    let countryName = '';
    if(inputArr.length>1) {
      countryName = inputArr[1].replace(/\s/g, '').toUpperCase();
    }
    console.log('cityName: ', cityName, 'countryName: ', countryName)
      fetchWeatherByCityName(cityName, metric, countryName)
      .then(res => {
          console.log('weather data fetched. temp: ', res.main.temp, 'weather: ', res.weather[0].main)
          console.log('coords: ', this.state.latitude, ',', this.state.longitude)
          this.setState({
            city: res.name,
            temp: res.main.temp,
            weather: res.weather[0].main
          })
      })
  }
