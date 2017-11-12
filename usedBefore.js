//in components/index.js

<TextInput style={styles.texpinput}
onChangeText={this.onChangeText}
onSubmitEditing={event => this.getWeatherByCityName(this.state.inputValue, this.state.metric)}
placeholder="City name, Country Abbreviation (optional)"
clearButtonMode={"always"}
clearTextOnFocus={true}
enablesReturnKeyAutomatically={true}
returnKeyType={"search"} />