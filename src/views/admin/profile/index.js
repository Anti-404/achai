import ModelAdmins from '../../../models/admin/index.js';
import Controller from '../../../core/controller/index.js';
import config from '../../../../config.js';

import HelperSandwichMenu from '../../helpers/sandwichmenu/index.js';

import LayoutHeaderContent from '../../components/headercontent/index.js';
import LayoutBreadcrumbs from '../../components/breadcrumbs/index.js';
import LayoutFooter from '../../components/footer/index.js';

import HelperTabOrder from '../../helpers/taborder/index.js';

import tabOrderProfile from "./taborder/index.js";


class Profile extends Controller{    

    constructor(){     
        super();
        this.modelAdmins = new  ModelAdmins();  
        this.identifier = 7;   
        this.prevPage = `${config.urlBase}/src/views/admin/panel/`;   
    }

    async update(){
        let id = this.identifier;        
        let user = document.querySelector("#email").value;
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;        
        
        if(document.querySelector("#email").getAttribute('clicked') === 'yes'
            || document.querySelector("#password").getAttribute('clicked') === 'yes'
        ){
           
            if(email === '')  {   
                alert('campo email vazio');             
                return false;
            }

            if (window.confirm("Deseja salvar as alterações?")) {
                let formData = new FormData();
                formData.set('id', id);
                formData.set('user', user);
                formData.set('email', email);
                formData.set('password', password);
                await this.modelAdmins.update(this.prevPage, formData);                
            } 
        }
            
        return true;
            
    }    
    
    enableFileds(){
        document.querySelector("#email").addEventListener('click',function(e){  
                    
            document.querySelector("#email").setAttribute('clicked', 'yes');
            
        });

        document.querySelector("#password").addEventListener('click', function(e){
            
            document.querySelector("#password").setAttribute('clicked', 'yes');
            
        });
    }

    createHeaderContent(){
        const contentHeader = new LayoutHeaderContent();
        contentHeader.create(document.querySelector('header .container'), `${config.urlBase}/src/views/admin/panel/`, 
        false, true, true, false);
    } 

    exit(){
        document.querySelector("#exit-button").addEventListener("click", async(e)=>{            
            if(!await this.update()) return;

            document.querySelector("body .background-modal").style.display = "none"; 
            localStorage.removeItem("hash");
            alert("Deslogado com sucesso");
            window.location.href = `${config.urlBase}/src/views/admin/login/`;
        });
        
    }

    getAdminEmail(){
        
        let formData = new FormData();
        formData.append('hash', localStorage.getItem('hash')); 

        return this.modelAdmins.getByHash(formData);
    }

    setEmail(){
        (this.getAdminEmail()).then((response)=>{
            document.querySelector('.label-email').textContent =  response.result.email;            
        });
        
    }

    createBreadcrumbs(){
        const layoutBreadcrumbs = new LayoutBreadcrumbs();
        let ul = document.querySelector('.container .header-body ul.breadcrumb');
        const values = [];
        
        values.push( {name:'Tela inicial', href:`${config.urlBase}/src/views/admin/panel/`}  );
        values.push( {name:'Perfil', href:this.retrieveURLCurrentPage()}  );
        
        layoutBreadcrumbs.create(ul, values);        

    }

    arrowBack(){
        let arrowButton = document.querySelector('.arrow-button');
        arrowButton.addEventListener('click',()=>{
            
            window.location.href = `${config.urlBase}/src/views/admin/panel/`;                
            
        });
    }

    appendFooter(){
        let containerFooter = document.querySelector("footer .container");
        const layoutFooter  = new LayoutFooter();
        layoutFooter.create(containerFooter, config, true);        
        
    } 

    setTabOrder(){                       
        HelperTabOrder.setTabOrder(tabOrderProfile);
    }

    setImgProfile(){
        document.querySelector('.profile-content-top img').setAttribute('src',`${config.urlBase}/assets/imgs/icons/account_circle_FILL1_wght300_GRAD0_opsz40.svg`);
        document.querySelector("#exit-button img[alt='botão sair']").setAttribute('src',`${config.urlBase}/assets/imgs/icons/logout_FILL0_wght300_GRAD0_opsz24.svg`);
    }

}

const profile = new Profile();
profile.createHeaderContent();
profile.createBreadcrumbs();
profile.enableFileds();
profile.setEmail();
profile.exit();
profile.arrowBack();
profile.appendFooter();
profile.setTabOrder();
profile.setImgProfile();

HelperSandwichMenu.createSandwichMenu();
HelperSandwichMenu.goToProfile();
HelperSandwichMenu.goToDiscardeThings();
HelperSandwichMenu.goToCategoryManager();
HelperSandwichMenu.openSandwichMenu();
HelperSandwichMenu.closeSandwichMenu('profile');
// HelperSandwichMenu.goToReturnedThings();
// HelperSandwichMenu.exit();