var toppingsArray = [];

var toppingsObj = {
  pepperoni: 2,
  sausage: 2,
  mushroom: 1,
  peppers: 1,
  onion: 1,
  spinach: 1,
  olives: 1,
  cheese: 1
}

var sizeObj = {
  personal: 7,
  medium: 10,
  large: 13,
  jumbo: 15
}

var Pizza = function(size, toppings) {
  this.size = size;
  this.toppings = toppings;
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
  var toppingsTotal = 0;
  for (var key in toppingsObj) {
    toppingsArray.forEach(function(value){
      if (key === value) {
        toppingsTotal += toppingsObj[key];
      }
    })
  }
  this.price += toppingsTotal;
}

$(document).ready(function(){
  $("form#order").submit(function(event){
    event.preventDefault();
    $("#result").empty();
    toppingsArray = [];
    var size = $("input:radio[name=size]:checked").val();
    $("input:checkbox[name=toppings]:checked").each(function(){
      toppingsArray.push($(this).val());
    })
    var newPizza = new Pizza(size, toppingsArray);
    newPizza.calculatePrice();
    $("#result").append("You just ordered a " + newPizza.size + " size pizza with " + newPizza.toppings.join(", ") + ". Your total is $" + newPizza.price);
  })
})
