//import data from './request'
window.onload = function(){
console.log(document)
    fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then((response) => {
        return response.json()
    })
    .then(response => {
        const gdpValues = response.data
        // console.log('full response :',response)
        // console.log('just data: :', gdpValues)
        const w = 1200
        const h = 500
        const padding = 40
    
        const svg = d3.select('body')
            .append('svg')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', w)
            .attr('height', h)
        // console.log(new Date(gdpValues[4][0]))
        const xScale = d3.scaleTime()
        .domain([d3.min(gdpValues, d => new Date(d[0])), d3.max(gdpValues, d => new Date(d[0]))])
        .range([ 0, w - padding * 2 ])
        // console.log('example date: ',xScale(new Date(gdpValues[5][0])))
    
        const yScale = d3.scaleLinear()
        .domain([d3.min(gdpValues, d => d[1]), d3.max(gdpValues, d => d[1])])
        .range([10 , h - padding * 2])
        // console.log('example y scale: ',yScale(gdpValues[50][1]))
        svg.selectAll('rect')
            .data(gdpValues)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('data-date', d => d[0])
            .attr('data-gdp', d => d[1])
            .attr('fill', 'navy')
            .attr('width', (w - padding * 2) / gdpValues.length)
            .attr('height', d => yScale(d[1]))
            .attr('x', (d, i) => padding + ((w - 2 * padding) / gdpValues.length * i))
            .attr('y', d => (h - padding) - yScale(d[1]) )

        const xAxis = d3.axisBottom(xScale)
        const yAxis = d3.axisLeft(yScale)
        svg.append('g')
            .attr('id', 'x-axis')
            .attr('transform', 'translate(' + padding +',' + (h - padding) + ')')
            .call(xAxis)
        svg.append('g')
            .attr('height', (h - padding * 2))
            .attr('id', 'y-axis')
            .attr('transform', 'translate('+ (padding) + ',' + (padding) + ')')
            .call(yAxis)
    })
    // .catch(function(error) {
    //     console.warn('this is the error: ');
    // });
    //bundle into function and call within last then()
    

    // const rects = (svg, gdpValues) => {
    //     svg.selectAll('rect')
    //         .data(gdpValues)
    //         .enter()
    //         .append('rect')
    // }

}
