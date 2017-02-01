'use strict';

angular.module('urbanApp').factory('AuthService', function ($location, $http, $q, $window) {


  var service = {

    login: function (email, password) {


      if (email == null || password == null) {
        return false;
      }
      else if (email == "" || password == "") {
        return false;
      }

      return $http({
        url: 'http://104.236.198.197:1337/auth/local',
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function (obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: {identifier: email, password: password,type: 2}

      })
        .then(function (response) {
          if (response.data.success == false) return false;
          $window.sessionStorage.token = response.data.user.id;
          $window.sessionStorage.clientId = response.data.clientId;
          service.currentUser = response.data;

        }).catch(function (err) {
          delete $window.sessionStorage.token;
          return false;

        });


      return true;

    },

    logout: function () {
      service.currentUser = null;
      return true;
    },

    register: function (username, email, password, data) {
      var dados = {

        appUser: {
          "birthday": data.birthday,
          "country": data.country,
          "name": data.name,
          "user": ""
        },
        client: {
          "weigth": data.weigth,
          "height": data.height,
          "bodyFat": data.bodyFat,
          "objectives": data.objectives,
          "alergies": data.alergies,
          "dislikedFood": data.dislikedFood, 
          "phisicalProblems": data.phisicalProblems, 
          "observations": data.observations, 
          "user":"" 
        }
      };

      return $http({
        url: 'http://104.236.198.197:1337/auth/local/register',
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function (obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: {"username": username, "password": password, "email": email}
      })
        .then(function (response) {

          dados["client"].user = response.data.id;
          dados["appUser"].user = response.data.id;

          return $http({
            url: 'http://104.236.198.197:1337/registerClient',
            method: 'POST',
            crossDomain: true,
            headers: {'Content-Type': 'application/json'},
            data: dados
          }).then(function (response) {
            console.log(dados);

          }).catch(function (err) {
            console.log(err);

          });
        }).catch(function (err) {
          console.log(err);

        });


      return true;


    },


    nextStepsRegister: function (obj) {


    },


    requestCurrentUser: function () {

      if (service.isAuthenticated()) {
        return $q.when(service.currentUser);
      } else {
        return $http.get('/session').then(function (response) {
          service.currentUser = response.data.user;

          return service.currentUser;
        });
      }
    },

    currentUser: null,

    isAuthenticated: function () {
      if (service.currentUser == null) {
        if ($window.sessionStorage.token == null) {
          return false;
        }
        return true;

      }
      else return service.currentUser;
    }

  };

  return service;
})
;