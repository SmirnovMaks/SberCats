import { Cats } from './cat'
import api from './api'

const addCat = () => {
    const addCatBtn = document.querySelector('.add__cat')

    addCatBtn.addEventListener('submit', (e) => {
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
        // if (inputName.value && inputPhoto.value && inputDesc.value && inputAge.value) {
        data.name = inputName.value
        data.img_link = inputPhoto.value
        data.description = inputDesc.value
        data.age = +inputAge.value

        api.addCat(data)

        new Cats(data.id, data.name, data.age, data.favourite, data.img_link, data.description, data.rate).init()
        form.style.display = 'none'
        // }

    })

    api.getCats()
        .then(data => {
            data = data.data
            data.forEach(el => {
                new Cats(el.id, el.name, el.age, el.favourite, el.img_link, el.description, el.rate)
            })
        })
}

export default addCat