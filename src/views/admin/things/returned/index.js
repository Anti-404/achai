import ModelThing from '../../../../models/things/index.js';
import ModelCategory from '../../../../models/things/index.js';
import Controller from '../../../../core/controller/index.js';
import LayoutThing from '../../../components/layoutthing/index.js';

class ReturnedThing extends Controller{
    constructor(){          
        super();           
        this.modelThing = new ModelThing();               
        this.modelCategory = new ModelCategory();               
        this.layoutThing = new LayoutThing();               
    }
       
    async allThingsReturned(){

        const allThingsReturned = await this.modelThing.getThingsReturned();          
                
        let thingsReturnedContainer = document.querySelector(".things-list");

        this.layoutThing.create(thingsReturnedContainer, allThingsReturned, false);
      
    }


}   

const returned = new ReturnedThing();
returned.allThingsReturned();