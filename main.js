var swiper = new Swiper(".mySwiper", {
      navigation: {
        nextEl: "#next",
        prevEl: "#prev",
      },
    });

    // show cart on click
    const cartIcon = document.querySelector('.cart-icon');
    const cartTab = document.querySelector('.cart-tab'); //this line access for change class name
    const closeBtn = document.querySelector('.close-btn');
    const cardList=document.querySelector('.card-list');
    const cartList=document.querySelector('.cart-list');
    const cartTotal=document.querySelector('.cart-total');
    const cartValue=document.querySelector('.cart-value');
    const hamburger=document.querySelector('.hamburger');
    const mobileMenu=document.querySelector('.mobile-menu');
    const bars = document.querySelector('.fa-bars');
    const subscribeBtn = document.querySelector('.subs-btn');
    const emailInput = document.querySelector('#email');


    cartIcon.addEventListener('click',()=> cartTab.classList.add('cart-tab-active'));
    hamburger.addEventListener('click',()=>mobileMenu.classList.toggle('mobile-menu-active'));
    hamburger.addEventListener('click', () => {
    bars.classList.toggle('fa-bars');  // remove bars
    bars.classList.toggle('fa-xmark'); // add xmark
    });
    closeBtn.addEventListener('click',(e)=> {
      e.preventDefault();
      cartTab.classList.remove('cart-tab-active');
    });
  
   
    // access data from json file
    let productList=[]; //empty array for fetch data from json file
    let cartProduct=[]; //find existing element in cartlist


    const updateTotals =()=>{
      let totalPrice=0;
      let totalQuantity=0;
      document.querySelectorAll('.item').forEach(item=>{
        const quantity=parseInt(item.querySelector('.quantity-value').textContent);
        const price=parseFloat(item.querySelector('.item-total').textContent.replace('$',''));
        totalPrice+=price;
        totalQuantity+=quantity;
      });
      cartTotal.textContent=`$${totalPrice.toFixed(2)}`;
      cartValue.textContent=totalQuantity;
    }

    const showCards=()=>{
      productList.forEach(product =>{
        const orderCard=document.createElement('div');
        orderCard.classList.add('order-card');
        orderCard.innerHTML =`
        <div class="card-image">
          <img src="${product.image}" >
        </div>
          <h4>${product.name}</h4>
          <h4 class="price">${product.price}</h4>
          <a href="#" class="btn card-btn">Add to Cart</a>
        `;
        cardList.appendChild(orderCard);
        // try to write outside
        const cardBtn = orderCard.querySelector('.card-btn');

        cardBtn.addEventListener('click',(e)=>{
          e.preventDefault();
          addToCart(product);
        });
      })
    };
    
    const addToCart=(product)=>{

       const existingProduct = cartProduct.find(item=>item.id===product.id);
      if(existingProduct){
        alert("already add");
        return;
      }
     cartProduct.push(product);
    //  local storage data data (when data add in cart)
      localStorage.setItem('cart', JSON.stringify(cartProduct));

     
     let quantity=1;
     let price=parseFloat(product.price.replace('$','')); //understandit
    

      const cartItem = document.createElement('div');
      cartItem.classList.add('item');
      cartItem.innerHTML=`
      <div class="item-image">
         <img src="${product.image}">
      </div>
        <div class="detail">
        <h4>${product.name}</h4>
        <h4 class="item-total">${product.price}</h4>
        </div>
        <div class="flex">
          <a href="" class="quantity-btn minus">
          <i class="fa-solid fa-minus"></i>
          </a>
        <h4 class="quantity-value">${quantity}</h4>
        <a href="" class="quantity-btn plus">
        <i class="fa-solid fa-plus"></i>
        </a>
        </div>`;
        cartList.appendChild(cartItem);
        updateTotals();

        // // increament operation perform
        const plusBtn = cartItem.querySelector('.quantity-btn.plus');
        const quantityValue = cartItem.querySelector('.quantity-value');
        const minusBtn = cartItem.querySelector('.quantity-btn.minus');
        const itemTotal=cartItem.querySelector('.item-total');


      
         
        plusBtn.addEventListener('click',(e)=>{
          e.preventDefault();
          quantity++;
          quantityValue.textContent=quantity;
          itemTotal.textContent=`$${(price * quantity).toFixed(2)}`;
         updateTotals();
        })
       
         minusBtn.addEventListener('click',(e)=>{
          e.preventDefault();
          if(quantity>1){
          quantity--;
          quantityValue.textContent=quantity;
          itemTotal.textContent=`$${(price * quantity).toFixed(2)}`;
           updateTotals();
          }
          else{
            cartItem.classList.add('slide-out');
           setTimeout(()=>{
             cartItem.remove();
            cartProduct = cartProduct.filter(item => item.id !== product.id);
            //  data localstoreage (start)
            localStorage.setItem('cart', JSON.stringify(cartProduct));
            // End
             updateTotals();
           },300)
          }
        })
        

    }


    //START this function is use to show data in cart from local storage 
    const loadCartFromStorage = () => {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  cartProduct = storedCart;

  cartProduct.forEach(product => {
    let quantity = 1;
    let price = parseFloat(product.price.replace('$',''));

    const cartItem = document.createElement('div');
    cartItem.classList.add('item');
    cartItem.innerHTML=`
      <div class="item-image">
        <img src="${product.image}">
      </div>
      <div class="detail">
        <h4>${product.name}</h4>
        <h4 class="item-total">${product.price}</h4>
      </div>
      <div class="flex">
        <a href="" class="quantity-btn minus"><i class="fa-solid fa-minus"></i></a>
        <h4 class="quantity-value">${quantity}</h4>
        <a href="" class="quantity-btn plus"><i class="fa-solid fa-plus"></i></a>
      </div>`;

    cartList.appendChild(cartItem);

    // same plus/minus functionality again
    const plusBtn = cartItem.querySelector('.quantity-btn.plus');
    const minusBtn = cartItem.querySelector('.quantity-btn.minus');
    const quantityValue = cartItem.querySelector('.quantity-value');
    const itemTotal=cartItem.querySelector('.item-total');

    plusBtn.addEventListener('click',(e)=>{
      e.preventDefault();
      quantity++;
      quantityValue.textContent=quantity;
      itemTotal.textContent=`$${(price * quantity).toFixed(2)}`;
      updateTotals();
    });

    minusBtn.addEventListener('click',(e)=>{
      e.preventDefault();
      if(quantity>1){
        quantity--;
        quantityValue.textContent=quantity;
        itemTotal.textContent=`$${(price * quantity).toFixed(2)}`;
        updateTotals();
      } else {
        cartItem.remove();
        cartProduct = cartProduct.filter(item => item.id !== product.id);
        localStorage.setItem('cart', JSON.stringify(cartProduct));
        updateTotals();
      }
    });
  });

  updateTotals();
}
// END HERE 
    
    // after workin try same code out of this

    const initApp=()=>{
      fetch('products.json').then
      (response => response.json()).then
      (data =>{
        productList=data;
        showCards();
        loadCartFromStorage();
      })
    }
    initApp();

    // OUR SERVICE SECTION
   subscribeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();

  if (email === "") {
    alert("⚠️ Please enter your email address");
    return;
  }

  // simple email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("❌ Please enter a valid email address");
    return;
  }

  // success message
  alert(`✅ Thanks for subscribing with: ${email}`);

  // clear input after submit
  emailInput.value = "";
});