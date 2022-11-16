const renderCat = () => {

    class Cats {
        constructor(id, name, age, favourite, img_link) {
            this.id = id;
            this.name = name;
            this.age = age;
            this.favourite = favourite;
            this.img_link = img_link;
        }
        render() {
            let like = ''
            this.favourite === true ? like = '<i class="fa-solid fa-heart"></i>' : like = '<i class="fa-regular fa-heart"></i>';

            const card = document.createElement('li')
            card.innerHTML = `<li class="cats__item"><img class="cats__photo" src="${this.img_link}" alt=""><div class="cats__desc"><h3 class="cats__name">${this.name}   </h3><div class="cats__like">${like}</div></div></li>`

            document.querySelector('.cats__list').append(card)
        }
        updateLike() {

        }
        addListeners() {
            document.querySelectorAll('.cats__like').forEach(el => {
                el.addEventListener('click', e => {
                    console.log(1);
                    let data = {}
                    if (this.favourite === true) {
                        el.innerHTML = '<i class="fa-regular fa-heart"></i>'
                        data = {
                            favourite: false
                        }
                        fetch('https://sb-cats.herokuapp.com/api/2/SmirnovMaks/update/' + this.id, {
                            method: 'PUT',
                            body: JSON.stringify(data),
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8',
                            },
                        })
                        this.updateLike()
                    } else if (this.favourite === false) {
                        el.innerHTML = '<i class="fa-solid fa-heart"></i>'
                        data = {
                            favourite: true
                        }
                        fetch('https://sb-cats.herokuapp.com/api/2/SmirnovMaks/update/' + this.id, {
                            method: 'PUT',
                            body: JSON.stringify(data),
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8',
                            },
                        })
                        this.updateLike()
                    }
                })
            })
        }
        init() {
            this.render()
            this.addListeners()
        }

    }

    let ll

    const getData = () => {
        let catCArds = document.querySelector('.cats__list')
        let catLoad = document.querySelector('.cats__load')
        let catAdd = document.querySelector('.cats__add')
        catLoad.innerHTML = ''
        catCArds.innerHTML = ''

        fetch('https://sb-cats.herokuapp.com/api/2/SmirnovMaks/show')
            .then(response => response.json())
            .then(data => {
                data = data.data
                data.forEach(cat => {
                    new Cats(cat.id, cat.name, cat.age, cat.favourite, cat.img_link).init()

                })
                catAdd.style.display = 'block'
            })
            .catch(err => {
                document.querySelector('.cats__load').textContent = 'Что-то пошло не так. Пожалуйста обновите страницу'
            })
    }

    setTimeout(getData, 2000)
    // getData()

}

export default renderCat

// catCArds.innerHTML += `<li class="cats__item"> <img class="cats__photo" src="${el.img_link}" alt = ""><h3 class="cats__name">${el.name}</h3></li>`
// <i class="fa-solid fa-heart"></i>
// <i class="fa-regular fa-heart"></i>