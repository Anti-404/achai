import ModelThing from '../../../../models/things/index.js';
import Controller from '../../../../core/controller/index.js';

class ReturnedThing extends Controller{
    constructor(){          
        super();           
        this.modelThing = new ModelThing();               
    }

       
    async allThingsReturned(){

        const allThingsReturned = await this.modelThing.getThingsReturned();            
        
        let  thingsReturnedContainer = document.querySelector(".things-returned-list");

        if(!allThingsReturned.error){ 
            
            for (let i = 0; i < allThingsReturned.result.length; ++i) {
                let a = document.createElement("a");
                let figure = document.createElement("figure");
                let img = document.createElement("img");
                let figCaption = document.createElement("figcaption");             
                                                              
                a.setAttribute("id",allThingsReturned.result[i].id);                        
                img.setAttribute("src",'achai/'+allThingsReturned.result[i].image_address);                        
                img.setAttribute("alt",allThingsReturned.result[i].description);                                                        
                figCaption.appendChild(document.createTextNode(allThingsReturned.result[i].description));
                 
                figure.appendChild(img);
                figure.appendChild(figCaption);
                a.appendChild(figure);
                thingsReturnedContainer.appendChild(a);
                
            }

            
        } 

}

handlerPageBack(){                
    document.querySelector("#back").addEventListener('click', ()=>{
        window.history.back();
    });
}
 

}   

const returned = new ReturnedThing();
returned.allThingsReturned();
returned.handlerPageBack();
