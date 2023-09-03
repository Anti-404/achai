import ModelCategories from '../../../../models/categories/index.js';
import Controller from '../../../../core/controller/index.js';

import HelperSandwichMenu from '../../../helpers/sandwichmenu/index.js';

import LayoutHeaderContent from '../../../components/headercontent/index.js';
import LayoutBreadcrumbs from '../../../components/breadcrumbs/index.js';
import LayoutFooter from '../../../components/footer/index.js';

import config from '../../../../../config.js';

import HelperTabOrder from '../../../helpers/taborder/index.js';

import tabOrderCategoriesRegister from "./taborder/index.js";

class CategoriesInteraction extends Controller{    

    constructor(){        
        super();
        this.modelCategories = new  ModelCategories();
        this.prevPage = `${config.urlBase}/src/views/admin/categories/`;     
        this.identifier = this.retrieveURLId();     
    }

    async getCategory(){  
        
        const category = await this.modelCategories.get(this.identifier);

        if(!category.erro){            
            document.querySelector("#data-id").value = this.identifier;                        
            document.querySelector("#name").value = category.result.name;

        }else{
            alert(thing.erro);
        }        
    }

    async update(){        
        document.querySelector("#update-button").addEventListener("click", async (e)=>{ 
            e.preventDefault();
            let formData = new FormData(document.querySelector('form'));
            
            if(localStorage.getItem("hash")){
                formData.append('hash',localStorage.getItem("hash"));
                
            }           
            
            document.querySelector("#update-button").setAttribute('disabled','')
            document.querySelector("#update-button").textContent = "Atualizando...";
            await this.modelCategories.update(this.prevPage, formData);  
            document.querySelector("#update-button").removeAttribute('disabled')
            document.querySelector("#update-button").textContent = "Atualizar";       
            
        
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
        values.push( {name:'Gerenciar categorias', href:`${config.urlBase}/src/views/admin/categories/`}  );
        values.push( {name:'Editar categorias', href:this.retrieveURLCurrentPage()}  );
        
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

    setTabOrder(){                       
        HelperTabOrder.setTabOrder(tabOrderCategoriesRegister);
    }

    enableButton(){      
           
        document.querySelector(`#name`).addEventListener("keyup",()=>{
            document.querySelector("#update-button").removeAttribute("disabled");  
        });  

        
        

    } 
    

}

const categoriesInteraction = new CategoriesInteraction();
categoriesInteraction.createHeaderContent();
categoriesInteraction.createBreadcrumbs();
await categoriesInteraction.update();
//categoriesInteraction.focusNameField();
categoriesInteraction.arrowBack();
categoriesInteraction.appendFooter();
categoriesInteraction.getCategory();
categoriesInteraction.setTabOrder();
categoriesInteraction.enableButton();

HelperSandwichMenu.createSandwichMenu();
HelperSandwichMenu.goToProfile();
HelperSandwichMenu.goToDiscardeThings();
HelperSandwichMenu.goToCategoryManager();
HelperSandwichMenu.openSandwichMenu();
HelperSandwichMenu.closeSandwichMenu('categoriesregister');