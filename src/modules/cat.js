import api from './api'

import {
    animate
} from './helpers';

export class Cats {
    constructor(id, name, age, favourite, img_link, description, rate) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.favourite = favourite;
        this.img_link = img_link;
        this.description = description,
            this.rate = rate
    }

    renderCatCard() {
        document.querySelector('.cats__load').innerHTML = ''
        document.querySelector('.cats__add').style.display = 'block'

        const card = document.createElement('li')
        card.id = this.id
        card.className = `cat_${this.id}`
        card.innerHTML = `<li class="cats__item"><div class="cats__photo"></div><div class="cats__desc"><h3 class="cats__name">${this.name}   </h3><div class="cats__rate"></div></div></li>`

        document.querySelector('.cats__list').append(card)

        this.img_link ? card.querySelector('.cats__photo').style.backgroundImage = `url(${this.img_link})` : ''

        for (let i = 0; i < 10; i++) {
            let icon = document.createElement('i')
            if (i < this.rate) {
                icon.className = 'fa-solid fa-star'
            } else {
                icon.className = 'fa-regular fa-star'
            }
            card.querySelector(`.cats__rate`).append(icon)
        }
    }

    renderCatModal() {
        const catModal = document.createElement('div')
        catModal.className = `cat__modal cat__modal-${this.id}`
        catModal.style.display = 'none'

        let like = ''
        this.favourite ? like = '<i class="fa-solid fa-heart"></i>' : like = '<i class="fa-regular fa-heart"></i>';

        let photo = this.img_link
        if (!this.img_link) {
            photo = `../images/baseCat.png`
        }

        catModal.innerHTML = `<div class="cat__modal-wrapper"><div class="modal__close"><i class="fa-solid fa-xmark"></i>
                </div><div class="cat__modal-photo"><img src="${photo}" alt="Cat"></div><div class="cat__modal-info"><h2 class="cat__modal-name">${this.name}</h2><div class="cat__modal-like">${like}</div><div class="cat__modal-description">${this.description}</div><button class="cat__modal-update">Изменить</button><button class="cat__modal-delete">Удалить</button></div></div>`
        document.body.append(catModal)
    }

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

    addListeners() {
        const card = document.querySelector(`.cat_${this.id}`)
        const modal = document.querySelector(`.cat__modal-${this.id}`)

        card.addEventListener('click', () => {
            modal.style.display = 'block'
            animate({
                duration: 300,
                timing(timeFraction) {
                    return timeFraction;
                },
                draw(progress) {
                    modal.querySelector('.cat__modal-wrapper').style.opacity = progress;
                }
            })
        })

        modal.addEventListener('click', e => {
            if (e.target == modal.querySelector('.cat__modal-delete')) {
                modal.style.display = 'none'
                card.remove()
                modal.remove()
                api.deleteCat(this.id)
                card.removeEventListener()
                modal.removeEventListener()
            } else if (e.target.closest('.modal__close')) {
                modal.style.display = 'none'
            } else if (e.target.closest('.cat__modal-update')) {
                console.log(2);
            } else if (!e.target.closest('.cat__modal-wrapper')) {
                modal.style.display = 'none'
            } else if (e.target.closest('.cat__modal-like')) {

            }
        })



    }
    init() {
        this.renderCatCard()
        this.renderCatModal()
        this.addListeners()
        this.updateLike()
    }

}




