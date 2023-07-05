import config from "../../../../config.js";

class LayoutAccordion{

    constructor(){}    
    /*
    async create(container, values=[]){
        if(values.length <= 0) return;
        
        for (let index = 0; index < values.length; index++) {
            let accordionButton = document.createElement('div');
            accordionButton.setAttribute('class', 'accordion');
            accordionButton.textContent = values[index].title;

            let panelAccordion = document.createElement('div');
            panelAccordion.setAttribute('class', 'panel-accordion');

            let p = document.createElement('p');
            p.textContent = values[index].content;
            
            container.appendChild(accordionButton);            
            panelAccordion.appendChild(p);
            container.appendChild(panelAccordion);
        }   
        
    
    }
    */

    async create(container, values=[]){
        if(values.length <= 0) return;
        
        for (let index = 0; index < values.length; index++) {
            let accordionButton = document.createElement('div');
            accordionButton.setAttribute('class', 'accordion');
            let p1 = document.createElement('p');
            p1.innerHTML = values[index].title;            

            let headerAccordion = document.createElement('div');
            headerAccordion.setAttribute('class', 'header-accordion');

            let iconAccordion = document.createElement('img');
            iconAccordion.src = `${config.urlBase}/assets/imgs/icons/expand_more_FILL0_wght300_GRAD0_opsz24.svg`;
            iconAccordion.setAttribute('class', 'header-accordion');

            let panelAccordion = document.createElement('div');
            panelAccordion.setAttribute('class', 'panel-accordion');

            let p2 = document.createElement('p');
            p2.innerHTML = values[index].content;
            
            headerAccordion.appendChild(p1);            
            headerAccordion.appendChild(iconAccordion);            
            panelAccordion.appendChild(p2);
            accordionButton.appendChild(headerAccordion);
            accordionButton.appendChild(panelAccordion);
            container.appendChild(accordionButton);            
        }   
        
    
    }


}

export default LayoutAccordion;