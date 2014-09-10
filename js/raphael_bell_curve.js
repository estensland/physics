bellCurve ={
  wipeCanvas: function(){
    $('svg').html('');
  },

  prepCanvas: function(id){
    return 1;
  },

  drawXZero: function(canvas, points){
    var paper = Raphael(20, 60, 400, 250);
    var line = paper.path( "M279.5,240 L279.5,10" );
  },

  drawXAxis: function(){
    var paper = Raphael(20, 60, 700, 250);
    paper.path( "M450,220 L20,220" );
    paper.path( "M450,220 L20,220" );
  },

  createGraph: function(canvas, points){
    if (points.y == ''){
      points.y =[0.5, 1,1, 0.5];
      points.x = [points.x[0], points.x[1], points.x[10], points.x[11]];
    }
    var paper = Raphael(20, 60, 400, 250);
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
              'x': [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
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
      if (difference > 1.8){
        if(i < 5 || i > 6){
          returned.push(0);
        }
        else{
          returned.push(ys[i] * difference);
        }
      }
      else if (difference > 1.6){
        if(i < 4 || i > 7){
          returned.push(0);
        }
        else{
          returned.push(ys[i] * difference);
        }
      }
      else if (difference < 0.1){

      }
      else if (difference < 0.3){
        if(i == 6 || i == 5){
          returned.push(ys[i] * difference + 1.1);
        }
        else if(i < 11 && i > 0){
          returned.push(ys[i] * difference + 1.2);
        }
        else{
          returned.push(ys[i] * difference * 1.4);
        }
      }
      else{
        returned.push(ys[i] * difference);
      }
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
          if (diff >  0 && alter < 0){
            result = (xs[i] + (diff * alter * 3.5));
          }
          else if (y > 1.8 && i == 5 ) {
            result = (xs[i] + (diff * alter) + 0.9);
          }
          else if (y > 1.5 && i == 5 ) {
            result = (xs[i] + (diff * alter) + 0.5);
          }
          else if (y > 1.6 && i == 4 ) {
            result = (xs[i] + (diff * alter) + 0.3);
          }
          else{
            result = (xs[i] + (diff * alter));
          }
        }
      }
      else{
        if (alter === 0){result = xs[i];}
        else {
          var diff = middle + 2 - value;
          if (diff < 0 && alter < 0){
            result = (xs[i] + (diff * alter * 3.5));
          }
          else if (y > 1.8 && i == 6 ) {
            result = (xs[i] + (diff * alter) - 0.9);
          }
          else if (y > 1.5 && i == 6 ) {
            result = (xs[i] + (diff * alter) - 0.5);
          }
          else if (y > 1.6 && i == 7 ) {
            result = (xs[i] + (diff * alter) - 0.3);
          }
          else{
            result = (xs[i] + (diff * alter));
          }
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
    canvas = bellCurve.prepCanvas('canvas');
    var points = {'x': bellCurve.setXByY(x, y), 'y': bellCurve.setY(y)};
    bellCurve.createGraph(canvas, points);
    bellCurve.drawXZero();
    bellCurve.drawXAxis();
  }
};

var currentX = 0;
var currentY = 5;

$(document).on('ready', function(){
  bellCurve.display(0,1);
  bellCurve.drawXZero();
  $('#x').on('change', function(){
    currentX = parseInt(this.value, 10);
    bellCurve.display(currentX, currentY * 0.2);
  });

  $('#y').on('change', function(){
    currentY = parseInt(this.value, 10);
    bellCurve.display(currentX, currentY * 0.2);
  });
});