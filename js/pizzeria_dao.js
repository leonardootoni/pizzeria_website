/*******************************************************************************
* JS Pizzaria JSON Dataset used to load all Pizza Products available to sell on
* the site
********************************************************************************
  Author: *** Leonardo Otoni de Assis ***
*******************************************************************************/
pizzaSizeDataModel = [
        {
            "id":"pizza-small",
            "name":"SMALL",
            "slices": "6",
            "basePriceMultiplier":"1"
        },
        {
            "id":"pizza-medium",
            "name":"MEDIUM",
            "slices": "8",
            "basePriceMultiplier":"1.3"
        },
        {
            "id":"pizza-large",
            "name":"LARGE",
            "slices": "10",
            "basePriceMultiplier":"1.6"
        },
        {
            "id":"pizza-x-large",
            "name":"X-LARGE",
            "slices": "12",
            "basePriceMultiplier":"1.9"
        }
    ];

pizzaMenuDataModel = [
        {
            "id":"BanquetCheddar",
            "name":"Banquet Cheddar",
            "description":"Ground beef, bacon, cheddar cheese",
            "price":"13.09",
            "imageURL":"../images/mount_your_pizza/PN_Classic_BnqtCheddar_195x150.jpg"
        },
        {
            "id":"Calabrese",
            "name":"Calabrese",
            "description":"Spicy sausage, Spanish onions, roasted red peppers",
            "price":"12.74",
            "imageURL":"../images/mount_your_pizza/PN_Classic_Calabrese_195x150.jpg"
        },
        {
            "id":"ClassicDeluxe",
            "name":"Classic Deluxe",
            "description":"Pepperoni, fresh mushrooms, green peppers, bacon, sliced tomatoes, Spanish onions",
            "price":"13.09",
            "imageURL":"../images/mount_your_pizza/PN_Classic_Deluxe_195x150.jpg"
        },
        {
            "id":"Primavera",
            "name":"Primavera",
            "description":"Spinach, grilled zucchini, roasted red peppers, fresh mushrooms, parmigiano cheese",
            "price":"16.99",
            "imageURL":"../images/mount_your_pizza/PN_Classic_Primavera_195x150.jpg"
        },
        {
            "id":"SuperGourmet",
            "name":"Super Gourmet",
            "description":"Sundried tomatoes, grilled chicken, roasted red peppers, feta cheese",
            "price":"15.39",
            "imageURL":"../images/mount_your_pizza/PN_Classic_SprGourmet_195x150.jpg"
        },
        {
            "id":"Hawaiian",
            "name":"Hawaiian",
            "description":"Smoked ham, pineapple, bacon",
            "price":"12.74",
            "imageURL":"../images/mount_your_pizza/PN_Classic_SprHawaiian_195x150.jpg"
        },
        {
            "id":"ClassicVeggie",
            "name":"Classic Veggie",
            "description":"Fresh mushrooms, green peppers, Spanish onions",
            "price":"12.39",
            "imageURL":"../images/mount_your_pizza/PN_Classic_Veggie_195x150.jpg"
        },
        {
            "id":"TheFounders",
            "name":"The Founder's",
            "description":"Double bacon, double Spanish onion",
            "price":"14.69",
            "imageURL":"../images/mount_your_pizza/PN_Classic_TheFounders_195x150.jpg"
        }
    ];

pizzaToppingsDataModel = [
        {
            "id":"tp-bacon",
            "name":"Bacon",
            "description": "Centre-cut strips of Canadian bacon, from pork raised without antibiotics.",
            "price":"2.39",
            "imageURL":"../images/mount_your_pizza/toppings/topping-Bacon-195x184.jpg"

        },
        {
            "id":"tp-blackolive",
            "name":"Black Olives",
            "description": "Olives are one of the oldest foods known to us, and we get ours straight from the original source: Greece.",
            "price":"1.65",
            "imageURL":"../images/mount_your_pizza/toppings/topping-BlackOlives-195x184.jpg"
        },
        {
            "id":"tp-mushrooms",
            "name":"Mushrooms",
            "description": "Olives are one of the oldest foods known to us, and we get ours straight from the original source: Greece.",
            "price":"3.68",
            "imageURL":"../images/mount_your_pizza/toppings/topping-Mushroom-195x184.jpg"
        },
        {
            "id":"tp-pepperoni",
            "name":"Pepperoni",
            "description": "Free of antibiotics or hormones, our pepperoni is made from a mix of Canadian, vegetable grain-fed beef and pork.",
            "price":"3.25",
            "imageURL":"../images/mount_your_pizza/toppings/topping-Pepperoni-195x184.jpg"
        },
        {
            "id":"tp-pineapple",
            "name":"Pineapple",
            "description": "Add pineapple to your meal for a touch of its signature sweetness and unique texture.",
            "price":"1.8",
            "imageURL":"../images/mount_your_pizza/toppings/topping-Pineapple-195x184.jpg"
        },
        {
            "id":"tp-tomatoes",
            "name":"Sliced Tomatoes",
            "description": "Tomatoes bring a bright and bold flavour to any pizza, and they’re also a great source of Vitamins C and A!",
            "price":"1.8",
            "imageURL":"../images/mount_your_pizza/toppings/topping-SlicedTomatoes-195x184.jpg"
        },
        {
            "id":"tp-smoked-ham",
            "name":"Smoked Ham",
            "description": "Our ham comes from Canadian farms. We smoke it, then slice it thinly before adding it to your meal.",
            "price":"3.8",
            "imageURL":"../images/mount_your_pizza/toppings/topping-SmokedHam-195x184.jpg"
        },
        {
            "id":"tp-undried-tomatoes",
            "name":"Undried Tomatoes",
            "description": "Our ham comes from Canadian farms. We smoke it, then slice it thinly before adding it to your meal.",
            "price":"3.2",
            "imageURL":"../images/mount_your_pizza/toppings/topping-UndriedTomatoes-195x184.jpg"
        }
    ];

pizzaCheesesDataModel = [
        {
            "id":"cheese-cheddar",
            "name":"Cheddar",
            "description": "Cheddar is made from cow’s milk, has a slightly crumbly texture, and boasts an earthy, sharp flavour.",
            "price":"2.65",
            "imageURL":"../images/mount_your_pizza/cheeses/cheese-Cheddar195x184.jpg"
        },
        {
            "id":"cheese-extra-mozzarella",
            "name":"Extra Mozzarella",
            "description": "Mozzarella is the one cheese pizza needs, and ours is made with 100% Canadian milk. It has a milky and buttery taste.",
            "price":"2.65",
            "imageURL":"../images/mount_your_pizza/cheeses/cheese-ExtraMozzarella-195x184.jpg"
        },
        {
            "id":"cheese-goat",
            "name":"Goat Cheese",
            "description": "Goat cheese has a tender and creamy texture, and a taste that pairs well with fruits, meats and vegetables.",
            "price":"2.65",
            "imageURL":"../images/mount_your_pizza/cheeses/cheese-Goat-195x184.jpg"
        },
        {
            "id":"cheese-parmigiano",
            "name":"Parmigiano",
            "description": "Parmigiano is a hard Italian cheese whose subtle flavour and versatility has made it a staple in Italian kitchens.",
            "price":"2.65",
            "imageURL":"../images/mount_your_pizza/cheeses/cheese-Parmigiano-195x184.jpg"
        }
    ];
