(()=>{"use strict";const e=({timing:e,draw:t,duration:a})=>{let i=performance.now();requestAnimationFrame((function s(l){let c=(l-i)/a;c>1&&(c=1);let r=e(c);t(r),c<1&&requestAnimationFrame(s)}))},t=new class{constructor(e,t){this.url=e}async getCats(){return(await fetch(`${this.url}/show`)).json()}updateCat(e,t){fetch(`${this.url}/update/${t}`,{method:"PUT",body:JSON.stringify(e),headers:{"Content-type":"application/json; charset=UTF-8"}})}async addCat(e){return(await fetch(`${this.url}/add`,{method:"POST",body:JSON.stringify(e),headers:{"Content-type":"application/json; charset=UTF-8"}})).json()}async getCatById(e){return(await fetch(`${this.url}/show/${e}`)).json()}deleteCat(e){fetch(`${this.url}/delete/${e}`,{method:"DELETE"})}}("https://sb-cats.herokuapp.com/api/2/SmirnovMaks");class a{constructor(e,t,a,i,s,l,c){this.id=e,this.name=t,this.age=a,this.favourite=i,this.img_link=s,this.description=l,this.rate=c,this.init()}renderCatModal(){const e=document.createElement("div");e.className=`cat__modal cat__modal-${this.id}`,e.style.display="none";let t=this.favourite?'<i class="fa-solid fa-heart"></i>':'<i class="fa-regular fa-heart"></i>',a=this.img_link?`<img src="${this.img_link}" alt="Cat"></img>`:"<div class='base__img'></div>",i=this.description?this.description:"";e.innerHTML=`<div class="cat__modal-wrapper"><div class="modal__close"><i class="fa-solid fa-xmark"></i>\n                </div><div class="cat__modal-photo">${a}</div><div class="cat__modal-info"><div class='cat__wrapper'><h2 class="cat__modal-name">${this.name}</h2><p class='cat__modal-age'>${this.age} y.o.</p></p><div class="cat__modal-like">${t}</div><div class="cat__modal-description"><p>${i}</p></div><div class="cat__modal-buttons"><div class="cat__modal-btn change__info"><i class="cat__modal-btn fa-solid fa-pen-to-square"></i></div><div class="cat__modal-btn"><i class="cat__modal-delete fa-solid fa-trash"></i></div></div></div></div></div>`,document.body.append(e)}createFormOfChangeInfo(){const e=document.querySelector(`.cat__modal-${this.id}`),t=document.createElement("form"),a=document.createElement("h3"),i=document.createElement("input"),s=document.createElement("input"),l=document.createElement("textarea"),c=document.createElement("input"),r=document.createElement("button"),o=document.createElement("div"),n=document.createElement("div");a.textContent="Изменить информацию",r.type="submit",n.className="cat__modal-cancel",o.className="d-flex",t.className="change__form",t.id="form_"+this.id,t.style.display="none",i.className="modal__input name",s.className="modal__input age",s.type="number",l.className="modal__desc modal__input descr",c.className="modal__input photo",i.placeholder="Имя кота",s.placeholder="Возраст кота",c.placeholder="Ссылка на фото кота",l.placeholder="Описание кота",r.innerHTML='<i class="cat__modal-btn fa-solid fa-square-check"></i>',n.innerHTML='<i class="cat__modal-btn fa-solid fa-square-xmark"></i>',o.append(r,n),t.append(a,i,s,l,c,o),e.querySelector(".cat__modal-info").append(t)}updateLike(){const e=document.querySelector(`.cat__modal-${this.id}`);let a={favourite:!0};"fa-regular fa-heart"==e.querySelector(".cat__modal-like i").className?(e.querySelector(".cat__modal-like i").className="fa-solid fa-heart",a.favourite=!0):"fa-solid fa-heart"==e.querySelector(".cat__modal-like i").className&&(e.querySelector(".cat__modal-like i").className="fa-regular fa-heart",a.favourite=!1),t.updateCat(a,this.id)}changeInfoOfCat(){const e=document.querySelector(`.cat__modal-${this.id}`),a=e.querySelector(".cat__modal-name"),i=e.querySelector(".cat__modal-photo"),s=e.querySelector(".cat__modal-description"),l=e.querySelector(".cat__modal-age"),c=document.querySelector(`#form_${this.id}`),r=c.querySelector(".name"),o=c.querySelector(".age"),n=c.querySelector(".descr"),d=c.querySelector(".photo");c.querySelector(".cat__modal-cancel").addEventListener("click",(t=>{c.style.display="none",e.querySelector(".cat__wrapper").style.display="flex"})),c.addEventListener("submit",(m=>{m.preventDefault();const u=document.querySelector(`.cat_${this.id}`),_=u.querySelector(".cats__name"),h=u.querySelector(".cats__photo");let y={};r.value&&(y.name=r.value,a.textContent=y.name,_.textContent=y.name),o.value&&(y.age=+o.value,l.textContent=o.value+" y.o."),n.value&&(y.description=n.value,s.textContent=n.value),d.value&&(y.img_link=d.value,i.innerHTML=`<img src="${d.value}" alt="Cat"></img>`,h.style.backgroundImage=`url(${y.img_link})`),t.updateCat(y,this.id),e.querySelector(".cat__wrapper").style.display="flex",c.style.display="none",c.reset()}))}addListener(){const e=document.querySelector(`.cat_${this.id}`),a=document.querySelector(`.cat__modal-${this.id}`);a.addEventListener("click",(i=>{i.target==a.querySelector(".cat__modal-delete")?(a.style.display="none",document.querySelector("main").style.filter="",e.remove(),a.remove(),t.deleteCat(this.id)):i.target.closest(".modal__close")?(a.style.display="none",document.querySelector("main").style.filter=""):i.target.closest(".cat__modal-wrapper")?i.target.closest(".cat__modal-like")?this.updateLike():i.target.closest(".cat__modal-cancel")||i.target.closest(".change__info")&&(document.querySelector(`#form_${this.id}`).style.display="flex",a.querySelector(".cat__wrapper").style.display="none",this.changeInfoOfCat()):(a.style.display="none",document.querySelector("main").style.filter="")}))}init(){this.renderCatModal(),this.addListener(),this.createFormOfChangeInfo()}}class i{constructor(e,t,a,i,s,l,c){this.id=e,this.name=t,this.age=a,this.favourite=i,this.img_link=s,this.description=l,this.rate=c,this.init()}renderCatCard(){document.querySelector(".cats__load").innerHTML="",document.querySelector(".cats__add").style.display="block";const e=document.createElement("li");e.id=this.id,e.className=`cat_${this.id}`,e.innerHTML=`<li class="cats__item"><div class="cats__photo"></div><div class="cats__desc"><h3 class="cats__name">${this.name}   </h3><div class='cats__rate-wrapper'><div class='minus'><i class="fa-solid fa-minus"></i></div><div class="cats__rate"></div><div class='plus'><i class="fa-solid fa-plus"></i></div></div></div></li>`,document.querySelector(".cats__list").append(e),this.img_link&&(e.querySelector(".cats__photo").style.backgroundImage=`url(${this.img_link})`),this.calculateRateAndShowOnHTML(this.rate),new a(this.id,this.name,this.age,this.favourite,this.img_link,this.description,this.rate)}calculateRateAndShowOnHTML(e){const t=document.querySelector(`.cat_${this.id}`).querySelector(".cats__rate");t.innerHTML="";for(let a=0;a<10;a++){let i=document.createElement("i");i.className=a<e?"fa-solid fa-star":"fa-regular fa-star",t.append(i)}}addListeners(){const a=document.querySelector(`.cat_${this.id}`),i=document.querySelector(`.cat__modal-${this.id}`),s=()=>{if(null!==this.rate&&this.rate&&!isNaN(this.rate)||(this.rate=0),10!=this.rate){this.rate++,this.calculateRateAndShowOnHTML(this.rate);let e={rate:this.rate};t.updateCat(e,this.id)}},l=()=>{if(1!=this.rate){this.rate--,this.calculateRateAndShowOnHTML(this.rate);let e={rate:this.rate};t.updateCat(e,this.id)}};a.addEventListener("click",(t=>{t.target.closest(".plus")?s():t.target.closest(".minus")?l():(i.style.display="block",document.querySelector("main").style.filter="blur(3px)",e({duration:500,timing:e=>e,draw(e){i.querySelector(".cat__modal-wrapper").style.opacity=e}}))}))}init(){this.renderCatCard(),this.addListeners()}}(()=>{const t=document.querySelector(".cats__add"),a=document.querySelector(".modal"),i=document.querySelector(".modal__close");a.addEventListener("click",(e=>{e.target.closest(".modal__inner")||(a.style.display="none",document.querySelector("main").style.filter="")})),i.addEventListener("click",(()=>{a.style.display="none",document.querySelector("main").style.filter=""})),t.addEventListener("click",(t=>{a.style.display="flex",document.querySelector("main").style.filter="blur(3px)",e({duration:300,timing:e=>e,draw(e){a.style.opacity=e}})}))})(),(()=>{const e=document.forms.addCat;e.addEventListener("submit",(a=>{a.preventDefault();let s=Object.fromEntries(new FormData(e).entries());s.id=+s.id,s.age=+s.age,s.favourite="on"===s.favourite,t.addCat(s).then((t=>{if("ok"==t.message)new i(s.id,s.name,s.age,s.favourite,s.img_link,s.description,s.rate),document.querySelector(".modal").style.display="none",document.querySelector("main").style.filter="",e.reset();else{const t=document.createElement("h3");t.textContent="Этот id занят",e.append(t),setTimeout((()=>{t.remove()}),1500)}}))})),t.getCats().then((e=>{e.data.forEach((e=>{new i(e.id,e.name,e.age,e.favourite,e.img_link,e.description,e.rate)}))}))})()})();