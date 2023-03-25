const clickButton = document.querySelectorAll(".button");
const tbody = document.querySelector(".tbody");
//array del carrito
let cart = [];

//follows button clicks
clickButton.forEach((btn) => {
  btn.addEventListener("click", addToCarrito);
});


// Function to add the product to the cart
function addToCarrito(item) {

    //variables, price, title, img
  const button = item.target;
  const i = button.closest(".card");
  const itemTitle = i.querySelector(".card-title").textContent;
  const itemPrice = i.querySelector(".precio").textContent;
  const itemImg = i.querySelector(".card-img-top").src;

  //array for new item
  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1,
  };

  //call function with new product
  addItemCarrito(newItem);
}

function addItemCarrito(newItem) {
  // add item alert
  const alert = document.querySelector(".alert");

  setTimeout(function () {
    alert.classList.add("hide");
  }, 2000);
  alert.classList.remove("hide");

  //
  const inputElement = tbody.getElementsByClassName("input_element");
  for (let e = 0; e < cart.length; e++) {
    if (cart[e].title.trim() === newItem.title.trim()) {
      cart[e].cantidad++;
      //variable que cuenta las veces selecionada el item
      const inputValue = inputElement[e];
      inputValue.value++;
      carritoTotal();
      return null;
    }
  }

  //new products set
  cart.push(newItem);

  //function product in cart img, price, title
  renderCarrito();
}

function renderCarrito() {
  tbody.innerHTML = "";
  cart.map((i) => {
    const tr = document.createElement("tr");
    tr.classList.add("ItemCarrito");
    const Content = `
        <th scope="row">1</th>
              <td class="table_productos">
                <img src=${i.img} alt="">
                <h6 class="title">${i.title}</h6>
              </td>
              <td class="table_precio">${i.precio}</td>
              <td class="table_cantidad">
                <input type="number" min="1" value=${i.cantidad} class="input_element">
                <button class="delete btn btn-danger">X</button>
              </td>
        
        `;
    tr.innerHTML = Content;
    tbody.append(tr);

    //alert of remove and amount
    tr.querySelector(".delete").addEventListener("click", removeItemCarrito);
    tr.querySelector(".input_element").addEventListener("change", sumaCantidad);
  });

  carritoTotal();
}

//function sum of total products
function carritoTotal() {
  let total = 0;
  const itemCartTotal = document.querySelector(".itemCartTotal");
  cart.forEach((i) => {
    const precio = Number(i.precio.replace("$", ""));
    total = total + precio * i.cantidad;
  });

  itemCartTotal.innerHTML = `Total $${total}`;
  addLocalStorage();
}

//function for delete product
function removeItemCarrito(a) {
  const buttonDelete = a.target;
  const tr = buttonDelete.closest(".ItemCarrito");
  const title = tr.querySelector(".title").textContent;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].title.trim() === title.trim()) {
      cart.splice(i, 1);
    }
  }

  // Alerts for remove item
  const alert = document.querySelector(".remove");

  setTimeout(function () {
    alert.classList.add("remove");
  }, 2000);
  alert.classList.remove("remove");

  tr.remove();
  carritoTotal();
}

//count input of amount
function sumaCantidad(a) {
  const sumaInput = a.target;
  const tr = sumaInput.closest(".ItemCarrito");
  const title = tr.querySelector(".title").textContent;
  cart.forEach((i) => {
    if (i.title.trim() === title) {
      sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
      i.cantidad = sumaInput.value;
      carritoTotal();
    }
  });
}

function addLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(cart));
}

window.onload = function () {
  const storage = JSON.parse(localStorage.getItem("carrito"));
  if (storage) {
    cart = storage;
    renderCarrito();
  }
};
