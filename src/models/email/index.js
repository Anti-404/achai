import Model from '../../core/model/index.js';

export default class ModelEmail extends Model{
   constructor() {
        super('email');
   }    
  

 async sendEmail(formData){
    const endpoint = `${this.path}${this.nameController}/sendemail`;                        
      try {
        let response = await fetch(endpoint, {
          method: "POST",            
          body:  formData          
        });  
        
        response = await response.json();        
        return response;                 
        
      } catch (error) {
        console.log('Erro no codigo do sistema: '+error);
      }   
  }

}