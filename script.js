//import data from './request'
window.onload = function(){
console.log(document)
    fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then((response) => {
        return response.json()
    })
    .then(response => {
        const gdpValues = response.data
        console.log('full response :',response)
        console.log('just data: :', gdpValues)
        const w = 800
        const h = 400
    
        const svg = d3.select('body')
            .append('svg')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', w)
            .attr('height', h)
        const xScale = d3.scaleTime()
        .domain([d3.min(gdpValues, d => Date(d[0])), d3.max(gdpValues, d => Date(d[0]))])
        .range([ 0, w ])
    
        const yScale = d3.scaleTime()
        .domain([d3.min(gdpValues, d => Date(d[0])), d3.max(gdpValues, d => Date(d[0]))])
        .range([0, h])
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
