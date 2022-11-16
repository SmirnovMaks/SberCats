const log = () => {

    class Cat {
        constructor(id, name, age, favorite, img_link) {
            this.id = id;
            this.age = age + ' y.o';
            this.name = name;
            this.favorite = favorite;
            this.img_link = img_link;
        }

    }








    const render = () => {
        let catCArds = document.querySelector('.cats__list')
        let catLoad = document.querySelector('.cats__load')
        let catAdd = document.querySelector('.cats__add')
        catAdd.style.display = 'block'
        catLoad.innerHTML = ''
        catCArds.innerHTML = ''
        console.log(catCArds);
        const DB = fetch('https://sb-cats.herokuapp.com/api/2/SmirnovMaks/show')
            .then(response => response.json())
            .then(data => {
                for (let el of data.data) {
                    catCArds.innerHTML += `<li class="cats__item"> <img class="cats__photo" src="${el.img_link}" alt = ""><h3 class="cats__name">${el.name}</h3></li>`
                }
            })
    }



    setTimeout(render, 5000)





}

export default log

// catCArds.innerHTML += `<li class="cats__item"> <img class="cats__photo" src="${el.img_link}" alt = ""><h3 class="cats__name">${el.name}</h3></li>`
// <i class="fa-solid fa-heart"></i>
// <i class="fa-regular fa-heart"></i>