bellCurve ={
  wipeCanvas: function(id){
    $('#' + id).html('');
  },

  prepCanvas: function(id){
    return Raphael(id);
  },

  createGraph: function(canvas, points){
    canvas.g.linechart(
      10, 10,      // top left anchor
      400, 220,    // bottom right anchor
      [points.x, [0,30]],
      [points.y, [0,20]],
      {
        nostroke: false,
        // symbol: 'disc',
        axis: "0 0 1 1",
        smooth: true,
        colors: [
          "#995555",
          'transparent'
        ]
      }
    );
  },

  basePoints: {
              'x': [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
              'y': [0 , 0.45 , 1.71 , 4.680000000000001 , 8.64 , 10.8 , 10.8 , 8.64 , 4.680000000000001 , 1.71, 0.45, 0]

              },

  setX: function(difference){
    var xs = this.basePoints.x;
    var returned = [];
    for (var i = 0; i < xs.length; i ++){
      returned.push(xs[i] + difference - 5);
    }
    return returned;
  },

  setY: function(difference){
    var ys = this.basePoints.y;
    var returned = [];
    for (var i = 0; i < ys.length; i ++){
      returned.push(ys[i] * difference);
    }
    return returned;
  },

  setXByY: function(xValue, y){
    var xs = this.setX(xValue);
    var returned = [];
    
    if (y < 6){
      var alter = (5 - y) * 0.1
    }
    else {
      var alter = (y - 5) * 0.1
    }

    for (var i = 0; i < xs.length; i ++){
      if (i === 6) {returned.push(xs[i])}
      else if (i > 6)
    }
    return returned;;
  },

  sanitizeY: function(Y){
    return y * 0.2;
  },

  display: function(x,y){
    bellCurve.wipeCanvas('canvas');
    canvas = bellCurve.prepCanvas('canvas');
    var points = {'x': bellCurve.setX(x), 'y': bellCurve.setY(y)};
    bellCurve.createGraph(canvas, points);
  }
};

var currentX = 5;
var currentY = 5;

$(document).on('ready', function(){

  bellCurve.display(5,1);
  $('#x').on('change', function(){
    currentX = parseInt(this.value);
    bellCurve.display(currentX, currentY * 0.2);
  });

  $('#y').on('change', function(){
    currentY = parseInt(this.value)
    bellCurve.display(currentX, currentY * 0.2);
  });
});