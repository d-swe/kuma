async function GetRequest<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Promise<T> = await response.json();
    console.log(data)
    return data;
}

export default GetRequest;