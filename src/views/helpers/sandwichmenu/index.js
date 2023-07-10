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
           
            // document.querySelector('header').style.display = 'none';
            // document.querySelector('main').style.display = 'none';
            // document.querySelector('footer').style.display = 'none';
            // document.querySelector(".background-modal").style.height = 'auto'

            searchModal !== null && (document.querySelector("#search-modal").style.display = 'none');
            imgRegisterModal !== null && (document.querySelector("#img-register-modal").style.display = 'none');
            document.querySelector(".background-modal").style.display = 'block';           
            document.querySelector(".sandwich-menu-body").setAttribute("style","display:flex");
            
            let camModal = document.querySelector(".cam-modal");
            (camModal !== null) && (camModal.setAttribute("style","display:none"));
            
            
            
        });
               
    }

    static closeSandwichMenu(){
        document.querySelector(".sandwich-menu-body img[alt='Fechar menu']").addEventListener("click",(e)=>{
            let imgRegisterModal = document.querySelector("#img-register-modal");

            // document.querySelector('header').style.display = 'block';
            // document.querySelector('main').style.display = 'block';
            // document.querySelector('footer').style.display = 'block';
            // document.querySelector(".background-modal").style.height = '100%'

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