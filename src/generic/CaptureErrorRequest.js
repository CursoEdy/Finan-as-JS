const captureErrorRequest = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}