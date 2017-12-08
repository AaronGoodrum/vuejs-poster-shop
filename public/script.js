console.log('Server Started');
var PRICE;
	// create a new Vue instance plain property
new Vue({
	// Tell Vue where to be located/anchored in DOM (#id)
	el:'#app',
		data: {
			total: 0,
			items:[
				{id: 1, title: 'Item 10', Price: 10},
				{id: 2, title: 'Item 9', Price: 9},
				{id: 3, title: 'Item 4', Price: 4},
				{id: 4, title: 'Item 6', Price: 6}
			],
			cart: []
		},
	methods: {
		addItem: function(index) {
			var item = this.items[index];
			var found = false;
			// Check if item.id found in cart qty++
			for (var i = 0; i< this.cart.length; i++){
				if (this.cart[i].id === item.id) {
					found = true;
					this.cart[i].qty++;
					PRICE += this.items[index].Price;
				} //End if
			} //End for
			// Push title.item.index in to cart.array
			// If found = false then run
			if (!found){
				this.cart.push({
					id: item.id,
					title: item.title,
					qty: 1,
					price: item.Price
				}); //End cart.push
				PRICE = this.items[index].Price;
			} //End If		
			this.total = (this.total + PRICE);
			console.log(PRICE);
		}, //End addItem
		inc: function(item){
			console.log ('inc');
		},
		dec: function(item){
			console.log ('dec');
		}
	}, // End methods
	filters: {
		currency: function(price){
			return '$'.concat(price.toFixed(2));
		}
	} //End Filters
}); // VUE END
