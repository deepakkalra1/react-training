//Ques9: Import a module for filtering unique elements in an array.

//Function to remove dublicate elements from the array
function RemoveDuplicate(arrayWithDublication)
{
    var finalArray = []; 
    var counter = 0; 
    var flag = false; 
    for (var i = 0; i < arrayWithDublication.length; i++) 
    { 
        for (var j = 0; j < finalArray.length; j++) 
        { 
            if ( arrayWithDublication[i] == finalArray[j] ) 
            { 
                flag = true; 
            } 
        } 
        counter++; 
        if (counter == 1 && flag == false) 
        { 
            finalArray.push(arrayWithDublication[i]); 
        } 
        flag = false; 
        counter = 0; 
    } 
    return finalArray;

}

//export the function
export{RemoveDuplicate};
