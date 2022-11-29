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

    async addCat(data) {
        const res = await fetch(`${this.url}/add`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        return res.json()
    }

    async getCatById(id) {
        const res = await fetch(`${this.url}/show/${id}`)
        return res.json()
    }

    deleteCat(id) {
        fetch(`${this.url}/delete/${id}`, {
            method: 'DELETE'
        })
    }
}

const api = new API(`https://sb-cats.herokuapp.com/api/2/SmirnovMaks`)

export { api }