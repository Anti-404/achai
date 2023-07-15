import tabOrderHeader from "../../../../components/headercontent/taborder/index.js";
import tabOrderFooter from "../../../../components/footer/taborder/index.js";

const elementsListManager=  [                         
    {selector: "#categories-list"},            
    {selector: "#register-things-button"},            
    {selector: "main .container .things-list a"},
];

const elementsList = [...tabOrderHeader, ...elementsListManager, ...tabOrderFooter] ;

export default elementsList;