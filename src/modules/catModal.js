import { api } from './api'

export class CatModal {
    constructor(id, name, age, favourite, img_link, description, rate) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.favourite = favourite;
        this.img_link = img_link;
        this.description = description,
            this.rate = rate,
            this.init()
    }

    //  sorry for this.shit

    renderCatModal() {
        const catModal = document.createElement('div')
        catModal.className = `cat__modal cat__modal-${this.id}`
        catModal.style.display = 'none'

        let like = this.favourite ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>'


        let photo = this.img_link ? `<img src="${this.img_link}" alt="Cat"></img>` : `<div class='base__img'></div>`


        let description = this.description ? this.description : ''


        catModal.innerHTML = `<div class="cat__modal-wrapper"><div class="modal__close"><i class="fa-solid fa-xmark"></i>
                </div><div class="cat__modal-photo">${photo}</div><div class="cat__modal-info"><div class='cat__wrapper'><h2 class="cat__modal-name">${this.name}</h2><p class='cat__modal-age'>${this.age} y.o.</p></p><div class="cat__modal-like">${like}</div><div class="cat__modal-description"><p>${description}</p></div><div class="cat__modal-buttons"><div class="cat__modal-btn change__info"><i class="cat__modal-btn fa-solid fa-pen-to-square"></i></div><div class="cat__modal-btn"><i class="cat__modal-delete fa-solid fa-trash"></i></div></div></div></div></div>`
        document.body.append(catModal)
    }

    createFormOfChangeInfo() {
        const modal = document.querySelector(`.cat__modal-${this.id}`)

        const form = document.createElement('form')
        const title = document.createElement('h3')
        const inputName = document.createElement('input')
        const inputAge = document.createElement('input')
        const inputDescription = document.createElement('textarea')
        const inputPhoto = document.createElement('input')
        const submit = document.createElement('button')
        const buttons = document.createElement('div')
        const cancel = document.createElement('div')
        title.textContent = 'Изменить информацию'
        submit.type = 'submit'
        cancel.className = 'cat__modal-cancel'
        buttons.className = 'd-flex'

        form.className = 'change__form'
        form.id = 'form_' + this.id
        form.style.display = 'none'

        inputName.className = 'modal__input name'
        inputName.value = this.name
        inputName.placeholder = 'Имя кота'

        inputAge.className = 'modal__input age'
        inputAge.type = 'number'
        inputAge.value = this.age
        inputAge.placeholder = 'Возраст кота'

        inputDescription.className = 'modal__desc modal__input descr'
        inputDescription.value = this.description
        inputDescription.placeholder = 'Описание кота'

        inputPhoto.className = 'modal__input photo'
        inputPhoto.value = this.img_link
        inputPhoto.placeholder = 'Ссылка на фото кота'

        submit.innerHTML = '<i class="cat__modal-btn fa-solid fa-square-check"></i>'
        cancel.innerHTML = '<i class="cat__modal-btn fa-solid fa-square-xmark"></i>'
        buttons.append(submit, cancel)
        form.append(title, inputName, inputAge, inputDescription, inputPhoto, buttons)
        modal.querySelector('.cat__modal-info').append(form)
    }

    updateLike() {
        const modal = document.querySelector(`.cat__modal-${this.id}`)
        let data = {
            favourite: true
        }
        if (modal.querySelector('.cat__modal-like i').className == 'fa-regular fa-heart') {
            modal.querySelector('.cat__modal-like i').className = 'fa-solid fa-heart'
            data.favourite = true

        } else if (modal.querySelector('.cat__modal-like i').className == 'fa-solid fa-heart') {
            modal.querySelector('.cat__modal-like i').className = 'fa-regular fa-heart'
            data.favourite = false
        }
        api.updateCat(data, this.id)


    }

    changeInfoOfCat() {
        const modal = document.querySelector(`.cat__modal-${this.id}`)
        const name = modal.querySelector('.cat__modal-name')
        const photo = modal.querySelector('.cat__modal-photo')
        const description = modal.querySelector('.cat__modal-description')
        const age = modal.querySelector('.cat__modal-age')

        const form = document.querySelector(`#form_${this.id}`)
        const inputName = form.querySelector('.name')
        const inputAge = form.querySelector('.age')
        const inputDescription = form.querySelector('.descr')
        const inputPhoto = form.querySelector('.photo')
        const cancel = form.querySelector('.cat__modal-cancel')

        inputName.value = this.name
        inputAge.value = this.age
        inputDescription.value = this.description
        inputPhoto.value = this.img_link

        cancel.addEventListener('click', e => {
            form.style.display = 'none'
            modal.querySelector('.cat__wrapper').style.display = 'flex'
        })


        form.addEventListener('submit', (e) => {
            e.preventDefault()

            const card = document.querySelector(`.cat_${this.id}`)
            const cardName = card.querySelector('.cats__name')
            const cardPhoto = card.querySelector('.cats__photo')

            let data = {}
            inputName.value ? (data.name = inputName.value, name.textContent = data.name, cardName.textContent = data.name, this.name = inputName.value) : ''
            inputAge.value ? (data.age = +inputAge.value, age.textContent = inputAge.value + ' y.o.', this.age = inputAge.value) : ''
            inputDescription.value ? (data.description = inputDescription.value, description.textContent = inputDescription.value, this.description = inputDescription.value) : ''
            inputPhoto.value ? (data.img_link = inputPhoto.value, photo.innerHTML = `<img src="${inputPhoto.value}" alt="Cat"></img>`, cardPhoto.style.backgroundImage = `url(${data.img_link})`, this.img_link = inputPhoto.value) : ''

            api.updateCat(data, this.id)
            modal.querySelector('.cat__wrapper').style.display = 'flex'
            form.style.display = 'none'
            form.reset()

        })
    }

    addListener() {
        const card = document.querySelector(`.cat_${this.id}`)
        const modal = document.querySelector(`.cat__modal-${this.id}`)


        modal.addEventListener('click', e => {
            if (e.target == modal.querySelector('.cat__modal-delete')) {
                modal.style.display = 'none'
                document.querySelector('main').style.filter = ''
                card.remove()
                modal.remove()
                api.deleteCat(this.id)
            } else if (e.target.closest('.modal__close')) {
                const form = modal.querySelector(`#form_${this.id}`)
                modal.querySelector('.cat__wrapper').style.display = 'flex'
                form.style.display = 'none'
                modal.style.display = 'none'
                document.querySelector('main').style.filter = ''
            } else if (!e.target.closest('.cat__modal-wrapper')) {
                const form = modal.querySelector(`#form_${this.id}`)
                modal.querySelector('.cat__wrapper').style.display = 'flex'
                form.style.display = 'none'
                modal.style.display = 'none'
                document.querySelector('main').style.filter = ''
            } else if (e.target.closest('.cat__modal-like')) {
                this.updateLike()
            } else if (e.target.closest('.cat__modal-cancel')) {

            } else if (e.target.closest('.change__info')) {
                const form = modal.querySelector(`#form_${this.id}`)
                modal.querySelector('.cat__wrapper').style.display = 'none'
                form.style.display = 'flex'
                this.changeInfoOfCat()
            }
        })

    }

    init() {
        this.renderCatModal()
        this.addListener()
        this.createFormOfChangeInfo()
    }
}
