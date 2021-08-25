'use strict';



require('dotenv').config();
const io=require('socket.io-client');
const host=process.emit.HOST ||'http://localhost:8080'
const socket=io.connect(`${host}/caps`)

socket.emit('getAll');

socket.on('driverPickup' , payload=>{
    setTimeout(() => {
        // console.log( payload.payload.customerName)
        console.log(`Drive picked up ${payload.id} client ${ payload.payload.customerName}` );
        socket.emit('received',payload);
    },5000);

    // setTimeout(() => {
    //     console.log(`Driver is delivering to ${payload.customerName} ${payload.order_ID}`);
    //     // console.log(socket.emit('vendorDilevers' , payload));
    //     socket.emit('delverd' , payload);
    // }, 3000);
});

// events.on('driverPickedup' , payload=>{
//     setTimeout(() => {
//         console.log(`Drive picked up ${payload.order_ID}`);
//         events.emit('driverTransit',payload);
//     }, 2000);
// });

socket.on('driverTransit',payload=>{
    setTimeout(() => {
        console.log(`Driver is delivering to ${payload.payload.customerName} ${payload.id}`);
        // console.log(socket.emit('vendorDilevers' , payload));
        // socket.emit('vendordelverd' , payload);
        socket.emit("delverd" , payload)
    }, 3000);
});





// events.on('driverTransit',payload=>{
//     setTimeout(() => {
//         console.log(`Driver is delivering to ${payload. customerName} ${payload.order_ID}`);
//         events.emit(`vendorDilevers` , payload);
//     }, 3000);
// });

