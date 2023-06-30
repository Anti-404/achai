import config from '../../../../config.js';
import ModelAdmin from '../../../models/admin/index.js';

class LayoutSandwichMenu{

    constructor(){}

    getAdminEmail(){

        let modelAdmin = new ModelAdmin();
        let formData = new FormData();
        formData.append('hash', localStorage.getItem('hash')); 

        return modelAdmin.getByHash(formData);
    }

    async create(container){    
        
        
        let divSandwichMenuBody = document.createElement("div");   
        divSandwichMenuBody.setAttribute('class','sandwich-menu-body');

        let divCloseModal = document.createElement("div");  
        divCloseModal.setAttribute('class','close-modal');                                   

        let spanCloseModal = document.createElement("span"); 
        spanCloseModal.setAttribute('class','material-symbols-rounded');                   

        let divBodyModal = document.createElement("div"); 
        divBodyModal.setAttribute('class','body-modal');           

        let divProfileImg = document.createElement("div");            

        let profileImg = document.createElement("img");  
        profileImg.src = `${config.urlBase}/assets/imgs/icons/account_circle_FILL1_wght300_GRAD0_opsz40.svg`;
        profileImg.alt = 'Administrador';          

        let divSeparator= document.createElement("div");            

        let h3Admin = document.createElement("h3"); 
        h3Admin.textContent = 'Administrador';                       

        let h4Email = document.createElement("h4");                    
                                        
        (this.getAdminEmail()).then((response)=>{
            h4Email.textContent = response.result.email;            
        });
        

        let btnProfileManager = document.createElement("button"); 
        btnProfileManager.textContent = 'Gerenciar perfil';
        btnProfileManager.setAttribute('class','profile-button');           

        let divModalTask = document.createElement("div");
        divModalTask.setAttribute('class','modal-task'); 
        

        let spanDiscardIcon = document.createElement('span');
        spanDiscardIcon.setAttribute('class','material-symbols-rounded');            
        let spanDiscardText = document.createElement('span');
        spanDiscardText.textContent = 'Discarte';
        
        let spanEditCategoryIcon= document.createElement('span');
        spanEditCategoryIcon.setAttribute('class','material-symbols-rounded');            
        let spanEditTextCategory = document.createElement('span');
        spanEditTextCategory.textContent = 'Gerenciar categorias';

        let spanReturnedIcon= document.createElement('span');
        spanReturnedIcon.setAttribute('class','material-symbols-rounded');
        spanReturnedIcon.textContent = 'returned';
        let spanTextReturned = document.createElement('span');
        spanTextReturned.textContent = 'Devolvidos';


        let ul = document.createElement("ul"); 

        let li1 = document.createElement("li"); 
        li1.setAttribute('class','discard-things-button');  
        li1.appendChild(spanDiscardIcon);
        li1.appendChild(spanDiscardText);

        let li2 = document.createElement("li");  
        li2.setAttribute('class','category-manager-button');  
        li2.appendChild(spanEditCategoryIcon);
        li2.appendChild(spanEditTextCategory);
                    
        let li3 = document.createElement("li");
        li3.setAttribute('class','returned-things-button');            
        li3.appendChild(spanReturnedIcon);
        li3.appendChild(spanTextReturned);
        
        ul.appendChild(li1);
        ul.appendChild(li2);
        // ul.appendChild(li3);

        divProfileImg.appendChild(profileImg);

        divSeparator.appendChild(h3Admin);
        divSeparator.appendChild(h4Email);
        divSeparator.appendChild(btnProfileManager);

        divBodyModal.appendChild(divProfileImg);
        divBodyModal.appendChild(divSeparator);
        divCloseModal.appendChild(spanCloseModal);
        divSandwichMenuBody.appendChild(divCloseModal);            
        divSandwichMenuBody.appendChild(divBodyModal);  
        divModalTask.appendChild(ul);            
        divSandwichMenuBody.appendChild(divModalTask);  
        // divSandwichMenuBody.appendChild(spanExit);            
        
        container.appendChild(divSandwichMenuBody);   
    
    }

}

export default LayoutSandwichMenu;