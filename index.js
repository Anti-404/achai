import config from './config.js';
import ModelCategories from './src/models/categories/index.js';
import ModelThings from './src/models/things/index.js';
import LayoutThing from './src/views/components/layoutthing/index.js';

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
                let img = document.createElement("img");                
                let span = document.createElement("span");                    
                
                if(allCategories.result[i].image_address !== null){
                    img.src = `${config.urlBase}/${allCategories.result[i].image_address}`;
                }

                a.setAttribute("data-id",allCategories.result[i].id);                                
                span.textContent = allCategories.result[i].name;
                a.appendChild(img); 
                a.appendChild(span); 
                li.appendChild(a);
                ul.appendChild(li);                 
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
                    categoriesLinks[j].parentNode.classList.remove('active');                  
                }

                e.target.parentNode.parentNode.setAttribute('class','active');

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
  

    searchItem(){       
        let searchItem = document.querySelector('#search-item');

        if(searchItem == null){
            return;
        }

        searchItem.addEventListener('keyup',()=>{
            let input = document.querySelector('#search-item').value
            input=input.toLowerCase();
            let x = document.querySelectorAll('.things-list a');
            
            
            for (let i = 0; i < x.length; i++) { 
                 if (!x[i].outerText.toLowerCase().includes(input)) {
                    x[i].style.display="none";
                }
                else {
                    x[i].style.display="block";                 
                }
            }
            
        });
    }

    openSearchModal(){
        document.querySelector('#search-button').addEventListener('click',()=>{
            document.querySelector('.background-modal').style.display = 'block';
            document.querySelector('#search-item').focus();
        });
     }

    closeSearchModal(){
        document.querySelector('#search-item').addEventListener('blur',(event)=>{           
           document.querySelector('#search-item').value = '';
           document.querySelector('.background-modal').style.display = 'none';
            
        });        
    }
    

}

const home = new Home();
await home.categoriesList();
home.handleThingsByBategories();
await home.thingsList();
home.filterThings();
home.searchItem();
home.openSearchModal();
home.closeSearchModal();