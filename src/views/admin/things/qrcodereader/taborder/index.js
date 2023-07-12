import tabOrderHeader from "../../../../components/headercontent/taborder/index.js";
import tabOrderFooter from "../../../../components/footer/taborder/index.js";

const elementsListCurrent =  [                         
    {selector: "#preview"}, 
];

const elementsList = [...tabOrderHeader, ...elementsListCurrent, ...tabOrderFooter] ;

export default elementsList;