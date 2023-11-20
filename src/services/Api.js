window.registerUser = (url, user) => {
    //FormData é uma classe responsável por interagir com o back-end
    const formData = new FormData();

    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('gender', user.gender);
    formData.append('image', user.image);
    formData.append('password', user.password);
    formData.append('confirmPassword', user.confirmPassword);

    return fetch(url, {
        method: 'POST',
        body: formData
    })

}

window.login = (url, user) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-type': 'application/json' }
    })
}

window.validateToken = (url, token) => {
    return fetch(url, {
        method: 'GET',
        headers: { 
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}

window.downloadImg = (url, param) => {
    return fetch(url, {
        method: 'GET',
        headers: {
            'imgName': param
        }
    })
}

window.registerItem = (url, data) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    })
}