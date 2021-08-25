'use strict';

require('dotenv').config();
let faker=require('faker');
const io=require('socket.io-client');
const host=process.env.HOST ||'http://localhost:8080'
const socket=io.connect(`${host}/caps`)

setInterval(()=>{
   
        let custOrder={
            storeName:'cupcake',
            order_ID:faker.datatype.uuid(),
            customerName:faker.name.findName(),
            address:faker.address.streetAddress()
        };

        
        socket.emit('pickup' , custOrder);
       
  
  
},5000);

socket.on('vendorDilevers' , payload =>{
    console.log(`thanks for ordering ${payload.order_ID} `);
    socket.emit('delverd' , payload);
});

