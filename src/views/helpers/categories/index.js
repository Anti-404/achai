import config from '../../../../config.js';
import ModelThings from '../../../models/things/index.js';
import LayoutThing from '../../components/thing/index.js';

import HelperTabOrder from '../../helpers/taborder/index.js';
import tabOrderManager from "../../admin/things/manager/taborder/index.js";

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
                
                // let categoriesName = categoriesLinks[i].querySelector(`option[value='${categoriesLinks[i].value}']`).textContent; 
                // categoriesLinks[i].setAttribute('role', `categoria selecionada: ${categoriesName}`);

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
                
                let allThings = {};

                if(categoriesId == "0"){
                    allThings = await this.modelThings.getAll();                    
                }else{
                    allThings = await this.modelThings.getThingsByCategoryId(categoriesId);                      
                }

                let thingsList = document.querySelector(".things-list");              

                thingsList.innerHTML = "";                
                
                await this.layoutThing.create(thingsList, allThings, true, 'admin/things/interaction');                 
                HelperTabOrder.resetTabOrder(tabOrderManager);
                HelperTabOrder.setTabOrder(tabOrderManager);

            });
            
        }


    }   

    static handleThingsByCategories(allLinks){
        this.modelThings = new ModelThings();
        this.layoutThing = new LayoutThing(); 

        if(allLinks === null) return;        
        
        const filters =  document.querySelectorAll(".filter-things span"); 
        
        for (let i = 0; i < allLinks.length; i++) {

            if(allLinks[i].querySelector('a').getAttribute('id') === 'all-categories') continue;

            allLinks[i].addEventListener('click',async(e)=>{                
                
                let categoriesId = allLinks[i].querySelector('a').getAttribute("data-id");    
                let imgs = document.querySelectorAll('.categories-list a img');
                if(allLinks[i].getAttribute('class') === 'active'){                    

                    for (let j = 0; j < allLinks.length; j++) {                                  
                        allLinks[j].removeAttribute('class');                                              

                        imgs.forEach((img)=>{
                           
                            if(img.src.includes('headphones')){
                                img.src = `${config.urlBase}/assets/imgs/icons/headphones_FILL0_wght300_GRAD0_opsz40.svg`                                
                                
                            }
                            if(img.src.includes('water_bottle')){
                                img.src = `${config.urlBase}/assets/imgs/icons/water_bottle_FILL0_wght300_GRAD0_opsz40.svg`
                            }
                            
                            if(img.src.includes('umbrella')){
                                img.src = `${config.urlBase}/assets/imgs/icons/umbrella_FILL0_wght300_GRAD0_opsz40.svg`
                            }     
                        })
                        
                    } 

                    window.location.href = config.urlBase;
                    
                } else{

                    for (let j = 0; j < allLinks.length; j++) {                                  
                        allLinks[j].removeAttribute('class');                 
                    } 

                    document.querySelectorAll('.categories-list a img').forEach((img)=>{
                           
                        if(img.src.includes('headphones')){
                            img.src = `${config.urlBase}/assets/imgs/icons/headphones_FILL0_wght300_GRAD0_opsz40.svg`
                        }
                        if(img.src.includes('water_bottle')){
                            img.src = `${config.urlBase}/assets/imgs/icons/water_bottle_FILL0_wght300_GRAD0_opsz40.svg`
                        }
                        
                        if(img.src.includes('umbrella')){
                            img.src = `${config.urlBase}/assets/imgs/icons/umbrella_FILL0_wght300_GRAD0_opsz40.svg`
                        }     
                    })

                    if(allLinks[i].getAttribute('class') === null){                    
                        allLinks[i].setAttribute('class', 'active');
                        let img = allLinks[i].querySelector('a img');
                        if(img.src.includes('headphones')){
                            img.src = `${config.urlBase}/assets/imgs/icons/headphones_FILL0_wght300_white_GRAD0_opsz40.svg`
                        }else if(img.src.includes('water_bottle')){
                            img.src = `${config.urlBase}/assets/imgs/icons/water_bottle_FILL0_wght300_white_GRAD0_opsz40.svg`
                        }else{
                            img.src = `${config.urlBase}/assets/imgs/icons/umbrella_FILL0_wght300_white_GRAD0_opsz40.svg`
                        }                       
                        
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

                if(categoriesId == "87" &&  Number.parseInt(lostThingsFilters)){
                    allThings = await this.modelThings.getAll();

                }else if(categoriesId == "87" &&  !Number.parseInt(lostThingsFilters)){
                    allThings = await this.modelThings.getThingsReserved(); 
                
                }else if(Number.parseInt(lostThingsFilters)){
                    allThings = await this.modelThings.getThingsByCategoryId(categoriesId);  
                    
                }else{
                    allThings = await this.modelThings.getThingsByCategoryIdAndReserved(categoriesId);  
                }

                let thingsList = document.querySelector(".things-list");              

                thingsList.innerHTML = "";
                
                this.layoutThing.create(thingsList, allThings, true, 'users/things/show-object');

                document.querySelectorAll('.categories-list a img').forEach((img)=>{
                           
                    if(img.src.includes('headphones')){
                        img.src = `${config.urlBase}/assets/imgs/icons/headphones_FILL0_wght300_GRAD0_opsz40.svg`
                    }
                    if(img.src.includes('water_bottle')){
                        img.src = `${config.urlBase}/assets/imgs/icons/water_bottle_FILL0_wght300_GRAD0_opsz40.svg`
                    }
                    
                    if(img.src.includes('umbrella')){
                        img.src = `${config.urlBase}/assets/imgs/icons/umbrella_FILL0_wght300_GRAD0_opsz40.svg`
                    }     
                })

                
                if(document.querySelector('.categories-panel-modal').style.display !== null){
                    document.querySelector('.categories-panel-modal').style.display = 'none';
                    document.querySelector('.banner').style.display = 'block';
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