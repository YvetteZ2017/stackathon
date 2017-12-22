import * as scale from 'd3-scale';


export default createDataList = (forecastList, width, height) => {
  const lastElement = forecastList[forecastList.length - 1];

  function scaleX(num) {
    return scale.scaleLinear()
    .domain([forecastList[0].dt, lastElement.dt])
    .range([5, width - 5])(num)
  }
  
  function scaleY(num) {
    const rangeY = forecastList.reduce((all, cur) => {
      return [Math.min(all[0], cur.main.temp), Math.max(all[1], cur.main.temp)]
    },[400, -100]);

    const domainY = [Math.round(rangeY[0]-2), Math.round(rangeY[1]+2)];
    
    return scale.scaleLinear()
    .domain(domainY)
    .range([height, 0])(num)
  }

	const dataList = forecastList.map(d => {
	return {x: scaleX(d.dt), y: scaleY(d.main.temp)}
	})

	return dataList;
}
