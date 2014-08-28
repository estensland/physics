bellCurve ={
  wipeCanvas: function(){
    $('svg').html('');
  },

  drawXZero: function(canvas, points){
    var paper = Raphael(document.getElementById('canvas'), 400, 250);
    var line = paper.path( "M166,240 L166,10" );
  },

  drawXAxis: function(){
    var paper = Raphael(document.getElementById('canvas'), 400, 250);
    paper.path( "M300,220 L20,220" );
    paper.path( "M300,220 L20,220" );
  },

  createGraph: function(canvas, points){
    var paper = Raphael(document.getElementById('canvas'), 400, 250);
    paper.linechart(
      10, 10,      // top left anchor
      400, 220,    // bottom right anchor
      [points.x, [0,30]],
      [points.y, [0,20]],
      {
        nostroke: false,
        // symbol: 'disc',
        axis: "0 0 0 0",
        axisxstep: 0,
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
    var middle = xs[5];
    var alter = (y / 0.2 - 5) * 0.1;

    for (var i = 0; i < xs.length; i ++){
      var result = '';
      var value = xs[i];
      if (value <= middle){
        if (alter === 0){result = xs[i];}
        else {
          var diff = middle - 1 - value;
          result = (xs[i] + (diff * alter));
        }
      }
      else{
        if (alter === 0){result = xs[i];}
        else {
          var diff = middle + 2 - value;
          result = (xs[i] + (diff * alter));
        }
      }
      returned.push(result);
    }
    return returned;
  },

  sanitizeY: function(Y){
    return y * 0.2;
  },

  display: function(x,y){
    bellCurve.wipeCanvas('canvas');
    var points = {'x': bellCurve.setXByY(x, y), 'y': bellCurve.setY(y)};
    bellCurve.createGraph(canvas, points);
    bellCurve.drawXZero();
    bellCurve.drawXAxis();
  }
};

// var currentX = 5;
// var currentY = 5;

// $(document).on('ready', function(){
//   bellCurve.display(5,1);
//   bellCurve.drawXZero();
//   $('#x').on('change', function(){
//     currentX = parseInt(this.value, 10);
//     bellCurve.display(currentX, currentY * 0.2);
//   });

//   $('#y').on('change', function(){
//     currentY = parseInt(this.value, 10);
//     bellCurve.display(currentX, currentY * 0.2);
//   });
// });