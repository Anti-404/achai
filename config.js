let host = 'localhost'
let ssl = false;

//host = 'achai404.000webhostapp.com';
//ssl = true;

const config =  {
    urlBase:(ssl)?`https://${host}/achai`:`http://${host}/achai`,        
}

export default config; 