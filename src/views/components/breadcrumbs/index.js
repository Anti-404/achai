class LayoutBreadcrumbs{

    constructor(){}

    create(ul, values=[]){
        if(values.length <= 0) return;
        
        for (let index = 0; index < values.length; index++) {
            let a = document.createElement('a');            
            if(values[index].href !='none'){
                a.setAttribute('href', values[index].href);
            }

            a.textContent = values[index].name;

            let li = document.createElement('li');
            li.appendChild(a);
            
            ul.appendChild(li);
        }   
        
    
    }


}

export default LayoutBreadcrumbs;