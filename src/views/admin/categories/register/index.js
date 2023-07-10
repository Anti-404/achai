import ModelCategories from '../../../../models/categories/index.js';
import Controller from '../../../../core/controller/index.js';

import HelperSandwichMenu from '../../../helpers/sandwichmenu/index.js';

import LayoutHeaderContent from '../../../components/headercontent/index.js';
import LayoutBreadcrumbs from '../../../components/breadcrumbs/index.js';
import LayoutFooter from '../../../components/footer/index.js';

import config from '../../../../../config.js';

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

    createHeaderContent(){
        const contentHeader = new LayoutHeaderContent();
        contentHeader.create(document.querySelector('header .container'), `${config.urlBase}/src/views/admin/panel/`, 
        false, true, true, false);
    }

    createBreadcrumbs(){
        const layoutBreadcrumbs = new LayoutBreadcrumbs();
        let ul = document.querySelector('.container .header-body ul.breadcrumb');
        const values = [];
        
        values.push( {name:'Tela inicial', href:`${config.urlBase}/src/views/admin/panel/`}  );
        values.push( {name:'Editar categorias', href:`${config.urlBase}/src/views/admin/categories/`}  );
        values.push( {name:'Cadastrar categorias', href:this.retrieveURLCurrentPage()}  );
        
        layoutBreadcrumbs.create(ul, values);        

    }

    arrowBack(){
        let arrowButton = document.querySelector('.arrow-button');
        arrowButton.addEventListener('click',()=>{
            
            window.location.href = `${config.urlBase}/src/views/admin/categories/`;                
            
        });
    }

    appendFooter(){
        let containerFooter = document.querySelector("footer .container");
        const layoutFooter  = new LayoutFooter();
        layoutFooter.create(containerFooter, config, true);        
        
    } 
    

}

const categoriesRegistration = new CategoriesRegistration();
categoriesRegistration.createHeaderContent();
categoriesRegistration.createBreadcrumbs();
categoriesRegistration.save();
categoriesRegistration.focusNameField();
categoriesRegistration.arrowBack();
categoriesRegistration.appendFooter();

HelperSandwichMenu.createSandwichMenu();
HelperSandwichMenu.goToProfile();
HelperSandwichMenu.goToDiscardeThings();
HelperSandwichMenu.goToCategoryManager();
HelperSandwichMenu.openSandwichMenu();
HelperSandwichMenu.closeSandwichMenu();