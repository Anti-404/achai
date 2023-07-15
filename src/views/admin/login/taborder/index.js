import tabOrderHeader from "../../../components/headercontent/taborder/index.js";
import tabOrderFooter from "../../../components/footer/taborder/index.js";

const elementsListCurrent =  [                             
    {selector: "#img-logo"},
    {selector: "label[for='user']"},
    {selector: "#user"},
    {selector: "#labelPassword"},
    {selector: "#password"},
    {selector: "#recover-password-button"},
    {selector: "#confirm-button"},
];

const elementsList = [...tabOrderHeader, ...elementsListCurrent, ...tabOrderFooter] ;

export default elementsList;