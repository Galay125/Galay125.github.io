'use strict';

angular
.module('urbanApp')
.run(['$rootScope', '$state', '$stateParams', 'AuthService',
  function ($rootScope, $state, $stateParams, AuthService) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.$on('$stateChangeSuccess', function () {
      window.scrollTo(0, 0);
    });

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {


      if (toState.authentication && !AuthService.isAuthenticated()) {

          $state.transitionTo("auth.signin");

          event.preventDefault();
        }
      });

    FastClick.attach(document.body);
  },

  ])
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      // For unmatched routes
      $urlRouterProvider.otherwise('/');

      // Application routes
      $stateProvider
        .state('app', {
          abstract: true,
          templateUrl: 'views/common/layout.html',
          authentication: true
        })


        .state('auth', {
          templateUrl: 'views/common/session.html',
          authentication: false
        })

        .state('auth.signin', {
          url: '/signin',
          templateUrl: 'views/auth/signin.html',
          resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load('scripts/controllers/auth/session.js').then(function () {
                return $ocLazyLoad.load('scripts/services/authService.js');
              });
            }]
          },
          data: {
            appClasses: 'bg-white usersession',
            contentClasses: 'full-height'
          }
        })
        .state('auth.signup', {
          url: '/signup',
          templateUrl: 'views/auth/signup.html',
          resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load([
                {
                  insertBefore: '#load_styles_before',
                  files: [
                    'vendor/checkbo/src/0.1.4/css/checkBo.min.css',
                    'vendor/chosen_v1.4.0/chosen.min.css'
                  ]
                },
                {
                  files: [
                    'vendor/checkbo/src/0.1.4/js/checkBo.min.js',
                    'vendor/chosen_v1.4.0/chosen.jquery.min.js',
                    'vendor/card/lib/js/jquery.card.js',
                    'vendor/bootstrap/js/tab.js',
                    'vendor/jquery-validation/dist/jquery.validate.min.js',
                    'vendor/twitter-bootstrap-wizard/jquery.bootstrap.wizard.min.js'

                  ]
                }]).then(function () {
                return $ocLazyLoad.load('scripts/controllers/auth/signupRules.js').then(function () {
                  return $ocLazyLoad.load('scripts/controllers/auth/session.js')
                });
              });
            }]
          },
          data: {
            appClasses: 'bg-white usersession',
            contentClasses: 'full-height'
          }
        })


        .state('auth.forgot', {
          url: '/forgot',
          templateUrl: 'views/auth/forgot.html',
          resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load('scripts/controllers/auth/session.js').then(function () {
                return $ocLazyLoad.load('scripts/services/authService.js');
              });
            }]
          },
          data: {
            appClasses: 'bg-white usersession',
            contentClasses: 'full-height'
          }
        })




/*.state('app.student.show', {
          url: '/{id}',
          templateUrl: 'views/students/show.html',
          resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load([
                {
                  serie: true,
                  files: [
                    'vendor/perfect-scrollbar/js/perfect-scrollbar.jquery.js',
                    'vendor/jquery.ui/ui/core.js',
                    'vendor/jquery.ui/ui/widget.js',
                    'vendor/jquery.ui/ui/mouse.js',
                    'vendor/jquery.ui/ui/sortable.js'
                  ]
                }]).then(function () {
                return $ocLazyLoad.load('scripts/controllers/draggable.js').then(function () {
                  return $ocLazyLoad.load('scripts/controllers/students/showClientController.js');
                });
              });
            }]
          },
        })*/


      .state('app.personalTrainers', {
        template: '<div ui-view></div>',
        abstract: true,
        url: '/pt',
      })

      .state('app.personalTrainers.profile', {
        url: '/profile',
        templateUrl: 'views/pt/profile.html',
        resolve: {
          deps: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
            {
              name: '',
              files: [
              ]
            }]).then(function () {
              return $ocLazyLoad.load('scripts/controllers/pt/profileController.js');
            });
          }]
        },

      })

      .state('app.personalTrainers.list', {
        url: '/list',
        templateUrl: 'views/pt/index.html',
        resolve: {
          deps: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
                {
                  insertBefore: '#load_styles_before',
                  files: [
                    'vendor/chosen_v1.4.0/chosen.min.css',
                    'vendor/datatables/media/css/jquery.dataTables.css'
                  ]
                },
                {
                  serie: true,
                  files: [
                    'vendor/chosen_v1.4.0/chosen.jquery.min.js',
                    'vendor/datatables/media/js/jquery.dataTables.js',
                     'vendor/datatables/angular-datatables.min.js'
                  ]
                }]).then(function () {
          return $ocLazyLoad.load('scripts/controllers/pt/listPtsController.js');
        });
       }]
     },

   })


      .state('app.calendar', {
        url: '/calendar',
        templateUrl: 'views/calendar/calendar.html',
        authentication: true,
        resolve: {
          deps: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
            {
              insertBefore: '#load_styles_before',
              files: [
              'vendor/fullcalendar/dist/fullcalendar.min.css'
              ]
            },
            {
              serie: true,
              files: [
              'vendor/jquery.ui/ui/core.js',
              'vendor/jquery.ui/ui/widget.js',
              'vendor/jquery.ui/ui/mouse.js',
              'vendor/jquery.ui/ui/draggable.js',
              'vendor/moment/moment.js',
              'vendor/fullcalendar/dist/fullcalendar.min.js',
              'vendor/fullcalendar/dist/gcal.js'
              ]
            },
            {
              name: 'ui.calendar',
              files: [
              'vendor/angular-ui-calendar/src/calendar.js'
              ]
            }]).then(function () {
              return $ocLazyLoad.load('scripts/controllers/calendar.js');
            });
          }]
        },
        data: {
          title: 'Calendar',
        }
      })




.state('app.profile', {
          url: '/profile?id',
          templateUrl: 'views/client/profile.html',
          resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load([
                {
                  name: '',
                  files: []
                }]).then(function () {
                return $ocLazyLoad.load('scripts/controllers/client/profileController.js');
              });
            }]
          },

        })


        .state('app.repositories', {
          url: '/repositories?id',
          templateUrl: 'views/repositories/show.html',
          authentication: true,
          resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load([
                {
                  insertBefore: '#load_styles_before',
                  files: [
                    'vendor/chosen_v1.4.0/chosen.min.css',
                    'vendor/datatables/media/css/jquery.dataTables.css',
                    'styles/climacons-font.css',
                    'vendor/checkbo/src/0.1.4/css/checkBo.min.css'
                  ]
                },
                {
                  serie: true,
                  files: [
                    'vendor/chosen_v1.4.0/chosen.jquery.min.js',
                    'vendor/datatables/media/js/jquery.dataTables.js',
                    'vendor/datatables/angular-datatables.min.js',
                    'vendor/checkbo/src/0.1.4/js/checkBo.min.js'

                  ]
                }]).then(function () {
                return $ocLazyLoad.load('scripts/controllers/repos/showRepositoryController.js');

              });
            }]
          },
          data: {
            title: 'Listar Repositório',
          }
        })

        .state('app.train_plans', {
          template: '<div ui-view></div>',
          abstract: true,
          url: '/train_plans',
        })
        .state('app.train_plans.list', {
          url: '/',
          templateUrl: 'views/train-plans/index.html',
           resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load([
                {
                  insertBefore: '#load_styles_before',
                  files: [
                    'vendor/angular-xeditable/dist/css/xeditable.css'
                  ]
                },
                {
                  name: 'xeditable',
                  files: [
                    'vendor/angular-xeditable/dist/js/xeditable.js'
                  ]
                }]).then(function () {
                return $ocLazyLoad.load('scripts/controllers/train-plans/showTrainPlan.js');
              });
            }]
          },
        })

        .state('app.showRepository', {
          url: '/train_plans/{id}',
          templateUrl: 'views/train-plan/show.html',
          authentication: true,
          resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load([
                {
                  insertBefore: '#load_styles_before',
                  files: [
                    'vendor/chosen_v1.4.0/chosen.min.css',
                    'vendor/datatables/media/css/jquery.dataTables.css',
                    'styles/climacons-font.css',
                    'vendor/checkbo/src/0.1.4/css/checkBo.min.css'
                  ]
                },
                {
                  serie: true,
                  files: [
                    'vendor/chosen_v1.4.0/chosen.jquery.min.js',
                    'vendor/datatables/media/js/jquery.dataTables.js',
                    'vendor/datatables/angular-datatables.min.js',
                    'vendor/checkbo/src/0.1.4/js/checkBo.min.js'

                  ]
                }]).then(function () {
                return $ocLazyLoad.load('scripts/controllers/repos/showRepositoryController.js');

              });
            }]
          },
          data: {
            title: 'Listar Repositório',
          }
        })  

        .state('app.train_plans.new', {
          url: '/new',
          templateUrl: 'views/train-plans/new.html',
        })
        .state('app.train_plans.show', {
          url: '/{id}',
          templateUrl: 'views/train-plans/show.html',

          resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load([
                {
                  insertBefore: '#load_styles_before',
                  files: [
                    'vendor/angular-xeditable/dist/css/xeditable.css'
                  ]
                },
                {
                  name: 'xeditable',
                  files: [
                    'vendor/angular-xeditable/dist/js/xeditable.js',

                  ]
                }]).then(function () {


                return $ocLazyLoad.load('scripts/controllers/train-plans/showTrainPlanExerciseController.js');
              });
            }]
          }

        })

        .state('app.nutrion_plans', {
          template: '<div ui-view></div>',
          abstract: true,
          url: '/nutrion_plans',
        })


        .state('app.nutrion_plans.list', {
          url: '/list',
          templateUrl: 'views/nutrion-plans/index.html',
          resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load([
                {
                  insertBefore: '#load_styles_before',
                  files: [
                    'vendor/angular-xeditable/dist/css/xeditable.css'
                  ]
                },
                {
                  name: 'xeditable',
                  files: [
                    'vendor/angular-xeditable/dist/js/xeditable.js'
                  ]
                },
                {
                  serie: true,
                  files: [
                    'vendor/flot/jquery.flot.js',
                    'vendor/flot/jquery.flot.resize.js',
                    'vendor/flot/jquery.flot.categories.js',
                    'vendor/flot/jquery.flot.stack.js',
                    'vendor/flot/jquery.flot.time.js',
                    'vendor/flot/jquery.flot.pie.js'
                  ]
                },

                {
                  name: 'angular-flot',
                  files: ['vendor/angular-flot/angular-flot.js']
                }
                ]).then(function () {
                return $ocLazyLoad.load('scripts/controllers/nutrion-plans/listNutrionPlansController.js');
              });
            }]
          },
          data: {
            title: '',
          }


        })

        .state('app.nutrion_plans.hist', {
          url: '/hist',
          templateUrl: 'views/nutrion-plans/hist.html',

          resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load([
                {
                  insertBefore: '#load_styles_before',
                  files: [
                    'vendor/angular-xeditable/dist/css/xeditable.css'
                  ]
                },
                {
                  name: 'xeditable',
                  files: [
                    'vendor/angular-xeditable/dist/js/xeditable.js'
                  ]
                }]).then(function () {
                return $ocLazyLoad.load('scripts/controllers/nutrion-plans/histNutrionPlansController.js');
              });
            }]
          }

        })

        .state('app.nutrion_plans.show', {
          url: '/',
          templateUrl: 'views/nutrion-plans/show.html',

          resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load([
                {
                  insertBefore: '#load_styles_before',
                  files: [
                    'vendor/angular-xeditable/dist/css/xeditable.css'
                  ]
                },
                {
                  name: 'xeditable',
                  files: [
                    'vendor/angular-xeditable/dist/js/xeditable.js'
                  ]
                },

                {
                  serie: true,
                  files: [
                    'vendor/flot/jquery.flot.js',
                    'vendor/flot/jquery.flot.resize.js',
                    'vendor/flot/jquery.flot.categories.js',
                    'vendor/flot/jquery.flot.stack.js',
                    'vendor/flot/jquery.flot.time.js',
                    'vendor/flot/jquery.flot.pie.js'
                  ]
                },

                {
                  name: 'angular-flot',
                  files: ['vendor/angular-flot/angular-flot.js']
                }]).then(function () {
                return $ocLazyLoad.load('scripts/controllers/nutrion-plans/showNutrionPlansController.js');
              });
            }]
          }

        })



.state('app.dashboard', {
  url: '/',
  templateUrl: 'views/dashboard.html',
  authentication: true,
  resolve: {
    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
      return $ocLazyLoad.load([
      {
        insertBefore: '#load_styles_before',
        files: [
        'styles/climacons-font.css',
        'vendor/rickshaw/rickshaw.min.css',
        'styles/climacons-font.css',
        'vendor/checkbo/src/0.1.4/css/checkBo.min.css'
        ]
      },
      {
        serie: true,
        files: [
        'vendor/d3/d3.min.js',
        'vendor/rickshaw/rickshaw.min.js',
        'vendor/flot/jquery.flot.js',
        'vendor/flot/jquery.flot.resize.js',
        'vendor/flot/jquery.flot.pie.js',
        'vendor/flot/jquery.flot.categories.js',
        'vendor/chartjs/Chart.js',
        'vendor/checkbo/src/0.1.4/js/checkBo.min.js'
        ]
      },
      {
        name: 'angular-flot',
        files: [
        'vendor/angular-flot/angular-flot.js'
        ],
        name: 'angles',
        serie: true,
        files: [
        'vendor/angles/angles.js'
        ]
      }]).then(function () {
        return $ocLazyLoad.load('scripts/controllers/dashboard.js');

      });
    }]
  },
  data: {
    title: 'Dashboard',
  }
})
}
])
.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
  $ocLazyLoadProvider.config({
    debug: false,
    events: false
  });
}]);
