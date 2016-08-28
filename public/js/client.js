// public/client.js
var goalHandler = angular.module('goalHandler', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all goals and show them
    $http.get('/api/goals')
        .success(function(data) {
            $scope.goals = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createGoal = function() {
        $http.post('/api/goals', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.goals = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a goal 
    $scope.deleteGoal = function(id) {
        $http.delete('/api/goals/' + id)
            .success(function(data) {
                $scope.goals = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}