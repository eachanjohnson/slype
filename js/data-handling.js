// Slype data handling processes

function scatterPlot ( data ) {    
    var $graphCanvas = $('#current-graph'),
        w = $graphCanvas.innerWidth(),
        h = $graphCanvas.innerHeight();
    
    console.log('Current canvas width is ' + w + ' and current height is ' + h);
    //console.log(data);
    
    var svg = d3.select('#current-graph').append('svg')
                    .attr('width', w)
                    .attr('height', h)
                    .attr('class', 'slype-graph'),
        scaleX = d3.scale.linear()
                        .domain([0, 100])
                        .range([0, w]),
        scaleY = d3.scale.linear()
                        .domain([0, 100])
                        .range([0, h]),
        noOfSeries = Object.keys(data[0]).length - 1,
        seriesNames = new Array,
        seriesReport = 'Series names: ',
        groups = new Array,
        colors = ['red', 'green'];
    
    for ( var i = 1; i <  Object.keys(data[0]).length; i++ ) {
        var currentSeriesName = Object.keys(data[0])[i];
        seriesNames.push(currentSeriesName);
        seriesReport += currentSeriesName + ' ';
    }
    console.log('There are ' + noOfSeries + ' data series');
    console.log(seriesReport);
    
    for ( var i = 0; i < seriesNames.length; i++ ) {
        var currentSeriesName = seriesNames[i],
            currentGroup = svg.append('g').attr('id', 'group-' + currentSeriesName);
        
        console.log('Working on series ' + currentSeriesName + ' which has id ' + currentGroup.attr('id'));
        
        groups.push(currentGroup);
        
        currentGroup.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', function (d) {
                return( scaleX(d['x']) )
            })
            .attr('cy', function (d) {
                return( scaleY(d[seriesNames[i]]) )
            })
            .attr('r', 5)
            .attr('opacity', 0.5)
            .style('fill', colors[i])
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