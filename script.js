//import data from './request'
window.onload = function(){
console.log(document)
    fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then((response) => {
        return response.json()
    })
    .then(response => {
        const gdpValues = response.data
        const w = 1200
        const h = 500
        const padding = 60

        //tooltip
        d3.select('body')
            .append('div')
            .attr('id', 'tooltip')
            .attr('style', 'opacity: 0')
            .attr('style', 'position: absolute')
         //scales
        const xScale = d3.scaleTime()
            .domain([d3.min(gdpValues, d => new Date(d[0])), d3.max(gdpValues, d => new Date(d[0]))])
            .range([ padding , w - padding ])
    
        const yScale = d3.scaleLinear()
            .domain([0 , d3.max(gdpValues, d => d[1])])
            .range([h - padding, padding])

        const xAxis = d3.axisBottom(xScale)
        const yAxis = d3.axisLeft(yScale)

        //svg
        const svg = d3.select('body')
            .append('svg')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', w)
            .attr('height', h)

        //color svg background
        svg.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", "#65def1");

        //title
        svg.append("text")
            .attr("x", (w / 2))             
            .attr("y", 0 + (padding / 2))
            .attr("text-anchor", "middle")  
            .attr('id', 'title')
            .style("font-size", "24px") 
            .style("text-decoration", "underline")  
            .style('fill', '#ff5964')
            .text("US GDP Over Time in Billions");

        //bars
        svg.selectAll('rect')
            .data(gdpValues)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('data-date', d => d[0])
            .attr('data-gdp', d => d[1])
            .attr('fill', '#ffe74c')
            .attr('width', (w - padding * 2) / gdpValues.length)
            .attr('height', d => h- padding - yScale(d[1]))
            .attr('x', (d, i) => padding + ((w - 2 * padding) / gdpValues.length * i))
            .attr('y', d => (h - padding) - (h - padding - yScale(d[1]) ))
            .on('mouseover', function(d) {d3.select('#tooltip').style('opacity', 1).attr('data-date', d[0]).text(`Date: ${d[0]}, GDP: ${d[1]} Billion`)})
            .on('mouseout', function() {d3.select('#tooltip').style('opacity', 0)})
            .on('mousemove', function() {
                d3.select('#tooltip').style('left', (d3.event.pageX+10) + 'px').style('top', (d3.event.pageY) + 'px')
                })
        
        //axes
        svg.append('g')
            .attr('id', 'x-axis')
            .attr('transform', 'translate(0,' + (h - padding) + ')')
            .call(xAxis)
        svg.append('g')
            .attr('id', 'y-axis')
            .attr('transform', 'translate('+ (padding) + ', 0)')
            .call(yAxis)
    })
}
