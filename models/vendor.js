'use strict';

require('dotenv').config();
let faker=require('faker');
const events=require('../events');

setInterval(()=>{
    setTimeout(()=>{
        let custOrder={
            storeName:'cupcake',
            order_ID:faker.datatype.uuid(),
            customerName:faker.name.findName(),
            address:faker.address.streetAddress()
        };

        events.emit('pickup' , custOrder);
    } , 1000);
},1000);

events.on('vendorDilevers' , payload =>{
    console.log(`order ${payload.order_ID} delvered`);
    events.emit('delverd' , payload);
})


module.exports=events;