import api from './api'

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
    renderCatModal() {
        const catModal = document.createElement('div')
        catModal.className = `cat__modal cat__modal-${this.id}`
        catModal.style.display = 'none'

        let like = ''
        this.favourite ? like = '<i class="fa-solid fa-heart"></i>' : like = '<i class="fa-regular fa-heart"></i>';

        let photo = ''
        this.img_link ? photo = `<img src="${this.img_link}" alt="Cat"></img>` : photo = `<div class='base__img'></div>`


        catModal.innerHTML = `<div class="cat__modal-wrapper"><div class="modal__close"><i class="fa-solid fa-xmark"></i>
                </div><div class="cat__modal-photo">${photo}</div><div class="cat__modal-info"><h2 class="cat__modal-name">${this.name}</h2><p class='cat__modal-age'>${this.age} y.o.</p></p><div class="cat__modal-like">${like}</div><div class="cat__modal-description">${this.description}</div><div class="cat__modal-buttons"><div class="cat__modal-btn"><i class="cat__modal-btn fa-solid fa-pen-to-square"></i></div><div class="cat__modal-btn"><i class="cat__modal-delete fa-solid fa-trash"></i></div></div></div></div>`
        document.body.append(catModal)
    }
    //<i class="fa-solid fa-square-check"></i>

    updateLike() {
        const modal = document.querySelector(`.cat__modal-${this.id}`)
        modal.querySelector(`.cat__modal-like`).addEventListener('click', () => {

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
                modal.style.display = 'none'
                document.querySelector('main').style.filter = ''
            } else if (e.target.closest('.cat__modal-update')) {
                console.log(2);
            } else if (!e.target.closest('.cat__modal-wrapper')) {
                modal.style.display = 'none'
                document.querySelector('main').style.filter = ''
            } else if (e.target.closest('.cat__modal-like')) {

            }
        })

    }

    init() {
        this.renderCatModal()
        this.updateLike()
        this.addListener()
    }
}