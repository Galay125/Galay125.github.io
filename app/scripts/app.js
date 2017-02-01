'use strict';

/**
 * @ngdoc overview
 * @name urbanApp
 * @description
 * # urbanApp
 *
 * Main module of the application.
 */
angular
  .module('urbanApp', [
    'ui.router',
    'ngAnimate',
    'ui.bootstrap',
    'oc.lazyLoad',
    'ngStorage',
    'ngSanitize',
    'ui.utils',
    'ngTouch',
    'ngResource',
    'oitozero.ngSweetAlert',
    'angularModalService',
    'ngCookies'
  ])
  .constant('COLORS', {
      'default': ' #ffc5c5',
      primary: '#09c',
      success: '#2ECC71',
      warning: '#ffc65d',
      danger: '#d96557',
      info: '#4cc3d9',
      white: 'white',
      dark: '#4C5064',
      border: '#e4e4e4',
      bodyBg: '#e0e8f2',
      textColor: '#6B6B6B',
    },
    'BACKEND',
    {
      'api': 'focus/'


    });

angular
  .module('urbanApp').filter('range', function () {
  return function (input, total) {
    total = parseInt(total);

    for (var i = 1; i <= total; i++) {
      input.push(i);
    }

    return input;
  }
});

angular
  .module('urbanApp').filter('ageFilter', function(){
    return function(birthday){
        var birthday = new Date(birthday);
        var today = new Date();
        var age = ((today - birthday) / (31557600000));
        var age = Math.floor( age );
        return age;
    }
});


/**/

