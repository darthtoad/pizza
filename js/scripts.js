var toppingsArray = [];

var pizzaArray = [];

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

var Pizza = function(size, toppings, number) {
  this.size = size;
  this.toppings = toppings;
  //this.number = number;
  this.price = 0;
}

Pizza.prototype.calculatePrice = function() {
  var sizesTotal = 0;
  for (var key in sizeObj) {
    this.size.forEach(function(value) {
      if (key === value) {
        sizesTotal += sizeObj[key];
      }
    })
  }
  var toppingsTotal = 0;
  for (var key in toppingsObj) {
    this.toppings.forEach(function(value) {
      if (key === value) {
        toppingsTotal += toppingsObj[key];
      }
    })
  }
  this.price += toppingsTotal + sizesTotal;
  //this.price *= this.number;
}

$(document).ready(function(){
  $("form#number-input").submit(function(event){
    debugger;
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
    console.log("It works!");
    $("#result").empty();
    toppingsArray = [];
    var sizes = [];
    for (i = 0; i < number; i++) {
      var size = $("input:radio[name=size" + i + "]:checked").val();
      sizes.push(size);
    }
    for (i = 0; i < number; i++) {
      $("input:checkbox[name=toppings" + i + "]:checked").each(function(){
        toppingsArray.push($(this).val());
      })
    }

    var newPizza = new Pizza(sizes, toppingsArray/*, number*/);
    newPizza.calculatePrice();
    $("#result").append("You just ordered a " + newPizza.size + " size pizza with " + newPizza.toppings.join(", ") + ". Your total is $" + newPizza.price);
  })
})
