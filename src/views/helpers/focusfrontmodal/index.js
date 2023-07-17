import HelperTabOrder from "../taborder/index.js";

export default class HelperFocusFrontModal{
   static contentTagBodySave = [];

   static saveChildrenBody(){
        let childrenBody = document.querySelector('body').children;
        childrenBody =  Array.from(childrenBody);
        childrenBody.forEach(element => {
            HelperFocusFrontModal.contentTagBodySave.push(element);
        });
    }

    static clearBody(elementsList=[]){     
        if(elementsList.length > 0) HelperTabOrder.setTabOrder(elementsList); 

        let header = document.querySelector('header');
        let main = document.querySelector('main');
        let footer = document.querySelector('footer');
        let body = document.querySelector('body');
        let scripts = document.querySelectorAll('script');

        body.style.height = '100vh';            
        body.removeChild(header);
        body.removeChild(main);
        for(let script of scripts){
            body.removeChild(script);
        }                   
                   
        body.removeChild(footer);
          
    }

    static rebuilBody(elementsList=[]){
        if(elementsList.length > 0) HelperTabOrder.resetTabOrder(elementsList); 

        let body = document.querySelector('body'); 
        body.style.height = '100%';             

        let backgroundModal = document.querySelector('.background-modal');
        body.removeChild(backgroundModal);
        let contentTagBodySave =  HelperFocusFrontModal.contentTagBodySave;            
        
        contentTagBodySave.forEach((element)=>{
            body.appendChild(element);
        }); 
    }


}