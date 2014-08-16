App = Ember.Application.create();

App.Router.map(function() {
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

App.ForceController = Ember.ObjectController.extend({
  mass:         {value: 2, label: 'Mass:',        units: 'kg'},
  acceleration: {value: 1, label: 'Acceleration:', units:'m/s<sup>2</sup>'},
  force:                  {label: 'Force:',        units:'N'},
  result: function() {
      return this.get('mass.value') * this.get('acceleration.value');
    }.property('mass.value', 'acceleration.value'),
  forceLevels: {
    25 : 'Break and Egg',
    2722: 'A Measured Kung-Fu Punch',
    3630: 'A Measured Karate Punch',
    4000: 'Break a Human Femur',
    4417: 'A Measured Boxing Punch',
    34000000: 'In the Saturn V Rocket'
    
  }
});