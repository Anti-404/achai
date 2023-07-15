import ModelCategories from '../../../../models/categories/index.js';
import ModelThings from '../../../../models/things/index.js';
import Controller from '../../../../core/controller/index.js';
import config from '../../../../../config.js';

import LayoutHeaderContent from '../../../components/headercontent/index.js';
import LayoutBreadcrumbs from '../../../components/breadcrumbs/index.js';
import LayoutFooter from '../../../components/footer/index.js';

import HelperSandwichMenu from '../../../helpers/sandwichmenu/index.js';
import HelperTabOrder from '../../../helpers/taborder/index.js';

import tabOrderRegister,{tabOrderRegisterModalTakePicture, tabOrderRegisterModalCamera} from "../../../admin/things/register/taborder/index.js";


class ThingRegistration extends Controller{

    constructor(){
    super(); 
    this.select = document.querySelector("#category-id");
    this.modelCategories = new  ModelCategories();
    this.modelThings = new  ModelThings();
    this.prevPage = this.getPrevPageURL();       
    this.currentPage = this.retrieveURLCurrentPage();
    this.takePictureBlob = "empty";    

    }

    async selectCategories(){         

        const allCategories = await this.modelCategories.getAll();

        if(!allCategories.error){                        
            for (let i = 0; i < allCategories.result.length; ++i) { 
                if(allCategories.result[i].name !== 'Todas' && allCategories.result[i].name !== 'Ver todos') {
                    let option = document.createElement("option"); 
                    option.setAttribute("value",allCategories.result[i].id);              
                    option.appendChild(document.createTextNode(allCategories.result[i].name));
                    this.select.appendChild(option);                 
                }
                
            }           
            
        }    

    }    

    async save(){        
        document.querySelector("#save-button").addEventListener("click", async (e)=>{             
            e.preventDefault();                      
            document.querySelector("#save-button").setAttribute('disabled','');
            document.querySelector("#save-button").textContent = 'Cadastrando...';

            let formData = new FormData(document.querySelector('form'));            

            if ( !(typeof this.takePictureBlob === 'string')) {   
                formData.set('image_address', this.takePictureBlob);                
            }                        
            if(localStorage.getItem("hash")){
                formData.append('hash',localStorage.getItem("hash"));
                
            }                        
            
            
            await this.modelThings.insert(this.prevPage, formData); 
            document.querySelector("#save-button").removeAttribute('disabled');
            document.querySelector("#save-button").textContent = 'Cadastrar';                           
            
        });
    }   

    takePicture(){

        let video = document.querySelector('.cam-modal video');
        
        navigator.mediaDevices.getUserMedia({video:{ 
            
            facingMode: {
                exact: 'environment'
              }
              
            }
            
        })
        .then(stream => {
            video.srcObject = stream;
            video.play();
        })
        .catch(error => {
            console.log(error);
        })

            
        if(!(document.querySelector('#take-picture-button') == null)){
            document.querySelector('#take-picture-button').addEventListener('click', async () => { 
                HelperTabOrder.resetTabOrder(tabOrderRegisterModalCamera);
                HelperTabOrder.resetTabOrder(tabOrderRegisterModalTakePicture);
                HelperTabOrder.setTabOrder(tabOrderRegister);  

                document.querySelector('div.background-modal').style.display = 'none';   
                document.querySelector('body').style.overflow = 'auto';             

                let canvas = document.querySelector('canvas');            
                
                canvas.height = video.videoHeight;            
                canvas.width = video.videoWidth;
                
                let context = canvas.getContext('2d');
                context.drawImage(video, 0, 0);                        
                
                let img = document.querySelector('#img-picture');
                img.src = canvas.toDataURL('image/png');               
                img.alt = 'alterar imagem';               

                try {            
                    const response = await fetch(img.src);                           
                    let blob = await response.blob();               
                    
                    this.takePictureBlob = blob;
                    alert('Foto tirada com sucesso');
                                
                } catch(e) {
                    console.log(e);
                }                 
                
                
            });
        }       

    }

    inputFileImageUploadPreview(globalThis = this){
            
    const inputFile = document.querySelector("#image-address");               

    inputFile.addEventListener("change", function (e) {
        const inputTarget = e.target;
        const file = inputTarget.files[0];            
        
        if (file) {
            const reader = new FileReader();
        
            reader.addEventListener("load", function (e) {
            const readerTarget = e.target;
        
            const img = document.querySelector("#img-picture"); 
            img.src = readerTarget.result;  
            img.alt = 'alterar imagem'; 
                            
            globalThis.takePictureBlob = "empty";
        
            });
        
            reader.readAsDataURL(file);
        }          
        
        document.querySelector('div.background-modal').style.display = 'none';        
        
        });

    }

    closeImageRegistrationModal(){
        document.querySelector('#exit-modal-button').addEventListener('click',()=>{
            document.querySelector('div.background-modal').style.display = 'none'; 
            HelperTabOrder.resetTabOrder(tabOrderRegisterModalTakePicture);
            HelperTabOrder.setTabOrder(tabOrderRegister);          
             
        });

    }

    openImageRegistrationModal(){        
        
        document.querySelector('#open-picture-modal').addEventListener('click',()=>{  
            document.querySelector('div.background-modal').style.display = 'block';          
            document.querySelector('.cam-modal').style.display = 'flex';
            document.querySelector('#img-register-modal').style.display = 'none';
            document.querySelector('.sandwich-menu-body').style.display = 'none;'            
            document.querySelector('body').style.overflow = 'hidden';   
                        
            HelperTabOrder.resetTabOrder(tabOrderRegisterModalTakePicture);            
            HelperTabOrder.setTabOrder(tabOrderRegisterModalCamera);
            
        });           
        

        document.querySelector('#img-picture').addEventListener('click',()=>{
            document.querySelector('div.background-modal').style.display = 'block';
            document.querySelector('#img-register-modal').style.display = 'flex';
            document.querySelector('.cam-modal').style.display = 'none';                      
            
            HelperTabOrder.resetTabOrder(tabOrderRegister);
            HelperTabOrder.setTabOrder(tabOrderRegisterModalTakePicture);

        }); 


    }

    createHeaderContent(){
        const contentHeader = new LayoutHeaderContent();
        contentHeader.create(document.querySelector('header .container'), 
        `${config.urlBase}/src/views/admin/panel/`, false, true, true, false);
    } 

    createBreadcrumbs(){
        const layoutBreadcrumbs = new LayoutBreadcrumbs();
        let ul = document.querySelector('.container .header-body ul.breadcrumb');
        const values = [];
        
        if(this.prevPage.includes('panel')){
            values.push( {name:'Tela inicial', href:this.prevPage}  );
            values.push( {name:'Cadastrar Objetos', href:this.retrieveURLCurrentPage()}  );

        }else if(this.prevPage.includes('manager')){
            values.push( {name:'Tela inicial', href:`${config.urlBase}/src/views/admin/panel/`}  );
            values.push( {name:'Gerenciar Objetos', href: `${config.urlBase}/src/views/admin/things/`}  );
            values.push( {name:'Objetos filtrados', href:`${config.urlBase}/src/views/admin/things/manager/?id=0`}  );
            values.push( {name:'Cadastrar objetos', href:this.retrieveURLCurrentPage()}  );
        }
        

        layoutBreadcrumbs.create(ul, values);
    }

    arrowBack(){
        let arrowButton = document.querySelector('.arrow-button');
        arrowButton.addEventListener('click',()=>{
            if(this.prevPage.includes('panel')){
                window.location.href = this.prevPage;
                
            }else if(this.prevPage.includes('manager')){
                window.location.href = `${config.urlBase}/src/views/admin/things/manager/?id=0`;
                
            }
        });
    }

    appendFooter(){
        let containerFooter = document.querySelector("footer .container");
        const layoutFooter  = new LayoutFooter();
        layoutFooter.create(containerFooter, config, true);        
        
    } 

    sizeImgRegisterModal(){        
        let sizeImgRegisterModal = document.querySelector('#img-register-modal');
        
        sizeImgRegisterModal.style.width = `${(window.innerWidth -40)}px`;
        
    }

    setTabOrder(){                       
        HelperTabOrder.setTabOrder(tabOrderRegister);
    }

    setImgsRegisterModal(){
        document.querySelector('#exit-modal-button').setAttribute('src',`${config.urlBase}/assets/imgs/icons/close_FILL0_wght300_GRAD0_opsz24.svg`);
        document.querySelector('#open-picture-modal img').setAttribute('src',`${config.urlBase}/assets/imgs/icons/photo_camera_FILL0_wght300_GRAD0_opsz24.svg`);
        document.querySelector("label[for='image-address'] img").setAttribute('src',`${config.urlBase}/assets/imgs/icons/filter_FILL0_wght300_GRAD0_opsz24.svg`);
    }
}

const thingRegistration = new ThingRegistration();
thingRegistration.createHeaderContent();
thingRegistration.createBreadcrumbs();
thingRegistration.selectCategories();
await thingRegistration.save();
thingRegistration.takePicture();
thingRegistration.inputFileImageUploadPreview();
thingRegistration.closeImageRegistrationModal();
thingRegistration.openImageRegistrationModal();
thingRegistration.arrowBack();
thingRegistration.appendFooter();
thingRegistration.sizeImgRegisterModal();
thingRegistration.setTabOrder();
thingRegistration.setImgsRegisterModal();

HelperSandwichMenu.createSandwichMenu();
HelperSandwichMenu.goToProfile();
HelperSandwichMenu.goToDiscardeThings();
HelperSandwichMenu.goToCategoryManager();
HelperSandwichMenu.openSandwichMenu();
HelperSandwichMenu.closeSandwichMenu('register');
// HelperSandwichMenu.goToReturnedThings();


