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
  //debugger;
  for (var key in sizeObj) {
    var currentSize = 0;
    for (value in pizzas[pizzaNumber]) {
      console.log(key);
      console.log(value);
      if (value === "size") {
        if (key === pizzas[pizzaNumber].size) {
          currentSize = sizeObj[key];
          console.log("eiorfjfoewj")
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
          console.log(key);
          console.log(topping);
          if (key === topping) {
            currentToppings = toppingsObj[key];
          }
        })
      }
    }
    this.price += currentToppings;
    final += currentToppings;
  }
    /*pizzas.forEach(function(value) {
      if (key === value.size) {
        currentSize = sizeObj[key];
      }
    })
    this.price += currentSize;
    final += currentSize;
  }
  for (var key in toppingsObj) {
    var currentToppings = 0;
    pizzas.forEach(function(value){
      value.toppings.forEach(function(topping) {
        if (key === topping) {
          currentToppings = toppingsObj[key];
        }
      })
    })
    this.price += currentToppings;
    final += currentToppings;*/
    // this.toppings.forEach(function(value) {
    //   if (key === value.toppings) {
    //     toppingsTotal += toppingsObj[key];
    //   }
    // })
}
  //this.price = currentToppings + currentSize;
  //final += currentToppings + currentSize;

  //this.price *= this.number;

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
      //Object.defineProperty(allSizes, i, $("input:radio[name=size" + i + "]:checked").val());
      /*var size = $("input:radio[name=size" + i + "]:checked").val();
      sizes.push(size);*/
    for (i = 0; i < number; i++) {
      var currentToppings = [];
      $("input:checkbox[name=toppings" + i + "]:checked").each(function(){
        currentToppings.push($(this).val());
      })
      allToppings.push(currentToppings);
      /*Object.defineProperty(allToppings, i, $("input:checkbox[name=toppings" + i + "]:checked").each(function(){
        $(this).val();
      }))
      /*
      $("input:checkbox[name=toppings" + i + "]:checked").each(function(){
        toppingsArray.push($(this).val());
      })*/
    }
    console.log(allToppings);
    console.log(allSizes);
    for (i = 0; i < number; i++) {
      var newPizza = new Pizza(allSizes[i], allToppings[i]);
      console.log(newPizza);
      pizzas.push(newPizza);
      newPizza.calculatePrice();
      pizzaNumber = pizzaNumber + 1;
    }
    //var newPizza = new Pizza(sizes, toppingsArray);
    $("#result").append("<br><br>Your total is $" + final + "<br>" + "You ordered:<br>");
    pizzas.forEach(function(pizza){
      $("#result").append("A " + pizza.size + " pizza with " + pizza.toppings.join(" and ") + ". The price for this pizza is $" + pizza.price + "<br>");
    });
    $("#order").hide();
  })
})
