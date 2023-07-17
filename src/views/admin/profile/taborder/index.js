import tabOrderHeader from "../../../components/headercontent/taborder/index.js";
import tabOrderFooter from "../../../components/footer/taborder/index.js";

const elementsListProfile =  [                         
    {selector: ".profile-content-top"},          
    {selector: ".span-email"},           
    {selector: ".label-email"},           
    {selector: "#email"},          
    {selector: ".span-password"},          
    {selector: "#password"},          
    {selector: "#exit-button"},          
];

const elementsList = [...tabOrderHeader, ...elementsListProfile, ...tabOrderFooter] ;

export default elementsList;