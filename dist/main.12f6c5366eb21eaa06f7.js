(()=>{"use strict";setTimeout((()=>{let e=document.querySelector(".cats__list"),t=document.querySelector(".cats__load");document.querySelector(".cats__add").style.display="block",t.innerHTML="",e.innerHTML="",console.log(e),fetch("https://sb-cats.herokuapp.com/api/2/SmirnovMaks/show").then((e=>e.json())).then((t=>{for(let s of t.data)e.innerHTML+=`<li class="cats__item"> <img class="cats__photo" src="${s.img_link}" alt = ""><h3 class="cats__name">${s.name}</h3></li>`}))}),5e3)})();