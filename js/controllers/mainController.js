app.controller('MainCtrl', function($scope, $timeout){
    $scope.numberSet = [];
    $scope.target;
    $scope.largeNumbers = [25, 50, 75, 100, 125];
    $scope.smallNumbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];
    $scope.counter = 30;
    $scope.mathCharacters = ["+" , "-" , " /", "*"];
    $scope.gameInfo = true;
    $scope.startTimer = true;
    $scope.mytimeout;

    $scope.pickLargeNumber =  function(){
        //checking the size of the array
        if(!arrayIsFull($scope.numberSet)){
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
        console.log('picking a small');
        if(!arrayIsFull($scope.numberSet)){
            var small = $scope.smallNumbers[Math.floor(Math.random() * $scope.smallNumbers.length)]
            $scope.numberSet.push(small)
            console.log('picked a small ' +  small +'\n');
        }
    };

    $scope.initiateCountdown = function(){
        console.log('starting countdown');
        $scope.calculateTarget();
        $scope.gameInfo = !$scope.gameInfo;
        $scope.mytimeout = $timeout($scope.startCountdown, 1000);
    };

    $scope.startCountdown =  function(){
        $scope.counter--;
        if($scope.counter >= 0){
            console.log('Counting: ' + $scope.counter);
            $scope.mymytimeout = $timeout($scope.startCountdown, 1000);
        }
        else{
            $scope.reset();
        }
    };

    var calculationSet = [];
    $scope.calculateTarget = function(){
        //create random number between 3-6
        var randomSelection = getRandomNumber(3, 6);
        for (var i = 0; i < randomSelection; i++) {
            var ran = getRandomNumber(0, $scope.numberSet.length - 1);

        }
    };

    $scope.reset = function(){
        console.log('resetting counter');
        $scope.startTimer = !$scope.startTimer;
        $scope.gameInfo = !$scope.gameInfo;
        $scope.counter = 30;
    };

    var getRandomNumber = function(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var inArray = function(array, id){
        for(var i=0;i<array.length;i++) {
            if(array[i] === id) {
                return true;
            }
        }
        return false;
    };

    var arrayIsFull = function(arr){
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
