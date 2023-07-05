import ModelCategories from './src/models/categories/index.js';
import ModelThings from './src/models/things/index.js';

import LayoutThing from './src/views/components/thing/index.js';
import LayoutHeaderContent from './src/views/components/headercontent/index.js';
import LayoutCateogoriesList from './src/views/components/categories/index.js';
import LayoutBreadcrumbs from './src/views/components/breadcrumbs/index.js';

import HelperSearch from './src/views/helpers/search/index.js';
import HelperCategories from './src/views/helpers/categories/index.js';

import config from './config.js';

class Home {
    constructor(){
        this.modelCategories = new ModelCategories();               
        this.modelThings = new ModelThings();  
        this.layoutThing = new LayoutThing();                      
    }

    async categoriesList(){         
        let ul = document.querySelector(".categories-list");
        const allCategories = await this.modelCategories.getAll();
        
        if(!allCategories.error){                        
            for (let i = 0; i < allCategories.result.length; ++i) {  
                let li = document.createElement("li"); 
                let a = document.createElement("a");                
                let spanIcon = document.createElement("span");                
                let span = document.createElement("span");                    
                
                if(allCategories.result[i].icon_name !== null){
                    spanIcon.setAttribute('class','material-symbols-rounded');                    
                    spanIcon.style.backgroundImage = `url(${config.urlBase}/assets/imgs/icons/${allCategories.result[i].icon_name})`;
                    spanIcon.style.backgroundRepeat = `no-repeat`;
                    spanIcon.style.backgroundPosition = `center`;                    
                    a.setAttribute("data-id",allCategories.result[i].id);                                                 
                    span.textContent = allCategories.result[i].name;

                    if(/Todas/.test(span.textContent)){
                        a.setAttribute('id', 'all-categories');
                    }  
                    a.appendChild(spanIcon); 
                    li.appendChild(a);
                    li.appendChild(span); 
                    ul.appendChild(li);
                }

                                 
            }           
            
       }    
             
            
    }
    
    handleThingsByCategories(){
        let categoriesLinks = document.querySelectorAll('.categories-list li a');
        HelperCategories.handleThingsByCategories(categoriesLinks);
    }

    handleThingsByCategoriesPanel(){
        let categoriesLinks = document.querySelectorAll('.categories-list-panel li a');
        HelperCategories.handleThingsByCategoriesModal(categoriesLinks);
    }
    
    async thingsList(){
        
        const allThings = await this.modelThings.getAll();           
        
        let  thingsList = document.querySelector(".things-list");
        
        this.layoutThing.create(thingsList, allThings, true, 'users/things/show-object');

    }
        
    thingsByFilters(){
            let  allThings = {erro:'', result:''};           
            let  thingsFilters = document.querySelectorAll(".filter-things span");                        
            let  thingsList = document.querySelector(".things-list");

            thingsFilters.forEach(async(filter, index) => {
                let status = filter.getAttribute('status');
                let path = '';                
                if (status == "1") {              
                
                    switch (index) {                        
                        case 0:                                                       
                            allThings = await this.modelThings.getAll(); 
                            path =  'users/things/show-object';                                                     
                            break;

                        case 1:                            
                            allThings = await this.modelThings.getThingsReserved();  
                            path =  'users/things/show-reserved-object';                                                      
                            break;                       
                    
                        default:
                            break;
                    }
                }

                thingsList.innerHTML = '';

                this.layoutThing.create(thingsList, allThings, true, path);
                
        });
            
             

    }

    filterThings(){
        let  thingsFilters = document.querySelectorAll(".filter-things span");                        
        
        thingsFilters.forEach((filter) => {
            filter.addEventListener('click', ()=>{
                let active =  document.querySelector('.active');                
                if(active !== null) document.querySelector('.active').removeAttribute('class')               
                
                for (let i = 0; i < thingsFilters.length; i++) {                    
                    thingsFilters[i].setAttribute('status','0');
                }
                filter.setAttribute('status','1');
                this.thingsByFilters();
            });
        });

    }    
  
    createHeaderContent(){
        const contentHeader = new LayoutHeaderContent();
        contentHeader.create(document.querySelector('header .container'), config.urlBase, true, false, true, true, false);
        
    }

    async createModalCategories(){
        let container = document.querySelector('main .container');
        const layoutCateogoriesList = new LayoutCateogoriesList();
        await layoutCateogoriesList.createPanel(container);
    }

    handleButtonAllCategories(){
        let btnAllCategories = document.querySelector('#all-categories');
        btnAllCategories.addEventListener('click',()=>{
            document.querySelector('.categories-panel-modal').style.display = 'block';
            document.querySelector('.header-top-body .search-button').style.display = 'none';
            document.querySelector('.container-header').style.display = 'none';
            document.querySelector('main .container .things-list').style.display = 'none';
            document.querySelector('ul.breadcrumb').style.display = 'block';
        });
    }
    

    createBreadcrumbs(){
        const layoutBreadcrumbs = new LayoutBreadcrumbs();
        let ul = document.querySelector('.container .header-body ul.breadcrumb');
        const values = [];
        
        values.push( {name:'Tela inicial', href:`${config.urlBase}`}  );
        values.push( {name:'Todas as categorias', href:'#'}  );
        
        layoutBreadcrumbs.create(ul, values);        

    }
    

    handleButtonInfo(){
        document.querySelector('.info-button').addEventListener('click',()=>{
            window.location.href = `${config.urlBase}/src/views/users/information`;
        });
    }

}

const home = new Home();
await home.createModalCategories();
await home.categoriesList();
home.createHeaderContent();
home.createBreadcrumbs();
home.handleThingsByCategories();
home.handleThingsByCategoriesPanel();
await home.thingsList();
home.filterThings();
home.handleButtonAllCategories();
home.handleButtonInfo();

HelperSearch.createModalSearch();
HelperSearch.searchItem();
HelperSearch.openSearchModal();
HelperSearch.closeSearchModal();

