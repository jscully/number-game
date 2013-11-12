app.factory("test", function(){

    var numberArray = [];

    return{

        addToArray: function(number){
            console.log("adding " + number + " in the factory");
            numberArray.push(number);
        },

        getArray: function(){
            return numberArray;
        }

}   ;
});
