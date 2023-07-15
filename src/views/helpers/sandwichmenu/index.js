import config from '../../../../config.js';
import LayoutSandwichMenu from '../../components/sandwichmenu/index.js';
import HelperTabOrder from '../taborder/index.js';
import HelperFocusFrontModal from '../focusfrontmodal/index.js';

import tabOrderPanel from "../../admin/panel/taborder/index.js";
import tabOrderThingsRegister from "../../admin/things/register/taborder/index.js";
import tabOrderSandwichMenu from "../../components/sandwichmenu/taborder/index.js";

import tabOrderCategories from "../../admin/categories/taborder/index.js";
import tabOrderCategoriesRegister from "../../admin/categories/register/taborder/index.js";
import tabOrderProfile from "../../admin/profile/taborder/index.js";
import tabOrderThings from "../../admin/things/taborder/index.js";
import tabOrderDiscard from "../../admin/things/discard/taborder/index.js";
import tabOrderThingsInteraction from "../../admin/things/interaction/taborder/index.js";
import tabOrderManager from "../../admin/things/manager/taborder/index.js";
import tabOrderQrCodereader from "../../admin/things/qrcodereader/taborder/index.js";
import tabOrderReturned from "../../admin/things/returned/taborder/index.js";
import tabOrderThingTeserved from "../../admin/things/thingreserved/taborder/index.js";

class HelperSandwichMenu{
    static contentTagBodySave = [];

    constructor(){}

    static createSandwichMenu(){
        const layoutSandwichMenu = new LayoutSandwichMenu();
        layoutSandwichMenu.create(document.querySelector('.background-modal .container')); 
    }

    static openSandwichMenu(){ 
      
        HelperFocusFrontModal.saveChildrenBody();
        
        document.querySelector(".sandwich-menu-button").addEventListener("click",(e)=>{
            let searchModal = document.querySelector("#search-modal");
            let imgRegisterModal = document.querySelector("#img-register-modal");                   

            searchModal !== null && (document.querySelector("#search-modal").style.display = 'none');
            imgRegisterModal !== null && (document.querySelector("#img-register-modal").style.display = 'none');
            document.querySelector(".background-modal").style.display = 'block';           
            document.querySelector(".sandwich-menu-body").setAttribute("style","display:flex");
            
            let camModal = document.querySelector(".cam-modal");
            (camModal !== null) && (camModal.setAttribute("style","display:none"));
            
            HelperFocusFrontModal.clearBody(tabOrderSandwichMenu);
            
        });
               
    }

    static closeSandwichMenu(flagTabOrder='none'){
        document.querySelector(".sandwich-menu-body img[alt='Fechar menu']").addEventListener("click",(e)=>{           
            
            HelperFocusFrontModal.rebuilBody(tabOrderSandwichMenu);

            (flagTabOrder === 'panel') && HelperTabOrder.setTabOrder(tabOrderPanel);    
            (flagTabOrder === 'profile') && HelperTabOrder.setTabOrder(tabOrderProfile);    
            (flagTabOrder === 'things') && HelperTabOrder.setTabOrder(tabOrderThings);             
            (flagTabOrder === 'discard') && HelperTabOrder.setTabOrder(tabOrderDiscard);             
            (flagTabOrder === 'interaction') && HelperTabOrder.setTabOrder(tabOrderThingsInteraction);             
            (flagTabOrder === 'manager') && HelperTabOrder.setTabOrder(tabOrderManager);             
            (flagTabOrder === 'qrcodereader') && HelperTabOrder.setTabOrder(tabOrderQrCodereader);             
            (flagTabOrder === 'register') && HelperTabOrder.setTabOrder(tabOrderThingsRegister);             
            (flagTabOrder === 'returned') && HelperTabOrder.setTabOrder(tabOrderReturned);             
            (flagTabOrder === 'thingreserved') && HelperTabOrder.setTabOrder(tabOrderThingTeserved); 
            (flagTabOrder === 'categories') && HelperTabOrder.setTabOrder(tabOrderCategories); 
            (flagTabOrder === 'categoriesregister') && HelperTabOrder.setTabOrder(tabOrderCategoriesRegister); 

            let imgRegisterModal = document.querySelector("#img-register-modal");
            document.querySelector(".sandwich-menu-body").setAttribute("style","display:none");
            imgRegisterModal !== null && (document.querySelector("#img-register-modal").style.display = 'block');
            document.querySelector(".background-modal").style.display = 'none'; 

            
        });        
    }

    static goToDiscardeThings(){        

        document.querySelector(".discard-things-button").addEventListener("click",()=>{  

           window.location.href = `${config.urlBase}/src/views/admin/things/discard/`;

        });
        
    }

    static goToProfile(){        

        document.querySelector(".profile-button").addEventListener("click",()=>{  

           window.location.href = `${config.urlBase}/src/views/admin/profile/`;

        });
        
    }

    static goToReturnedThings(){
        document.querySelector(".returned-things-button").addEventListener("click",()=>{  

           window.location.href = `${config.urlBase}/src/views/admin/things/returned/`;

        });
        
    }

    static goToCategoryManager(){        
        
        document.querySelector(".category-manager-button").addEventListener("click",()=>{  

           window.location.href = `${config.urlBase}/src/views/admin/categories/`;

        });
        
    }


}

export default HelperSandwichMenu;