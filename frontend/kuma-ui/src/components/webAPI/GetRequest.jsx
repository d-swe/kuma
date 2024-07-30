function GetRequest({ url, onSuccess}) {

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log('Successfully retrieved:', data);
        onSuccess(data);
    })
    .catch(error => {
        console.error('Error retrieving:', error);
    })

}

export default GetRequest