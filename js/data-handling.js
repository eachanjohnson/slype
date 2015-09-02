// Slype data handling processes

function scatterPlot ( data ) {    
    var $graphCanvas = $('#current-graph'),
        w = $graphCanvas.innerWidth(),
        h = $graphCanvas.innerHeight(),
        padding = 0.1 * $graphCanvas.innerHeight();
    
    console.log('Plotting a scatter graph...');
    console.log('Current canvas width is ' + w + ' and current height is ' + h);
    //console.log(data);
    
    var svg = d3.select('#current-graph').append('svg')
                    .attr('width', w)
                    .attr('height', h)
                    .attr('class', 'slype-graph'),
        scaleX = d3.scale.linear()
                        .domain([0, 100])
                        .range([padding, w - padding / 3]),
        scaleY = d3.scale.linear()
                        .domain([0, 100])
                        .range([h - padding, padding / 3]),
        axisX = d3.svg.axis()
            .scale(scaleX)
            .orient('bottom'),
        axisY = d3.svg.axis()
            .scale(scaleY)
            .orient('left'),
        noOfSeries = Object.keys(data[0]).length - 1,
        seriesNames = [],
        xColName = Object.keys(data[0])[0],
        seriesReport = 'Series names: ',
        groups = [],
        colors = ['red', 'green', 'blue'];
    
    for ( var i = 1; i <  Object.keys(data[0]).length; i++ ) {
        var currentSeriesName = Object.keys(data[0])[i];
        seriesNames.push(currentSeriesName);
        seriesReport += currentSeriesName + ' ';
    }
    
    console.log('There are ' + noOfSeries + ' data series');
    console.log(seriesReport);
    
    svg.append('g')
        .attr('class', 'axis')
        .attr("transform", "translate(0, " + (h - padding) + ")")
        .call(axisX);
    
    svg.append('g')
        .attr('class', 'axis')
        .attr("transform", "translate(" + padding + ", 0)")
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
                return scaleX(d[xColName]);
            })
            .attr('cy', function (d) {
                return scaleY(d[seriesNames[i]]);
            })
            .attr('r', 0)
            .attr('opacity', 0.5)
            .transition()
                .delay(500)
                .duration(3000)
                .attr('r', 8);
    }
    
    $graphCanvas.removeAttr('id');
}


function barChart ( data ) {    
    var $graphCanvas = $('#current-graph'),
        w = $graphCanvas.innerWidth(),
        h = $graphCanvas.innerHeight(),
        padding = 0.08 * w;
    
    console.log('Plotting a bar chart...');
    console.log('Current canvas width is ' + w + ' and current height is ' + h);
    //console.log(data);
    
    var svg = d3.select('#current-graph').append('svg')
                    .attr('width', w)
                    .attr('height', h)
                    .attr('class', 'slype-graph');
    
    var noOfSeries = Object.keys(data[0]).length - 1,
        xColName = Object.keys(data[0])[0],
        seriesNames = [],
        seriesReport = 'Series names: ',
        groups = [];
    
    var scaleX = d3.scale.linear()
                        .domain([0, data.length])
                        .range([padding, w - padding / 3]),
        scaleY = d3.scale.linear()
                        .domain([0, 100])
                        .range([h - padding, padding / 3]),
//        axisX = d3.svg.axis()
//            .scale(scaleX)
//            .orient('bottom'),
        axisY = d3.svg.axis()
            .scale(scaleY)
            .orient('left');
    
    var barSpacing = w / (6 * noOfSeries);
    
    for ( var i = 1; i <  Object.keys(data[0]).length; i++ ) {
        var currentSeriesName = Object.keys(data[0])[i];
        seriesNames.push(currentSeriesName);
        seriesReport += currentSeriesName + ' ';
    }
    
    console.log('There are ' + noOfSeries + ' data series related to ' + xColName);
    console.log(seriesReport);
    
//    svg.append('g')
//        .attr('class', 'axis')
//        .attr("transform", "translate(0, " + (h - padding) + ")")
//        .call(axisX);
    
    svg.append('g')
        .attr('class', 'axis')
        .attr("transform", "translate(" + 0.5 * padding + ", 0)")
        .call(axisY);
    
    var xValues = svg.append('g')
                    .attr('class','axis-values'),
        xLabel = svg.append('g')
                    .attr('class', 'axis-label');
    
    xValues.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('y', h - 0.6 * padding)
        .attr('x', function (d, i) {
            return scaleX(i) + (w - 4 * padding / 3 ) / (2 * 6);
        })
        .text(function (d, i) {
            return d[xColName];
        });
    
    xLabel.append('text')
        .attr('x', (w - 4 * padding / 3) / 2)
        .attr('y', h - 0.1 * padding)
        .text(xColName);
            
    
    for ( var i = 0; i < seriesNames.length; i++ ) {
        var currentSeriesName = seriesNames[i],
            currentGroup = svg.append('g')
                            .attr('id', 'group-' + currentSeriesName);
        
        console.log('Working on series ' + currentSeriesName + ' which has id ' + currentGroup.attr('id') + ' and class bar-series-' + i);
        
        groups.push(currentGroup);
        
        currentGroup.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar-series-' + i)
            .attr('width',  barSpacing)
            .attr('x', function (d, k) {
                return scaleX(k) + i * barSpacing;
            })
            .attr('y', h - padding)
            .attr('height', 0)
            .transition()
                .delay(500)
                .duration(3000)
                .attr('height', function (d) {
                    return scaleY(d[seriesNames[i]]);
                })
                .attr('y', function (d) {
                    return h - padding - scaleY(d[seriesNames[i]]);
                });
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
        } else if ( $currentGraph.classList.contains('bar') ) {
            d3.csv(currentPath, barChart);
        } else {
            //
        }
    }
}