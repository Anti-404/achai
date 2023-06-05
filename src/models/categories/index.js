import Model from '../../core/model/index.js';

export default class ModelCategories extends Model{
    constructor() {
        super('category');
     }

     async getCategoryByName(name){
        const endpoint = `${this.path}${this.nameController}/getcategorybyname/${name}`;
                
          try {            
              const response = await fetch(endpoint);           
              
              return response.json();
                          
            } catch(e) {
              console.log(e);
            }     
    }  


}
