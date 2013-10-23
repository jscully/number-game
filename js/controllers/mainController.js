app.controller('MainCtrl', function($scope, $timeout, arrayOperationsService){
    $scope.numberSet = [];
    $scope.target;
    $scope.largeNumbers = [25, 50, 75, 100, 125];
    $scope.smallNumbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];
    $scope.counter = 30;
    $scope.operations = ["+" , "-" , "/", "*"];
    $scope.gameInfo = true;
    $scope.startTimer = true;
    $scope.mytimeout;

    $scope.pickLargeNumber = function(){
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
    $scope.pickSmallNumber = function(){
        if(!arrayIsFull($scope.numberSet)){
            var small = $scope.smallNumbers[Math.floor(Math.random() * $scope.smallNumbers.length)]
            $scope.numberSet.push(small)
        }
    };

    $scope.initiateCountdown = function(){
        $scope.gameInfo = !$scope.gameInfo;
        $scope.mytimeout = $timeout($scope.startCountdown, 1000);
        $scope.processNumbers();
    };

    $scope.startCountdown = function(){
        $scope.counter--;
        if($scope.counter >= 0){
            $scope.mymytimeout = $timeout($scope.startCountdown, 1000);
        }
        else{
            $scope.reset();
        }
    };

    $scope.processNumbers = function(){
        var numberSetClone = [];
        var arithmeticArr = [];
        numberSetClone = arrayOperationsService.cloneArray($scope.numberSet);
        var randomSelection = getRandomNumber(3, 6);
        for (var i = 0; i < randomSelection; i++) {
            var ran = getRandomNumber(0, numberSetClone.length - 1);
            var number = numberSetClone[ran];
            var index = numberSetClone.indexOf(number);
            numberSetClone.splice(index, 1);
            arithmeticArr.push(number);
        }
        calculateTarget(arithmeticArr);
    };

    var calculateTarget = function(arr){
        arrayOperationsService.shuffleArr(arr);
        var math = 0;
        for(var i = 0; i <= arr.length - 1; i++){
            if(typeof arr[i] !== 'undefined' && typeof arr[i+1] !== 'undefined'){
                var result = performArithmetic(arr[i], arr[i+1]);
                math = performArithmetic(math, result);
                i++;
            }
            else{
                math = performArithmetic(math, arr[i]);
            }
        }
        $scope.target = math;
    };

    var performArithmetic = function(num1, num2){
         var op = $scope.operations[Math.floor(Math.random() * $scope.operations.length)];
         switch(op){
            case "+":
                return num1 + num2;
                break;
            case "-":
                return subtract(num1, num2);
                //I need to make sure num1 is larger than nume2, sort by largest first
                break;
            case "*":
                return num1 * num2;
                break;
            case "/":
                return num1 / num2;
                break;
            default:
                return num1 + num2;
                break;
         }
     }

    var subtract =  function(num1, num2){
        if(num1 >= num2){
            return num1 - num2;
        }
        else{
            return num2 - num1;
        }
    }

    $scope.reset = function(){
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
