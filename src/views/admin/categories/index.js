import ModelCategories from '../../../models/categories/index.js';
import Controller from '../../../core/controller/index.js';
import config from '../../../../config.js';

import HelperSandwichMenu from '../../helpers/sandwichmenu/index.js';

import LayoutHeaderContent from '../../components/headercontent/index.js';
import LayoutBreadcrumbs from '../../components/breadcrumbs/index.js';
import LayoutFooter from '../../components/footer/index.js';

import HelperTabOrder from '../../helpers/taborder/index.js';

import tabOrderCategories from "./taborder/index.js";


class Categories extends Controller{
    constructor(){        
        super();
        this.modelCategories = new  ModelCategories();         
        this.currentPage = this.retrieveURLCurrentPage();           
                
    } 
    
    async showAll(){    
        let tableBody = document.querySelector(".tbody");
        tableBody.textContent = '';
        
        const allCategories = await this.modelCategories.getAll();
        
        if(!allCategories.error){  
                      
            for (let i = 0; i < allCategories.result.length; ++i) {
                
                if(allCategories.result[i].icon_name === null){
                    let tr = document.createElement("div");                
                    let td1 = document.createElement("div"); 
                    let td2 = document.createElement("div");                 
                    let deleteButton = document.createElement('img');
                    let editButton = document.createElement('img');
                    let input = document.createElement('input');   
                    
                    let spanAccessibilityEdit = document.createElement('span');   
                    let spanAccessibilityDelete = document.createElement('span');   
                    
                    tr.setAttribute('class','tr'); ;  

                    input.setAttribute('value',allCategories.result[i].name);               
                    input.setAttribute('class','category-name');               
                    input.setAttribute('name','name');               
                    td1.appendChild(input);                    
                    td1.setAttribute('class','td'); ;                                        
                    
                    editButton.src = `${config.urlBase}/assets/imgs/icons/button_check_off.svg`;
                    editButton.setAttribute('class','material-symbols-rounded update-button');                    
                    editButton.alt = "salvar edição desativado";                    
                    spanAccessibilityEdit.appendChild(editButton);
                    td2.appendChild(spanAccessibilityEdit);  
                    td2.setAttribute('class','td'); ;                             
                    
                    deleteButton.src = `${config.urlBase}/assets/imgs/icons/delete_FILL0_wght300_GRAD0_opsz24.svg`;
                    deleteButton.setAttribute('class','material-symbols-rounded delete-button');
                    deleteButton.setAttribute('alt','botão excluir');
                    spanAccessibilityDelete.appendChild(deleteButton);
                    td2.appendChild(spanAccessibilityDelete); 

                    tr.setAttribute("data-id",allCategories.result[i].id);                
                    tr.appendChild(td1);                
                    tr.appendChild(td2);                
                    
                    tableBody.appendChild(tr);

                } 
                
            }

            
        }       

    }
   
    goToCategoryRegister(){
        document.querySelector("#register-categories-button").addEventListener("click",()=>{              
            window.location.href = `${config.urlBase}/src/views/admin/categories/register/?prevPage=${this.currentPage}`
        });
        
    }

     delete(){        
        if(document.querySelector(".delete-button") === null) return;

        let deleteBtns = document.querySelectorAll(".delete-button");

        for (let index = 0; index < deleteBtns.length; index++) {
            deleteBtns[index].addEventListener("click", async (e)=>{

                const id = e.target.parentNode.parentNode.parentNode.getAttribute('data-id');
                const categoryName = document.querySelector('.category-name').value;

                let formData = new FormData();
                formData.append('id',id);
                formData.append('name',categoryName);
                
                if(localStorage.getItem("hash")){
                    formData.append('hash',localStorage.getItem("hash"));
                    
                }                         
                
                let msg = await this.modelCategories.delete(this.currentPage, id, formData);                 
                alert(msg);
                window.location.reload();               

                }); 
                
            
        }
                  
            
    }

    async updateAssistant(id, categoryName){
          
        let formData = new FormData();
        formData.append('id',id);
        formData.append('name',categoryName);
        
        if(localStorage.getItem("hash")){
            formData.append('hash',localStorage.getItem("hash"));
            
        }
        
        let msg = await this.modelCategories.update(this.currentPage,formData); 
        alert(msg);
        window.location.reload();        
        
    }  

    handleInputField(){
        let fieldsCategoryName = document.querySelectorAll('.category-name');
       
        fieldsCategoryName.forEach((field)=>{
            field.addEventListener('keyup', async (event)=>{                                                               
                const updateButton = event.target.parentNode.parentNode.querySelector('.update-button');                
                updateButton.src = `${config.urlBase}/assets/imgs/icons/button_check_on.svg`;
                updateButton.alt = 'salvar edição ativado';

                await event.target.parentNode.parentNode.querySelector('.update-button').addEventListener('click', async ()=>{
                    await this.updateButtonEventFunction(event);
                });
    
            });
        });        
        
    }

    updateButtonEventFunction = async (event)=>{
        const updateButton = event.target.parentNode.parentNode.querySelector('.update-button');                 
        const categoryId = event.target.parentNode.parentNode.getAttribute('data-id');

        const category = event.target.parentNode.parentNode.querySelector('.category-name');
        updateButton.src = `${config.urlBase}/assets/imgs/icons/button_check_off.svg`;
        updateButton.onclick = null;                
        await this.updateAssistant(categoryId, category.value);
    }
    
    
    createHeaderContent(){
        const contentHeader = new LayoutHeaderContent();
        contentHeader.create(document.querySelector('header .container'), `${config.urlBase}/src/views/admin/panel/`, false, true, true, false);
    } 

    createBreadcrumbs(){
        const layoutBreadcrumbs = new LayoutBreadcrumbs();
        let ul = document.querySelector('.container .header-body ul.breadcrumb');
        const values = [];
        
        values.push( {name:'Tela inicial', href:`${config.urlBase}/src/views/admin/panel/`}  );
        values.push( {name:'Editar categorias', href:this.retrieveURLCurrentPage()}  );
        
        
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
        HelperTabOrder.setTabOrder(tabOrderCategories);
    }

   
    
}

const categories = new Categories();
categories.createHeaderContent();
categories.createBreadcrumbs();
categories.goToCategoryRegister();
await categories.showAll();
categories.delete();
categories.handleInputField();
categories.arrowBack();
categories.appendFooter();
categories.setTabOrder();

HelperSandwichMenu.createSandwichMenu();
HelperSandwichMenu.goToProfile();
HelperSandwichMenu.goToDiscardeThings();
HelperSandwichMenu.goToCategoryManager();
HelperSandwichMenu.openSandwichMenu();
HelperSandwichMenu.closeSandwichMenu('categories');
// HelperSandwichMenu.goToReturnedThings();
