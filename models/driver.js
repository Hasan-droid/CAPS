'use strict';

const events = require('../events');


events.on('driverPickedup' , payload=>{
    setTimeout(() => {
        console.log(`Drive picked up ${payload.order_ID}`);
        events.emit('transit',payload);
    }, 2000);
});

events.on('driverTransit',payload=>{
    setTimeout(() => {
        console.log(`Driver deliver ${payload.order_ID}`);
        events.emit(`vendorDilevers` , payload);
    }, 3000);
});

module.exports=events;