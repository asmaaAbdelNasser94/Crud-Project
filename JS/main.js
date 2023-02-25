let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let total = document.getElementById("total");
let count = document.getElementById("count");
let discount = document.getElementById("discount");
let category = document.getElementById("category");
let create = document.getElementById("createBtn");
let table = document.getElementById("showTable");
let mood = "create";
let tmp;
let productContainer;
// localstorage & array
if (localStorage.products != null) {
  productContainer = JSON.parse(localStorage.products);
} else {
  productContainer = [];
}

// get total
function calcTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    document.getElementById("total").innerHTML = result;
    document.getElementById("total").style.backgroundColor = "rgb(7, 121, 74)";
  } else {
    document.getElementById("total").innerHTML = "";
    document.getElementById("total").style.backgroundColor = "rgb(168, 40, 31)";
  }
}

// create product
create.onclick = function () {
  let product = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    total: total.innerHTML,
    count: count.value,
    discount: discount.value,
    category: category.value,
  };
  if (validationTitle() && validationCategory()  == true) {
    if (title.value !== "") {
      if (mood == "create") {
        if (product.count > 1) {
          for (let i = 0; i < product.count; i++) {
            productContainer.push(product);
          }
        } else {
          productContainer.push(product);
        }
      } else {
        productContainer[tmp] = product;
        mood = "create";
        count.style.display = "inline-block";
        create.innerHTML = "create";
      }
    }
  }

  localStorage.setItem("products", JSON.stringify(productContainer));
  clear();
  displayProduct();
};

// reset form
function clear() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  total.innerHTML = "";
  count.value = "";
  discount.value = "";
  category.value = "";
  total.style.backgroundColor = "rgb(168, 40, 31)";
}

// display data
function displayProduct() {
  let box = "";
  for (let i = 0; i < productContainer.length; i++) {
    box += `
        <tr>
        <td>${i + 1}</td>
        <td>${productContainer[i].title}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].taxes}</td>
        <td>${productContainer[i].ads}</td>
        <td>${productContainer[i].discount}</td>
        <td>${productContainer[i].total}</td>
        <td>${productContainer[i].category}</td>
        <td> <button onclick = 'updateProduct(${i})' class="formBtn smallBtn">update</button></td>
        <td> <button onclick ='deleteProduct(${i})' class="formBtn smallBtn">delete</button></td>
        </tr>
        `;
  }
  document.getElementById("tBody").innerHTML = box;
  if (productContainer.length > 0) {
    document.getElementById(
      "deleteAll"
    ).innerHTML = `<button onclick ='deleteAll()' id="deleteAllBtn" class="formBtn">Delete All (${productContainer.length})</button>`;
  } else {
    document.getElementById("deleteAll").innerHTML = "";
  }
}
displayProduct();

// delete selected product
function deleteProduct(i) {
  productContainer.splice(i, 1);
  localStorage.products = JSON.stringify(productContainer);
  displayProduct();
}

//delete all products
function deleteAll() {
  localStorage.clear();
  productContainer.splice(0);
  displayProduct();
}

// update
function updateProduct(i) {
  title.value = productContainer[i].title;
  price.value = productContainer[i].price;
  taxes.value = productContainer[i].taxes;
  ads.value = productContainer[i].ads;
  discount.value = productContainer[i].discount;
  calcTotal();
  category.value = productContainer[i].category;
  count.style.display = "none";
  create.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search
let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  displayProduct();
}

function search(value) {
  let box = ``;
  if (searchMood == "title") {
    for (let i = 0; i < productContainer.length; i++) {
      if (
        productContainer[i].title.toLowerCase().includes(value.toLowerCase())
      ) {
        box += `
        <tr>
        <td>${i + 1}</td>
        <td>${productContainer[i].title}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].taxes}</td>
        <td>${productContainer[i].ads}</td>
        <td>${productContainer[i].discount}</td>
        <td>${productContainer[i].total}</td>
        <td>${productContainer[i].category}</td>
        <td> <button onclick = 'updateProduct(${i})' class="formBtn smallBtn">update</button></td>
        <td> <button onclick ='deleteProduct(${i})' class="formBtn smallBtn">delete</button></td>
        </tr>
        `;
      }
    }
  } else {
    for (let i = 0; i < productContainer.length; i++) {
      if (
        productContainer[i].category.toLowerCase().includes(value.toLowerCase())
      ) {
        box += `
          <tr>
          <td>${i + 1}</td>
          <td>${productContainer[i].title}</td>
          <td>${productContainer[i].price}</td>
          <td>${productContainer[i].taxes}</td>
          <td>${productContainer[i].ads}</td>
          <td>${productContainer[i].discount}</td>
          <td>${productContainer[i].total}</td>
          <td>${productContainer[i].category}</td>
          <td> <button onclick = 'updateProduct(${i})' class="formBtn smallBtn">update</button></td>
          <td> <button onclick ='deleteProduct(${i})' class="formBtn smallBtn">delete</button></td>
          </tr>
          `;
      }
    }
  }

  displayProduct();
  document.getElementById("tBody").innerHTML = box;
}

// validation title

function validationTitle() {
  let regex = /^[a-zA-Z0-9]+(\s|_)?([a-zA-Z0-9]+)?$/gi;
  if (regex.test(title.value) == true){
    return true;
  } else{
    return false;
  }
}

// validation category

function validationCategory(){
  let regex2 = /^[a-zA-Z0-9]+(\s|_)?([a-zA-Z0-9]+)?$/gi;
  if(regex2.test(category.value) == true){
    return true;
  }else{
    return false;
  }
}