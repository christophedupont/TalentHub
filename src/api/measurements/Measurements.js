import APISettings from '../config.js';

const config= {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + APISettings.API_KEY
    }
};

export default {

    /*
     * This part would need improvement, like caching the data in local storage to avoid multiple calls to the API
     */
    
    questions( ){
        return fetch( APISettings.ENDPOINT_QUESTIONS,  {
            method: 'GET',
            headers: config.headers
        } )
        .then( function( response ){
            if( response.status != 200 ){
                throw response.status;
            }else{
                return response.json();
            }
        });
    },

    replies( ){
        return fetch( APISettings.ENDPOINT_REPLIES, {
            method: 'GET',
            headers: config.headers
        } )
        .then( function( response ){
            if( response.status != 200 ){
                throw response.status;
            }else{
                return response.json();
            }
        });
    }
}   