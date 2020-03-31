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
        .range([ 0, w - padding ])
        // console.log('example date: ',xScale(new Date(gdpValues[5][0])))
    
        const yScale = d3.scaleLinear()
        .domain([d3.min(gdpValues, d => d[1]), d3.max(gdpValues, d => d[1])])
        .range([0 , h - padding * 2])
        // console.log('example y scale: ',yScale(gdpValues[50][1]))
        svg.selectAll('rect')
            .data(gdpValues)
            .enter()
            .append('rect')
            .attr('fill', 'navy')
            .attr('width', w / gdpValues.length)
            .attr('height', d => yScale(d[1]))
            .attr('x', (d, i) => padding + ((w - 2 * padding) / gdpValues.length * i))
            .attr('y', d => (h - padding) - yScale(d[1]) )
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
