import ModelCategories from '../../../../models/categories/index.js';
import ModelThings from '../../../../models/things/index.js';
import Controller from '../../../../core/controller/index.js';
import config from '../../../../../config.js';

class ThingsInteraction extends Controller{    

    constructor(){  
        super();
        this.modelCategories = new  ModelCategories();
        this.modelThings = new  ModelThings();
        this.identifier = this.retrieveURLId();                
        this.currentPage = this.retrieveURLCurrentPage();  
        this.takePictureBlob = "empty";      

    }   

    async getThing(){  
        
        const thing = await this.modelThings.get(this.identifier);

        if(!thing.erro){            
            document.querySelector("#data-id").value = this.identifier;            
            
            document.querySelector("form img").setAttribute('src', `achai/${thing.result[0].image_address}`);            

            document.querySelector("#image-address").value = thing.result[0].image_address;

            await this.selectCategories(thing.result[0].category_id);            
            
            document.querySelector("#local").value = thing.result[0].local;

            document.querySelector("#description").value = thing.result[0].description;
                        
            document.querySelector("#returned-status").value = thing.result[0].returned_status;           
            
            document.querySelector("#reserved-status").value = thing.result[0].reserved_status;
            
                       

        }else{
            alert(thing.erro);
        }        
    }

    async selectCategories(categoryId){   
        
        const listCategories = document.querySelector("#list-categories");
        const allCategories = await this.modelCategories.getAll();
        
        if(!allCategories.error){                        
            for (let i = 0; i < allCategories.result.length; ++i) {  
                let option = document.createElement("option"); 
                option.setAttribute("value",allCategories.result[i].id);              
                option.appendChild(document.createTextNode(allCategories.result[i].name));
                listCategories.appendChild(option);                 
            }           
            
       } 
        
               
        let category = await this.modelCategories.get(categoryId);   

        if(!category.erro){
            
            const options = document.querySelector("#list-categories").options;
            for (let i = 0; i < options.length; i++) {
                if(options[i].value == category.result.id){
                    options[i].selected = true;
                }                
            }
        }else{
            alert(category.erro);
        }        

        
    } 
    
    async update(){
        
        document.querySelector("#update-button").addEventListener("click",(e)=>{  
            e.preventDefault();

            let formData = new FormData(document.querySelector('form'));  
            
            if ( !(typeof this.takePictureBlob === 'string')) {   
                formData.set('image_address_update', this.takePictureBlob);                
            } 

            if(localStorage.getItem("hash")){
                formData.append('hash',localStorage.getItem("hash"));
                
            }
            let prevPage = `${config.urlBase}/src/views/admin/things/manager/`            
            this.modelThings.update( prevPage, formData, 'Atualizado'); 
        });

    }
    async return(){

        document.querySelector("#return-button").addEventListener("click",(e)=>{  
            e.preventDefault();

            let formData = new FormData(document.querySelector('form'));  
            formData.set('returned_status','1');
            
            if(localStorage.getItem("hash")){
                formData.append('hash',localStorage.getItem("hash"));
                
            }
            let prevPage = `${config.urlBase}/src/views/admin/things/manager/`            
            this.modelThings.update( prevPage, formData, 'Retirado'); 
        });


    }
   
    enableButton(...fields){

        for (let i = 0; i < fields.length; i++) {
           
            document.querySelector(`#${fields[i]}`).addEventListener("focus",()=>{
                document.querySelector("#update-button").removeAttribute("disabled");  
            });  

        }       

    }
    
    
    takePicture(){

        let video = document.querySelector('.take-picture video');
    
        navigator.mediaDevices.getUserMedia({video:{
            width: 320,
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
                document.querySelector('div.background-modal').style.display = 'none';
                document.querySelector("#camera").style.display = "none";
    
                let canvas = document.querySelector('canvas');            
                
                canvas.height = video.videoHeight;            
                canvas.width = video.videoWidth;
                
                let context = canvas.getContext('2d');
                context.drawImage(video, 0, 0);                        
                
                let img = document.querySelector('#img-picture');
                img.src = canvas.toDataURL('image/png');
    
                try {            
                    const response = await fetch(img.src);                           
                    let blob = await response.blob();               
                    
                    this.takePictureBlob = blob;                    
                                
                } catch(e) {
                    console.log(e);
                }              
                
            });
        }       
    
    }   
    
    inputFileImageUploadPreview(globalThis = this){
            
        const inputFile = document.querySelector("#image-address-update");               

        inputFile.addEventListener("change", function (e) {
            const inputTarget = e.target;
            const file = inputTarget.files[0];            
            
            if (file) {
                const reader = new FileReader();
            
                reader.addEventListener("load", function (e) {
                const readerTarget = e.target;
            
                const img = document.querySelector("#img-picture"); 
                img.src = readerTarget.result;  
                                
                globalThis.takePictureBlob = "empty";
            
                });
            
                reader.readAsDataURL(file);
            }          
            
            document.querySelector('div.background-modal').style.display = 'none';
            document.querySelector('#camera').style.display = 'none';
            
            });

    }

    closeImageRegistrationModal(){
        document.querySelector('#exit-modal-button').addEventListener('click',()=>{
            document.querySelector('div.background-modal').style.display = 'none';
        });
    }

    openImageRegistrationModal(){

        document.querySelector('#camera, #img-picture').addEventListener('click',()=>{
            document.querySelector('div.background-modal').style.display = 'block';
            
        });        

        document.querySelector('#img-picture').addEventListener('click',()=>{
            document.querySelector('div.background-modal').style.display = 'block';
            document.querySelector('#img-picture').removeAttribute('src');
            document.querySelector('#camera').style.display = 'block';
            
        });        


    }


}

const thingsInteraction = new ThingsInteraction();
thingsInteraction.getThing();
thingsInteraction.update();
thingsInteraction.return();
thingsInteraction.enableButton("image-address","image-address-update", "local", "list-categories", "description");
thingsInteraction.inputFileImageUploadPreview();
thingsInteraction.takePicture();
thingsInteraction.inputFileImageUploadPreview();
thingsInteraction.closeImageRegistrationModal();
thingsInteraction.openImageRegistrationModal();