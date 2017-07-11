(function() {
  'use strict';
  angular.module('app')
    .component('edit', {
      controller: controller,
      templateUrl: '/edit/edit.template.html'
    }); //end of component

  controller.$inject = ['$http','$stateParams','$state']

  function controller($http, $stateParams, $state) {
    const vm = this;
    vm.$onInit = function() {
      vm.show = false
      $http.get(`/api/posts/${$stateParams.id}`).then((post)=> {
        vm.post = post.data
        console.log(vm.post)
      })
    };
    vm.edit = function (post) {
      $http.patch(`/api/posts/${$stateParams.id}`,post).then((data)=> {
        $state.go('home');
      });
    };

  } //close controller

}()); //end of iffe
