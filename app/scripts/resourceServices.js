'use strict';


var focusApp = angular.module('urbanApp');
var api = 'http://104.236.198.197:1337/';
var headers = {'Content-Type': 'application/x-www-form-urlencoded'};

focusApp.factory('Client', function ($resource) {
  return $resource(api + 'client/:id', {id: '@_id'}, {
    'create': {method: 'POST', headers: headers},
    'query': {method: 'GET', isArray: true, headers: headers},
    'show': {method: 'GET', isArray: false, headers: headers},
    'update': {method: 'PUT'},
    'destroy': {method: 'DELETE', headers: headers}
  });
});

focusApp.factory('activeNutritionPlanClient', function ($resource) {
  return $resource(api + 'client/:id/activeNutritionPlan', {id: '@_id'}, {
    'create': {method: 'POST', headers: headers},
    'query': {method: 'GET', isArray: true, headers: headers},
    'show': {method: 'GET', isArray: false, headers: headers},
    'update': {method: 'PUT'},
    'destroy': {method: 'DELETE', headers: headers}
  });
});

focusApp.factory('todayMealByClient', function ($resource) {
  return $resource(api + 'client/:id/:dia/todaysMeals', {id: '@_id'}, {
    'create': {method: 'POST', headers: headers},
    'query': {method: 'GET', isArray: true, headers: headers},
    'show': {method: 'GET', isArray: false, headers: headers},
    'update': {method: 'PUT'},
    'destroy': {method: 'DELETE', headers: headers}
  });
});


focusApp.factory('Plan', function ($resource) {
  return $resource(api + 'plan/:id', {id: '@_id'}, {
    'create': {method: 'POST'},
    'query': {method: 'GET', isArray: true},
    'show': {method: 'GET', isArray: false, headers: headers},
    'update': {method: 'PUT', headers: headers},
    'destroy': {method: 'DELETE', headers: headers}
  });
});

focusApp.factory('Daily', function ($resource) {
  return $resource(api + 'dailyCheck/:id', {id: '@_id'}, {
    'create': {method: 'POST'},
    'query': {method: 'GET', isArray: true},
    'show': {method: 'GET', isArray: false, headers: headers},
    'update': {method: 'PUT', headers: headers},
    'destroy': {method: 'DELETE'}
  });
});

focusApp.factory('ChecksByDaily', function ($resource) {
  return $resource(api + 'dailyCheck/:id/checks', {id: '@_id'}, {
    'create': {method: 'POST'},
    'query': {method: 'GET', isArray: true},
    'show': {method: 'GET', isArray: false, headers: headers},
    'update': {method: 'PUT', headers: headers},
    'destroy': {method: 'DELETE'}
  });
});

focusApp.factory('Checks', function ($resource) {
  return $resource(api + 'check/:id', {id: '@_id'}, {
    'create': {method: 'POST'},
    'query': {method: 'GET', isArray: true, headers: headers},
    'show': {method: 'GET', isArray: false, headers: headers},
    'update': {method: 'PUT', headers: headers},
    'destroy': {method: 'DELETE', headers: headers}
  });
});

focusApp.factory('ChecksByClient', function ($resource) {
  return $resource(api + 'client/:id/checks', {id: '@_id'}, {
    'create': {method: 'POST', headers: headers},
    'query': {method: 'GET', isArray: true, headers: headers},
    'show': {method: 'GET', isArray: false, headers: headers},
    'update': {method: 'PUT', headers: headers},
    'destroy': {method: 'DELETE', headers: headers}
  });
});

focusApp.factory('ChecksByMeals', function ($resource) {
  return $resource(api + 'meal/:id/checks', {id: '@_id'}, {
    'create': {method: 'POST', headers: headers},
    'query': {method: 'GET', isArray: true, headers: headers},
    'show': {method: 'GET', isArray: false, headers: headers},
    'update': {method: 'PUT', headers: headers},
    'destroy': {method: 'DELETE', headers: headers}
  });
});

focusApp.factory('DailyByMeals', function ($resource) {
  return $resource(api + 'meal/:id/dailyChecks', {id: '@_id'}, {
    'create': {method: 'POST', headers: headers},
    'query': {method: 'GET', isArray: true, headers: headers},
    'show': {method: 'GET', isArray: false, headers: headers},
    'update': {method: 'PUT', headers: headers},
    'destroy': {method: 'DELETE', headers: headers}
  });
});

focusApp.factory('NutritionDiariesByPlan', function ($resource) {
  return $resource(api + 'plan/:id/NutritionDiaries', {id: '@_id'}, {
    'create': {method: 'POST', headers: headers},
    'query': {method: 'GET', isArray: true, headers: headers},
    'show': {method: 'GET', isArray: false, headers: headers},
    'update': {method: 'PUT', headers: headers},
    'destroy': {method: 'DELETE', headers: headers}
  });
});

focusApp.factory('NutritionDiary', function ($resource) {
  return $resource(api + 'nutritionDiary/:id', {id: '@_id'}, {
    'create': {method: 'POST', headers: headers},
    'query': {method: 'GET', isArray: true, headers: headers},
    'show': {method: 'GET', isArray: false, headers: headers},
    'update': {method: 'PUT', headers: headers},
    'destroy': {method: 'DELETE', headers: headers}
  });
});

focusApp.factory('Food', function ($resource) {
  return $resource(api + 'food/:id', {id: '@_id'}, {
    'create': {method: 'POST', headers: headers},
    'query': {method: 'GET', isArray: true, headers: headers},
    'show': {method: 'GET', isArray: false, headers: headers},
    'update': {method: 'PUT', headers: headers},
    'destroy': {method: 'DELETE', headers: headers}
  });
});

focusApp.factory('FoodsByNutrition', function ($resource) {
  return $resource(api + 'nutritionDiary/:id/foods', {id: '@_id'}, {
    'create': {method: 'POST', headers: headers},
    'query': {method: 'GET', isArray: true, headers: headers},
    'show': {method: 'GET', isArray: false, headers: headers},
    'update': {method: 'PUT', headers: headers},
    'destroy': {method: 'DELETE', headers: headers}
  });
});

focusApp.factory('FoodByIngr', function ($resource) {
  return $resource(api + 'ingredient/:id/food', {id: '@_id'}, {
    'create': {method: 'POST', headers: headers},
    'query': {method: 'GET', isArray: true, headers: headers},
    'show': {method: 'GET', isArray: false, headers: headers},
    'update': {method: 'PUT', headers: headers},
    'destroy': {method: 'DELETE', headers: headers}
  });
});

focusApp.factory('MealsByNutrition', function ($resource) {
  return $resource(api + 'nutritionDiary/:id/meals', {id: '@_id'}, {
    'create': {method: 'POST', headers: headers},
    'query': {method: 'GET', isArray: true, headers: headers},
    'show': {method: 'GET', isArray: false, headers: headers},
    'update': {method: 'PUT', headers: headers},
    'destroy': {method: 'DELETE', headers: headers}
  });
});

focusApp.factory('MealsByPlan', function ($resource) {
  return $resource(api + 'plan/:id/meals', {id: '@_id'}, {
    'create': {method: 'POST', headers: headers},
    'query': {method: 'GET', isArray: true, headers: headers},
    'show': {method: 'GET', isArray: false, headers: headers},
    'update': {method: 'PUT', headers: headers},
    'destroy': {method: 'DELETE', headers: headers}
  });
});


focusApp.factory('Meals', function ($resource) {
  return $resource(api + 'meal/:id', {id: '@_id'}, {
    'create': {method: 'POST', headers: headers},
    'query': {method: 'GET', isArray: true, headers: headers},
    'show': {method: 'GET', isArray: false, headers: headers},
    'update': {method: 'PUT', headers: headers},
    'destroy': {method: 'DELETE', headers: headers}
  });
});


focusApp.factory('Exercise', function ($resource) {
  return $resource(api + 'exercise/:id', {id: '@_id'}, {
    'create': {method: 'POST'},
    'query': {method: 'GET', isArray: true},
    'show': {method: 'GET', isArray: false},
    'update': {method: 'PUT'},
    'destroy': {method: 'DELETE'}
  });
});


focusApp.factory('ExerciseDetails', function ($resource) {
  return $resource(api + 'exerciseDetails/:id', {id: '@_id'}, {
    update: {
      method: 'PUT'
    }
  });
});

focusApp.factory('RepositoryByClient', function ($resource) {
  return $resource(api + 'client/:id/repository', {id: '@_id'}, {
    'create': {method: 'POST'},
    'query': {method: 'GET', isArray: true, headers: headers},
    'show': {method: 'GET', isArray: false, headers: headers},
    'update': {method: 'PUT'},
    'destroy': {method: 'DELETE', headers: headers}
  });
});


focusApp.factory('Repository', function ($resource) {
  return $resource(api + 'repository/:id', {id: '@_id'}, {
    'create': {method: 'POST'},
    'query': {method: 'GET', isArray: true, headers: headers},
    'show': {method: 'GET', isArray: false, headers: headers},
    'update': {method: 'PUT'},
    'destroy': {method: 'DELETE', headers: headers}
  });
});


focusApp.factory('PersonalTrainer', function ($resource) {
  return $resource(api + 'personalTrainer/:id', {id: '@_id'}, {
    'create': {method: 'POST'},
    'query': {method: 'GET', isArray: true, headers: headers},
    'show': {method: 'GET', isArray: false, headers: headers},
    'update': {method: 'PUT'},
    'destroy': {method: 'DELETE', headers: headers}
  });
});

focusApp.factory('RepsOfPersonalTrainer', function ($resource) {
  return $resource(api + 'personalTrainer/:id/repositories', {id: '@_id'}, {
    'create': {method: 'POST'},
    'query': {method: 'GET', isArray: true, headers: headers},
    'show': {method: 'GET', isArray: false, headers: headers},
    'update': {method: 'PUT'},
    'destroy': {method: 'DELETE', headers: headers}
  });
});

focusApp.factory('PersonalTrainerDetails', function ($resource) {
  return $resource(api + 'personalTrainer/:id/profile', {id: '@_id'}, {
    'create': {method: 'POST'},
    'query': {method: 'GET', isArray: true, headers: headers},
    'show': {method: 'GET', isArray: false, headers: headers},
    'update': {method: 'PUT'},
    'destroy': {method: 'DELETE', headers: headers}
  });
});

focusApp.factory('ClientesOfPersonalTrainer', function ($resource) {
  return $resource(api + 'personalTrainer/:id/clients', {id: '@_id'}, {
    'create': {method: 'POST'},
    'query': {method: 'GET', isArray: true, headers: headers},
    'show': {method: 'GET', isArray: false, headers: headers},
    'update': {method: 'PUT'},
    'destroy': {method: 'DELETE', headers: headers}
  });
});

focusApp.factory('PlansOfRepo', function ($resource) {
  return $resource(api + 'repository/:id/plans', {id: '@_id'}, {
    'create': {method: 'POST'},
    'query': {method: 'GET', isArray: true, headers: headers},
    'show': {method: 'GET', isArray: false, headers: headers},
    'update': {method: 'PUT'},
    'destroy': {method: 'DELETE', headers: headers}
  });
});


focusApp.factory('AppUser', function ($resource) {
  return $resource(api + 'appuser/:id', {id: '@_id'}, {
    'create': {method: 'POST', headers: headers},
    'query': {method: 'GET', isArray: true, headers: headers},
    'show': {method: 'GET', isArray: false},
    'update': {method: 'PUT', headers: headers},
    'destroy': {method: 'DELETE', headers: headers}
  });
});

focusApp.factory('User', function ($resource) {
  return $resource(api + 'user/:id', {id: '@_id'}, {
    'create': {method: 'POST', headers: headers},
    'query': {method: 'GET', isArray: true, headers: headers},
    'show': {method: 'GET', isArray: false, headers: headers},
    'update': {method: 'PUT', headers: headers},
    'destroy': {method: 'DELETE', headers: headers}
  });
});





