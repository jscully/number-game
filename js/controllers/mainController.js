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
        $scope.reset();
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
        $scope.gameInfo = false;
        $scope.counter = 30;
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
            console.log("contents of the array: " + arr[i]);
        }
        for(var i = 0; i <= arr.length - 1; i++){
            if(typeof arr[i] !== 'undefined' && typeof arr[i+1] !== 'undefined'){
                var result = performArithmetic(arr[i], arr[i+1]);
                if(math === 0 ){
                    math = result
                }else{
                    math = performArithmetic(math, result);
                }
                i++; // I don't know why I am doing this ? :)
            }
            else{
                console.log("last number is : " + arr[i]);
                math = performArithmetic(math, arr[i]);
            }
        }
        //check if the answer is too easy
        if(math >= 9 && !checkTarget(math)){
            $scope.target = math;
            showCalculations();
        }
        else{
            console.log("calling the function again");
            $scope.processNumbers();
        }
    };

    // function to check that the eventual target number is not present in the array of numbers preventing a no arithmetic answer.
    var checkTarget = function(num){
        console.log("check target");
        if(num < 150){
            console.log("target is less than 150");
            for(var i = 0; i <= $scope.numbers.length; i++){
                if($scope.numbers[i] === num){
                    console.log("target is in the array : " + num);
                    return true;
                }
            }
        }
        return false;
    }
    var performArithmetic = function(num1, num2){
         var op = $scope.operations[Math.floor(Math.random() * $scope.operations.length)];
         switch(op){
            case "+":
            console.log("ADDITION: " +num1 + " + " + num2);
                return num1 + num2;
                break;
            case "-":
            console.log("SUBTRACTION: " +num1 + " - " + num2);
                return subtract(num1, num2);
                break;
            case "*":
            console.log("MULTIPLICATION: " + num1 + " * " + num2);
                return num1 * num2;
                break;
            case "/":
            console.log("DIVISION: " + num1 + " / " + num2);
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

//such an ugly function. NEEDS a lot of work
    var divide = function(num1, num2){
        var divisionAnswer;
        if(num1 >= num2){
            divisionAnswer = num1 / num2;
        }
        else{
            divisionAnswer = num2 / num2;
        }
        if(divisionAnswer %1 != 0){
            console.log("Division produces decimal point, going again...." + divisionAnswer);
            performArithmetic(num1, num2);
        }
        else{
            console.log("division doesn't produce demical point.");
            return divisionAnswer;
        }
    };

    $scope.reset = function(){
        $scope.startTimer = true;
        $scope.gameInfo = true;
        $scope.counter = null;
        $scope.target = null;
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
