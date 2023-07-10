
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
        
        let option = document.createElement("option");
        option.setAttribute("value","0");
        option.textContent = 'Categorias';        

        select.appendChild(option);

        for (let i = 0; i < allCategories.result.length; ++i) {   
            if(allCategories.result[i].name !== 'Todas' && allCategories.result[i].name !== 'Ver todos') {                
                let option = document.createElement("option");                                                              
                option.setAttribute("value",allCategories.result[i].id);
                option.appendChild(document.createTextNode((allCategories.result[i].name)));                                 
                select.appendChild(option);
            }                 
        } 

        container.appendChild(select);
    
    }

    async createPanel(container){
        const allCategories = await this.modelCategories.getAll();

        if(allCategories.error !== '') return;
        
        let categoriesPanel = document.createElement('div');       
        categoriesPanel.setAttribute('class','categories-panel-modal');

        let ul = document.createElement('ul');
        ul.setAttribute('class','categories-list-panel');

        for (let index = 0; index < allCategories.result.length; index++) {
            if(allCategories.result[index].name !== 'Todas'){
                let li = document.createElement('li');
                let a = document.createElement('a');
                a.setAttribute('data-id',allCategories.result[index].id);
                a.textContent = allCategories.result[index].name;
                                
                li.appendChild(a);
                ul.appendChild(li)
            }    
        }

        categoriesPanel.appendChild(ul);
        container.appendChild(categoriesPanel);        
    
    }



}

export default LayoutCateogoriesList;