
export default class HelperTabOrder{   
    static order = '1';
    static resetOrder = '-1';

    constructor(){}

    static setTabOrder(elementsList=[{selector:''}]){  
        
        elementsList.forEach((item)=>{
            let element = document.querySelectorAll(`${item.selector}`);                        
            if(element.length > 1){                                
                element.forEach((item2)=>{
                    item2.setAttribute('tabindex', HelperTabOrder.order);
                    ++HelperTabOrder.order;                    
                })
                
            }else if(typeof element[0] !== 'undefined'){                                
                element[0].setAttribute('tabindex',HelperTabOrder.order);
                ++HelperTabOrder.order;                               
            }
        })


    }

    static resetTabOrder(elementsList=[{selector:''}]){   

        elementsList.forEach((item)=>{
            let element = document.querySelectorAll(`${item.selector}`);

            if(element.length > 1){                                
                element.forEach((item2)=>{
                    item2.setAttribute('tabindex',HelperTabOrder.resetOrder);                    
                })
                
            }else if(typeof element[0] !== 'undefined'){
                element[0].setAttribute('tabindex',HelperTabOrder.resetOrder);                  
            }
        })

        HelperTabOrder.order = '1';

    }
}