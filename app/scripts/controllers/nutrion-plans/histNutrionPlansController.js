'use strict';

function histNutrionPlansController($scope, $filter, $modal, $http, $window, Checks, ChecksByClient, ChecksByMeals, Meals, Food) {
  //editableThemes.bs3.inputClass = 'input-sm';
  //editableThemes.bs3.buttonsClass = 'btn-sm';
  //editableOptions.theme = 'bs3';

  $scope.dchecks = {
      //datas:{
        //dataUpdt:{
          //nutritional:[]
        //}
      //}
  };

  var nutritional = [];

  $scope.weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  var token = $window.sessionStorage.token;
  var client = $window.sessionStorage.clientId;
  var dataUpdt = null;
  var nome_ing = null;
  
  //Checks.delete({'id': "588e78d87e4cbda37d20b4f7"});


  ChecksByClient.show({'id': client}, function (data) {
    delete data['$promise'];
    delete data['$resolved'];
    var x = 0;
    for(x = 0; x < data["nutritional"].length; x++){
        dataUpdt = data["nutritional"][x].updatedAt.slice(0,10);
        if(!($scope.dchecks[dataUpdt])){
          $scope.dchecks[dataUpdt] = [];
        }
        $scope.dchecks[dataUpdt].push(data["nutritional"][x]);
    }

    angular.forEach($scope.dchecks, function(value, key) {
      var i = 0;
      function next(){
          if(i < value.length){
            Meals.show({'id': $scope.dchecks[key][i].meal}, function (data) {
              delete data['$promise'];
              delete data['$resolved'];

              $scope.dchecks[key][i].name = data["name"];
              $scope.dchecks[key][i].hour = data["hour"];

              ChecksByMeals.query({'id': $scope.dchecks[key][i].meal}, function (data) {
                delete data['$promise'];
                delete data['$resolved'];

                var x = 0;  
                var j = 0;
                for(x=0; x<data.length; x++){
                  for(j=0; j<data[x].checks.length; j++){
                    if(data[x].checks[j].updatedAt.indexOf($scope.dchecks[key][i].updatedAt.slice(0,10)) == -1){
                      data[x].checks.splice(j, 1);
                    }
                  }
                }

                $scope.dchecks[key][i].daily = data;

                i++;
                next();
            });
          });
        }
      } 
      next();
    });
  });


  $scope.openDay = function(diaria, ind){
      $scope.diar = diaria;
      $scope.day = ind;
  }



  /*$scope.openIngrediente = function (size, foo, meal, diar) {
    var modalInstance = $modal.open({
    templateUrl: 'myModalContent.html',
    controller: 'ModalInstanceCtrl',
    size: size,
    resolve: {
      food: function () {
        return  $scope.plano_nutricao.diaries[diar].meals[meal].ingredients[foo];
      }
    }
    });
  }*/


}

   function ModalInstanceCtrl($scope, $modalInstance, food) {
    $scope.food = food;
    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  }

angular
  .module('urbanApp')
  .controller('histNutrionPlansController', ['$scope', '$filter', '$modal', '$http', '$window', 'Checks', 'ChecksByClient', 'ChecksByMeals', 'Meals', 'Food', histNutrionPlansController])
  .controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'food', ModalInstanceCtrl]);