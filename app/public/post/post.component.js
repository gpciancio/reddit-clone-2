(function() {
    'use strict';
    angular.module('app')
      .component('post', {
        controller: controller,
        templateUrl: '/post/post.template.html'
      }); //end of component

    controller.inject = ['$http'];

    function controller($http) {
      const vm = this;
      vm.$onInit = function() {
        vm.show = false
        vm.posts = []
        vm.getPost()
        vm.sortText = 'Votes'
      }; //onInit closing

      vm.getPost = function () {
        //find the url from server.js (app.js) on line 16. This is where we connect the url with the route it should follow. Know on client side we need to open up the FULL path (/api/posts/) to get to the server side route. We can't just use the shortcut of ("/") like we see in the route which is already on the backend.
        // $http.get('/api/posts/').then((results)=>{
        //   this is your sandwich code for get!!!!!
        // console.log(results);
        // })
        $http
          .get('/api/posts/')
          .then((results)=>{
            //this is where we can do stuff with the data we get back
            // console.log(results.data);
            // vm.title = results.data[0].title;
            vm.posts = results.data
        })
      }

      vm.toggleForm = function() {
        if (vm.show === true) {
          vm.show = false
        } else {
          vm.show = true
        }
      }
      vm.createPost = function() {
        $http.post('/api/posts', vm.post).then((post)=>{
          post.data.comments = []
          vm.post.comPlural = "Comments"
          vm.post.vote_count = 0
          vm.posts.push(post.data)
          vm.show = false
          delete vm.post
        })
      }
      vm.createComment = function(post) {
        if (post.commentText != undefined) {
        }
        $http.post("/api/posts/"+post.id+"/comments/", {content:post.commentText}).then((response)=>{
          post.comments.push(response.data)
        })

        delete post.commentText
      }
      vm.toggleComment = function(post) {
        if (post.showComments === true) {
          post.showComments = false
        } else {
          post.showComments = true
        }
      }
      vm.vote = function(post, up) {
        if (up) {
          post.vote_count++
          $http.post("/api/posts/"+post.id+"/votes/", {content:post.vote_count}).then((response)=>{
            // post.vote_count.push(response.data)
            console.log(response);
          })
        } else {
          post.vote_count--
          $http.delete("/api/posts/"+post.id+"/votes/", {content:post.vote_count}).then((response)=>{
            // post.vote_count.push(response.data)
            console.log(response);
          })
        }
        if (post.vote_count < 0) {
          post.vote_count = 0
        }
      }
      //
      // vm.edit = function(post){
      //   $http.edit("/api/posts/"+post.id+"/post/",
      //   {contente}
      // })

    } //closing of controller
}()); //end of iffe
