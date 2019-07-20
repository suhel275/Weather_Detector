const path = require('path');// [path] is a core module of node.js so no requirement to install it.
const express = require('express');// we have to install it first
const hbs = require('hbs'); // it is importing for [partial]
const geocode = require('./utils/geocode');// here we are importing [geocode] file
const forecast = require('./utils/forecast');// here we are importing [forecast] file
// [__dirname] and [__filename] come from [wrapper function]
//console.log(__dirname);// it will print the full path for [directory] where this current file is present
//console.log(__filename);// it will print full path for this file
//console.log(path.join(__dirname,'../public'));// here we are manipulaiting the string, in simple language 
// [__dirname] contains current directory path , so in 2nd argument we are providing the path to go where
// our [html] files are present form current directory, so it will print full path for [public] directory

const app = express();// by calling this function we are creating new express application
const port = process.env.PORT || 3000 ;// if we are running this application locally in our system then it will
// take port number 3000, but if we deployed on heroku then heroku will give port number and it will continueslly
//change , so this line will check heroku provided any port number or not , if not then 3000 will be assign
// to run on local machine, [evr] environment variable , it is an object

/*************************** Define paths for express config **********************************/

const publicDirectoryPath = path.join(__dirname,'../public');// here we are manipulaiting the string, in simple language 
// [__dirname] contains current directory path , so in 2nd argument we are providing the path to go where
// our [html] files are present form current directory

const viewPath = path.join(__dirname,'../templates/views');// this is path for [hbs] files that are present
// in view folder
const partialsPath = path.join(__dirname,'../templates/partials');// this is path for [hbs] files that are present
// in partials folder


/************************** Setup handlebars engine ,views location and register partials******************************** */

app.set('view engine','hbs');// here we have to pass arguments as it is like same space, case sensitive etc.
// here we are setting [handlebars engine]
app.set('views',viewPath);// here we are setting [views location]
hbs.registerPartials(partialsPath);// here we are registering partial that means form this path this file can
// use [hbs] files

/****************************** Setup static directory to serve ****************************************/

app.use(express.static(publicDirectoryPath));// [express.static] is used to serve the static file, that means
// inside this we passed the path where our static files are present , so it will do some operation on them.
// [app.use] is used to customise the server


// here we are setting [route handler]

app.get('',(req,res)=>{// that means is in url is [localhost:3000]
    res.render('index', {// then [index.hbs] will run
        title:'Weather',// partials file [header.hbs] will use this then [index.hbs] will use
        name:'Mohd Suhel'// partial file [footer.hbs] will use this then [index.hbs] will use
    });
})

app.get('/about',(req,res)=>{// that means is in url is [localhost:3000/about]
    res.render('about',{// then [about.hbs] will run
        title:'About Me',// partials file [header.hbs] will use this then [about.hbs] will use
        name:'Mohd Suhel'// partial file [footer.hbs] will use this then [about.hbs] will use
    })
})

app.get('/help',(req,res)=>{// that means is in url is [localhost:3000/help]
    res.render('help',{// then [about.hbs] will run
        title:'Help',// partials file [header.hbs] will use this then [help.hbs] will use
        name:'Mohd Suhel',// partial file [footer.hbs] will use this then [help.hbs] will use
       issue:'What is the issue ?'// direct [help.hbs] file will use it
    })
})


// app.get('',(req,res)=>{// get is a method , first argument will be [url], [''] that means if url is [localhost:3000]
// //, we know [get and post], [req] object will contain incoming 
// // information from the browser,,, [res] object contains bunch of methods to customize what we want to
// // send back as response,, 
//   res.send('hello express!!!!');// this will print to the browser
// })

// app.get('/help',(req,res)=>{// this will run when url is [localhost:3000/help]
//     res.send('help page!');
//})

// app.get('/help',(req,res)=>{// this will run when url is [localhost:3000/help]
//     res.send('<h1>This is help page</h1>');// here we are passing html to the browser
// })

// app.get('/help',(req,res)=>{// this will run when url is [localhost:3000/help]
//     res.send({// here we are passsing object to the browser , if we passed object then express will convert
// into [JSON] formate on browser and it is row not parsed
//         name:'Mohd Suhel',
//         age:23
//     });
// })

// app.get('/help',(req,res)=>{// this will run when url is [localhost:3000/help]
//     res.send([{// here we are passing array to the browser
//         name:'Mohd Suhel',
//         age:23 },
//         {
//         graduation:'B.tech',
//         profile:'Web Developer'
        
//     }]);
// })

// app.get('/about',(req,res)=>{// this will run when url is [localhost:3000/about]
//     res.send('This is title');
// })

// app.get('/about',(req,res)=>{// this will run when url is [localhost:3000/about]
//     res.send('<h1>About page</h1>');
// })

// app.get('/weather',(req,res)=>{// this will run when url is [localhost:3000/weather]
//     res.send('Weather view!!');
// })


// app.get('/weather',(req,res)=>{// this will run when url is [localhost:3000/weather], it was for checking 
//     // purpose
//     res.send({
//         forecast:'27 degree',
//         location: 'bengaluru'
//     });
// })

/**************************** This is for testing purpose and it was task****************************************** 
 
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please, provide the address...'
        })
    }
  res.send({
      forecast:'It may rain',
      address:req.query.address
  })

})

*****************************************************************************************************/

/************************************** these code for checking purpose ************************************
 
app.get('/products',(req,res)=>{
    if(!req.query.search){// express does not have this restriction that search query should be present in
        // URL , so we apply this restriction here manually
      return  res.send({// it will show on the browser as JSON formate, here we type return that means if this
        // line will run then process will stop, if don't use return then it will give error on command propt
        // that for one request you are giving 2 response, actually it is http rule that for one request only
        // one response can be given
            error:'Please, provide search term .....'
        })
    }
    console.log(req.query);// this is the object that will contains all search queries as property of object, and
    // this statement will run only when your provide search query in URL
    console.log(req.query.search);
    res.send({
        product:[]
    })
    
})

********************************************************************************************************/

// app.get('/help/*',(req,res)=>{// this is help specific error message that means , if user gave url like
// [/help/data] that means user want help informations but he is not getting so we will give error message that
// will be related to help
//     res.send('Help artical did not found!');
// })


/************************* It was task and here we are fetching real weather according user address ******/
app.get('/weather',(req,res)=>{
 if(!req.query.address){
     return res.send({
         error:'Please , provide the address which weather you want to see.....'
     })
 }

 geocode(req.query.address,(error,{latitude, longitude, location}={})=>{// this function is present in [utils/geocode.js], we explain everything
    //about geocode in [playground] , go there and understand. here we are getting [error and data] , that
    // user can use in his/her way
    // as we did in [7-default-params.js] , if user pass url like that [localhost:3000/weather?address=!],
    // in this case javascript will pass object with undefined value will be pass and undefined value can't be 
    // destructured so server will crash and we will get [site can't be reached] on webpage while we have 
    // error value, so we will pass emplty object as default value so [latitude,longitude,location] will 
    // have [undefined] value and error message will run successfully.
  if(error){
      return res.send({
          error
      })
  }

forecast(latitude, longitude, (error, foreCastData) => {
     if(error){
         return res.send({
             error
         })
     }
   res.send({
       location,
       foreCast:foreCastData,
       address:req.query.address
   })

  })
})






})

// it was the task
app.get('/help/*',(req,res)=>{// if url like that
    res.render('404',{// [404.hbs] file will run
        title:'404',// this value will come from [header,hbs]
        errorMessage:'Help artical not found :(',// this property  will directly be used in [404.hbs] file
        name:'Mohd Suhel'// this value will come from [footer.hbs]
    })
})

// app.get('*',(req,res)=>{// here we are providing the page not found message,that means is user give any url that
    // does not match with our given url then, here everything will match by [*] so our given msg will print, why we
    // put this [routhandler] into end , 
    // [because when user give url then express will check the directory that we gave as static, if not found 
// then it will check to the route handler that we define from top to bottom if nothing match then at last 
// everything will match with [*]]
// where we set error messages these are called [wild card character] , they provide more complex match routing
//    res.send('My 404 Page !!!!!!');
// })

// it was task
app.get('*',(req,res)=>{// if url like that
    res.render('404',{// this [404.hbs] file will run
        title:'404',// this value will come from [header,hbs]
        errorMessage:'page not found :(',// this property  will directly be used in [404.hbs] file
        name:'Mohd Suhel'// this value will come from [footer.hbs]
    })
})




//app.listen(3000,()=>{// to start the server we have to call this method and provode the port number
    // it will be use only one time in our application
    // [3000] is common development port
    // process of starting up the server is asyncronous process, it will happen almost instantly
    // but this line will work only for local host
    app.listen(port,()=>{// here [port] value will be that heroku provided or 3000
  console.log(`server is up on port ${port}`);// this will print on command prompt to know that server is
  // started, when we run on command prompt then after run it will not stop because process is going on
  // listening and responding, we have to externally press [ctrl + c] to stop , remember one thing that 
  // if we do changes in file then we have to stop server and start again so better use [nodemon] so whenever
  // we save the file nodemon will restart the server
  // this server is running in our local machine
})

