class LayoutAccordion{

    constructor(){}

    async create(container, values=[]){
        if(values.length <= 0) return;
        
        for (let index = 0; index < values.length; index++) {
            let accordionButton = document.createElement('button');
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


}

export default LayoutAccordion;