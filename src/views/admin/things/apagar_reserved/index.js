import ModelThings from '../../../../models/things/index.js';
import ModelCategories from '../../../../models/categories/index.js';
import Controller from '../../../../core/controller/index.js';
import config from '../../../../../config.js';

class ThingsReserved extends Controller{    

    constructor(){  
        super()      ;
        this.modelCategories = new  ModelCategories();
        this.modelThings = new  ModelThings();
        this.identifier = this.retrieveURLId();
        this.prevPage = this.getPrevPageURL();
        this.currentPage = this.retrieveURLCurrentPage();        

    }   

    async getThing(){  
        
        const thing = await this.modelThings.getReservedById(this.identifier); 
        
        if(!thing.erro){            
            document.querySelector("#data-id").value = this.identifier;            
            
            document.querySelector("form img").setAttribute('src', `${config.urlBase}/${thing.result[0].image_address}`);            

            document.querySelector("#image-address").value = thing.result[0].image_address;

            await this.selectCategories(thing.result[0].category_id);            
            
            document.querySelector("#local").value = thing.result[0].local;

            document.querySelector("#description").value = thing.result[0].description;
                        
            document.querySelector("#returned-status").value = thing.result[0].returned_status;
            
            document.querySelector("#reserved-status").value = thing.result[0].reserved_status;
            
                       

        }else{
            alert(thing.erro);
        }        
    }

    async selectCategories(categoryId){   
        
        const listCategories = document.querySelector("#list-categories");
        const allCategories = await this.modelCategories.getAll();
        
        if(!allCategories.error){                        
            for (let i = 0; i < allCategories.result.length; ++i) {  
                let option = document.createElement("option"); 
                option.setAttribute("value",allCategories.result[i].id);              
                option.appendChild(document.createTextNode(allCategories.result[i].name));
                listCategories.appendChild(option);                 
            }           
            
       } 
        
               
        let category = await this.modelCategories.get(categoryId);   

        if(!category.erro){
            
            const options = document.querySelector("#list-categories").options;
            for (let i = 0; i < options.length; i++) {
                if(options[i].value == category.result.id){
                    options[i].selected = true;
                }                
            }
        }else{
            alert(category.erro);
        }        

        
    } 
    

    goToCategoryRegistration(){                                                                                                                         
        document.querySelector("#register-categories-button").addEventListener("click",(e)=>{            
            e.preventDefault();            
            localStorage.setItem("redirProdReg", this.currentPage); 
            
            
            localStorage.setItem("imageAddress", document.getElementById("image-address").value); 
            localStorage.setItem("local", document.getElementById("local").value); 
            localStorage.setItem("description", document.getElementById("description").value); 
            
            window.location.href = `http://localhost/smd/projeto/src/views/admin/categories/internalscreens/register/?prevPage=${this.currentPage}`;            

        });
    } 

    async return(){

        document.querySelector("#return-button").addEventListener("click",(e)=>{  
            e.preventDefault();

            let formData = new FormData(document.querySelector('form'));  
            formData.set('returned_status','1');
            
            if(localStorage.getItem("hash")){
                formData.append('hash',localStorage.getItem("hash"));
                
            }
            
            this.modelThings.update( this.prevPage, formData, 'Retirado'); 
        });

    }


}

const thingsReserved = new ThingsReserved();
thingsReserved.getThing();
thingsReserved.goToCategoryRegistration();
thingsReserved.return();
