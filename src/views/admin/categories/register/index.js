import ModelCategories from '../../../../models/categories/index.js';
import Controller from '../../../../core/controller/index.js';

class CategoriesRegistration extends Controller{

    constructor(){        
        super();
        this.modelCategories = new  ModelCategories();
        this.prevPage = this.getPrevPageURL();        
    }
    save(){        
        document.querySelector("#save-button").addEventListener("click", (e)=>{ 
            e.preventDefault();
            let formData = new FormData(document.querySelector('form'));
            
            if(localStorage.getItem("hash")){
                formData.append('hash',localStorage.getItem("hash"));
                
            }             
                         
            this.modelCategories.insert(this.prevPage, formData);           
        
       });
    }

    
    getPrevPageURL(){
        let url = this.retrieveURLCurrentPage();
        let prevPage = '';
 
        
        if(url.indexOf('prevPage=') != '-1'){

            let urlBreak = url.split('prevPage=');            
            prevPage = urlBreak[1];
            
            if(urlBreak.length >= 3){                
              prevPage = `${urlBreak[1]}prevPage=${urlBreak[2]}`;  
           }
        }
              
        
        return prevPage;
    }

    focusNameField(){
        document.querySelector('#name').focus();
    }
    

}

const categoriesRegistration = new CategoriesRegistration();
categoriesRegistration.save();

categoriesRegistration.focusNameField();