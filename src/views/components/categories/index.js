
import config from '../../../../config.js';
import ModelCategory from '../../../models/categories/index.js';

class LayoutCateogoriesList{

    constructor(){          
        this.modelCategories = new ModelCategory();          
    }

    async create(container){
        const allCategories = await this.modelCategories.getAll();

        if(allCategories.error !== '') return;

        let select = document.createElement('select');
        select.setAttribute('name', 'categories-list');        
        select.setAttribute('id', 'categories-list');
        
        for (let i = 0; i < allCategories.result.length; ++i) {   
            if(allCategories.result[i].name !== 'Todas') {                
                let option = document.createElement("option");                                                              
                option.setAttribute("value",allCategories.result[i].id);
                option.appendChild(document.createTextNode((allCategories.result[i].name)));                                 
                select.appendChild(option);
            }                 
        } 

        container.appendChild(select);
    
    }

}

export default LayoutCateogoriesList;