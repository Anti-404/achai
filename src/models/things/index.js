import Model from '../../core/model/index.js';

export default class ModelThings extends Model{
   constructor() {
        super('thing');
   }    

  async getThingsByCategoryId(categoryId){
            
      const endpoint = `${this.path}${this.nameController}/getallbycategory/${categoryId}`;
      
      try {   
            
          const response = await fetch(endpoint);          
          
          return await response.json();
                      
        } catch(e) {
          console.log(e);
        }

  }

  async getThingsByCategoryIdAndReserved(categoryId){
            
    const endpoint = `${this.path}${this.nameController}/getallbycategoryandreserved/${categoryId}`;
    
    try {   
          
        const response = await fetch(endpoint);          
        
        return await response.json();
                    
      } catch(e) {
        console.log(e);
      }

}

  async getThingsReserved(){

      const endpoint = `${this.path}${this.nameController}/getallreserved`;
      
      try {            
          const response = await fetch(endpoint);           
          
          return await response.json();
                      
        } catch(e) {
          console.log(e);
        }

  }

  async getReservedById(id){
    const endpoint = `${this.path}${this.nameController}/getreservedbyid/${id}`;
            
      try {            
          const response = await fetch(endpoint);           
          
          return response.json();
                      
        } catch(e) {
          console.log(e);
        }     
    }

  async getThingsDiscard(){

    const endpoint = `${this.path}${this.nameController}/getalldiscard`;
    
    try {            
        const response = await fetch(endpoint);           
        
        return await response.json();
                    
      } catch(e) {
        console.log(e);
      }

  }

  async getThingsReturned(){

    const endpoint = `${this.path}${this.nameController}/getallreturned`;
    
    try {            
        const response = await fetch(endpoint);           
        
        return await response.json();
                    
      } catch(e) {
        console.log(e);
      }


  }
  
  async update(addressRedirecting, formData, message='Editado'){       
    const endpoint = `${this.path}${this.nameController}/update`;                  
      
      try {
        let response = await fetch(endpoint, {
          method: "POST",            
          body:  formData
          
        });  
        
        response = await response.json();
        
        if(response.error == ''){
          alert(message+' com Sucesso'); 
          
          if(!(addressRedirecting == '')){                
            window.location.href = addressRedirecting;      
          }

        }else{
          alert(response.error);                 
        }
        
      } catch (error) {
        console.log('Erro no codigo do sistema: '+error);
      }   
  }

  async reserve(addressRedirecting, formData, message='Reservado'){       
    const endpoint = `${this.path}${this.nameController}/reserve`;                  
      
      try {
        let response = await fetch(endpoint, {
          method: "POST",            
          body:  formData
          
        });  
        
        response = await response.json();
        
        if(response.error == ''){
          alert(message+' com Sucesso'); 
          
          if(!(addressRedirecting == '')){                
            window.location.href = addressRedirecting;      
          }

        }else{
          alert(response.error);                 
        }
        
      } catch (error) {
        console.log('Erro no codigo do sistema: '+error);
      }   
  }
  
  async compressDescarded(addressRedirecting, formData, message='Zipado com Sucesso'){
        const endpoint = `${this.path}${this.nameController}/compressdescarded`;       
         
        try {
          let response = await fetch(endpoint, {
            method: "POST",            
            body:  formData,
          }); 
          
          if(!response.error){
            alert(message);                 
            window.location.href = addressRedirecting;      

          }else{
            alert(response.error);                 
          }
          
        } catch (error) {
          console.log(error);
        }   
  }

}