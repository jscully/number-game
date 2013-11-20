app.factory('arrayOperationsService', function(){

    return {

        shuffleArr: function(o){
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        },

//There is a better way to do this. Array.slice
        cloneArray: function(arr){
            var calcArr = [];
            for(var i = 0; i < arr.length; i++){
                calcArr.push(arr[i]);
            }
            return calcArr;
        }
    };
});
