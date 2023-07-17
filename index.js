import ModelCategories from './src/models/categories/index.js';
import ModelThings from './src/models/things/index.js';

import LayoutThing from './src/views/components/thing/index.js';
import LayoutHeaderContent from './src/views/components/headercontent/index.js';
import LayoutCateogoriesList from './src/views/components/categories/index.js';
import LayoutBreadcrumbs from './src/views/components/breadcrumbs/index.js';
import LayoutFooter from "./src/views/components/footer/index.js";
import LayoutHelpInformation from "./src/views/components/helpinformation/index.js";

import HelperSearch from './src/views/helpers/search/index.js';
import HelperCategories from './src/views/helpers/categories/index.js';
import HelperStatusAllThingsRender from './src/views/helpers/statusallthingsrender/index.js';

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
                let spanIcon = document.createElement("img");                
                let span = document.createElement("span");                    
                
                if(allCategories.result[i].icon_name !== 'none' && allCategories.result[i].icon_name !== null){
                    spanIcon.setAttribute('class','material-symbols-rounded');                    
                    spanIcon.src = `${config.urlBase}/assets/imgs/icons/${allCategories.result[i].icon_name}`;
                                      
                    a.setAttribute("data-id",allCategories.result[i].id);                                                 
                    a.setAttribute("data-name",allCategories.result[i].name);                                                 
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
    
    async handleThingsByCategories(){                
        let categoriesLinks = document.querySelectorAll('.categories-list li');
        await HelperCategories.handleThingsByCategories(categoriesLinks);
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
        
    async thingsByFilters(){
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

                try{
                    HelperStatusAllThingsRender.statusAllThingsRender = false; 
                    thingsList.innerHTML = '';
                    let msg = await this.layoutThing.create(thingsList, allThings, true, path);
                    HelperStatusAllThingsRender.statusAllThingsRender = true;
                    console.log(`${msg} os objetos por filtros`);                    
                }catch(erro){
                    console.log('falha no engano da promisse: '+erro);
                }
                
        });
            
             

    }

    async filterThings(){
        let  thingsFilters = document.querySelectorAll(".filter-things span");                        
        
        thingsFilters.forEach((filter) => {
            filter.addEventListener('click', async ()=>{                    
                if(!HelperStatusAllThingsRender.statusAllThingsRender) return;

                document.querySelectorAll('.categories-list a img').forEach((img)=>{
                           
                    if(img.src.includes('headphones')){
                        img.src = `${config.urlBase}/assets/imgs/icons/headphones_FILL0_wght300_GRAD0_opsz40.svg`
                    }
                    if(img.src.includes('water_bottle')){
                        img.src = `${config.urlBase}/assets/imgs/icons/water_bottle_FILL0_wght300_GRAD0_opsz40.svg`
                    }
                    
                    if(img.src.includes('umbrella')){
                        img.src = `${config.urlBase}/assets/imgs/icons/umbrella_FILL0_wght300_GRAD0_opsz40.svg`
                    }     
                })

                let active =  document.querySelector('.active');                
                if(active !== null) document.querySelector('.active').removeAttribute('class')               
                
                for (let i = 0; i < thingsFilters.length; i++) {                    
                    thingsFilters[i].setAttribute('status','0');
                }
                filter.setAttribute('status','1');
                
                await this.thingsByFilters();                
                 
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
            document.querySelector('.banner').style.display = 'none';
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

    appendFooter(){
        let containerFooter = document.querySelector("footer .container");
        const layoutFooter  = new LayoutFooter();
        layoutFooter.create(containerFooter, config, true);        
        
    } 

    setImgBanner(){
        document.querySelector('.banner img').setAttribute('src',`${config.urlBase}/assets/imgs/imagem degradê.svg`);
    }

    createInformationBanner(){
        const layoutHelpInformation = new LayoutHelpInformation();
        let container = document.querySelector('.help-information');        
        layoutHelpInformation.create(container);        

        container.style.marginTop =  `${(document.querySelector('main .container .things-list').clientHeight)}px`;

    }

}

const home = new Home();
await home.createModalCategories();
await home.categoriesList();
home.createHeaderContent();
home.createBreadcrumbs();
home.handleThingsByCategoriesPanel();
await home.thingsList();
await home.filterThings();
home.handleButtonAllCategories();
home.handleButtonInfo();
home.appendFooter();
home.setImgBanner();
home.createInformationBanner();
await home.handleThingsByCategories();

HelperSearch.createModalSearch();
HelperSearch.searchItem();
HelperSearch.openSearchModal();
HelperSearch.closeSearchModal();

