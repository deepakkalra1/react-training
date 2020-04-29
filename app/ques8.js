// Ques8:Import a module containing the constants and method for calculating area of circle,
// rectangle, cylinder.


// constant declared which would exported
const message_for_q8="I'm doing Question 8 here";

//constant declare to hold Pi vale as it is repertedly used
const Pi=Math.PI;

//function to calculate area of a circle
function calculateCircleArea(radius) 
{
    return (radius * radius * Pi);
}

//function to calculate area of a rectangle
function calculateCylinderArea(radius,height)
{
    return ((2*Pi*radius*height)+(Pi*radius*radius));
}

//function to calculate area of a cylinder
function calculateRectangleArea(length,breath) 
{
    return (length * breath);
}

//enter chpoice  u want to make
function askChoice(){
    const choice=(prompt("Enter the figure(circle,rectangle,cylinder)for which you want to calculate area","choice"))
    .toLowerCase();
}

//menu driven function to calculate the are of circle, rectangle, cylinder
function CalculateArea(choice)
{
    try{
        switch(choice)
        {
            case "circle":{
                var radius = parseFloat(prompt("Enter the radius of your circle in cm:", 0));
                var area = calculateCircleArea(radius);
                alert("A circle with " + radius + " centimeter radius has an area of " + area 
                + "centimeters.");
                var repeat = confirm("Do u want to check another result");
                if(repeat){
                    askChoice();
                }
                else{
                    break;
                }
                
            }
            case "rectangle":{
                var length = parseFloat(prompt("Enter the length of your rectangle in cm:", 0));
                var breath = parseFloat(prompt("Enter the breath of your rectangle in cm:", 0));
                var area = calculateRectangleArea(length,breath);
                alert("A rectangle with " + length + " centimeter length and "+ breath 
                +" centemeter breath has an area of " + area 
                + "centimeters.");
                var repeat = confirm("Do u want to check another result");
                if(repeat){
                    askChoice();
                }
                else{
                    break;
                }
            }
            case "cylinder":{
                var radius = parseFloat(prompt("Enter the radius of your cylinder in cm:", 0));
                var height = parseFloat(prompt("Enter the side of your height in cm:", 0));
                var area = calculateCylinderArea(radius,height);
                alert("A square with " + side + " centimeter side has an area of " + area 
                + "centimeters.");
                var repeat = confirm("Do u want to check another result");
                if(repeat){
                    askChoice();
                }
                else{
                    break;
                }
    
            }
            default:{
                alert("Wrong Choice entered.");
                var repeat = confirm("Do u want to check another result");
                if(repeat){
                    askChoice();
                }
                else{
                    break;
                }
    
            }
    
        }
    }
    catch(err){
        console.log("Internal Server error");
    }

}

//exporting the constants and methods to other modules
export{CalculateArea,message_for_q8}



