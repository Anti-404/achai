import tabOrderHeader from "../../../../components/headercontent/taborder/index.js";
import tabOrderFooter from "../../../../components/footer/taborder/index.js";

const elementsListDiscard =  [                         
    {selector: ".files-zip-button"},         
    {selector: ".things-list a"},         
    {selector: ".files-zip-list a"},         
    {selector: ".files-zip-list img"},         
];

const elementsList = [...tabOrderHeader, ...elementsListDiscard, ...tabOrderFooter] ;

export default elementsList;