console.log('this is client side javascript file.....');

/*******************************************************************************************************
 
fetch('http://puzzle.mead.io/puzzle').then((response)=>{//this is for testing purpose , fetch is not a part 
// of javascript , it is browser based API . It is not accessable by node.js . fetch will give asyncronous 
// response , so we will use [then] to come response, then use this [response] in a function argument, 
 response.json().then((data)=>{//in
    // this function we will use [json] function to parse json data, after passing we will get [data] and we will put
    // this data into another function
     console.log(data);// and we will print this data on the console that will show on browser console
 })
})

*****************************************************************************************************/
const weatherForm = document.querySelector('form');// querySelector always match with first one, that means
// whenever it will find first form it will stop
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
//messageOne.textContent = 'came form javascript....';


// it was a coding challenge ...
const fetchData = (location)=>{
const url = `http://localhost:3000/weather?address=${location}`;// till now what we was doing that this url we were giving on 
// browser search field and printing on browser from the server , but now here we are using client side
// javascript and from here we are passing the url and it will fetch data from server then that we will
// put on browser just now we are puting on browser console
fetch(url).then((response)=>{// response will come as json formate because from server it will pass only json 
    // formate
    response.json().then((data)=>{
        if(data.error){// actually in server side if we are geting any error then passing an object that
            //contains property as error
            //return console.log(data.error);
            messageOne.textContent = data.error;
        }
        // these are the result that we were passing as object from server.
        // console.log(`location: ${data.location}`);
        // console.log(`foreCast: ${data.foreCast}`);
        // console.log(`address: ${data.address}`);
        messageOne.textContent = data.location;
        messageTwo.textContent = data.foreCast;
    })
})
}

weatherForm.addEventListener('submit',(e)=>{
e.preventDefault();// actually whenever we submit the form , it referesh the page and we don't want to refresh
// the page that's why we used [preventDefault] it will prevent from all default behaviour and we can apply our behaviour
//console.log('testing');
const location = search.value;
//console.log(location);
messageOne.textContent = 'loading....';
messageTwo.textContent = '';
fetchData(location);
})
