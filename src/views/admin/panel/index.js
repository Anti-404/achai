import ModelThings from "../../../models/things/index.js";
import ModelCategories from '../../../models/categories/index.js';
import Controller from "../../../core/controller/index.js";
import config from "../../../../config.js";
import LayoutThing from '../../components/layoutthing/index.js';

class Panel extends Controller{
    constructor(){
        super();
        this.modelThings = new ModelThings();  
        this.modelCategories = new  ModelCategories();      
        this.currentPage = this.retrieveURLCurrentPage();
        this.layoutThing = new LayoutThing(); 
    } 

    exit(){
        document.querySelector("#exit-button").addEventListener("click",()=>{
            localStorage.removeItem("hash");
            alert("Deslogado com sucesso");
            window.location.href = `${config.urlBase}/src/views/admin/login/`;
        });
        
    }

    async ListThingsReserved(){

        const allThings = await this.modelThings.getThingsReserved();                    
        let  thingsListReserved = document.querySelector(".things-list");                
        await this.layoutThing.create(thingsListReserved, allThings, true, 'admin/things/thingreserved'); 
        
    }
    
    openSandwichMenu(){
        
        document.querySelector(".sandwich-menu-button").addEventListener("click",(e)=>{
            
            document.querySelector("#search-modal").style.display = 'none';
            document.querySelector(".background-modal").style.display = 'block';           
            document.querySelector(".sandwich-menu-body").setAttribute("style","display:block");            
            
        });
               
    }

    closeSandwichMenu(){
        document.querySelector(".close-modal").addEventListener("click",(e)=>{

            document.querySelector(".sandwich-menu-body").setAttribute("style","display:none");
            document.querySelector(".background-modal").style.display = 'none'; 
            
            
        });        
    }

    goToProfile(){
        document.querySelector(".profile-button").addEventListener("click",()=>{  

           window.location.href = `${config.urlBase}/src/views/admin/profile/`;

        });
        
    }

    goToDiscardeThings(){
        document.querySelector(".discard-things-button").addEventListener("click",()=>{  

           window.location.href = `${config.urlBase}/src/views/admin/things/discard/`;

        });
        
    }

    goToReturnedThings(){
        document.querySelector(".returned-things-button").addEventListener("click",()=>{  

           window.location.href = `${config.urlBase}/src/views/admin/things/returned/`;

        });
        
    }

    goToCategoryManager(){
        document.querySelector(".category-manager-button").addEventListener("click",()=>{  

           window.location.href = `${config.urlBase}/src/views/admin/categories/`;

        });
        
    }

    goToThingRegister(){
        document.querySelector(".register-thing-button").addEventListener("click",()=>{  
            
           window.location.href = `${config.urlBase}/src/views/admin/things/register/?prevPage=${this.currentPage}`;

        });
    
    }

    goToReturnedThing(){
        document.querySelector(".returned-thing-button").addEventListener("click",()=>{  
            window.location.href = `${config.urlBase}/src/views/admin/things/qrcodereader/`;            

        });
        
    }

    goToManageThings(){
        document.querySelector(".manage-things-button").addEventListener("click",()=>{  

           window.location.href = `${config.urlBase}/src/views/admin/things/`;

        });
        
    } 

    goToReservedThing(){  
        
        let thingsList =  document.querySelectorAll(".things-list figure");              
       
        thingsList.forEach((thing)=>{
            thing.addEventListener("click", (e)=>{   
                let id = thing.getAttribute("data-id")            
                window.location.href = `${config.urlBase}/src/views/admin/things/thingreserved/?id=${id}`;                  
            });    
        })
       
          
       
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
                    x[i].style.display="flex";                 
                }
            }
            
        });
    }

    openSearchModal(){
        document.querySelector('#search-button').addEventListener('click',()=>{
            document.querySelector('.background-modal').style.display = 'block';
            document.querySelector("#search-modal").style.display = 'block';
            document.querySelector(".sandwich-menu-body").style.display = 'none';            
        });
     }

    closeSearchModal(){
        document.querySelector('#search-item').addEventListener('blur',(event)=>{    
            document.querySelector('#search-item').value = '';        
            document.querySelector('.background-modal').style.display = 'none';
            
        });        
    }    
    

}

const panel = new Panel();
await panel.ListThingsReserved();
panel.openSandwichMenu();
panel.closeSandwichMenu();
panel.goToProfile();
panel.goToDiscardeThings();
panel.goToReturnedThings();
panel.goToCategoryManager();
panel.goToThingRegister();
panel.goToReturnedThing();
panel.goToManageThings();
panel.goToReservedThing();
panel.exit();
panel.searchItem();
panel.openSearchModal();
panel.closeSearchModal();