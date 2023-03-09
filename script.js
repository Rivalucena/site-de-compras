const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelector(el);

lancheJson.map((item, index)=>{
    let lancheItem = c('.modelo .lanche-item').cloneNode(true);
    
    lancheItem.querySelector('.lanche-item--img img').src = item.img;

    lancheItem.querySelector('.lanche-item--name').innerHTML = item.name;
    lancheItem.querySelector('.lanche-item--desc').innerHTML = item.description;
    lancheItem.querySelector('.lanche-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;

    c('.lanche-area').append( lancheItem );
});