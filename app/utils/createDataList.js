import * as scale from 'd3-scale'; // use d3-scale to convert data value to svg coordinates


export default createDataList = (forecastList, width, height) => {
  const lastElement = forecastList[forecastList.length - 1];

  const chartMarginHorizontal = 6; //Leave space for the dot mark of data on displayed
  const chartMarginVertical = 2; 

  function scaleX(num) {
    return scale.scaleLinear()
    .domain([forecastList[0].dt, lastElement.dt])
    .range([chartMarginHorizontal, width - chartMarginHorizontal])(num)
  }
  
  function scaleY(num) {
    const rangeY = forecastList.reduce((acc, cur) => {
      return [Math.min(acc[0], cur.main.temp), Math.max(acc[1], cur.main.temp)]
    },[400, -100]);
    //y = temperature in celsius, should always fall between -100 and 400
    // rangeY = [Y.min, Y.max]

    const domainY = [Math.round(rangeY[0] - chartMarginVertical), Math.round(rangeY[1] + chartMarginVertical)];
    //Shrink rangeY for dot marks;

    return scale.scaleLinear()
    .domain(domainY)
    .range([height, 0])(num)
  }

	const dataList = forecastList.map(d => {
	return {x: scaleX(d.dt), y: scaleY(d.main.temp)}
	})

	return dataList;
}
