import ModelThings from '../../../../models/things/index.js';
import ModelCategories from '../../../../models/categories/index.js';
import Controller from '../../../../core/controller/index.js';
import config from '../../../../../config.js';

import HelperSandwichMenu from '../../../helpers/sandwichmenu/index.js';

import LayoutHeaderContent from '../../../components/headercontent/index.js';

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

    return(){

        document.querySelector("#return-button").addEventListener("click",(e)=>{  
            e.preventDefault();
            this.unDisabled();

            let formData = new FormData(document.querySelector("#first-form"));

            if(localStorage.getItem("hash")){
                formData.append('hash',localStorage.getItem("hash"));                
            }

            formData.append('returned_status','1');                  
            this.modelThings.update(`${config.urlBase}/src/views/admin/panel/`,formData,'Retirado'); 
        });

    }

    createHeaderContent(){
        const contentHeader = new LayoutHeaderContent();
        contentHeader.create(document.querySelector('header .container'), `${config.urlBase}/src/views/admin/panel/`, false, true, true);
    } 
    

}   

const qrcode = new QRCode();
qrcode.createHeaderContent();
await qrcode.getThing();
qrcode.return();

HelperSandwichMenu.createSandwichMenu();
HelperSandwichMenu.goToProfile();
HelperSandwichMenu.goToDiscardeThings();
HelperSandwichMenu.goToCategoryManager();
HelperSandwichMenu.openSandwichMenu();
HelperSandwichMenu.closeSandwichMenu();
// HelperSandwichMenu.goToReturnedThings();
HelperSandwichMenu.exit();
