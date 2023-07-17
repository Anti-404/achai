import tabOrderHeader from "../../../components/headercontent/taborder/index.js";
import tabOrderFooter from "../../../components/footer/taborder/index.js";

const elementsListCategories =  [   
    {selector: "#register-categories-button"},                                                
    {selector: ".td"},                       
                           
               
];

const elementsList = [...tabOrderHeader, ...elementsListCategories, ...tabOrderFooter] ;

export default elementsList;