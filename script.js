let cart =[];
let modalQt = 1;
let modalKey = 0;

const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

//listagem dos lanches
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
        modalQt = 1;
        modalKey = key;

        c('.lancheBig img').src = lancheJson[key].img;
        c('.lancheInfo h1').innerHTML = lancheJson[key].name;
        c('.lancheInfo--desc').innerHTML = lancheJson[key].description;
        c('.lancheInfo--actualPrice').innerHTML = `R$ ${lancheJson[key].price.toFixed(2)}`;
        c('.lancheInfo--size.selected').classList.remove('selected');
        cs('.lancheInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2) {
                size.classList.add('selected');
            }

            size.querySelector('span').innerHTML = lancheJson[key].sizes[sizeIndex];
            
        });

        c('.lancheInfo--qt').innerHTML = modalQt;

        c('.lancheWindowArea').style.opacity = 0;
        c('.lancheWindowArea').style.display = 'flex';
        setTimeout(()=>{
            c('.lancheWindowArea').style.opacity = 1;
        }, 200);
    });

    c('.lanche-area').append( lancheItem );
});

//eventos do MODAL
function closseModal() {
    c('.lancheWindowArea').style.opacity = 0;
    setTimeout (()=>{
        c('.lancheWindowArea').style.display = 'none';
    }, 500);
}
cs('.lancheInfo--cancelButton, .lancheInfo--cancelMobileButton').forEach ((item)=>{
    item.addEventListener('click', closseModal);
});
c('.lancheInfo--qtmenos').addEventListener('click', ()=>{
   if (modalQt > 1){
        modalQt--;
        c('.lancheInfo--qt').innerHTML = modalQt;
   }
});
c('.lancheInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    c('.lancheInfo--qt').innerHTML = modalQt;
});
cs('.lancheInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        c('.lancheInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});
c('.lancheInfo--addButton').addEventListener('click', ()=>{
    let size = parseInt(c('.lancheInfo--size.selected').getAttribute('data-key'));

    let identifier = lancheJson[modalKey].id+'@'+size;
    
    let key = cart.findIndex((item)=>item.identifier == identifier);

    if(key > -1){
        cart[key].qt += modalQt;
    } else {
      cart.push({
        identifier,
        id:lancheJson[modalKey].id,
        size,
        qt:modalQt
    });
}
    updateCart();
    closseModal();
});

//função do carrinho de compras
function updateCart() {
    if(cart.length > 0){
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';

        for(let i in cart){
            let lancheItem = lancheJson.find((item)=>item.id == cart[i].id);
            let cartItem = c('.modelo .cart--item').cloneNode(true);

            let lancheSizeName;
            switch(cart[i].size) {
                case 0:
                lancheSizeName = 'P';
                break;
                case 1:
                lancheSizeName = 'M';
                break;
                case 2:
                lancheSizeName = 'G';
                 break;
            }
            let lancheName = `${lancheItem.name} (${lancheSizeName})`;

            cartItem.querySelector('img').src = lancheItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = lancheName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

            c('.cart').append(cartItem);
        }

    } else {
        c('aside').classList.remove('show');
    }
}