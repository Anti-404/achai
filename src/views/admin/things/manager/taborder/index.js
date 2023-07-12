import tabOrderHeader from "../../../../components/headercontent/taborder/index.js";
import tabOrderFooter from "../../../../components/footer/taborder/index.js";

const elementsListCurrent =  [                         
    {selector: "#categories-list"},            
    {selector: "#register-things-button"},            
    {selector: "main .container .things-list a"},
];

const elementsList = [...tabOrderHeader, ...elementsListCurrent, ...tabOrderFooter] ;

export default elementsList;