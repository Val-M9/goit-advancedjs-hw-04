import{a as m,S as g,i as d}from"./assets/vendor-DXaqCXe3.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function i(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(t){if(t.ep)return;t.ep=!0;const a=i(t);fetch(t.href,a)}})();const u="https://pixabay.com/api/",h="33393016-2f1d389d0905d7f9551defc49",f=async({inputValue:e,page:o,perPage:i})=>{const n={key:h,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:i,page:o};return(await m.get(u,{params:n})).data},r={searchForm:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMore:document.querySelector(".load-more-btn")},y=new g(".gallery-link",{captionsData:"alt",captionDelay:250}),c=e=>d.error({title:"Error",message:e||"Sorry, there are no images matching your search query. Please try again!",position:"topRight",transitionIn:"fadeInDown"}),L=e=>d.info({title:"Info",message:e,position:"topRight",transitionIn:"fadeInDown"}),v=({webformatURL:e,largeImageURL:o,likes:i,views:n,comments:t,downloads:a,tags:l})=>`
    <li class="gallery-item">
      <a class="gallery-link" href=${o}>
        <img
          class="gallery-image"
          src=${e}
          alt=${l}
      
        />
        <div class="image-info">
          <div class="info-section">
            <p class="info-title">Likes</p>
            <p class="info-text">${i}</p>
          </div>
          <div class="info-section">
            <p class="info-title">Views</p>
            <p class="info-text">${n}</p>
          </div>
          <div class="info-section">
            <p class="info-title">Comments</p>
            <p class="info-text">${t}</p>
          </div>
          <div class="info-section">
            <p class="info-title">Downloads</p>
            <p class="info-text">${a}</p>
          </div>
        </div>
      </a>
    </li>
    `,p=e=>{e.length||(r.gallery.innerHTML="",c());const o=e.map(i=>v(i)).join("");r.gallery.insertAdjacentHTML("beforeend",o),y.refresh()},s={inputValue:"",page:1,imagesLeft:0,perPage:15},w=async e=>{e.preventDefault(),r.gallery.innerHTML="",s.page=1,s.imagesLeft=0,r.loadMore.classList.add("hidden");const o=e.currentTarget;if(s.inputValue=o.elements.search.value.trim(),!s.inputValue)return r.gallery.innerHTML="",c();r.loader.classList.add("active");try{const i=await f(s);s.imagesLeft=i.totalHits-s.page*s.perPage,p(i.hits),s.imagesLeft>0&&r.loadMore.classList.remove("hidden")}catch(i){c(i.message)}finally{o.reset(),r.loader.classList.remove("active")}},M=async()=>{r.loadMore.classList.add("hidden"),r.loader.classList.add("active"),s.page+=1;try{const e=await f(s);if(s.imagesLeft=e.totalHits-s.page*s.perPage,p(e.hits),s.imagesLeft<=0){L("We're sorry, but you've reached the end of search results.");return}const o=r.gallery.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:o*3,behavior:"smooth"}),r.loadMore.classList.remove("hidden")}catch(e){c(e.message)}finally{r.loader.classList.remove("active")}};r.searchForm.addEventListener("submit",w);r.loadMore.addEventListener("click",M);
//# sourceMappingURL=index.js.map
