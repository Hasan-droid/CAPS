'use strict';

const events=require('../events');
require('./driver');
require('./vendor');

let date = new Date();
let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
let time=date.toLocaleTimeString()

events.on('pickup',payload=>{
    console.log('event',{
        event:'pickup',
        time:`${year}-${month}-${day}-Time ${time}`,
        payload:payload
    })

    events.emit('driverPickedup' , payload);
})

events.on('transit', payload=>{
    console.log('event:',{
        event:'transit',
        time:`${year}-${month}-${day} Time ${time}`,
        payload:payload
    });
    events.emit('driverTransit',payload);
})

events.on('delverd' , payload=>{
    console.log('event:' , {
        event:'deleverd',
        time:`${year}-${month}-${day} Time ${time}`,
        payload:payload
    });
    events.emit('driverDeleverd',payload);
});

events.on("driverDeleverd",payload=>{
    console.log('event' , {
      event:`customer ${payload.customerName} has recived the package`,
      time:`${year}-${month}-${day} Time ${time}`,
      payload:payload
    })
})

module.exports=events;