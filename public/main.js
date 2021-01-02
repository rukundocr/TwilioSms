   const phone = document.getElementById('mobile');
   const message = document.getElementById('message');
   const submit = document.getElementById('btnSubmit');
   submit.addEventListener('click',(e)=>{
    e.preventDefault();
    const data ={
        phone: phone.value,
        message:message.value
    }
     const options = {
         method:'POST',
         headers:{
             "Content-Type":"application/json",
         },
         body:JSON.stringify(data),
     }
     fetch('/Send', options )
     .then(response => {
         const res= response.json();
         console.log(res.to);
         //fixing reeponse soon 
     })
     .catch(error=>{
         console.log(error)
     })
     ;
    
   })