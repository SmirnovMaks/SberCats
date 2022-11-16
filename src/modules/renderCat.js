const renderCat = () => {

    const renderCat = (cat, parent) => {
        let catLoad = document.querySelector('.cats__load')
        let catAdd = document.querySelector('.cats__add')
        catLoad.innerHTML = ''

        let like = ''
        cat.favourite === true ? like = '<i class="fa-solid fa-heart"></i>' : like = '<i class="fa-regular fa-heart"></i>';

        let img = ''
        if (cat.img_link) {
            img = cat.img_link
        } else {
            img = 'D:\Projects\SberCats\src\images\baseCat.png'
        }
        console.log(img);
        const card = document.createElement('li')
        card.className = 'cats__item'

        const catPhoto = document.createElement('div')
        catPhoto.className = 'cats__photo'
        if (cat.img_link) {
            catPhoto.style.backgroundImage = `url(${cat.img_link})`
        } else {

        }

        const catDesc = document.createElement('div')
        catDesc.className = 'cats__desc'

        const catName = document.createElement('h3')
        catName.className = 'cats__name'
        catName.textContent = cat.name

        const catLike = document.createElement('div')
        catLike.className = 'cats__like'
        catLike.innerHTML = like

        catDesc.append(catName, catLike)
        card.append(catPhoto, catDesc)

        // card.innerHTML = `<li class="cats__item"><img class="cats__photo" src="${img}" alt=""><div class="cats__desc"><h3 class="cats__name">${cat.name}   </h3><div class="cats__like">${like}</div></div></li>`

        document.querySelector('.cats__list').append(card)

        catAdd.style.display = 'block'

        let likeBtn = card.querySelector('i')

        likeBtn.addEventListener('click', (el) => {
            console.log(likeBtn.className);
            let data = {}
            if (likeBtn.className == "fa-solid fa-heart") {
                likeBtn.className = "fa-regular fa-heart"
                data = {
                    favourite: false
                }
            } else if (likeBtn.className == "fa-regular fa-heart") {
                likeBtn.className = "fa-solid fa-heart"
                data = {
                    favourite: true
                }
            }
            fetch('https://sb-cats.herokuapp.com/api/2/SmirnovMaks/update/' + cat.id, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        })
    }
    let catsList = document.querySelector('.cats__list')

    fetch('https://sb-cats.herokuapp.com/api/2/SmirnovMaks/show')
        .then(res => res.json())
        .then(cats => {
            cats.data.forEach(cat => {
                renderCat(cat, catsList)
            })
        })








































    // class Cats {
    //     constructor(id, name, age, favourite, img_link) {
    //         this.id = id;
    //         this.name = name;
    //         this.age = age;
    //         this.favourite = favourite;
    //         this.img_link = img_link;
    //     }
    //     render() {
    //         let like = ''
    //         this.favourite === true ? like = '<i class="fa-solid fa-heart"></i>' : like = '<i class="fa-regular fa-heart"></i>';

    //         const card = document.createElement('li')
    //         card.innerHTML = `<li class="cats__item"><img class="cats__photo" src="${this.img_link}" alt=""><div class="cats__desc"><h3 class="cats__name">${this.name}   </h3><div class="cats__like">${like}</div></div></li>`

    //         document.querySelector('.cats__list').append(card)
    //     }
    //     updateLike() {

    //     }
    //     addListeners() {
    //         document.querySelectorAll('.cats__like').forEach(el => {
    //             el.addEventListener('click', e => {
    //                 console.log(1);
    //                 let data = {}
    //                 if (this.favourite === true) {
    //                     el.innerHTML = '<i class="fa-regular fa-heart"></i>'
    //                     data = {
    //                         favourite: false
    //                     }
    //                     fetch('https://sb-cats.herokuapp.com/api/2/SmirnovMaks/update/' + this.id, {
    //                         method: 'PUT',
    //                         body: JSON.stringify(data),
    //                         headers: {
    //                             'Content-type': 'application/json; charset=UTF-8',
    //                         },
    //                     })
    //                     this.updateLike()
    //                 } else if (this.favourite === false) {
    //                     el.innerHTML = '<i class="fa-solid fa-heart"></i>'
    //                     data = {
    //                         favourite: true
    //                     }
    //                     fetch('https://sb-cats.herokuapp.com/api/2/SmirnovMaks/update/' + this.id, {
    //                         method: 'PUT',
    //                         body: JSON.stringify(data),
    //                         headers: {
    //                             'Content-type': 'application/json; charset=UTF-8',
    //                         },
    //                     })
    //                     this.updateLike()
    //                 }
    //             })
    //         })
    //     }
    //     init() {
    //         this.render()
    //         this.addListeners()
    //     }

    // }

    // const getData = () => {
    //     let catCArds = document.querySelector('.cats__list')
    //     let catLoad = document.querySelector('.cats__load')
    //     let catAdd = document.querySelector('.cats__add')
    //     catLoad.innerHTML = ''
    //     catCArds.innerHTML = ''

    //     fetch('https://sb-cats.herokuapp.com/api/2/SmirnovMaks/show')
    //         .then(response => response.json())
    //         .then(data => {
    //             data = data.data
    //             data.forEach(cat => {
    //                 let like = ''
    //                 cat.favourite === true ? like = '<i class="fa-solid fa-heart"></i>' : like = '<i class="fa-regular fa-heart"></i>';

    //                 catCArds.innerHTML += `<li class="cats__item"><img class="cats__photo" src="${cat.img_link}" alt=""><div class="cats__desc"><h3 class="cats__name">${cat.name}   </h3><div class="cats__like">${like}</div></div></li>`



    //                 const likeBtns = document.querySelectorAll('.cats__like')
    //                 likeBtns.forEach(el => {
    //                     el.addEventListener('click', e => {
    //                         console.log(1);
    //                         let data = {}
    //                         if (cat.favourite == true) {
    //                             el.innerHTML = '<i class="fa-regular fa-heart"></i>'
    //                             data = {
    //                                 favourite: false
    //                             }

    //                         } else if (cat.favourite == false) {
    //                             el.innerHTML = '<i class="fa-solid fa-heart"></i>'
    //                             data = {
    //                                 favourite: true
    //                             }
    //                         }
    //                         fetch('https://sb-cats.herokuapp.com/api/2/SmirnovMaks/update/' + cat.id, {
    //                             method: 'PUT',
    //                             body: JSON.stringify(data),
    //                             headers: {
    //                                 'Content-Type': 'application/json',
    //                             },
    //                         })
    //                     })
    //                 })
    //             })
    //             catAdd.style.display = 'block'
    //         })
    //         .catch(err => {
    //             document.querySelector('.cats__load').textContent = 'Что-то пошло не так. Пожалуйста обновите страницу'
    //         })
    // }

    // const likeBtn = document.querySelectorAll('.cats__like')
    // likeBtn.forEach(el => {
    //     el.addEventListener('click', e => {
    //         let data = {}
    //         if (el.favourite === true) {
    //             el.innerHTML = '<i class="fa-regular fa-heart"></i>'
    //             data = {
    //                 favourite: false
    //             }
    //             fetch('https://sb-cats.herokuapp.com/api/2/SmirnovMaks/update/' + this.id, {
    //                 method: 'PUT',
    //                 body: JSON.stringify(data),
    //                 headers: {
    //                     'Content-type': 'application/json; charset=UTF-8',
    //                 },
    //             })
    //             this.updateLike()
    //         } else if (this.favourite === false) {
    //             el.innerHTML = '<i class="fa-solid fa-heart"></i>'
    //             data = {
    //                 favourite: true
    //             }
    //             fetch('https://sb-cats.herokuapp.com/api/2/SmirnovMaks/update/' + this.id, {
    //                 method: 'PUT',
    //                 body: JSON.stringify(data),
    //                 headers: {
    //                     'Content-type': 'application/json; charset=UTF-8',
    //                 },
    //             })
    //             this.updateLike()
    //         })
    // })

    // setTimeout(getData, 2000)
    // getData()

}

export default renderCat

// catCArds.innerHTML += `<li class="cats__item"> <img class="cats__photo" src="${el.img_link}" alt = ""><h3 class="cats__name">${el.name}</h3></li>`
// <i class="fa-solid fa-heart"></i>
// <i class="fa-regular fa-heart"></i>