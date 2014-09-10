App = Ember.Application.create();

App.Router.map(function() {
  this.route('about', {path: 'about'});
  this.route('experiments', {path: 'experiments'});
  this.route('force', {path: 'experiments/force'});
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return {
      title: 'Welcome to Physics!',
      subTitle: 'Click an Experiment and go Hog-Wild!',
      ul: 'Experiments:',
      links: [{href: 'force', text: 'Force = Mass * Acceleration'}],
    };
  }
});

App.ExperimentsRoute = Ember.Route.extend({
  model: function() {
    return {
      title: 'Experiments',
      ul: 'Select one below:',
      links: [{href: 'force', text: 'Force = Mass * Acceleration'}],
    };
  }
});

App.AboutRoute = Ember.Route.extend({
  model: function() {
    return {
      title: 'About',
      info: 'This site was created for use by students to help understand Physics'
    };
  }
});

App.ForceRoute = Ember.Route.extend({
   
   activate: function() {
    var currentX = 5;
    var currentY = 5;
      bellCurve.display(5,1);
  bellCurve.drawXZero();
  $('#x').on('change', function(){
    currentX = parseInt(this.value, 10);
    bellCurve.display(currentX, currentY * 0.2);
  });

  $('#y').on('change', function(){
    currentY = parseInt(this.value, 10);
    bellCurve.display(currentX, currentY * 0.2);
  });
  }
});

// App.ForceController = Ember.ObjectController.extend({
//   mass:         {value: 2, label: 'Mass:',        units: 'kg'},
//   acceleration: {value: 1, label: 'Acceleration:', units:'m/s<sup>2</sup>'},
//   force:                  {label: 'Force:',        units:'N'},
//   result: function() {
//       return this.get('mass.value') * this.get('acceleration.value');
//     }.property('mass.value', 'acceleration.value'),
//   forceLevels: {
//     25 : 'Break and Egg',
//     2722: 'A Measured Kung-Fu Punch',
//     3630: 'A Measured Karate Punch',
//     4000: 'Break a Human Femur',
//     4417: 'A Measured Boxing Punch',
//     34000000: 'In the Saturn V Rocket'
//   }
// });