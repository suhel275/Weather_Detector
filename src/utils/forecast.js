// it is the coding challenge.

const request = require('request');


const forecast = (latitude,longitude,callback)=>{
    const url = `https://api.darksky.net/forecast/44485c1703a3e4ca34ff065ba7b34d70/${latitude},${longitude}`;
    request({url,json:true},(error,{body})=>{
       if(error){
           callback('Unable to connect with web services :(',undefined);
       }else if(body.error){
           callback('unable to find this location please provide another location :(',undefined);
       }else{
           callback(undefined,`${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out . There is a ${body.currently.precipProbability}% chance of rain `)
       }
    });

}

module.exports=forecast;