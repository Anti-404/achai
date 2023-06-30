import ModelCategories from './src/models/categories/index.js';
import ModelThings from './src/models/things/index.js';
import LayoutThing from './src/views/components/thing/index.js';
import LayoutHeaderContent from './src/views/components/headercontent/index.js';
import LayoutModalSearch from './src/views/components/modalsearch/index.js';

import HelperSearch from './src/views/helpers/search/index.js';

import config from './config.js';

class Home {
    constructor(){
        this.modelCategories = new ModelCategories();               
        this.modelThings = new ModelThings();  
        this.layoutThing = new LayoutThing();                      
    }

    async categoriesList(){         
        let ul = document.querySelector("#categories-list");
        const allCategories = await this.modelCategories.getAll();
        
        if(!allCategories.error){                        
            for (let i = 0; i < allCategories.result.length; ++i) {  
                let li = document.createElement("li"); 
                let a = document.createElement("a");                
                let spanIcon = document.createElement("span");                
                let span = document.createElement("span");                    
                
                if(allCategories.result[i].icon_name !== null){
                    spanIcon.setAttribute('class','material-symbols-rounded');                    
                    spanIcon.style.backgroundImage = `url(${config.urlBase}/assets/imgs/icons/${allCategories.result[i].icon_name})`;
                    spanIcon.style.backgroundRepeat = `no-repeat`;
                    spanIcon.style.backgroundPosition = `center`;                    
                    a.setAttribute("data-id",allCategories.result[i].id);                                
                    span.textContent = allCategories.result[i].name;
                    a.appendChild(spanIcon); 
                    li.appendChild(a);
                    li.appendChild(span); 
                    ul.appendChild(li);
                }

                                 
            }           
            
       }    
             
            
    }

    handleThingsByBategories(){
        if(document.querySelectorAll('#categories-list li a') === null) return;

        let categoriesLinks = document.querySelectorAll('#categories-list li a');
        const filters =  document.querySelectorAll(".filter-things span"); 
        
        for (let i = 0; i < categoriesLinks.length; i++) {
            categoriesLinks[i].addEventListener('click',async(e)=>{                
                let categoriesId = e.target.parentNode.getAttribute("data-id");                
                for (let j = 0; j < categoriesLinks.length; j++) {
                    //categoriesLinks[j].parentNode.classList.remove('active');                  
                    categoriesLinks[j].parentNode.removeAttribute('class');                 
                }
                
                //console.log(e.target.parentNode.parentNode.classList.contains('active'));
                //console.log(e.target.parentNode.parentNode.hasAttribute("class"));
                
                //console.log(e.target.parentNode.parentNode);
                if(e.target.parentNode.parentNode.classList.contains('active')){
                    //e.target.parentNode.parentNode.classList.remove('active');
                    e.target.parentNode.parentNode.removeAttribute('class');   
                }else{
                    e.target.parentNode.parentNode.setAttribute('class','active');
                }

                let lostThingsFilters = filters.item(0).getAttribute('status');                                
                let allThings = {};

                if(categoriesId == "0" &&  Number.parseInt(lostThingsFilters)){
                    allThings = await this.modelThings.getAll();

                }else if(categoriesId == "0" &&  !Number.parseInt(lostThingsFilters)){
                    allThings = await this.modelThings.getThingsReserved(); 
                
                }else if(Number.parseInt(lostThingsFilters)){
                    allThings = await this.modelThings.getThingsByCategoryId(categoriesId);  
                    
                }else{
                    allThings = await this.modelThings.getThingsByCategoryIdAndReserved(categoriesId);  
                }

                let thingsList = document.querySelector(".things-list");              

                thingsList.innerHTML = "";
                
                this.layoutThing.create(thingsList, allThings, true, 'users/things/show-object');
            });
            
        }


    }    
    
    async thingsList(){
        
            const allThings = await this.modelThings.getAll();           
            
            let  thingsList = document.querySelector(".things-list");
            
            this.layoutThing.create(thingsList, allThings, true, 'users/things/show-object');

    }
        
    thingsByFilters(){
            let  allThings = {erro:'', result:''};           
            let  thingsFilters = document.querySelectorAll(".filter-things span");                        
            let  thingsList = document.querySelector(".things-list");

            thingsFilters.forEach(async(filter, index) => {
                let status = filter.getAttribute('status');
                let path = '';                
                if (status == "1") {              
                
                    switch (index) {                        
                        case 0:                                                       
                            allThings = await this.modelThings.getAll(); 
                            path =  'users/things/show-object';                                                     
                            break;

                        case 1:                            
                            allThings = await this.modelThings.getThingsReserved();  
                            path =  'users/things/show-reserved-object';                                                      
                            break;                       
                    
                        default:
                            break;
                    }
                }

                thingsList.innerHTML = '';

                this.layoutThing.create(thingsList, allThings, true, path);
                
        });
            
             

    }

    filterThings(){
        let  thingsFilters = document.querySelectorAll(".filter-things span");                        
        
        thingsFilters.forEach((filter) => {
            filter.addEventListener('click', ()=>{
                for (let i = 0; i < thingsFilters.length; i++) {                    
                    thingsFilters[i].setAttribute('status','0');
                }
                filter.setAttribute('status','1');
                this.thingsByFilters();
            });
        });

    }    
  
    createHeaderContent(){
        const contentHeader = new LayoutHeaderContent();
        contentHeader.create(document.querySelector('header .container'));
    }

    

}

const home = new Home();
await home.categoriesList();
home.createHeaderContent();
home.handleThingsByBategories();
await home.thingsList();
home.filterThings();

HelperSearch.createModalSearch();
HelperSearch.searchItem();
HelperSearch.openSearchModal();
HelperSearch.closeSearchModal();
