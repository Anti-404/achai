
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
        values.push( {name:'Informações', href:this.retrieveURLCurrentPage()}  );        

        layoutBreadcrumbs.create(ul, values);
    }   

    handleAccordion(){
        let accordion = document.querySelectorAll(".accordion .header-accordion");        

        for (let i = 0; i < accordion.length; i++) {
            accordion[i].addEventListener("click", function(e) {
            
            this.classList.toggle("active");
           
            let panel = this.nextElementSibling;            
            if(panel === null){
                return;
            }
            
            if (panel.style.display === "block") {
                panel.style.display = "none";            
                let img = e.target.parentNode.querySelector('img');
                img.src = `${config.urlBase}/assets/imgs/icons/expand_more_FILL0_wght300_GRAD0_opsz24.svg`;
            } else {
                panel.style.display = "block";
                let img = e.target.parentNode.querySelector('img');
                img.src = `${config.urlBase}/assets/imgs/icons/expand_less_FILL0_wght300_GRAD0_opsz24.svg`;
                
            }
        });
        }
    }

    createAccordion(){
        const layoutAccordion = new LayoutAccordion();
        let container = document.querySelector('main .container');
        const values = [
            {title: 'Onde encontro os objetos pessoalmente?', 
            content: 'Instituto UFC Virtual - SMD<br>2° andar - Secretaria'},
            
            {title: 'Reservaram meu objeto, e agora?',
             content: 'Entre em contato com a secretaria para a resolução do problema<br><br>Meios de contato:<br>Celular: (85) 0 0000 0000<br> Email: exemplo@gmail.com'}
        ];

        layoutAccordion.create(container, values);
    }
    

}

const information = new Information();
information.createHeaderContent();
information.createBreadcrumbs();
information.createAccordion();
information.handleAccordion();