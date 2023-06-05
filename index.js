import ModelCategories from './src/models/categories/index.js';
import ModelThings from './src/models/things/index.js';
import config from './config.js';

class Home {
    constructor(){
        this.modelCategories = new ModelCategories();               
        this.modelThings = new ModelThings();                       
    }

    async categoriesList(){         
        let ul = document.querySelector("#categories-list");
        const allCategories = await this.modelCategories.getAll();
        
        if(!allCategories.error){                        
            for (let i = 0; i < allCategories.result.length; ++i) {  
                let li = document.createElement("li"); 
                let a = document.createElement("a");                
                a.setAttribute("data-id",allCategories.result[i].id);                                
                a.appendChild(document.createTextNode((allCategories.result[i].name)));
                li.appendChild(a);
                ul.appendChild(li);                 
            }           
            
       }    
       
       const a =  document.querySelectorAll("ul li a");
       const filters =  document.querySelectorAll(".filter-things span");       

        for (let i = 0; i < a.length; i++) {

            a[i].addEventListener("click", async (e)=>{            
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
                               
                if(!allThings.error){ 
                    
                    for (let i = 0; i < allThings.result.length; ++i) {
                        let a = document.createElement("a");
                        let figure = document.createElement("figure");
                        let img = document.createElement("img");
                        let figCaption = document.createElement("figcaption");
                        let p  = document.createElement("p");
                        let span = document.createElement("span");             

                        p.appendChild(document.createTextNode("Código: "+allThings.result[i].id));      

                        a.setAttribute("href",`${config.urlBase}/src/views/users/things/show-object/?id=${allThings.result[i].id}`);                                              
                        figure.setAttribute("data-id",allThings.result[i].id);                                                            
                        a.setAttribute("data-id",allThings.result[i].id);                                                            
                        img.setAttribute("src",`${config.urlBase}/`+allThings.result[i].image_address);                        
                        img.setAttribute("alt",allThings.result[i].description);                                                        
                        figCaption.appendChild(document.createTextNode(allThings.result[i].description));
                        document.querySelectorAll('#categories-list a').forEach((item)=>{
                                        
                            if(allThings.result[i].category_id == item.getAttribute('data-id')){
                                span.appendChild(document.createTextNode(item.innerHTML));                  
                                return;
                            }
                        });
                         
                        figure.appendChild(img);
                        figure.appendChild(figCaption);
                        a.appendChild(span);
                        a.appendChild(figure);                        
                        thingsList.appendChild(a);
                        
                    }  
        
                    
                } 
                
            });            
        }
               
                
            
    }   

    async thingsList(){
        
            const allThings = await this.modelThings.getAll();           
            
            let  thingsList = document.querySelector(".things-list");
            
            if(!allThings.error){ 
                
                for (let i = 0; i < allThings.result.length; ++i) {
                    let a  = document.createElement("a");
                    let figure = document.createElement("figure");
                    let img = document.createElement("img");
                    let figCaption = document.createElement("figcaption");             
                    let span = document.createElement("span");             
                    
                    a.setAttribute("href",`${config.urlBase}/src/views/users/things/show-object/?id=${allThings.result[i].id}`);
                    figure.setAttribute("data-id",allThings.result[i].id);                        
                    img.setAttribute("src",`${config.urlBase}/`+allThings.result[i].image_address);                        
                    img.setAttribute("alt",allThings.result[i].description);  
                    
                    document.querySelectorAll('#categories-list a').forEach((item)=>{
                                        
                        if(allThings.result[i].category_id == item.getAttribute('data-id')){
                            span.appendChild(document.createTextNode(item.innerHTML));                  
                            return;
                        }
                    });                                                                                         
                    figCaption.appendChild(document.createTextNode(allThings.result[i].description));
                     
                    figure.appendChild(img);
                    figure.appendChild(figCaption);                     
                    a.appendChild(span);
                    a.appendChild(figure);
                    
                    thingsList.appendChild(a);
                    
                }
    
                
            } 

    }
        
    thingsByFilters(){
            let  allThings = {erro:'', result:''};           
            let  thingsFilters = document.querySelectorAll(".filter-things span");                        
            let  thingsList = document.querySelector(".things-list");

            thingsFilters.forEach(async(filter, index) => {
                let status = filter.getAttribute('status');
                
                if (status == "1") {              
                
                    switch (index) {                        
                        case 0:                                                       
                            allThings = await this.modelThings.getAll();                            
                            break;

                        case 1:                            
                            allThings = await this.modelThings.getThingsReserved();                            
                            
                            break;                       
                    
                        default:
                            break;
                    }
                }

                thingsList.innerHTML = '';

                if(!allThings.error){ 
                
                    for (let i = 0; i < allThings.result.length; ++i) {
                        let a  = document.createElement("a");
                        let figure = document.createElement("figure");
                        let img = document.createElement("img");
                        let figCaption = document.createElement("figcaption");             
                        let span = document.createElement("span");             
                        
                        if(thingsFilters[0].getAttribute('status') == '1'){                                               
                            a.setAttribute("href",`${config.urlBase}/src/views/users/things/show-object/?id=${allThings.result[i].id}`);
                        }

                        figure.setAttribute("data-id",allThings.result[i].id);                        
                        img.setAttribute("src",`${config.urlBase}/`+allThings.result[i].image_address);                        
                        img.setAttribute("alt",allThings.result[i].description);  
                        document.querySelectorAll('#categories-list a').forEach((item)=>{
                                            
                            if(allThings.result[i].category_id == item.getAttribute('data-id')){
                                span.appendChild(document.createTextNode(item.innerHTML));                  
                                return;
                            }
                        });                                                                                         
                        figCaption.appendChild(document.createTextNode(allThings.result[i].description));
                         
                        figure.appendChild(img);
                        figure.appendChild(figCaption);                     
                        a.appendChild(span);
                        a.appendChild(figure);
                        
                        thingsList.appendChild(a);
                        
                    }
        
                    
                }

                
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
            window.event.stopPropagation();
        });
     }

    closeSearchModal(){
        document.querySelector('#search-icon').addEventListener('click',(event)=>{            
           document.querySelector('.background-modal').style.display = 'none';
            
        });        
    }

}

const home = new Home();
await home.categoriesList();
await home.thingsList();
home.filterThings();
home.searchItem();
home.openSearchModal();
home.closeSearchModal();
