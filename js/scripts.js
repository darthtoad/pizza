var toppingsObj = {
  pepperoni: 2,
  mushroom: 1
}

var sizeObj = {
  personal: 7,
  medium: 10,
  large: 13,
  extralarge: 15
}

var Pizza = function(size) {
  this.size = size;
  //this.toppings = toppings;
  this.price = 0;
}

// Pizza.prototype.addToppings(toppings) {
//
// }

Pizza.prototype.calculatePrice = function() {
  for (var key in sizeObj) {
    if (key === this.size) {
      this.price += sizeObj[key];
    }
  }
}

$(document).ready(function(){
  $("form#order").submit(function(event){
    event.preventDefault();
    $("#result").empty();
    var size = $("input:radio[name=size]:checked").val();
    var newPizza = new Pizza(size);
    console.log(newPizza);
    newPizza.calculatePrice();
    $("#result").append("Your total is $" + newPizza.price);
  })
})
