import tabOrderHeader from "../../../components/headercontent/taborder/index.js";
import tabOrderFooter from "../../../components/footer/taborder/index.js";

const elementsListPanel =  [
    {selector: ".register-thing-button"},
    {selector: ".returned-thing-button"},
    {selector: ".manage-things-button"},
    {selector: "section h1"},            
    {selector: "#categories-list"},
    {selector: ".things-list a"},                      
               
]

const elementsList = [...tabOrderHeader, ...elementsListPanel, ...tabOrderFooter] ;

export default elementsList;