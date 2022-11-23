import { Cats } from './cat'
import { api } from './api'

const addCat = () => {
    const form = document.forms.addCat

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let data = Object.fromEntries(new FormData(form).entries())
        data.id = +data.id
        data.age = +data.age
        data.favourite = data.favourite === 'on'




        api.addCat(data)
            .then(res => {
                if (res.message == 'ok') {
                    new Cats(data.id, data.name, data.age, data.favourite, data.img_link, data.description, data.rate)
                    document.querySelector('.modal').style.display = 'none'
                    document.querySelector('main').style.filter = ''
                    form.reset()
                } else {
                    const h3 = document.createElement('h3')
                    h3.textContent = 'Этот id занят'
                    form.append(h3)
                    setTimeout(() => {
                        h3.remove()
                    }, 1500)
                }
            })
    })

    api.getCats()
        .then(data => {
            data.data.forEach(el => {

                new Cats(el.id, el.name, el.age, el.favourite, el.img_link, el.description, el.rate)
            })
        })
}

export default addCat