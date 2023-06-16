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

        document.querySelector("#delete-button").addEventListener("click",async (e)=>{            
            e.preventDefault();
            const id = e.target.parentNode.parentNode.getAttribute('data-id');
            const categoryName = document.querySelector('.category-name').value;

            let formData = new FormData();
            formData.append('id',id);
            formData.append('name',categoryName);
            
            if(localStorage.getItem("hash")){
                formData.append('hash',localStorage.getItem("hash"));
                
            } 
                       

            let msg = await this.modelCategories.delete(this.currentPage, id, formData); 
            
            
            let div = document.createElement('div');        
            div.textContent = msg;       

            div.setAttribute('class','success-message');   
            div.style.display = 'block';             
            document.querySelector('main .container').appendChild(div);

            setInterval(() =>{            
                if(div.parentNode !== null){            
                    div.parentNode.removeChild(div);
                    window.location.href = this.currentPage;
                }
                
                clearInterval(this);                
            },3000);
            
            

            });
            
            
    }

    async updateAssistant(id, categoryName){
          
        let formData = new FormData();
        formData.append('id',id);
        formData.append('name',categoryName);
        
        if(localStorage.getItem("hash")){
            formData.append('hash',localStorage.getItem("hash"));
            
        }
        let msg = await this.modelCategories.update(this.currentPage,formData); 

        let div = document.createElement('div');        
        div.textContent = msg;       

        div.setAttribute('class','success-message');   
        div.style.display = 'block';             
        document.querySelector('main .container').appendChild(div);

        setInterval(() =>{            
            if(div.parentNode !== null){            
                div.parentNode.removeChild(div);
            }
            
            clearInterval(this);
        },3000);
               
        
        
    }

    update(){        
        
        if(document.querySelector(".category-name") === null) return;
        let allCategories = document.querySelectorAll('.category-name');
        
        for (let i = 0; i < allCategories.length; i++) {              

            allCategories[i].addEventListener("keyup",async (e)=>{                 
                let key = e.which || e.keyCode;
                if (key == 13) { 
                    const id = e.target.parentNode.parentNode.getAttribute('data-id'); 
                    this.updateAssistant(id, allCategories[i].value); 
                    e.target.blur();                   
                }
                
            });
            
            
        }       

    }   
   
    
}

const categories = new Categories();
categories.goToCategoryRegister();
await categories.showAll();
categories.delete();
categories.update();