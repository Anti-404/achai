import config from '../../../../config.js';
import LayoutSandwichMenu from '../../components/sandwichmenu/index.js';

class HelperSandwichMenu{
    constructor(){}

    static createSandwichMenu(){
        const layoutSandwichMenu = new LayoutSandwichMenu();
        layoutSandwichMenu.create(document.querySelector('.background-modal .container'));
        
        
    }

    static openSandwichMenu(){
        
        document.querySelector(".sandwich-menu-button").addEventListener("click",(e)=>{
            let searchModal = document.querySelector("#search-modal");
            let imgRegisterModal = document.querySelector("#img-register-modal");

            searchModal !== null && (document.querySelector("#search-modal").style.display = 'none');
            imgRegisterModal !== null && (document.querySelector("#img-register-modal").style.display = 'none');
            document.querySelector(".background-modal").style.display = 'block';           
            document.querySelector(".sandwich-menu-body").setAttribute("style","display:flex");
            
            let camModal = document.querySelector(".cam-modal");
            (camModal !== null) && (camModal.setAttribute("style","display:none"));
            
            
            
        });
               
    }

    static closeSandwichMenu(){
        document.querySelector(".close-modal").addEventListener("click",(e)=>{
            let imgRegisterModal = document.querySelector("#img-register-modal");

            document.querySelector(".sandwich-menu-body").setAttribute("style","display:none");
            imgRegisterModal !== null && (document.querySelector("#img-register-modal").style.display = 'block');
            document.querySelector(".background-modal").style.display = 'none'; 
            
            
        });        
    }

    static goToDiscardeThings(){
        // if(document.querySelector(".discard-things-button") === null) return;

        document.querySelector(".discard-things-button").addEventListener("click",()=>{  

           window.location.href = `${config.urlBase}/src/views/admin/things/discard/`;

        });
        
    }

    static goToProfile(){
        // if(document.querySelector(".profile-button") === null) return;

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
        // if(document.querySelector(".category-manager-button") === null) return;
        
        document.querySelector(".category-manager-button").addEventListener("click",()=>{  

           window.location.href = `${config.urlBase}/src/views/admin/categories/`;

        });
        
    }


}

export default HelperSandwichMenu;