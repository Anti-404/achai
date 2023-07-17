import ModelThings from '../../../../models/things/index.js';
import ModelCategories from '../../../../models/categories/index.js';
import Controller from '../../../../core/controller/index.js';
import config from '../../../../../config.js';

import LayoutThing from '../../../components/thing/index.js';
import LayoutHeaderContent from '../../../components/headercontent/index.js';
import LayoutModalSearch from '../../../components/modalsearch/index.js';
import LayoutCateogoriesList from '../../../components/categories/index.js';
import LayoutBreadcrumbs from '../../../components/breadcrumbs/index.js';
import LayoutFooter from '../../../components/footer/index.js';

import HelperCategories from '../../../helpers/categories/index.js';
import HelperSandwichMenu from '../../../helpers/sandwichmenu/index.js';
import HelperTabOrder from '../../../helpers/taborder/index.js';

import tabOrderManager from "../../../admin/things/manager/taborder/index.js";

class ThingsManager extends Controller{

    constructor(){    
        super();
        this.modelThings = new  ModelThings();
        this.modelCategories = new  ModelCategories();        
        this.currentPage = this.retrieveURLCurrentPage();       
        this.categoriesIdUrl = this.retrieveURLId();
        this.layoutThing = new LayoutThing();         
    }
    
    
    async thingsList(){

        let allThings = {};
        
        if (this.categoriesIdUrl !== undefined && this.categoriesIdUrl !== '87') {
            allThings = await this.modelThings.getThingsByCategoryId(this.categoriesIdUrl);            
        }else{
            allThings = await this.modelThings.getAll();            
        }

        let  thingsList = document.querySelector(".things-list");
        
        await this.layoutThing.create(thingsList, allThings,true, 'admin/things/interaction');

    }
        
    goToRegisterthing(){
        document.querySelector("#register-things-button").addEventListener("click",(e)=>{            
            e.preventDefault();              
            let currentPage = this.currentPage.split('?')[0];
            window.location.href = `${config.urlBase}/src/views/admin/things/register/?prevPage=${currentPage}`;           
            
        });
        
    }   

    handleChangeThingsByBategories(){
        if(document.querySelectorAll('#categories-list') === null) return;
        let categoriesLinks = document.querySelectorAll('#categories-list');

        HelperCategories.handleChangeThingsByCategories(categoriesLinks);
    }
    
    async categoriesList(){ 

        let categories = document.querySelector('.categories');
        
        const layoutCateogoriesList = new  LayoutCateogoriesList();
        await layoutCateogoriesList.create(categories);             

    } 
          
    searchItem(){       
        let searchItem = document.querySelector('.search-item');

        if(searchItem == null){
            return;
        }

        searchItem.addEventListener('keyup',()=>{
            let input = document.querySelector('.search-item').value
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
        document.querySelector('header .container div .search-button').addEventListener('click',()=>{
            document.querySelector('body .background-modal').style.display = 'block';
            document.querySelector("#search-modal").style.display = 'block';
            document.querySelector(".sandwich-menu-body").style.display = 'none';            
            document.querySelector('.search-bar-modal .search-item').focus();            
        });
     }

    closeSearchModal(){
        document.querySelector('#search-modal .search-bar-modal .search-item').addEventListener('blur',(event)=>{           
           document.querySelector('#search-modal .search-bar-modal .search-item').value = '';
           document.querySelector('body .background-modal').style.display = 'none';
            
        });        
    }
    
    createHeaderContent(){
        const contentHeader = new LayoutHeaderContent();
        contentHeader.create(document.querySelector('header .container'), `${config.urlBase}/src/views/admin/panel/`, true, true,true,false);
    }

    createModalSearch(){
        const layoutModalSearch = new LayoutModalSearch();
        layoutModalSearch.create(document.querySelector('.background-modal .container'));
    }    
    

    createBreadcrumbs(){
        const layoutBreadcrumbs = new LayoutBreadcrumbs();
        let ul = document.querySelector('.container .header-body ul.breadcrumb');
        const values = [];
        
        values.push( {name:'Tela inicial', href:`${config.urlBase}/src/views/admin/panel/`}  );
        values.push( {name:'Gerenciar Objetos', href: `${config.urlBase}/src/views/admin/things/`}  );       
        values.push( {name:'Objetos filtrados', href:this.retrieveURLCurrentPage()}  );        

        layoutBreadcrumbs.create(ul, values);
    }

    arrowBack(){
        let arrowButton = document.querySelector('.arrow-button');
        arrowButton.addEventListener('click',()=>{
            
            window.location.href = `${config.urlBase}/src/views/admin/things/`;                
            
        });
    }

    appendFooter(){
        let containerFooter = document.querySelector("footer .container");
        const layoutFooter  = new LayoutFooter();
        layoutFooter.create(containerFooter, config, true);        
        
    } 
    
    appendRegisterThingsButton(){
       let headerFooter = document.querySelector(".header-footer");
       
       let button = document.createElement('button'); 
       button.setAttribute('id','register-things-button');       
       
       let img = document.createElement('img');  
       img.src = `${config.urlBase}/assets/imgs/icons/add_FILL0_wght300_GRAD0_opsz40.svg`
       img.alt = 'Cadastrar objeto'

       button.appendChild(img)
       headerFooter.appendChild(button);        
    } 

    setTabOrder(){
        const elementsList = tabOrderManager;                
        HelperTabOrder.setTabOrder(elementsList);
    }
}

const thingsManager = new ThingsManager();
thingsManager.createHeaderContent();
thingsManager.createBreadcrumbs();
thingsManager.createModalSearch();
await thingsManager.categoriesList();
await thingsManager.thingsList(); 
thingsManager.appendRegisterThingsButton();
thingsManager.goToRegisterthing();
thingsManager.searchItem();
thingsManager.openSearchModal();
thingsManager.closeSearchModal();
thingsManager.handleChangeThingsByBategories();
thingsManager.arrowBack();
thingsManager.appendFooter();
thingsManager.setTabOrder();

HelperSandwichMenu.createSandwichMenu();
HelperSandwichMenu.goToProfile();
HelperSandwichMenu.goToDiscardeThings();
HelperSandwichMenu.goToCategoryManager();
HelperSandwichMenu.openSandwichMenu();
HelperSandwichMenu.closeSandwichMenu('manager');