// este new Morris.Line seria un objeto de javacripts* entoces se podria crear una funcion con dos ojbetos uno el morris y otro el elemetno*

var arrayList = [
{ year: '2016', value: 15056, value2: 14678},
{ year: '2017', value: 14678, value2: 17008},
{ year: '2018', value: 19870, value2: 19554 },
{ year: '2019', value: 20567, value2: 19403},
{ year: '2020', value: 20307, value2: 19865}];

console.log(arrayList);

var morris1 = new Morris.Line({
    // ID of the element in which to draw the chart.
    element: 'contenedorPrincipal',
    // Chart data records -- each entry in this array corresponds to a point on
    // the chart.
    data: arrayList,
    // The name of the data record attribute that contains x-values.
    xkey: 'year',
    // A list of names of data record attributes that contain y-values.
    ykeys: ['value','value2'],
    // Labels for the ykeys -- will be displayed when you hover over the
    // chart.
    lineWidth: 3,
    labels: ['SummerGood','Baby-Gold'],
    resize:true,
    lineColors: ['#EC4811','#69A50B']
  });


  var morris2 = Morris.Bar({
    element: 'contenedorPrincipal2',
    data: arrayList,
    xkey: 'year',
    // A list of names of data record attributes that contain y-values.
    ykeys: ['value','value2'],
    // Labels for the ykeys -- will be displayed when you hover over the
    // chart.
    lineWidth: 3,
    labels: ['SummerGood','Baby-Gold'],
    resize:true,
    barColors: ['#EC4811','#69A50B']
  });
   
   