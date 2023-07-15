import config from '../../../config.js';

export default class Model{
    constructor(nameController) {
        this.path = `${config.urlBase}/api/public/`;  
        this.nameController = nameController;
     }


     async get(id){      
      const endpoint = `${this.path}${this.nameController}/get/${id}`;            
        try {            
            const response = await fetch(endpoint);           
            
            return response.json();
                        
          } catch(e) {
            console.log(e);
          }     
      }

    async getAll(){

        const endpoint = `${this.path}${this.nameController}`;             
        try {            
            const response = await fetch(endpoint);           
            
            return await response.json();
                        
          } catch(e) {
            console.log(e);
          }

     }


    async insert(addressRedirecting, formData){       
      const endpoint = `${this.path}${this.nameController}/insert`;            
        
        try {
          let response = await fetch(endpoint, {
            method: "POST",
            body: formData,
          });          
          
          response = await response.json();
          
          if(response.error == ''){          
                            
            alert('Cadastrado com Sucesso');                 
            window.location.href = addressRedirecting;          

          }else{
            alert(response.error);                 
          }

        } catch (error) {
          alert(error);
        }   
    }
    
    async update(addressRedirecting, formData){       
      const endpoint = `${this.path}${this.nameController}/update`;      
            

        try {
          let response = await fetch(endpoint, {
            method: "POST",            
            body:  formData,
          });  
          
          response = await response.json();
          
          if(response.error == ''){           
                            
            alert('Editado com Sucesso');
                 

          }else{
            alert(response.error);                 
          }
          
        } catch (error) {
          console.log(error);
        }   
    }


    async delete(addressRedirecting, id, formData){
      
  
    const endpoint = `${this.path}${this.nameController}/delete/${id}`;
    
    const data = {};
      formData.forEach(function(value, key){
      data[key] = value;
        
      });
      
      formData = JSON.stringify(data); 
    
    try {
      let response = await fetch(endpoint, {
        method: "DELETE",
        body:  formData

      });  
      
      response = await response.json();

      if(response.error == ''){
        alert("Excluido com Sucesso");                 
        window.location.href = addressRedirecting;      

      }else{
        alert(response.error);                 
      }
    } catch (error) {
      alert(error);
    }

    }

  

}
