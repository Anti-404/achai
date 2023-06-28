import ModelThings from '../../../../models/things/index.js';
import ModelCategories from '../../../../models/categories/index.js';
import Controller from '../../../../core/controller/index.js';
import config from '../../../../../config.js';
import LayoutThing from '../../../components/thing/index.js';

import LayoutHeaderContent from '../../../components/headercontent/index.js';
import LayoutModalSearch from '../../../components/modalsearch/index.js';
import LayoutSandwichMenu from '../../../components/sandwichmenu/index.js';
import LayoutCateogoriesList from '../../../components/categories/index.js';

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
        
        if (this.categoriesIdUrl !== undefined && this.categoriesIdUrl !== '0') {
            allThings = await this.modelThings.getThingsByCategoryId(this.categoriesIdUrl);            
        }else{
            allThings = await this.modelThings.getAll();            
        }

        let  thingsList = document.querySelector(".things-list");
        
        this.layoutThing.create(thingsList, allThings,true, 'admin/things/interaction');

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
        
        for (let i = 0; i < categoriesLinks.length; i++) {
            categoriesLinks[i].addEventListener('change',async(e)=>{                
                let categoriesId = e.target.value;  
               
                let allThings = {};

                if(categoriesId == "0"){
                    allThings = await this.modelThings.getAll();

                }else{
                    allThings = await this.modelThings.getThingsByCategoryId(categoriesId);                      
                }

                let thingsList = document.querySelector(".things-list");              

                thingsList.innerHTML = "";
                
                this.layoutThing.create(thingsList, allThings, true, 'admin/things/interaction');
            });
            
        }


    }
    
    async categoriesList(){ 

        let categories = document.querySelector('.categories');
        
        const layoutCateogoriesList = new  LayoutCateogoriesList();
        layoutCateogoriesList.create(categories);
             

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

    openSandwichMenu(){
        
        document.querySelector(".sandwich-menu-button").addEventListener("click",(e)=>{
            
            document.querySelector("#search-modal").style.display = 'none';
            document.querySelector(".background-modal").style.display = 'block';           
            document.querySelector(".sandwich-menu-body").setAttribute("style","display:block");            
            
        });
               
    }

    closeSandwichMenu(){
        document.querySelector(".close-modal").addEventListener("click",(e)=>{

            document.querySelector(".sandwich-menu-body").setAttribute("style","display:none");
            document.querySelector(".background-modal").style.display = 'none'; 
            
            
        });        
    }

    createHeaderContent(){
        const contentHeader = new LayoutHeaderContent();
        contentHeader.create(document.querySelector('header .container'), `${config.urlBase}/src/views/admin/panel/`, true, true,true);
    }

    createModalSearch(){
        const layoutModalSearch = new LayoutModalSearch();
        layoutModalSearch.create(document.querySelector('.background-modal .container'));
    }
    
    createSandwichMenu(){
        const layoutSandwichMenu = new LayoutSandwichMenu();
        layoutSandwichMenu.create(document.querySelector('.background-modal .container'));
    }


}

const thingsManager = new ThingsManager();
thingsManager.createSandwichMenu();
thingsManager.createHeaderContent();
thingsManager.createModalSearch();
await thingsManager.categoriesList();
await thingsManager.thingsList(); 
thingsManager.goToRegisterthing();
thingsManager.searchItem();
thingsManager.openSearchModal();
thingsManager.closeSearchModal();
thingsManager.handleChangeThingsByBategories();
thingsManager.openSandwichMenu();
thingsManager.closeSandwichMenu();