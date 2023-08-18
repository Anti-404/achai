import ModelThings from '../../../../models/things/index.js';
import ModelCategories from '../../../../models/categories/index.js';
import Controller from '../../../../core/controller/index.js';
import config from '../../../../../config.js';

import HelperSandwichMenu from '../../../helpers/sandwichmenu/index.js';
import HelperTabOrder from '../../../helpers/taborder/index.js';

import LayoutHeaderContent from '../../../components/headercontent/index.js';
import LayoutBreadcrumbs from '../../../components/breadcrumbs/index.js';
import LayoutFooter from '../../../components/footer/index.js';

import tabOrderThingReserved from "../../../admin/things/thingreserved/taborder/index.js";

class QRCode extends Controller{

    constructor(){  
        super();
        this.modelThings = new  ModelThings();
        this.modelCategories = new  ModelCategories();
        this.identifier = this.retrieveURLId();        
        
    }   

    async getThing(){  

        const thing = await this.modelThings.getReservedById(this.identifier); 
        const category = await this.modelCategories.get(thing.result[0].category_id); 
       
        if(!thing.erro && !category.erro){            
            document.querySelector("#data-id").value = this.identifier;

            document.querySelector("#code").textContent = `N°:${this.identifier}`;   
            
            document.querySelector("form img").setAttribute('src', `${config.urlBase}/${thing.result[0].image_address}`);            
            document.querySelector("form img").setAttribute('alt', `${thing.result[0].description}`);            

            document.querySelector("#image-address").value = thing.result[0].image_address;                        

            document.querySelector("#category").value = category.result.name;

            document.querySelector("#category-id").value = thing.result[0].category_id;                        
            
            document.querySelector("#local").value = thing.result[0].local;

            document.querySelector("#description").value = thing.result[0].description;
            
            document.querySelector("#returned-status").value = thing.result[0].returned_status;
            
            document.querySelector("#reserved-status").value = thing.result[0].reserved_status;
            
            document.querySelector("#date").value = thing.result[0].date;
            

        }else{
            alert(thing.erro);
        }         
    }

    unDisabled(){
        const disabledFields =  document.querySelectorAll('[disabled]');
        disabledFields.forEach((item)=>{
            item.removeAttribute('disabled');
        });
    }

    async return(){

        document.querySelector("#return-button").addEventListener("click", async (e)=>{  
            e.preventDefault();
            this.unDisabled();

            let formData = new FormData(document.querySelector("#first-form"));

            if(localStorage.getItem("hash")){
                formData.append('hash',localStorage.getItem("hash"));                
            }

            formData.append('returned_status','1');  
            document.querySelector("#return-button").setAttribute('disabled','');
            document.querySelector("#return-button").textContent = "Retirando...";               
            await this.modelThings.update(`${config.urlBase}/src/views/admin/panel/`,formData,'Retirado'); 
        });

    }

    async undoReserve(){

        document.querySelector("#undo-reserve-button").addEventListener("click", async (e)=>{  
            e.preventDefault();  
            this.unDisabled();          

            let formData = new FormData(document.querySelector("#first-form"));

            if(localStorage.getItem("hash")){
                formData.append('hash',localStorage.getItem("hash"));                
            }

              
            formData.set('reserved_status','0'); 
            document.querySelector("#undo-reserve-button").textContent = "Retirando reserva...";
            
            await this.modelThings.update(`${config.urlBase}/src/views/admin/panel/`,formData,'Reserva retirada'); 
        });

    }

    async createHeaderContent(){
        const contentHeader = new LayoutHeaderContent();
        await contentHeader.create(document.querySelector('header .container'), `${config.urlBase}/src/views/admin/panel/`, false, true, true, false);
    }
    
    createBreadcrumbs(){
        const layoutBreadcrumbs = new LayoutBreadcrumbs();
        let ul = document.querySelector('.container .header-body ul.breadcrumb');
        const values = [];
        
        values.push( {name:'Tela inicial', href:`${config.urlBase}/src/views/admin/panel/`}  );
        values.push( {name:'Retirar objeto', href:this.retrieveURLCurrentPage()}  );
        
        layoutBreadcrumbs.create(ul, values);        

    }

    arrowBack(){
        let arrowButton = document.querySelector('.arrow-button');
        arrowButton.addEventListener('click',()=>{
            
            window.location.href = `${config.urlBase}/src/views/admin/panel/`;                
            
        });
    }

    setTabOrder(){                  
        // HelperTabOrder.resetTabOrder(tabOrderThingReserved);        
        HelperTabOrder.setTabOrder(tabOrderThingReserved);
    }

    appendFooter(){
        let containerFooter = document.querySelector("footer .container");
        const layoutFooter  = new LayoutFooter();
        layoutFooter.create(containerFooter, config, true);        
        
    }
    

}   

const qrcode = new QRCode();
await qrcode.createHeaderContent();
qrcode.createBreadcrumbs();
await qrcode.getThing();
await qrcode.return();
await qrcode.undoReserve();
qrcode.arrowBack();
qrcode.appendFooter();
qrcode.setTabOrder();

HelperSandwichMenu.createSandwichMenu();
HelperSandwichMenu.goToProfile();
HelperSandwichMenu.goToDiscardeThings();
HelperSandwichMenu.goToCategoryManager();
HelperSandwichMenu.openSandwichMenu();
HelperSandwichMenu.closeSandwichMenu('thingreserved');
// HelperSandwichMenu.goToReturnedThings();
