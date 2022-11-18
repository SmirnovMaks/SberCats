import { Cats } from './cat'
import api from './api'

const addCat = () => {
    const addCatBtn = document.querySelector('.add__cat')

    addCatBtn.addEventListener('click', (e) => {
        e.preventDefault()
        const form = document.querySelector('.modal')
        const inputName = form.querySelector('.inputName')
        const inputPhoto = form.querySelector('.inputPhoto')
        const inputDesc = form.querySelector('.inputDesc')
        const inputAge = form.querySelector('.inputAge')
        let data = {
            id: Math.ceil(Math.random() * 100 + 100),
            favourite: false,
            rate: 1,
        }
        if (inputName.value && inputPhoto.value && inputDesc.value && inputAge.value) {

            data.name = inputName.value
            data.img_link = inputPhoto.value
            data.description = inputDesc.value
            data.age = +inputAge.value
            fetch('https://sb-cats.herokuapp.com/api/2/SmirnovMaks/add', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            form.style.display = 'none'

        }

    })

    api.getCats()
        .then(data => {
            data = data.data
            data.forEach(el => {
                new Cats(el.id, el.name, el.age, el.favourite, el.img_link, el.description, el.rate).init()
            })
        })
}

export default addCat