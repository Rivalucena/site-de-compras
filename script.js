const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelector(el);

lancheJson.map((item, index)=>{
    let lancheItem = c('.modelo .lanche-item').cloneNode(true);
    
    lancheItem.querySelector('.lanche-item--img img').src = item.img;

    lancheItem.setAttribute('data-key', index);
    lancheItem.querySelector('.lanche-item--name').innerHTML = item.name;
    lancheItem.querySelector('.lanche-item--desc').innerHTML = item.description;
    lancheItem.querySelector('.lanche-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    lancheItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        let key = e.target.closest('.lanche-item').getAttribute('data-key');

        c('.lancheBig img').src = lancheJson[key].img;
        c('.lancheInfo h1').innerHTML = lancheJson[key].name;
        c('.lancheInfo--desc').innerHTML = lancheJson[key].description;
        
        c('.lancheWindowArea').style.opacity = 0;
        c('.lancheWindowArea').style.display = 'flex';
        setTimeout(()=>{
            c('.lancheWindowArea').style.opacity = 1;
        }, 200);
    });

    c('.lanche-area').append( lancheItem );
});