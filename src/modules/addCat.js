import { Cats } from './cat'
import api from './api'

const addCat = () => {
    const form = document.forms.addCat

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let data = Object.fromEntries(new FormData(form).entries())
        data.id = +data.id
        data.age = +data.age
        data.favourite = data.favourite === 'on'
        console.log(data);



        api.addCat(data)

        new Cats(data.id, data.name, data.age, data.favourite, data.img_link, data.description, data.rate)
        document.querySelector('.modal').style.display = 'none'
        document.querySelector('main').style.filter = ''
        form.reset()
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