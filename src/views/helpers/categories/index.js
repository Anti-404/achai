import config from '../../../../config.js';
import ModelThings from '../../../models/things/index.js';
import LayoutThing from '../../components/thing/index.js';

class HelperCategories{
    constructor(){}

    static handleChangeThingsReservedByCategories(selectOptions){
        this.modelThings = new ModelThings();
        this.layoutThing = new LayoutThing(); 

        if(selectOptions === null) return;

        let categoriesLinks = selectOptions;        
        
        for (let i = 0; i < categoriesLinks.length; i++) {
            categoriesLinks[i].addEventListener('change',async(e)=>{                
                let categoriesId = e.target.value;  
               
                let allThingsReserved = {};

                if(categoriesId == "0"){
                    allThingsReserved = await this.modelThings.getThingsReserved();

                }else{
                    allThingsReserved = await this.modelThings.getThingsByCategoryIdAndReserved(categoriesId);                      
                }

                let thingsList = document.querySelector(".things-list");              

                thingsList.innerHTML = "";
                
                this.layoutThing.create(thingsList, allThingsReserved, true, 'admin/things/thingreserved');                 
            });
            
        }


    }

    static handleChangeThingsByCategories(selectOptions){
        this.modelThings = new ModelThings();
        this.layoutThing = new LayoutThing(); 

        if(selectOptions === null) return;

        let categoriesLinks = selectOptions;        
        
        for (let i = 0; i < categoriesLinks.length; i++) {
            categoriesLinks[i].addEventListener('change',async(e)=>{                
                let categoriesId = e.target.value;  
               
                let allThingsReserved = {};

                if(categoriesId == "0"){
                    allThingsReserved = await this.modelThings.getThings();

                }else{
                    allThingsReserved = await this.modelThings.getThingsByCategoryId(categoriesId);                      
                }

                let thingsList = document.querySelector(".things-list");              

                thingsList.innerHTML = "";
                
                this.layoutThing.create(thingsList, allThingsReserved, true, 'admin/things/thingreserved');                 
            });
            
        }


    }

    static handleThingsByCategories(allLinks){
        this.modelThings = new ModelThings();
        this.layoutThing = new LayoutThing(); 

        if(allLinks === null) return;        
        
        const filters =  document.querySelectorAll(".filter-things span"); 
        
        for (let i = 0; i < allLinks.length; i++) {

            if(allLinks[i].getAttribute('id') === 'all-categories') continue;

            allLinks[i].addEventListener('click',async(e)=>{

                let categoriesId = e.target.parentNode.getAttribute("data-id");    

                if(e.target.parentNode.parentNode.getAttribute('class') === 'active'){

                    for (let j = 0; j < allLinks.length; j++) {                                  
                        allLinks[j].parentNode.removeAttribute('class');                 
                    }    
                    
                    window.location.href = config.urlBase;
                    
                } else{

                    for (let j = 0; j < allLinks.length; j++) {                                  
                        allLinks[j].parentNode.removeAttribute('class');                 
                    }

                    if(e.target.parentNode.parentNode.getAttribute('class') === null){                    
                        e.target.parentNode.parentNode.setAttribute('class','active');
                        
                    }

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
                
                if(document.querySelector('.categories-panel-modal').style.display !== null){
                    document.querySelector('.categories-panel-modal').style.display = 'none';
                    
                    document.querySelector('.header-top-body .search-button').style.display = 'inline-block';
                    document.querySelector('.container-header').style.display = 'flex';
                    document.querySelector('main .container .things-list').style.display = 'flex';
                    document.querySelector('ul.breadcrumb').style.display = 'none';
                    
                }
            });
            
        }
    }

    static handleThingsByCategoriesModal(allLinks){
        this.modelThings = new ModelThings();
        this.layoutThing = new LayoutThing(); 

        if(allLinks === null) return;        
        
        const filters =  document.querySelectorAll(".filter-things span"); 
        
        for (let i = 0; i < allLinks.length; i++) {

            if(allLinks[i].getAttribute('id') === 'all-categories') continue

            allLinks[i].addEventListener('click',async(e)=>{

                let categoriesId = e.target.getAttribute("data-id");                              

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
                
                if(document.querySelector('.categories-panel-modal').style.display !== null){
                    document.querySelector('.categories-panel-modal').style.display = 'none';
                    
                    document.querySelector('.header-top-body .search-button').style.display = 'inline-block';
                    document.querySelector('.container-header').style.display = 'flex';
                    document.querySelector('main .container .things-list').style.display = 'flex';
                    document.querySelector('ul.breadcrumb').style.display = 'none';
                    
                    if(document.querySelector(".categories-list li[class=active]") !== null)
                    document.querySelector(".categories-list li[class=active]").removeAttribute('class'); 
                    
                }
            });
            
        }
    }


}

export default HelperCategories;