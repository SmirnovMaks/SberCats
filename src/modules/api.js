class API {
    constructor(url, userName) {
        this.url = url
    }

    async getCats() {
        const res = await fetch(`${this.url}/show`)

        return res.json()
    }

    updateCat(data, id) {
        fetch(`${this.url}/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }

    addCat(data) {
        fetch('https://sb-cats.herokuapp.com/api/2/SmirnovMaks/add', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }

    async getCatById(id) {
        const res = await fetch(`${this.url}/show/${id}`)
        console.log(2);
        return res.json()
    }

    deleteCat(id) {
        fetch(`${this.url}/delete/${id}`, {
            method: 'DELETE'
        })
    }
}

const api = new API('https://sb-cats.herokuapp.com/api/2/SmirnovMaks')

export default api