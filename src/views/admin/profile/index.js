import ModelAdmins from '../../../models/login/index.js';
import Controller from '../../../core/controller/index.js';
import config from '../../../../config.js';

import HelperSandwichMenu from '../../helpers/sandwichmenu/index.js';

import LayoutHeaderContent from '../../components/headercontent/index.js';

class Profile extends Controller{    

    constructor(){     
        super();
        this.modelAdmins = new  ModelAdmins();  
        this.identifier = 7;   
        this.prevPage = `${config.urlBase}/src/views/admin/panel/`;   
    }

    async getUserAdmin(){  
        
        const userAdmin= await this.modelAdmins.get(this.identifier); 
        
        if(!userAdmin.erro){            
            document.querySelector("#user").value = userAdmin.result.user;            
            document.querySelector("#email").value = userAdmin.result.email;
            
        }else{
            alert(userAdmin.erro);
        }        
    }

    async update(){

        document.querySelector("#update-button").addEventListener("click",(e)=>{  
            e.preventDefault();

            let id = this.identifier;
            let user = document.querySelector("#user").value;
            let password = document.querySelector("#password").value;
            let email = document.querySelector("#email").value;
                         
            this.modelAdmins.update(this.prevPage, {id, user, password, email }); 
        });


    }

    enableButton(...fields){

        for (let i = 0; i < fields.length; i++) {
           
            document.querySelector(`#${fields[i]}`).addEventListener("focus",()=>{
                document.querySelector("#update-button").removeAttribute("disabled");  
            });  
            
        }       

    }

    createHeaderContent(){
        const contentHeader = new LayoutHeaderContent();
        contentHeader.create(document.querySelector('header .container'), `${config.urlBase}/src/views/admin/panel/`, false, true, true);
    } 
}

const profile = new Profile();
profile.createHeaderContent();
profile.getUserAdmin();
profile.update();
profile.enableButton("user", "password", "email");

HelperSandwichMenu.createSandwichMenu();
HelperSandwichMenu.goToProfile();
HelperSandwichMenu.goToDiscardeThings();
HelperSandwichMenu.goToCategoryManager();
HelperSandwichMenu.openSandwichMenu();
HelperSandwichMenu.closeSandwichMenu();
// HelperSandwichMenu.goToReturnedThings();
HelperSandwichMenu.exit();