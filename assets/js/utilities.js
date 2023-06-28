import config from '../../config.js';

class Utilities{
    constructor(){}
            
    checkRegistered(){
        
        if(document.querySelector(".restricted-admin")){
            if(!localStorage.getItem("hash")){
                window.location.href = config.urlBase;
            }else{
                document.querySelector(".body").setAttribute("style","display:block");
            }
        }           
    }

    baseURL(){
        let containerHeader = document.querySelector("head");
        let base = document.createElement("base");
        base.setAttribute("href", config.urlBase);
        containerHeader.appendChild(base);        
    } 


}

const utilities = new Utilities();    
utilities.checkRegistered();    
utilities.baseURL();  
