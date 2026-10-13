
let product = [];


function cartfunc() {
  items.innerHTML = "";
  let tot = 0;

  if (cartarr.length === 0) {
    items.innerHTML = `
      <div class="text-center py-5">
        <i class="ri-shopping-bag-line text-secondary" style="font-size:55px"></i>
        <p class="fw-semibold mt-3">Your cart is empty</p>
        <p class="text-secondary small">Add products to get started.</p>
      </div>`;
  }

  cartarr.forEach((e) => {
    let cdiv = document.createElement("div");
    cdiv.className = "card border-0 shadow-sm rounded-3 p-3";

    let img1 = document.createElement("img");
    img1.src = e.image;
    img1.alt = e.title;
    img1.className = "rounded-3 mx-auto";
    img1.style.width = "85px";
    img1.style.height = "85px";
    img1.style.objectFit = "contain";

    let h11 = document.createElement("h6");
    h11.className = "fw-bold text-center mt-2";
    h11.innerHTML = e.title;

    let p1 = document.createElement("p");
    p1.className = "text-primary fw-semibold text-center";
    p1.innerHTML = "Price: $ " + e.price;

    let quantitybox = document.createElement("div");
    quantitybox.className = "d-flex justify-content-center align-items-center gap-3";

    let minus = document.createElement("button");
    minus.className = "btn btn-outline-primary btn-sm";
    minus.innerHTML = '<i class="ri-subtract-line"></i>';

    let qty = document.createElement("span");
    qty.className = "fw-bold";
    qty.innerHTML = e.qt;

    let plus = document.createElement("button");
    plus.className = "btn btn-outline-primary btn-sm";
    plus.innerHTML = '<i class="ri-add-line"></i>';

    let ptot = document.createElement("p");
    ptot.className = "text-success fw-bold text-center mt-2 mb-2";
    ptot.innerHTML = "Subtotal: $ " + (e.price * e.qt).toFixed(2);

    let rbtn = document.createElement("button");
    rbtn.className = "btn btn-outline-danger btn-sm";
    rbtn.innerHTML = '<i class="ri-delete-bin-line"></i> Remove';

    rbtn.addEventListener("click", () => {
      cartarr = cartarr.filter((r) => r.id !== e.id);
      localStorage.setItem("cart", JSON.stringify(cartarr));
      cartfunc();
      notifycart();
    });

    plus.addEventListener("click", () => {
      e.qt++;
      localStorage.setItem("cart", JSON.stringify(cartarr));
      cartfunc();
      notifycart();
    });

    minus.addEventListener("click", () => {
      e.qt--;

      if (e.qt <= 0) {
        cartarr = cartarr.filter((x) => x.id !== e.id);
      }

      localStorage.setItem("cart", JSON.stringify(cartarr));
      cartfunc();
      notifycart();
    });

    quantitybox.append(minus, qty, plus);
    cdiv.append(img1, h11, p1, quantitybox, ptot, rbtn);
    items.append(cdiv);

    tot = cartarr.reduce((sum, i) => sum + i.qt * i.price, 0);
  });

  btn1.innerHTML = "Total: $ " + tot.toFixed(2);
  notifycart();
}

function notifycart() {
  cartcount.innerHTML = cartarr.length;
}

function notifywish() {
  wishcount.innerHTML = wisharr.length;
}

function wishfunc() {
  itemswish.innerHTML = "";

  if (wisharr.length === 0) {
    itemswish.innerHTML = `
      <div class="text-center py-5">
        <i class="ri-heart-line text-secondary" style="font-size:55px"></i>
        <p class="fw-semibold mt-3">Your wishlist is empty</p>
        <p class="text-secondary small">Save products you love.</p>
      </div>`;
  }

  wisharr.forEach((r) => {
    let wdiv = document.createElement("div");
    wdiv.className = "card border-0 shadow-sm rounded-3 p-3";

    let img11 = document.createElement("img");
    img11.src = r.image;
    img11.alt = r.title;
    img11.className = "rounded-3 mx-auto";
    img11.style.width = "85px";
    img11.style.height = "85px";
    img11.style.objectFit = "contain";

    let h111 = document.createElement("h6");
    h111.className = "fw-bold text-center mt-2";
    h111.innerHTML = r.title;

    let p11 = document.createElement("p");
    p11.className = "fw-bold text-primary text-center";
    p11.innerHTML = "Price: $ " + r.price;

    wdiv.append(img11, h111, p11);
    itemswish.append(wdiv);
  });

  notifywish();
}

fetch("https://dummyjson.com/products")
  .then((r) => r.json())
  .then((r) => {
    console.log(r);
    product = r.products;
    uimain(product);
    cartfunc();
    wishfunc();
    notifycart();
  })
  .catch((e) => console.error(e));

let par = document.getElementById("product-container");

function uimain(item) {
  par.innerHTML = "";

  if (item.length === 0) {
    par.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="ri-search-eye-line text-secondary" style="font-size:70px"></i>
        <h4 class="fw-bold mt-3">No products found</h4>
        <p class="text-secondary">Try another search or category.</p>
      </div>`;
    return;
  }

  item.forEach((w) => {
    let col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-4 col-xl-3";

    let div = document.createElement("div");
    div.className = "card h-100 border-0 shadow-sm rounded-4 overflow-hidden";

    let imgbox = document.createElement("div");
    imgbox.className = "bg-white p-3 position-relative";

    let img = document.createElement("img");
    img.src = w.thumbnail;
    img.alt = w.title;
    img.className = "card-img-top";
    img.style.height = "210px";
    img.style.objectFit = "contain";

    let badge = document.createElement("span");
    badge.className = "badge bg-light text-primary position-absolute top-0 start-0 m-3 rounded-pill";
    badge.innerHTML = w.category;

    imgbox.append(img, badge);

    let cardbody = document.createElement("div");
    cardbody.className = "card-body d-flex flex-column p-3 gap-2";

    let h1 = document.createElement("h5");
    h1.className = "card-title fw-bold";
    h1.innerHTML = w.title;

    let rating = document.createElement("p");
    rating.className = "small text-secondary mb-0";
    rating.innerHTML = `<i class="ri-star-fill text-warning"></i> ${w.rating} / 5`;

    let p = document.createElement("p");
    p.className = "fs-4 fw-bold text-primary mb-2";
    p.innerHTML = "$ " + w.price;

    let div1=document.createElement("div")
    div1.className="d-flex justify-between p-1 gap-2"
    let addcartbtn = document.createElement("button");
    addcartbtn.className = "btn btn-primary rounded-pill w-100";
    addcartbtn.innerHTML = '<i class="ri-shopping-bag-3-line"></i> Add to Cart';
    
    let wishbtn = document.createElement("button");
    wishbtn.className = "btn btn-outline-danger rounded-pill";
    wishbtn.innerHTML = '<i class="ri-heart-line"></i>';
    div1.append(addcartbtn,wishbtn)
    wishbtn.addEventListener("click", () => {
      let exist1 = wisharr.find((v) => v.id === w.id);

      if (exist1) {
        alert("Already product is in wishlist");
      } else {
        wisharr.push({
          id: w.id,
          title: w.title,
          image: w.thumbnail,
          price: w.price,
        });
      }

      localStorage.setItem("wish", JSON.stringify(wisharr));
      wishfunc();
      notifywish();
    });

    h1.addEventListener("click", () => {
      window.open(`product.html?id=${w.id}`, "_blank");
    });

    addcartbtn.addEventListener("click", () => {
      let exist = cartarr.find((q) => q.id === w.id);

      if (exist) {
        exist.qt++;
        localStorage.setItem("cart", JSON.stringify(cartarr));
      } else {
        cartarr.push({
          id: w.id,
          title: w.title,
          image: w.thumbnail,
          price: w.price,
          qt: 1,
        });
        localStorage.setItem("cart", JSON.stringify(cartarr));
      }

      cartfunc();
      notifycart();
    });

    cardbody.append(h1, rating, p,div1);
    div.append(imgbox, cardbody);
    col.append(div);
    par.append(col);
  });
}
