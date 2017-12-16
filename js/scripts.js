var pizzas = [];

var pizzaNumber = 0;

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

var number = 0;
var final = 0;

var Pizza = function(size, toppings) {
  this.size = size;
  this.toppings = toppings;
  this.price = 0;
}

Pizza.prototype.calculatePrice = function() {
  for (var key in sizeObj) {
    var currentSize = 0;
    for (value in pizzas[pizzaNumber]) {
      if (value === "size") {
        if (key === pizzas[pizzaNumber].size) {
          currentSize = sizeObj[key];
        }
      }
    }
    this.price += currentSize;
    final += currentSize;
  }
  for (var key in toppingsObj) {
    var currentToppings = 0;
    for (value in pizzas[pizzaNumber]) {
      if (value === "toppings") {
        pizzas[pizzaNumber].toppings.forEach(function(topping){
          if (key === topping) {
            currentToppings = toppingsObj[key];
          }
        })
      }
    }
    this.price += currentToppings;
    final += currentToppings;
  }
}

$(document).ready(function(){
  $("form#number-input").submit(function(event){
    event.preventDefault();
    $("#result").empty();
    number = $("input#number").val();
    if (!number) {
      alert("Please enter a number.")
    } else {
      $("form#number-input").hide();
      for (i = 0; i < number; i++) {
        $(".order").append('<div class="form-group">' +
            '<div class="radio">' +
              'What size pizza would you like?' +
              '<br>' +
              '<label>' +
                '<input type="radio" name="size' + i + '" value="personal">' +
                'Personal' +
              '</label>' +
              '<br>' +
              '<label>' +
                '<input type="radio" name="size' + i + '" value="medium">' +
                'Medium'+
              '</label>' +
              '<br>' +
              '<label>' +
                '<input type="radio" name="size' + i + '" value="large">' +
                'Large' +
              '</label>' +
              '<br>' +
              '<label>' +
                '<input type="radio" name="size' + i + '" value="jumbo">' +
                'Jubmo' +
              '</label>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            'What toppings would you like?<br>' +
            '<input type="checkbox" name="toppings' + i + '" value="pepperoni">Pepperoni<br>' +
            '<input type="checkbox" name="toppings' + i + '" value="mushroom">Mushroom<br>' +
            '<input type="checkbox" name="toppings' + i + '" value="sausage">Sausage<br>' +
            '<input type="checkbox" name="toppings' + i + '" value="peppers">Peppers<br>' +
            '<input type="checkbox" name="toppings' + i + '" value="onion">Onion<br>' +
            '<input type="checkbox" name="toppings' + i + '" value="spinach">Spinach<br>' +
            '<input type="checkbox" name="toppings' + i + '" value="olives">Olives<br>' +
            '<input type="checkbox" name="toppings' + i + '" value="cheese">Extra Cheese<br>' +
          '</div>'
        )
      }
      $("#order").show();
    }
  })
  $("form#order").submit(function(event){
    event.preventDefault();
    final = 0;
    $("#result").empty();
    var allToppings = [];
    var allSizes = [];
    pizzas = [];
    for (i = 0; i < number; i++) {
      var size = $("input:radio[name=size" + i + "]:checked").val();
      allSizes.push(size);
    }
    for (i = 0; i < number; i++) {
      var currentToppings = [];
      $("input:checkbox[name=toppings" + i + "]:checked").each(function(){
        currentToppings.push($(this).val());
      })
      allToppings.push(currentToppings);
    }
    for (i = 0; i < number; i++) {
      var newPizza = new Pizza(allSizes[i], allToppings[i]);
      pizzas.push(newPizza);
      newPizza.calculatePrice();
      pizzaNumber = pizzaNumber + 1;
    }
    $("#result").append("<br><br>Your total is $" + final + "<br>" + "You ordered:<br>");
    pizzas.forEach(function(pizza){
      if (!(pizza.toppings.join(""))) {
        $("#result").append("A " + pizza.size + " pizza. The price for this pizza is $" + pizza.price + "<br>");
        console.log("yay");
      } else {
        $("#result").append("A " + pizza.size + " pizza with " + pizza.toppings.join(" and ") + ". The price for this pizza is $" + pizza.price + "<br>");
      }
    });
    $("#order").hide();
    $("#address").show();
  })
  $("form#address").submit(function(event) {
    event.preventDefault();
    var ifDelivery = $("input:radio[name=obtain]:checked").val();
    if (ifDelivery === "pick-up") {
      $("#address").hide();
      $("#result").append("<br>Your order will be ready in 30 minutes.")
    } else {
      $("#address").hide();
      $(".address").show();
      $("form.address").prepend(
        '<div class="form-group">' +
          '<label for="street">Street</label>' +
          '<input type="text" class="form-control street">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="city">City</label>' +
          '<input type="text" class="form-control city">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="state">State</label>' +
          '<input type="text" class="form-control state">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="zip-code">Zip Code</label>' +
          '<input type="text" class="form-control zip-code">' +
        '</div>'
      )
    }
  })
  $("form.address").submit(function(event){
    event.preventDefault();
    $(".address").hide();
    $("#result").append("Your order will be sent to: <br>" + $("input.street").val() + "<br>" + $("input.city").val() + ", " + $("input.state").val() + " " + $("input.zip-code").val() + "<br>It should arrive within 45 minutes.");
  })
})
