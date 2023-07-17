import config from '../../../../config.js';

class LayoutHelpInformation{

    constructor(){}

    create(container){ 
            
        let imgHelpInfoIcon = document.createElement("img");
        imgHelpInfoIcon.setAttribute('src',`${config.urlBase}/assets/imgs/icons/chat_bubble_FILL0_wght300_GRAD0_opsz24.svg`);
        imgHelpInfoIcon.setAttribute('class','img-help-icon');
        imgHelpInfoIcon.setAttribute('alt','duvidas');
        
        let title = document.createElement("p");
        title.setAttribute('class','title');
        title.textContent = 'Tem dúvidas?';
        
        let content = document.createElement("p");
        content.textContent = 'Encontre aqui respostas às perguntas mais frequentes.';
        content.setAttribute('class','content');
        let knowMore = document.createElement("a");
        knowMore.textContent = 'Saiba mais';
        knowMore.setAttribute('href',`${config.urlBase}/src/views/users/information/`)
        
        container.appendChild(imgHelpInfoIcon);        
        container.appendChild(title);        
        container.appendChild(content);        
        container.appendChild(knowMore);        
    
    }

}

export default LayoutHelpInformation;