import ModelThings from '../../../../models/things/index.js';
import ModelCategories from '../../../../models/categories/index.js';
import Controller from '../../../../core/controller/index.js';
import config from '../../../../../config.js';
import LayoutThing from '../../../components/layoutthing/index.js';

class ThingsManager extends Controller{

    constructor(){    
        super();
        this.modelThings = new  ModelThings();
        this.modelCategories = new  ModelCategories();        
        this.currentPage = this.retrieveURLCurrentPage();       
        this.categoriesIdUrl = this.retrieveURLId();
        this.layoutThing = new LayoutThing(); 
    }
    
    
    async thingsList(){

        let allThings = {};
        
        if (this.categoriesIdUrl !== undefined && this.categoriesIdUrl !== '0') {
            allThings = await this.modelThings.getThingsByCategoryId(this.categoriesIdUrl);            
        }else{
            allThings = await this.modelThings.getAll();            
        }

        let  thingsList = document.querySelector(".things-list");
        
        this.layoutThing.create(thingsList, allThings,true, 'admin/things/interaction');

    }
        
    goToRegisterthing(){
        document.querySelector("#register-things-button").addEventListener("click",(e)=>{            
            e.preventDefault();              
            let currentPage = this.currentPage.split('?')[0];
            window.location.href = `${config.urlBase}/src/views/admin/things/register/?prevPage=${currentPage}`;           
            
        });
        
    }
    
    handleChangeThingsByBategories(){
        if(document.querySelectorAll('#categories-list') === null) return;

        let categoriesLinks = document.querySelectorAll('#categories-list');        
        
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
                
                this.layoutThing.create(thingsList, allThings, true, 'admin/things/interaction');
            });
            
        }


    }
    
    async categoriesList(){         
        let select = document.querySelector("#categories-list");
        const allCategories = await this.modelCategories.getAll();
        
        if(!allCategories.error){                        
            for (let i = 0; i < allCategories.result.length; ++i) {                  
                let option = document.createElement("option");                                                              
                option.setAttribute("value",allCategories.result[i].id);
                option.appendChild(document.createTextNode((allCategories.result[i].name)));                                 
                select.appendChild(option);                 
            }           
            
       }           
             

    } 
    
      
    searchItem(){       
        let searchItem = document.querySelector('#search-item');
        
        if(searchItem == null) return;
        

        searchItem.addEventListener('keyup',()=>{
            let input = document.querySelector('#search-item').value
            input=input.toLowerCase();
            let x = document.querySelectorAll('.things-list a');
            
            
            for (let i = 0; i < x.length; i++) { 
                 if (!x[i].outerText.toLowerCase().includes(input)) {
                    x[i].style.display="none";
                }
                else {
                    x[i].style.display="flex";                 
                }
            }
            
        });
    }

    openSearchModal(){
        document.querySelector('#search-button').addEventListener('click',()=>{
            document.querySelector('.background-modal').style.display = 'block';
            document.querySelector("#search-modal").style.display = 'block';                      
        });
     }

    closeSearchModal(){
        document.querySelector('#search-item').addEventListener('blur',(event)=>{    
            document.querySelector('#search-item').value = '';        
            document.querySelector('.background-modal').style.display = 'none';
            
        });        
    } 


}

const thingsManager = new ThingsManager();

await thingsManager.categoriesList();
await thingsManager.thingsList(); 
thingsManager.goToRegisterthing();
thingsManager.searchItem();
thingsManager.openSearchModal();
thingsManager.closeSearchModal();
thingsManager.handleChangeThingsByBategories();