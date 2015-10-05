'use strict';
var digitalInnovation = angular.module('digitalInnovation',['ui.grid']);

function mainController($scope, $http) {
	$scope.register = {};	
    $scope.appointment = {};
	$scope.validationErrors = '';    

    // when submitting the register form, send the text to the node API
    $scope.submitRegistration = function() {	
		console.log('Here');
        $http.post('/eventRegistration/registerEvent', $scope.register)
            .success(function(data) {
			if(data.hasOwnProperty('err')){
				$scope.validationErrors = data.err;
			} else {
				$scope.register = {}; // clear the form so our user is ready to enter another
			}              
                console.log(data);
            })
            .error(function(data) {				
                console.log('Error: ' + data);
            });
    };

   // when submitting the appointment form, send the text to the node API
    $scope.submitAppointment = function() { 
        
        $http.post('/eventRegistration/scheduleAppointment', $scope.appointment)
            .success(function(data) {
            if(data.hasOwnProperty('err')){
                $scope.validationErrors = data.err;
            } else {
                $scope.appointment = {}; // clear the form so our user is ready to enter another
            }              
                console.log(data);
            })
            .error(function(data) {             
                console.log('Error: ' + data);
            });
    };
								   

}