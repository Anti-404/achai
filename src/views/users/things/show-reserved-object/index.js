import ModelCategories from '../../../../models/categories/index.js';
import ModelThings from '../../../../models/things/index.js';
import Controller from '../../../../core/controller/index.js';
import config from '../../../../../config.js';

import LayoutHeaderContent from '../../../components/headercontent/index.js';
import LayoutBreadcrumbs from '../../../components/breadcrumbs/index.js';

class ShowReservedThing extends Controller{   

    constructor(){  
        super()      ;
        this.modelCategories = new  ModelCategories();
        this.modelThings = new  ModelThings();
        this.identifier = this.retrieveURLId();                     

    }   

    async getThing(){            
        const thing = await this.modelThings.getReservedById(this.identifier);                           
        const category = await this.modelCategories.get(thing.result[0].category_id);         
        
        if(!thing.erro && !category.erro){            
            document.querySelector("#data-id").value = this.identifier;

            document.querySelector("#code").textContent = `N°: ${this.identifier}`;   
            
            document.querySelector("form img").setAttribute('src', `${config.urlBase}/${thing.result[0].image_address}`);            

            document.querySelector("#image-address").value = thing.result[0].image_address;                        

            document.querySelector("#category").value = category.result.name;

            document.querySelector("#category-id").value = thing.result[0].category_id;                        
            
            document.querySelector("#local").value = thing.result[0].local;

            document.querySelector("#description").value = thing.result[0].description;
            
            document.querySelector("#returned-status").value = thing.result[0].returned_status;
            
            document.querySelector("#date").value = thing.result[0].date;
            

        }else{
            alert(thing.erro);
        }        
        
    }   
    
    createHeaderContent(){
        const contentHeader = new LayoutHeaderContent();
        contentHeader.create(document.querySelector('header .container'), config.urlBase, false, false,true,true, false);
    }

    createBreadcrumbs(){
        const layoutBreadcrumbs = new LayoutBreadcrumbs();
        let ul = document.querySelector('.container .header-body ul.breadcrumb');
        const values = [];
        
        values.push( {name:'Tela inicial', href:config.urlBase}  );              
        values.push( {name:'Objeto reservado',  href:this.retrieveURLCurrentPage()}  );        

        layoutBreadcrumbs.create(ul, values);
    } 

    handleButtonInfo(){
        document.querySelector('.info-button').addEventListener('click',()=>{
            window.location.href = `${config.urlBase}/src/views/users/information`;
        });
    }

}

const showReservedThing = new ShowReservedThing();
await showReservedThing.getThing();
showReservedThing.createHeaderContent();
showReservedThing.createBreadcrumbs();
showReservedThing.handleButtonInfo();
