function ApiRequest({ url, formData, requestType }) {
    
    fetch(url,  {
        method: requestType,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Request Successful:', data);
    })
    .catch(error => {
        console.error('Request Failed:', error);
    })
}

export default ApiRequest
