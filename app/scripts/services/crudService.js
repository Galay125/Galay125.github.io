'use strict';


angular.module('urbanApp').factory('CrudService', function ($location, $http, $q, Repository, Client, Exercise, ExerciseDetails, PersonalTrainer, AppUser, User) {

  var service = {

    newRepository: function (idPT, name) {

      var repository = new Repository();
      repository.name = name;
      repository.personalTrainer = idPT;
      Repository.create(repository);
    },

    updateRepository: function (obj) {
      Repository.update(obj);
    },

    getRepositoryByID: function (id) {
      Repository.query({'personalTrainer': id}, function (data) {
        console.log(data);

      });
    },


    deleteRepository: function (id) {
      Repository.delete(id);
    },

    newExercice: function (name, type, muscularGroup) {
      var exercice = new Exercise();
      exercice.name = name;
      exercice.type = type;
      exercice.muscularGroup = muscularGroup;
      exercice.$save();
    },

    updateExercice: function (obj) {

    },

    newExerciceDetails: function (data, idExercise, idRepository) {
      var exerciseDetails = new ExerciseDetails();
      exerciseDetails.executionTime = data.executionTime;
      exerciseDetails.restTime = data.restTime;
      exerciseDetails.description = data.description;
      exerciseDetails.repetitions = data.repetitions;
      exerciseDetails.exercise = idExercise;
      exerciseDetails.repository = idRepository;
    },


    newNutrionPlan: function (days, meals, name, observations, idPT) {


    },


    createPersonalTrainer: function (data, id) {
      var pt = new PersonalTrainer();
      pt.speciality = data.speciality;
      pt.description = data.description;
      pt.user = id;
      PersonalTrainer.create(pt);
    },

    createAppUser: function (data) {
      var appUser = new AppUser();
      appUser.birthday = data.birthday;
      appUser.country = data.country;
      appUser.name = data.name;
      appUser.personalTrainer = data.personalTrainer;
      AppUser.create(appUser);
    },

    getAppUserByID: function (id, obj) {
      AppUser.query({'user': id}, function (data) {
        obj = data[0];
        return obj;
      });
    },

    getUserByID: function (id, obj) {
      User.show({'id': id}, function (data) {
        obj = data;
        return obj;


      });

    }


  }
  return service;
});
