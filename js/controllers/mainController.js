app.controller('MainCtrl', function($scope, $timeout){
    $scope.numberSet = [];
    $scope.target;
    $scope.largeNumbers = [25, 50, 75, 100, 125];
    $scope.smallNumbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];
    $scope.counter = 30;
    $scope.mathCharacters = ["+" , "-" , " /", "*"];
    $scope.gameInfo = true;
    $scope.startTimer = true;

    $scope.pickLargeNumber =  function(){
        //checking the size of the array
        if(!arrayFull($scope.numberSet)){
            var random = $scope.largeNumbers[Math.floor(Math.random() * $scope.largeNumbers.length)]
            if(!inArray($scope.numberSet, random)){
                $scope.numberSet.push(random);
            }
            else{
                 $scope.pickLargeNumber();
            }
        }
    };
    $scope.pickSmallNumber =  function(){
        if(!arrayFull($scope.numberSet)){
            $scope.numberSet.push($scope.smallNumbers[Math.floor(Math.random() * $scope.smallNumbers.length)])
        }
    };

    var resetCountdown = false;
    $scope.initiateCountdown = function(){
        if(!resetCountdown){
            console.log('starting countdown');
            $scope.gameInfo = !$scope.gameInfo;
            var mytimeout = $timeout($scope.startCountdown, 1000);
            resetCountdown = !resetCountdown;
        }
        else{
            console.log('stopping countdown');
            $scope.gameInfo = !$scope.gameInfo;
            $timeout.cancel(mytimeout);
            resetCountdown = !resetCountdown;
            $scope.reset();
        }
    };

    $scope.startCountdown =  function(){
        $scope.counter--;
        if($scope.counter >= 0){
            console.log('Counting: ' + $scope.counter);
            mytimeout = $timeout($scope.startCountdown, 1000);
        }
        else{
            alert('Time is up');
            $scope.reset();
        }
    };

    $scope.reset = function(){
        console.log('resetting counter');
        $scope.counter = 30;
    };

    var inArray = function(array, id){
        for(var i=0;i<array.length;i++) {
            if(array[i] === id) {
                return true;
            }
        }
        return false;
    };

    var arrayFull = function(arr){
        var limit = 6;
        if(arr.length === 6){
            return true;
        }
        else if(arr.length + 1 === 6){
            $scope.startTimer = !$scope.startTimer;
            return false;
        }
        else{
            return false;
        }
    };

});
