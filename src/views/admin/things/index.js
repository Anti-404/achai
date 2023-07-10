import ModelCategories from '../../../models/categories/index.js';
import Controller from '../../../core/controller/index.js';
import config from '../../../../config.js';

import HelperSandwichMenu from '../../helpers/sandwichmenu/index.js';

import LayoutHeaderContent from '../../components/headercontent/index.js';
import LayoutBreadcrumbs from '../../components/breadcrumbs/index.js';
import LayoutFooter from '../../components/footer/index.js';

class Things extends Controller{

    constructor(){    
        super();        
        this.modelCategories = new  ModelCategories();        
        this.currentPage = this.retrieveURLCurrentPage();       
    }
    
    createLayouCategoryComponent(container, allCategories){

        if(allCategories.error !== '') return;
                    
        for (let i = 0; i < allCategories.result.length; ++i) { 
            if(allCategories.result[i].name !== 'Todas') { 
                let li = document.createElement("li"); 
                let a = document.createElement("a");                
                a.setAttribute("data-id",allCategories.result[i].id);                                
                a.appendChild(document.createTextNode((allCategories.result[i].name)));
                li.appendChild(a);
                container.appendChild(li);                 
            }
        }

    }
    
    async categoriesList(){         
        let ul = document.querySelector("#categories-list");
        const allCategories = await this.modelCategories.getAll();
        
        this.createLayouCategoryComponent(ul, allCategories)
            
    } 
    
    handleClickCategory(){
        
        document.querySelector("#categories-list").addEventListener("click", async (e)=>{      
            
            let categoryId = e.target.getAttribute('data-id');           

            window.location.href = `${config.urlBase}/src/views/admin/things/manager/?id=${categoryId}`;            
            
        }); 
    }

    createHeaderContent(){
        const contentHeader = new LayoutHeaderContent();
        contentHeader.create(document.querySelector('header .container'), `${config.urlBase}/src/views/admin/panel/`, false, true, true, false);
    } 

    createBreadcrumbs(){
        const layoutBreadcrumbs = new LayoutBreadcrumbs();
        let ul = document.querySelector('.container .header-body ul.breadcrumb');
        const values = [];
        
        values.push( {name:'Tela inicial', href:`${config.urlBase}/src/views/admin/panel/`}  );
        values.push( {name:'Gerenciar objetos', href:this.retrieveURLCurrentPage()}  );
        
        layoutBreadcrumbs.create(ul, values);        

    }

    arrowBack(){
        let arrowButton = document.querySelector('.arrow-button');
        arrowButton.addEventListener('click',()=>{
            
            window.location.href = `${config.urlBase}/src/views/admin/panel/`;                
            
        });
    }

    appendFooter(){
        let containerFooter = document.querySelector("footer .container");
        const layoutFooter  = new LayoutFooter();
        layoutFooter.create(containerFooter, config, true);        
        
    }

}

const things = new Things();
things.createHeaderContent();
things.createBreadcrumbs();
things.arrowBack();
things.appendFooter();

things.categoriesList();
things.handleClickCategory();
// things.goToRegisterthing();


HelperSandwichMenu.createSandwichMenu();
HelperSandwichMenu.goToProfile();
HelperSandwichMenu.goToDiscardeThings();
HelperSandwichMenu.goToCategoryManager();
HelperSandwichMenu.openSandwichMenu();
HelperSandwichMenu.closeSandwichMenu();
// HelperSandwichMenu.goToReturnedThings();
