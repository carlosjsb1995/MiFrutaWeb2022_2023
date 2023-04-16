

var morris1 = new Morris.Donut({
    element: 'grafica',
    data: [
        { value: 70, label: 'foo' },
        { value: 15, label: 'bar' },
        { value: 10, label: 'baz' },
        { value: 5, label: 'A really really long label' }
    ],
    backgroundColor: '#ccc',
    labelColor: '#060',
    colors: [
        '#0BA462',
        '#39B580',
        '#67C69D',
        '#95D7BB'
    ],
    formatter: function (x) { return x + "%" }
});