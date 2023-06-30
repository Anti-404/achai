import Model from '../../core/model/index.js';

export default class ModelAdmins extends Model{
  constructor() {
      super('admin');
    }

    async login(formData){
      const endpoint = `${this.path}${this.nameController}/login`;

      try {
        let response = await fetch(endpoint, {
          method: "POST",
          body: formData,
        });          
        
        response = await response.json();

        if(response.error == ''){ 
          return response;            
          
        }else{
          alert(response.error);
          return response;                
        
        }
        
      } catch (error) {
        alert(error);
      }     
              
    }

    async getByHash(formData) {

      const endpoint = `${this.path}${this.nameController}/getByHash`;

      try {
        let response = await fetch(endpoint, {
          method: "POST",
          body: formData,
        });          
        
        response = await response.json();

        if(response.error == ''){ 
          return response;            
          
        }else{
          alert(response.error);
          return response;                
        
        }
        
      } catch (error) {
        alert(error);
      } 
      
    }  
}