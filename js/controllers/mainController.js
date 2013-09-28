app.controller('MainCtrl', function($scope, $timeout){
    $scope.numberSet = [];
    $scope.largeNumbers = [25, 50, 75, 100, 125];
    $scope.smallNumbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];
    $scope.counter = 5;
    $scope.mathCharacters = ["+" , "-" , " /", "*"];

    $scope.pickLargeNumber =  function(){
        var random = $scope.largeNumbers[Math.floor(Math.random() * $scope.largeNumbers.length)]
        if(!inArray($scope.numberSet, random)){
            $scope.numberSet.push(random);
        }
        else{
            $scope.pickLargeNumber();
        }
    };
    $scope.pickSmallNumber =  function(){
        $scope.numberSet.push($scope.smallNumbers[Math.floor(Math.random() * $scope.smallNumbers.length)])
    };
    $scope.onTimeout = function(){
        var mytimeout = $timeout($scope.startCountdown, 1000);
    }
    $scope.startCountdown =  function(){
        $scope.counter--;
        if($scope.counter >= 0){
            mytimeout = $timeout($scope.startCountdown, 1000);
        }
        else{
            alert('Time is up');
            $scope.reset();
        }
    }

    $scope.reset = function(){
        $scope.counter = 5;
    }

    var inArray = function(array, id){
        for(var i=0;i<array.length;i++) {
            if(array[i] === id) {
                return true;
            }
        }
        return false;
    }

});
