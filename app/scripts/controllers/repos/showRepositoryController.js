/**
 * Created by Perez_25 on 21/12/16.
 */
'use strict';


function showRepositoryController($scope, $stateParams, $filter, $http, CrudService, $window, Repository, Client, AppUser, Plan, SweetAlert, COLORS, PersonalTrainer) {

  var idClient = $window.sessionStorage.clientId;

/*
  $scope.chooseActiveWorkout = function (id, bool) {

    if (bool) {

      var updateRepo = new Repository();
      updateRepo = $scope.repository;
      updateRepo.activeWorkoutPlan = id;
      Repository.update({'id': updateRepo.id}, updateRepo);

      SweetAlert.swal({
        title: "Plano de treino ativo alterado",
        text: "",
        timer: 1000,
        type: "success",
        showConfirmButton: false,
      }, function () {
        swal.close();
      });
    }
    else {
      var updateRepo = new Repository();
      updateRepo = $scope.repository;
      updateRepo.activeWorkoutPlan = null;
      Repository.update({'id': updateRepo.id}, updateRepo);

      SweetAlert.swal({
        title: "Plano já não está ativo",
        text: "",
        timer: 1000,
        type: "success",
        showConfirmButton: false,
      }, function () {
        swal.close();
        $window.location.reload();
      });
    }
  }


  $scope.deleteNutritionDiary = function (nutritionDiary) {

    SweetAlert.swal({
        title: 'Apagar plano de nutrição',
        text: 'Tem a certeza que deseja apagar o plano ?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: COLORS.danger,
        confirmButtonText: 'Sim',
        closeOnConfirm: false,
        closeOnCancel: true

      },
      function (isConfirm) {
        if (isConfirm) {
          Plan.delete({'id': nutritionDiary.id}, function (data) {
            SweetAlert.swal({
              title: "Plano eliminado",
              text: "",
              timer: 1000,
              type: "success",
              showConfirmButton: false,
            }, function () {
              swal.close();
              $window.location.reload();
            });

          });
        }
        else {

        }
      });


  }


  $scope.chooseActiveNutritionDiary = function (id, bool) {

    if (bool) {
      var updateRepo = new Repository();
      updateRepo = $scope.repository;
      updateRepo.activeNutritionDiary = id;
      Repository.update({'id': updateRepo.id}, updateRepo);

      SweetAlert.swal({
        title: "Plano de nutrição ativo alterado",
        text: "",
        timer: 1000,
        type: "success",
        showConfirmButton: false,
      }, function () {
        swal.close();
        $window.location.reload();
      });
    }
    else {
      var updateRepo = new Repository();
      updateRepo = $scope.repository;
      updateRepo.activeNutritionDiary = null;
      Repository.update({'id': updateRepo.id}, updateRepo);

      SweetAlert.swal({
        title: "Plano já não está ativo",
        text: "",
        timer: 1000,
        type: "success",
        showConfirmButton: false,
      }, function () {
        swal.close();
        $window.location.reload();
      });
    }

  }
*/

  $scope.hasPt = false;
  $scope.activeTrainPlan = {};
  $scope.activeNutritionDiary = {};

  Repository.query({'client': idClient}, function (repo) {
      $scope.repository = repo[0];
  
      if (repo[0].activeWorkoutPlan == undefined) {
        $scope.activeTrainPlan.name = "Não tem neste momento!";
        $scope.hasActiveTrainPlan = false;
      }
      else {
        Plan.show({'id': repo[0].activeWorkoutPlan}, function (activeWorkoutPlan) {


          $scope.activeTrainPlan = activeWorkoutPlan;
          $scope.hasActiveTrainPlan = true;

        });
      }


      if (repo[0].activeNutritionPlan == undefined) {
        $scope.activeNutritionPlan.name = "Não tem neste momento!";
        $scope.hasActiveNutritionDiary = false;
      }
      else {

        Plan.show({'id': repo[0].activeNutritionPlan}, function (activeNutritionPlan) {


          $scope.activeNutritionDiary = activeNutritionPlan;
          $scope.hasActiveNutritionDiary = true;
        });
      }


      Plan.query({ 'repository': repo[0].id, 'type': "treino"}, function (trainPlans) {
        $scope.trainPlans = trainPlans;
      });


      Plan.query({
        'repository': repo[0].id,
        'type': "nutricional"
      }, function (nutritionPlans) {

        $scope.nutritionPlans = nutritionPlans;

      });


      if (repo[0].personalTrainer != undefined) {
        $scope.hasPt = true;
        PersonalTrainer.get({'id': repo[0].personalTrainer}, function (pt) {
          AppUser.show({'id': pt.user}, function (appUser) {
            
            $scope.pt = appUser;
            $scope.pt.description = pt.description;
            $scope.pt.observations = pt.observations;
            $scope.pt.speciality = pt.speciality;
          });
        });
      }
      else {

      }


    }
  )
  ;
}

angular
  .module('urbanApp')
  .controller('showRepositoryController', ['$scope', '$stateParams', '$filter', '$http', 'CrudService', '$window', 'Repository', 'Client', 'AppUser', 'Plan', 'SweetAlert', 'COLORS', 'PersonalTrainer',  showRepositoryController]);
