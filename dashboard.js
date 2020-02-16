function openNav() {
    document.getElementById("mySidenav").style.width = "400px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

// function to load the decrypted data into the dashboard
function loadDashboard(data){
    if (data != undefined){
        Highcharts.setOptions({
            lang: {
                decimalPoint: '.',
                thousandsSep: ' '
            }
        })

        // add all cities as options
        for (i in data) {
            $('#city').append(new Option(i, i));
        }

        // making the select become a multiselect
        $('#city').multiselect({
            includeSelectAllOption: true,
            buttonClass: 'btn btn-light',
            buttonWidth: '100%',
            enableFiltering: true,
            templates: {
                ul: '<ul class="multiselect-container dropdown-menu"style="width:100%;"></ul>'
            },
            maxHeight: 200
        });
    }
}

function updateDashboard() {
    closeNav();
    
    // selected cities and desired chart
    cities = $('#city').val();
    type = $('#type').val();

    // custom options
    title = $('#title').val();
    subtitle = $('#subtitle').val();
    miny = parseInt($('#miny').val());
    if (isNaN(miny)){
        miny = null;
    }
    maxy = parseInt($('#maxy').val());
    if (isNaN(maxy)){
        maxy = null;
    }

    // execute the function associated to the selected graphic
    chart = eval('chart' + type + '(data, cities, title, subtitle, miny, maxy)');
    return chart
}

function chart0(data, cities, title, subtitle, miny, maxy){  
    // Default title
    if (title == ''){
        title = 'Yearly Average Temperature'
    }

    // Chart options
    chart = Highcharts.chart('chart',{
        chart: {
            zoomType: 'x',
        },
        title: {
            text: title
        },
        subtitle:{
            text: subtitle
        },
        tooltip:{
            shared: true,
            valueDecimals: 9
        },
        yAxis: {
            title: {
                useHTML: true,
                text: 'Temperature (K)'
            },
            min: miny,
            max: maxy
        },
        xAxis: {
            title: {
                useHTML: true,
                text: 'Year'
            },
            categories: cities
        },
        plotOptions: {
            spline: {
                marker: {
                    enabled: false
                },
            },
        }
    });

    // adding the series to the chart
    for (year in [...Array(4).keys()]){
        chart.addSeries({
            name: 2013 + parseInt(year),
            type: 'column',
            data: cities.map(function(val, idx){
                return data[val][year].reduce((a, b) => a + b) / 12;
            })
        })
    }

    return chart;
}

function chart1(data, cities, title, subtitle, miny, maxy){  
    // Default title
    if (title == ''){
        title = 'Monthly Average Temperature'
    }

    // Chart options
    chart = Highcharts.chart('chart',{
        chart: {
            zoomType: 'x',
        },
        title: {
            text: title
        },
        subtitle:{
            text: subtitle
        },
        tooltip:{
            shared: true,
            valueDecimals: 9
        },
        yAxis: {
            title: {
                useHTML: true,
                text: 'Temperature (K)'
            },
            min: miny,
            max: maxy
        },
        xAxis: {
            title: {
                useHTML: true,
                text: 'Year'
            },
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ]
        },
        plotOptions: {
            spline: {
                marker: {
                    enabled: false
                },
            },
        }
    });

    // Adding the series to the chart
    for (city in cities){
        chart.addSeries({
            name: cities[city],
            type: 'spline',
            data: [...Array(12).keys()].map(function(val, idx){
                return data[cities[city]].map(function(v, i){
                    return v[val]
                }).reduce((a, b) => a + b) / 4;
            })
        })
    }

    return chart;
}
