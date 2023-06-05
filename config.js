let host = 'localhost'
let ssl = false;

const config =  {
    urlBase:(ssl)?`https://${host}/achai`:`http://${host}/achai`,        
}

export default config; 