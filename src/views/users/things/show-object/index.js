import ModelCategories from '../../../../models/categories/index.js';
import ModelThings from '../../../../models/things/index.js';
import ModelEmail from '../../../../models/email/index.js';
import Controller from '../../../../core/controller/index.js';
import config from '../../../../../config.js';

import LayoutHeaderContent from '../../../components/headercontent/index.js';
import LayoutBreadcrumbs from '../../../components/breadcrumbs/index.js';

class ShowThing extends Controller{   

    constructor(){  
        super()      ;
        this.modelCategories = new  ModelCategories();
        this.modelThings = new  ModelThings();
        this.modelEmail = new  ModelEmail();
        this.identifier = this.retrieveURLId();                     

    }   

    async getThing(){            
        const thing = await this.modelThings.get(this.identifier);  
        if(thing.result.length <= 0){
            window.location.reload(`${config.urlBase}`);
        }

        const category = await this.modelCategories.get(thing.result[0].category_id);         
        
        if(!thing.erro && !category.erro){            
            document.querySelector("#data-id").value = this.identifier;            
            document.querySelector("#code").textContent = `N°: ${this.identifier}`;            
            
            document.querySelector("form img").setAttribute('src', `${config.urlBase}/${thing.result[0].image_address}`);            

            document.querySelector("#image-address").value = thing.result[0].image_address;                        

            document.querySelector("#category").value = category.result.name;

            document.querySelector("#category-id").value = thing.result[0].category_id;                        
            
            document.querySelector("#local").value = thing.result[0].local;

            document.querySelector("#description").value = thing.result[0].description;
            
            document.querySelector("#returned-status").value = thing.result[0].returned_status;
            
            document.querySelector("#date").value = thing.result[0].date;   

        }else{
            alert(thing.erro);
        }        
        
    } 

    itsMy(){   
        
        document.querySelector("#its-my-button").addEventListener("click",(e)=>{    
            e.preventDefault();            
           
           document.querySelector('#send-email-modal').style.display = 'block';
           document.querySelector('#first-form').style.display = 'none';
           document.querySelectorAll('.breadcrumb li').forEach((li)=>{
           document.querySelector('.breadcrumb').removeChild(li); 
           window.scrollTo(0,0);

        });
           
           const layoutBreadcrumbs = new LayoutBreadcrumbs();
            let ul = document.querySelector('.container .header-body ul.breadcrumb');
            const values = [];

            values.push( {name:'Tela inicial', href:config.urlBase}  );              
            values.push( {name:'Objeto', href:this.retrieveURLCurrentPage()}  );                    
            values.push( {name:'Reservar objeto', href:'none'}  );                    


            layoutBreadcrumbs.create(ul, values);
           


        });
    } 
    
    unDisabled(){
        const disabledFields =  document.querySelectorAll('[disabled]');
        disabledFields.forEach((item)=>{
            item.removeAttribute('disabled');
        });
    }
    async sendEmail(){                
        document.querySelector("#send-email-button").addEventListener("click",async (e)=>{    
            e.preventDefault();                 
            this.unDisabled();           

           let formData = new FormData(document.querySelector('#first-form'));
                     
           formData.set('reserved_status',1);            
           
           let form = document.querySelector("#send-email-modal form");                      
           if(!form.name.value){
            alert('Insira o nome');            
            form.name.focus();
            return; 
            } 

           if(!form.to.value){
                alert('Insira o email');            
                form.to.focus();
                return; 
            } 

            // if((/[^a-zA-Z]/.test(`${form.to.value}`))){
            //     alert('Nome invalido'); 
            //     return;
            // }

            
            // if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(`${form.name.value}`)){
                
            //     alert('Endereço de email invalido'); 
            //     return;
            // }
                        

            let formDataEmail = new FormData(); 

            formDataEmail.append('id', formData.get('id'));
            formDataEmail.append('local', formData.get('local'));            
            formDataEmail.append('description', formData.get('description'));
            formDataEmail.append('username', document.querySelector('#email-form #name').value);
            formDataEmail.append('useremail', document.querySelector('#email-form #to').value);
            formDataEmail.append('subject', document.querySelector('#email-form #subject').value);            
            
            document.querySelector('#send-email-modal').style.display = 'none'; 
            
            
            try {            
                const screenshotTarget = document.querySelector('#canvas');     
                let canvas2 = await html2canvas(screenshotTarget);
                let base64image = canvas2.toDataURL("image/jpeg", 1.0); 

                const response = await fetch(base64image);                           
                let blob = await response.blob();                              
                
                formDataEmail.append('qrcodeBlobScreeshot',blob); 
                            
            } catch(e) {
                console.log(e);
            } 
            document.querySelector('#loading-modal-background').style.display = 'block';  
            let response = await this.modelEmail.sendEmail(formDataEmail);                    

           if(response.error === ''){            
                await this.modelThings.reserve('', formData, 'Reservado'); 
                document.querySelector('#loading-modal-background').style.display = 'none';
                document.querySelector('.background-modal').style.display = 'block';
                               
                
           }else{
                document.querySelector('#loading-modal-background').style.display = 'none';
                if(alert(response.error) == undefined){
                    window.location.reload(`${config.urlBase}`);
                }
           }          
                      

        });

    }
    
    generateQrCode(){        
        
        const qrcode = new QRCode("qrcode");
        
        let url = `${config.urlBase}/src/views/admin/things/thingreserved/?id=${this.identifier}`        
        if (!this.identifier) {
          alert("Id não enviado");          
          return;
        }
        
        qrcode.makeCode(url);
    }

    async canvas(){        

        let canvas = document.querySelector('#canvas');                    
        let context = canvas.getContext('2d');
                
        canvas.height = 320;            
        canvas.width = 320;
        
        let img = document.querySelector("#qrcode img");

        img.addEventListener('load', function(){
               context.drawImage(this,35,35);
               img.style.display = 'none';
        });
                
    }

    confirmScreenQrcodeButton(){
         document.querySelector('#confirm-screen-qrcode-button').addEventListener('click', ()=>{
            window.location.href = config.urlBase;  
         });        

    }

    createHeaderContent(){
        const contentHeader = new LayoutHeaderContent();
        contentHeader.create(document.querySelector('header .container'), config.urlBase, false, false,true,true, false);
    }

    createBreadcrumbs(){
        const layoutBreadcrumbs = new LayoutBreadcrumbs();
        let ul = document.querySelector('.container .header-body ul.breadcrumb');
        const values = [];

        values.push( {name:'Tela inicial', href:config.urlBase}  );              
        values.push( {name:'Objeto', href:this.retrieveURLCurrentPage()}  );                    


        layoutBreadcrumbs.create(ul, values);
    }   

    handleButtonInfo(){
        document.querySelector('.info-button').addEventListener('click',()=>{
            window.location.href = `${config.urlBase}/src/views/users/information`;
        });
    }
    

}

const showThing = new ShowThing();
await showThing.getThing();
showThing.itsMy(); 
await showThing.sendEmail(); 
showThing.generateQrCode(); 
await showThing.canvas(); 
showThing.confirmScreenQrcodeButton(); 
showThing.createHeaderContent();
showThing.createBreadcrumbs();
showThing.handleButtonInfo();