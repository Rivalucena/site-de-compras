const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelector(el);

lancheJson.map((item, index)=>{
    let lancheItem = c('.modelo .lanche-item').cloneNode(true);
    // preencher as informaçoes em lancheitem

    c('.lanche-area').append( lancheItem );
});