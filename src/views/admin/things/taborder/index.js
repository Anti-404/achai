import tabOrderHeader from "../../../components/headercontent/taborder/index.js";
import tabOrderFooter from "../../../components/footer/taborder/index.js";

const elementsListThings =  [                                   
     {selector: ".categories-panel ul li a"},       
]

const elementsList = [...tabOrderHeader, ...elementsListThings, ...tabOrderFooter] ;

export default elementsList;