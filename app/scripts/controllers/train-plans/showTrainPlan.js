'use strict';

function showTrainPlan($scope, $filter, $http, editableOptions, editableThemes, TrainPlan) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
  
    $scope.openTrainingDay = function (plano) {
    ModalService.showModal({

      templateUrl: "modal.html",
      controller: function ($scope, $element, title, close) {
        $scope.pt = pt;

      },

      inputs: {
        title: "Editar dados"
      }


    }).then(function (modal) {
      modal.element.modal();


      modal.close.then(function (result) {
      });
    });

  }

  /*
  var client = $window.sessionStorage.Client;
  var idClient;
  var activePlan;
  $scope.planos = [];

  Client.show({'user': client}, function (data){
        idClient = data.id;
  });   
  Repository.show({'client': idClient}, function (repo){
        activePlan = repo.activeWorkoutPlan;
  }); 
   Plan.show({'': idClient}, function (repo){
        activePlan = repo.activeWorkoutPlan;
  }); 

  Workout.query({'client': client }, function (trains) {

    for (var i = 0; i < trains.length; i++) {
        var plan = {};
        plan.nome = trains[i].observation;
        plan.dia = i;
        Client.show({'id': repos[i].client}, function (client) {
          AppUser.show({'id': client.user}, function (appUser) {
            repository.client = appUser.name;
            repository.numTrainPlans = 0;
            repository.numNutritionPlans = 0;
            $scope.repositories.push(repository);
            //tratar a cena dos planos de treino e nutrição

          });
        });
     
    }
  });  
*/
  }
  angular
  .module('urbanApp')
  .controller('showTrainPlan', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes', showTrainPlan]);