app.factory('arrayOperationsService', function(){

    var calcArr = [];

    return {
        shuffleArr: function(o){
            console.log('Shuffling the array');
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        },

        cloneArray: function(arr){
            for(var i = 0; i < arr.length; i++){
                calcArr.push(arr[i]);
            }
            return calcArr;
        }
    };
});
