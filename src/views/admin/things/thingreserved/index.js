import ModelThings from '../../../../models/things/index.js';
import ModelCategories from '../../../../models/categories/index.js';
import Controller from '../../../../core/controller/index.js';
import config from '../../../../../config.js';


class QRCode extends Controller{

    constructor(){  
        super();
        this.modelThings = new  ModelThings();
        this.modelCategories = new  ModelCategories();
        this.identifier = this.retrieveURLId();        
        this.formData = new FormData(document.querySelector("form"));
    }   

    async getThing(){  

        const thing = await this.modelThings.getReservedById(this.identifier); 
       
        if(!thing.erro){   
                
            document.querySelector("#data-id").value =  this.identifier;
            document.querySelector("form img").setAttribute('src', `${config.urlBase}/${thing.result[0].image_address}`);            
            document.querySelector("#local").value = thing.result[0].local;
            document.querySelector("#description").value = thing.result[0].description;

            let category = await this.modelCategories.get(thing.result[0].category_id);   

            if(!category.erro){
                document.querySelector("#category").value = category.result.name;
            }else{
                alert(category.erro);
            }        
            
            this.formData.append('id', this.identifier);   
            this.formData.append('image_address', thing.result[0].image_address);   
            this.formData.append('local', thing.result[0].local);   
            this.formData.append('description', thing.result[0].description);   
            this.formData.append('category_id', thing.result[0].category_id);   
            this.formData.append('reserved_status', thing.result[0].reserved_status);            
                       
                    

        }else{
            alert(thing.erro);
        }        
    }

    return(){

        document.querySelector("#return-button").addEventListener("click",(e)=>{  
            e.preventDefault();
            
            if(localStorage.getItem("hash")){
                this.formData.append('hash',localStorage.getItem("hash"));                
            }

            this.formData.append('returned_status','1');                  
            this.modelThings.update(`${config.urlBase}/src/views/admin/panel/`,this.formData,'Retirado'); 
        });

    }
    

}   

const qrcode = new QRCode();
await qrcode.getThing();
qrcode.return();
