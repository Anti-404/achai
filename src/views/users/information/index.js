
import Controller from '../../../core/controller/index.js';

import config from '../../../../config.js';

import LayoutHeaderContent from '../../components/headercontent/index.js';
import LayoutBreadcrumbs from '../../components/breadcrumbs/index.js';
import LayoutAccordion from '../../components/accordion/index.js';

class Information extends Controller{   

    constructor(){ 
        super();
    }

    createHeaderContent(){
        const contentHeader = new LayoutHeaderContent();
        contentHeader.create(document.querySelector('header .container'), config.urlBase, false, false,true,false, false);
    }

    createBreadcrumbs(){
        const layoutBreadcrumbs = new LayoutBreadcrumbs();
        let ul = document.querySelector('.container .header-body ul.breadcrumb');
        const values = [];
        
        values.push( {name:'Tela inicial', href:config.urlBase}  );              
        values.push( {name:'Informações', href:'#'}  );        

        layoutBreadcrumbs.create(ul, values);
    }   

    handleAccordion(){
        let accordion = document.querySelectorAll(".accordion");        

        for (let i = 0; i < accordion.length; i++) {
            accordion[i].addEventListener("click", function() {
            
            this.classList.toggle("active");
           
            let panel = this.nextElementSibling;
            if (panel.style.display === "block") {
            panel.style.display = "none";
            } else {
            panel.style.display = "block";
            }
        });
        }
    }

    createAccordion(){
        const layoutAccordion = new LayoutAccordion();
        let container = document.querySelector('main .container');
        const values = [
            {title: 'Onde encontro os objetos pessoalmente?', content: 'bla bla bla ...'},
            {title: 'Reservaram meu objeto, e agora?', content: 'bla bla bla ...'}
        ];

        layoutAccordion.create(container, values);
    }
    

}

const information = new Information();
information.createHeaderContent();
information.createBreadcrumbs();
information.createAccordion();
information.handleAccordion();