// Slype data handling processes

function scatterPlot ( data ) {    
    var $graphCanvas = $('#current-graph'),
        w = $graphCanvas.innerWidth(),
        h = $graphCanvas.innerHeight(),
        padding = 0.08 * $graphCanvas.innerHeight();
    
    console.log('Current canvas width is ' + w + ' and current height is ' + h);
    //console.log(data);
    
    var svg = d3.select('#current-graph').append('svg')
                    .attr('width', w)
                    .attr('height', h)
                    .attr('class', 'slype-graph'),
        scaleX = d3.scale.linear()
                        .domain([0, 100])
                        .range([padding, w - padding / 2]),
        scaleY = d3.scale.linear()
                        .domain([0, 100])
                        .range([h - padding, padding / 2]),
        axisX = d3.svg.axis().scale(scaleX).orient('bottom'),
        axisY = d3.svg.axis().scale(scaleY).orient('left'),
        noOfSeries = Object.keys(data[0]).length - 1,
        seriesNames = new Array,
        seriesReport = 'Series names: ',
        groups = new Array,
        colors = ['red', 'green', 'blue'];
    
    for ( var i = 1; i <  Object.keys(data[0]).length; i++ ) {
        var currentSeriesName = Object.keys(data[0])[i];
        seriesNames.push(currentSeriesName);
        seriesReport += currentSeriesName + ' ';
    }
    console.log('There are ' + noOfSeries + ' data series');
    console.log(seriesReport);
    
    svg.append('g').attr('class', 'axis').attr("transform", "translate(0, " + (h - padding) + ")")
        .call(axisX);
    
    svg.append('g').attr('class', 'axis').attr("transform", "translate(" + padding + ", 0)")
        .call(axisY);
    
    for ( var i = 0; i < seriesNames.length; i++ ) {
        var currentSeriesName = seriesNames[i],
            currentGroup = svg.append('g').attr('id', 'group-' + currentSeriesName);
        
        console.log('Working on series ' + currentSeriesName + ' which has id ' + currentGroup.attr('id') + ' and class scatter-series-' + i);
        
        groups.push(currentGroup);
        
        currentGroup.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'scatter-series-' + i)
            .attr('cx', function (d) {
                return( scaleX(d['x']) )
            })
            .attr('cy', function (d) {
                return( scaleY(d[seriesNames[i]]) )
            })
            .attr('r', 0)
            .attr('opacity', 0.5)
            .transition().delay(500).duration(3000)
                .attr('r', 8)
    }
    
    $graphCanvas.removeAttr('id');
}

function dataHandler ( $domObject ) {
    var $graphs = $domObject.find('.graph'),
        csvPaths = new Array;
    
    for ( var i = 0; i < $graphs.length; i++ ) {
        var $currentGraph = $graphs[i];
        var currentPath = $currentGraph.getAttribute('data-csv');
        
        console.log('Loading data from ' + currentPath);
        csvPaths.push(currentPath);
        
        //console.log($currentGraph);
        
        $currentGraph.setAttribute('id', 'current-graph');
        
        if ( $currentGraph.classList.contains('scatter') ) {
            d3.csv(currentPath, scatterPlot);
        } else {
            d3.csv(currentPath, scatterPlot);
        }
    }
}