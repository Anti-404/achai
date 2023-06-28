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
            document.querySelector(".sandwich-menu-body").setAttribute("style","display:block");            
            
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
    
    static exit(){
        document.querySelector("#exit-button").addEventListener("click",()=>{
            document.querySelector("body .background-modal").style.display = "none"; 
            localStorage.removeItem("hash");
            alert("Deslogado com sucesso");
            window.location.href = `${config.urlBase}/src/views/admin/login/`;
        });
        
    }


}

export default HelperSandwichMenu;