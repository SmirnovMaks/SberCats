import { api } from './api'
import { CatModal } from './catModal';

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
            this.rate = rate,
            this.init()
    }

    renderCatCard() {
        document.querySelector('.cats__load').innerHTML = ''
        document.querySelector('.cats__add').style.display = 'block'

        const card = document.createElement('li')
        card.id = this.id
        card.className = `cat_${this.id}`
        card.innerHTML = `<li class="cats__item"><div class="cats__photo"></div><div class="cats__desc"><h3 class="cats__name">${this.name}   </h3><div class='cats__rate-wrapper'><div class='minus'><i class="fa-solid fa-minus"></i></div><div class="cats__rate"></div><div class='plus'><i class="fa-solid fa-plus"></i></div></div></div></li>`

        document.querySelector('.cats__list').append(card)

        this.img_link ? card.querySelector('.cats__photo').style.backgroundImage = `url(${this.img_link})` : ''

        this.calculateRateAndShowOnHTML(this.rate)

        const catModal = new CatModal(this.id,
            this.name,
            this.age,
            this.favourite,
            this.img_link,
            this.description,
            this.rate)
    }

    calculateRateAndShowOnHTML(rate) {
        const card = document.querySelector(`.cat_${this.id}`)
        const rateWrapper = card.querySelector(`.cats__rate`)
        rateWrapper.innerHTML = ''
        for (let i = 0; i < 10; i++) {
            let icon = document.createElement('i')
            if (i < rate) {
                icon.className = 'fa-solid fa-star'
            } else {
                icon.className = 'fa-regular fa-star'
            }
            rateWrapper.append(icon)
        }
    }

    addListeners() {
        const card = document.querySelector(`.cat_${this.id}`)
        const modal = document.querySelector(`.cat__modal-${this.id}`)

        const ratePlus = () => {
            if (this.rate === null || !this.rate || isNaN(this.rate)) {
                this.rate = 0
            }
            if (this.rate != 10) {
                this.rate++
                this.calculateRateAndShowOnHTML(this.rate)
                let data = {
                    rate: this.rate
                }
                api.updateCat(data, this.id)
            }
        }

        const rateMinus = () => {
            if (this.rate != 1) {
                this.rate--
                this.calculateRateAndShowOnHTML(this.rate)
                let data = {
                    rate: this.rate
                }
                api.updateCat(data, this.id)
            }
        }

        card.addEventListener('click', (e) => {
            if (e.target.closest('.plus')) {
                ratePlus()

            } else if (e.target.closest('.minus')) {
                rateMinus()
            } else {
                modal.style.display = 'block'
                document.querySelector('main').style.filter = 'blur(3px)'
                animate({
                    duration: 500,
                    timing(timeFraction) {
                        return timeFraction;
                    },
                    draw(progress) {
                        modal.querySelector('.cat__modal-wrapper').style.opacity = progress;
                    }
                })
            }
        })
    }

    init() {
        this.renderCatCard()
        this.addListeners()
    }
}




