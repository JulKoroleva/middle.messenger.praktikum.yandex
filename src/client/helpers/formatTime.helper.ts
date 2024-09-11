import Handlebars from 'handlebars';

Handlebars.registerHelper('formatTime', function(time) {
  return time.split(' ')[1]; 
});
