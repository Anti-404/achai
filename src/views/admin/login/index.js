import ModelAdm from '../../../models/admin/index.js';
import Controller from '../../../core/controller/index.js';
import config from '../../../../config.js';
import LayoutFooter from '../../components/footer/index.js';

import tabOrderLogin from "./taborder/index.js";
import HelperTabOrder from '../../helpers/taborder/index.js';


class Adm extends Controller{
constructor() {
    super();
}

login() {
    
    let confirmButton = document.querySelector("#confirm-button");

    confirmButton.addEventListener('click', async (e) => {            
        e.preventDefault(); 
        e.stopPropagation();       
        const form = document.querySelector('#form');
        let formData = new FormData(form);
        
        let addressRedirecting = `${config.urlBase}/src/views/admin/panel/`;
                    
        const modelAdm = new ModelAdm();            
        let response = await modelAdm.login(formData);            
        if(response.error === ''){
            localStorage.setItem('hash',response.result.hash);
            window.location.href = addressRedirecting;
        }

    });

    
}


checkUserLogged(){
    
    if(localStorage.getItem("hash")){
        

        window.location.href = "../panel/";

        
    }         
}

recoverPassword(){       
    
    document.querySelector('#recover-password-button').addEventListener('click', (e)=>{
        
        alert("A senha foi enviada para seu email!");
        
    });
}

appendFooter(){
    let containerFooter = document.querySelector("footer .container");
    const layoutFooter  = new LayoutFooter();
    layoutFooter.create(containerFooter, config);        
    
} 

setTabOrder(){                       
    HelperTabOrder.setTabOrder(tabOrderLogin);
}

}

const adms = new Adm();
adms.checkUserLogged();
adms.login();
adms.recoverPassword();
adms.appendFooter();
adms.setTabOrder();
