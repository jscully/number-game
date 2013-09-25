app.controller('MainCtrl', function($scope){
    $scope.numbers = [];
    $scope.largeNumbers = [25, 50, 75, 100, 125];
    $scope.smallNumbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];
    $scope.countdowntimer = 30;
    var count = 30;
    var counter;
    var timerOn = false;

    $scope.pickLargeNumber =  function(){
        $scope.numbers.push($scope.largeNumbers[Math.floor(Math.random() * $scope.largeNumbers.length)]);
    };
    $scope.pickSmallNumber =  function(){
        $scope.numbers.push($scope.smallNumbers[Math.floor(Math.random() * $scope.smallNumbers.length)])
    };
    $scope.startCountdown = function(){
        timerOn = !timerOn;
        if(timerOn){
            counter = setInterval($scope.timer, 1000);
        }
        else{
            console.log("resetting");
            clearInterval(counter);
            count = 30;
        }
    };

    $scope.timer = function(){
        console.log(count);
        count=count-1;
        if (count <= 0){
            console.log("Finished");
            clearInterval(counter);
            count = 30;
            return;
        }
        $scope.countdowntimer = count;
    };
});
