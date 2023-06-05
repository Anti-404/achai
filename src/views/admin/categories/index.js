import ModelCategories from '../../../models/categories/index.js';
import Controller from '../../../core/controller/index.js';
import config from '../../../../config.js';

class Categories extends Controller{
    constructor(){        
        super();
        this.modelCategories = new  ModelCategories();             
        this.currentPage = this.retrieveURLCurrentPage();        
    } 
    
    async showAll(){    
        let tableBody = document.querySelector("tbody");
        
        const allCategories = await this.modelCategories.getAll();
        
        if(!allCategories.error){  
                      
            for (let i = 0; i < allCategories.result.length; ++i) {
                let tr = document.createElement("tr");                
                let td1 = document.createElement("td"); 
                let td2 = document.createElement("td"); 
                                                
                td1.appendChild(document.createTextNode(allCategories.result[i].id));
                td2.appendChild(document.createTextNode(allCategories.result[i].name));
                tr.setAttribute("data-id",allCategories.result[i].id);                

                tr.appendChild(td1);
                tr.appendChild(td2);
                
                tableBody.appendChild(tr);
                
            }

            
        }       

    }

    
    goToInteraction(){  
        const trs =  document.querySelectorAll("tbody tr");
        
        for (const tr of trs) {            
            tr.addEventListener("click", (e)=>{            
                let id = tr.getAttribute("data-id");  
                
                window.location.href = `${config.urlBase}/src/views/admin/categories/interaction/?id=${id}&&prevPage=${this.currentPage}`;
                
         });          
            
        }
        
       
    }

    goToCategoryRegister(){
        document.querySelector("#register-categories-button").addEventListener("click",()=>{              
            window.location.href = `${config.urlBase}/src/views/admin/categories/register/?prevPage=${this.currentPage}`
        });
        
    }
    
}

const categories = new Categories();
categories.goToCategoryRegister();
await categories.showAll();
categories.goToInteraction();