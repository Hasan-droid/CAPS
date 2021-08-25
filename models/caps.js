'use strict';




require('dotenv').config();

const port=process.env.PORT||8080;
const io=require('socket.io')(port);
const caps=io.of('/caps');
const uuid = require('uuid').v4;

const msgQueue={chroes :{}};

let date = new Date();
let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
let time=date.toLocaleTimeString()

io.on('connection' , Socket=>{
    console.log('CONNECTION Has Established' , Socket.id)
});


caps.on('connection',Socket=>{
    console.log("CONNECTION has Established" , Socket.id);
  
    Socket.on('pickup',payload=>{
        console.log('****adds a new taks****');
        const id=uuid();
        console.log("___ID____",id);
        msgQueue.chroes[id]=payload;
       // Socket.emit('add' , payload);
             console.log('event',{
                event:'pickup',
                 time:`${year}-${month}-${day}-Time ${time}`,
                payload:payload
            });
            caps.emit('driverPickup' , {id:id, payload:msgQueue.chroes[id]});
          
});
Socket.on('getAll',()=>{
    console.log("__GETALL() : get driver its messages");
    Object.keys(msgQueue.chroes).forEach(id=>{
        Socket.emit('driverPickup' , {id:id , payload:msgQueue.chroes[id]})
    });
});

Socket.on('received' , msg=>{
    console.log("Queue's received items will remove")
    delete msgQueue.chroes[msg.id];
    console.log("____after remove_____" , msgQueue);
    caps.emit('driverTransit' , msg);
})

// Socket.on('transit' , payload=>{
//     console.log('event:',{
//                  event:'transit',
//                 time:`${year}-${month}-${day} Time ${time}`,
//                  payload:payload
//             });
//             caps.emit('vendorDilevers' , payload);
// });

Socket.on('delverd' , payload=>{
         console.log('event:' , {
            event:'deleverd',
             time:`${year}-${month}-${day} Time ${time}`,
             payload:payload
         });
        //  caps.emit('delverd' , payload);
         caps.emit('vendordelverd' , payload);
       
        
     });
});




// events.on('transit', payload=>{
//     console.log('event:',{
//         event:'transit',
//         time:`${year}-${month}-${day} Time ${time}`,
//         payload:payload
//     });
//     events.emit('driverTransit',payload);
// })

// events.on('delverd' , payload=>{
//     console.log('event:' , {
//         event:'deleverd',
//         time:`${year}-${month}-${day} Time ${time}`,
//         payload:payload
//     });
//     events.emit('driverDeleverd',payload);
// });

// events.on("driverDeleverd",payload=>{
//     console.log('event' , {
//       event:`customer ${payload.customerName} has recived the package`,
//       time:`${year}-${month}-${day} Time ${time}`,
//       payload:payload
//     })
// })

module.exports=caps;

