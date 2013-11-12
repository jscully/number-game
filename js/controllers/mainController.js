app.controller('MainCtrl', function($scope, $timeout, arrayOperationsService, test){
    $scope.numbers = [];
    $scope.target;
    var largeNumbers;
    var smallNumbers;
    $scope.counter = 30;
    $scope.operations = ["+" , "-" , "/", "*"];
    $scope.gameInfo = true;
    $scope.startTimer = true;
    $scope.mytimeout;
    $scope.number;

    //IIFE to instatiate arrays
    (function init(){
        largeNumbers = [25, 50, 75, 100, 125];
        smallNumbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];
     }());

    var initialiseArrays =  function(){
        largeNumbers = [25, 50, 75, 100, 125];
        smallNumbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];
    }

    $scope.clear = function(){
        $scope.numbers = [];
        initialiseArrays();
    };

    $scope.pickLargeNumber = function(){
        //checking the size of the array
        if(!arrayIsFull($scope.numbers)){
            var random = largeNumbers[Math.floor(Math.random() * largeNumbers.length)]
            if(!inArray($scope.numbers, random)){
                console.log(random);
                $scope.numbers.push(random);
            }
            else{
                 $scope.pickLargeNumber();
            }
        }
    };

    //Two problems. If both numbers have been added, eg both 6's. 6 can be
    // added for a third time. I need to remove items from array first. Then
    // reinstatiate the array on load
    //problem Second: Angular repeat does not show duplicate values.
    //eg two 6's in the array, angular only shows one.
    $scope.pickSmallNumber = function(){
        if(!arrayIsFull($scope.numbers)){
            //var random = smallNumbers[Math.floor(Math.random() * smallNumbers.length)]
            var random = null;
            random = getRandomNumber(1,10);
            $scope.number = random;
            console.log($scope.number);
            $scope.numbers.push(angular.copy($scope.number));
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
            $scope.clear();
            $scope.reset();
        }
    };

//There needs to be a system put in place so the target cannot be computed by just one number. If the final answer is in the $scope.Numbers array, go again!
    $scope.processNumbers = function(){
        var numberSetClone = [];
        var arithmeticArr = [];
        numberSetClone = arrayOperationsService.cloneArray($scope.numbers);
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
            console.log(num1 + " + " + num2);
                return num1 + num2;
                break;
            case "-":
            console.log(num1 + " - " + num2);
                return subtract(num1, num2);
                //I need to make sure num1 is larger than nume2, sort by largest first
                break;
            case "*":
            console.log(num1 + " * " + num2);
                return num1 * num2;
                break;
            case "/":
            console.log(num1 + " / " + num2);
                return divide(num1, num2);
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

    var divide = function(num1, num2){
        if(num1 >= num2){
            return num1 / num2;
        }
        else{
            return num2 / num2;
        }
    };

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
