import ModelAdmins from '../../../models/admin/index.js';
import Controller from '../../../core/controller/index.js';
import config from '../../../../config.js';

import HelperSandwichMenu from '../../helpers/sandwichmenu/index.js';

import LayoutHeaderContent from '../../components/headercontent/index.js';
import LayoutBreadcrumbs from '../../components/breadcrumbs/index.js';

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
        
        if(document.querySelector("#email").getAttribute('disabled') === null
            || document.querySelector("#password").getAttribute('disabled') === null
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
        document.querySelector(".span-email").addEventListener('click',function(e){  
                    
            document.querySelector("#email").removeAttribute('disabled');
        });

        document.querySelector(".span-password").addEventListener('click', function(e){
            
            document.querySelector("#password").removeAttribute('disabled');
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
        values.push( {name:'Perfil', href:'#'}  );
        
        layoutBreadcrumbs.create(ul, values);        

    }

    arrowBack(){
        let arrowButton = document.querySelector('.arrow-button');
        arrowButton.addEventListener('click',()=>{
            
            window.location.href = `${config.urlBase}/src/views/admin/panel/`;                
            
        });
    }

}

const profile = new Profile();
profile.createHeaderContent();
profile.createBreadcrumbs();
profile.enableFileds();
profile.setEmail();
profile.exit();
profile.arrowBack();

HelperSandwichMenu.createSandwichMenu();
HelperSandwichMenu.goToProfile();
HelperSandwichMenu.goToDiscardeThings();
HelperSandwichMenu.goToCategoryManager();
HelperSandwichMenu.openSandwichMenu();
HelperSandwichMenu.closeSandwichMenu();
// HelperSandwichMenu.goToReturnedThings();
// HelperSandwichMenu.exit();