import ModelThings from "../../../models/things/index.js";
import Controller from "../../../core/controller/index.js";
import config from "../../../../config.js";

class Panel extends Controller{
    constructor(){
        super();
        this.modelThings = new ModelThings();        
        this.currentPage = this.retrieveURLCurrentPage();
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
        let  thingsListReserved = document.querySelector(".reserved");                
        if(!allThings.error){ 
                        
            for (let i = 0; i < allThings.result.length; ++i) {
                                
                let figure = document.createElement("figure");
                let img = document.createElement("img");                
                let figCaption = document.createElement("figcaption"); 
                let qrCode = document.createElement("img");
                  
                figure.setAttribute("data-id",allThings.result[i].id);                    
                img.setAttribute("src",`${config.urlBase}/${allThings.result[i].image_address}`);                    
                img.setAttribute("alt",allThings.result[i].description);                
                figCaption.appendChild(document.createTextNode(allThings.result[i].description));
                                                                                           
                
                figure.appendChild(img);                
                figure.appendChild(figCaption);                                
                thingsListReserved.appendChild(figure);
                
            }

            
        } 
        
    }
    
    toggleSandwichMenu(){
        
        document.querySelector(".sandwich-menu-button").addEventListener("click",(e)=>{
            let  sandwichMenu= document.querySelector(".sandwich-menu-body");
            
            if(sandwichMenu.classList.toggle("visible")){ 
                sandwichMenu.setAttribute("style","display:block");
            }else{
                sandwichMenu.setAttribute("style","display:none");
            }
            
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
        
        let thingsList =  document.querySelectorAll(".reserved figure");              
       
        thingsList.forEach((thing)=>{
            thing.addEventListener("click", (e)=>{   
                let id = thing.getAttribute("data-id")            
                window.location.href = `${config.urlBase}/src/views/admin/things/thingreserved/?id=${id}`;                  
            });    
        })
       
          
       
    }
    

}

const panel = new Panel();
await panel.ListThingsReserved();
panel.toggleSandwichMenu();
panel.goToProfile();
panel.goToDiscardeThings();
panel.goToReturnedThings();
panel.goToCategoryManager();
panel.goToThingRegister();
panel.goToReturnedThing();
panel.goToManageThings();
panel.goToReservedThing();

panel.exit();