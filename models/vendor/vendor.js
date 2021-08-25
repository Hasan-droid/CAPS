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

socket.on('add' , payload=>{
     console.log("thank you for adding :" , payload,"to the queue");
   // console.log(`thanks for delverd ${payload.id} `);
})

socket.on('vendordelverd' , payload =>{
     console.log(`thanks for delverd ${payload.id} clien ${payload.payload.customerName} `);
    // socket.emit('delverd' , payload);
});

