////////////////////////////////////////////////
//THE TEST SERVER IS RUNNING ON LOCALHOST:3000//
////////////////////////////////////////////////

// PROBLEM 1
/*
    In the index.html file in this folder there is a button with an id of 'say-hello-button'!

    Use querySelector to select that button and save it to a variable called sayHelloButton
*/

const sayHelloButton = document.querySelector(`#say-hello-button`)


// PROBLEM 2
/*
    Create a function that changes sayHelloButton's background color to black and its text color to white (you can use the .style object or create a CSS class and use classList.add)
    
    Attach a mouseover event to sayHelloButton that calls the function you wrote
*/

const sayHelloButtons = (event) => {
   sayHelloButton.style.backgroundColor = `black`
   sayHelloButton.style.color = "white"

  
}
sayHelloButton.addEventListener(`mouseover`, sayHelloButtons)

// PROBLEM 3
/*
    Now you can see that the button colors change, but they do not change back when we take the mouse off of the button.

    Write another function that changes the button back to its original colors. #EFEFEF for the background and black for the text.

    Attach another listener that fires your second function when the mouseout event occurs on the button
*/

const buttonOriginal = (event) =>{ 
    sayHelloButton.style.backgroundColor = `#EFEFEF`
    sayHelloButton.style.color = `black`

}
sayHelloButton.addEventListener(`mouseout`, buttonOriginal)

// PROBLEM 4
/*
    Now lets see if we can make a request to our server when we click the button

    Add a 3rd event listener to sayHelloButton and trigger the sayHello function when the button is clicked
*/

// DO NOT EDIT FUNCTION
const sayHello = () => {
    axios.get('http://localhost:3000/say-hello').then((res) => {
        let helloText = document.getElementById('hello-text');
        helloText.style.display = 'block';
        helloText.style.backgroundColor = 'green';
        helloText.textContent = res.data;
    })
}
// DO NOT EDIT FUNCTION

sayHelloButton.addEventListener(`click`, sayHello)


// PROBLEM 5 
/*
Now that we have attached a few event listeners why dont we try adding a request? 

Below you will find an event listener on a button. 

Use axios inside the ohMy function to make a GET request to 'http://localhost:3000/animals' 

Handle the promise that's returned with a .then, which you should pass a callback function to. Inside the callback function, console.log the response's data (in the intermediate instructions we'll come back to this function and add HTML).
*/ 

const ohMy = () => {
    axios.get('http://localhost:3000/animals')
        .then((res) => {
           for(let i = 0; i < res.data.length; i++){
               let animalElement = document.createElement(`p`)
               animalElement.textContent = res.data[i]
               document.body.append(animalElement)
           }
        })
        .catch(error => console.log(error))
}


// PROBLEM 6 
/*
Now lets see if you can send a request param! inside repeatMyParam function below  make get request to 'http://localhost:3000/repeat/{SOMEPARAM}', but with a string instead of {SOMEPARAM}.  

The function that runs when this request is made will return whatever parameter you sent 

Handle the promise returned from the request with a .then, which will take in a callback -- the callback function should print the response.data.

Outside of the function, select the button with the id "repeat-button" and add a click event listener that calls the repeatMyParam function.

We'll be updating this function in the next problem.
*/

const repeatMyParam = () => {
    axios.get(`http://localhost:3000/repeat/animals`)
    .then((res) => {
        document.querySelector(`#repeat-text`).textContent = res.data
        
    })
    .catch(error => console.log(error))
    
}
document.querySelector(`#repeat-button`).addEventListener(`click`, repeatMyParam)
// PROBLEM 7
/*
Now that we have the response data, let's add it to our web page! 

Inside the repeatMyParam function above, grab the element with the id of 'repeat-text' and set its textContent property equal to the response data.
*/

// Code in the repeatMyParam function above



// PROBLEM 8
/*
Time to attach a query to our request!

Write a function that makes a get request to 'http://localhost:3000/query-test', with a query of your choice on the end!

Outside of your new function, select the button with the id "query-button" and add a click event listener that calls your function.
*/

const attachQuery = (event) => {
    axios.get('http://localhost:3000/query-test?animals=lions&dogs=poodle')
    .then((res) => {
        console.log(res.data)
    })
    .catch(error => console.log(error))

}
document.querySelector(`#query-button`).addEventListener(`click`, attachQuery)


////////////////
//INTERMEDIATE//
////////////////

// PROBLEM 9
/* 
Back in the ohMy function on Problem 5, replace the console log in the promise's callback with a for loop that loops over res.data. 

On each iteration of the loop, create a new p element. Set its textContent equal the string at the current index (i) and then append the new p element onto the document's body. 
*/

document.getElementById('animals-button').addEventListener('click', ohMy)

// Code in the ohMy function in Problem 5

// PROBLEM 10 
/*
    In the function that you wrote for Problem 8, change the URL to test a couple different scenarios. 

    1: Send no queries on the URL -- what happened? 

    2: Send more than 1 query on the URL -- what happened? 
*/

// Edit code in Problem 8



////////////
//ADVANCED//
////////////

//PROBLEM 11
/*
    You are going to add the ability to POST to the server. You'll need to create a small form and write a function that makes a post request. Then you'll attach that function to the submit event on the form. We'll be creating a list of foods. 

    In the index.html file inside of the client folder, create a form with one text input field and a button. The input field should have a placeholder that tells the user to enter a food. And the button should indicate that it will add food into a list. 

    In this file (script.js), create a function called createFood. 
    
    Inside the function, select the input you just created in the HTML and save it to a variable called foodInput. 
    
    Next, create an object called body inside the function. It should have one key-value pair. The key should be newFood (make sure to match the case and spelling exactly) and the value should be the value of the food input. 

    Now make an axios post request to /food. Inside the parentheses where you passed the URL in, pass in body as the second argument. 

    Use a .then to handle the promise returned from the axios call. Pass a callback function to the .then. Inside that callback, console log the res.data. 

    Based on what we did earlier to display this type of data, write code that will display the response in your HTML document. 
*/

const createFood = (event) =>{  //sets constFood to a function with a parameter of event
    event.preventDefault() //stops the form from refreshing at every input
    let foodInput = document.querySelector(`input`) //assigns the input element in the HTML file to be foodInput
    
    let body = { //creates an object called body
        newFood:  foodInput.value //assigns the foodInput variable to newFood and the .value at the end of foodInput will return the value of the foodInput variable
    }
    axios.post('http://localhost:3000/food', body) //the way the computer works with the server, and post is sending the data to the frontend, (/food is the parameter), body is the callback function
    .then((res) => { //is a callback function used to receive data from the server
        // for(let i = 0; i < res.data.length; i++){
            let newFood = document.createElement(`p`)   //assigns newFood variable to the new element we are creating in the HTML file which will be a <p></p>
            newFood.textContent = res.data[res.data.length -1] //sets the res.data[] to only show the last index and add it to the newFood text content
            document.body.append(newFood) //appends the newFood to the body
        // }
        console.log(res.data)
     })
.catch(error => console.log(error))
foodInput.value = `` //will reset the foodInput.value so after the input as been enterred it will no longer be shown in the input field

}

document.querySelector(`#add`).addEventListener(`click`, createFood)//creates an event listener on the id:add in the html file, so when there is a click on the id:add it will callback the function createFood