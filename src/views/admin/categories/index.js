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
                let button = document.createElement('button');
                let input = document.createElement('input');              

                input.setAttribute('value',allCategories.result[i].name);               
                input.setAttribute('class','category-name');               
                td1.appendChild(input);                
                button.appendChild(document.createTextNode('Delete'));                
                button.setAttribute('id','delete-button');
                td2.appendChild(button);
                
                
                tr.setAttribute("data-id",allCategories.result[i].id);                
                tr.appendChild(td1);                
                tr.appendChild(td2);                
                
                tableBody.appendChild(tr);
                
            }

            
        }       

    }

   
    goToCategoryRegister(){
        document.querySelector("#register-categories-button").addEventListener("click",()=>{              
            window.location.href = `${config.urlBase}/src/views/admin/categories/register/?prevPage=${this.currentPage}`
        });
        
    }

    delete(){        
        if(document.querySelector("#delete-button") === null) return;

        document.querySelector("#delete-button").addEventListener("click",(e)=>{            
            e.preventDefault();
            const id = e.target.parentNode.parentNode.getAttribute('data-id');
            const categoryName = document.querySelector('.category-name').value;

            let formData = new FormData();
            formData.append('id',id);
            formData.append('name',categoryName);
            
            if(localStorage.getItem("hash")){
                formData.append('hash',localStorage.getItem("hash"));
                
            } 
            
            this.modelCategories.delete(this.currentPage, id, formData); 
        });

        
    }

    update(){        
        
        if(document.querySelector(".category-name") === null) return;
        let allCategories = document.querySelectorAll('.category-name');

        for (let i = 0; i < allCategories.length; i++) {
            allCategories[i].addEventListener("blur",(e)=>{            
                        
                const id = e.target.parentNode.parentNode.getAttribute('data-id');
                const categoryName =  allCategories[i].value;
                    
                let formData = new FormData();
                formData.append('id',id);
                formData.append('name',categoryName);
                
                if(localStorage.getItem("hash")){
                    formData.append('hash',localStorage.getItem("hash"));
                    
                }
                
                this.modelCategories.update(this.currentPage,formData); 
                
                
            });            
        }       

    }
    
}

const categories = new Categories();
categories.goToCategoryRegister();
await categories.showAll();
categories.delete();
categories.update();