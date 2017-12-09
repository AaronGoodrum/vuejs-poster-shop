console.log('Server Started');
var PRICE = PRICE + 0;
var cartTotal;
var LOAD_NUM = 10;

	// create a new Vue instance plain property
new Vue({
	// Tell Vue where to be located/anchored in DOM (#id)
	el:'#app',
		data: {
			total: 0,
			items:[],
			cart: [],
			results:[],
			newSearch:'Poster',
			lastSearch:'',
			loading: false,
			price: 9.99,
			busy: false
		},
	methods: {
		appendItems: function() {

			if (this.items.length < this.results.length){
				var append = this.results.slice(this.items.length, this.items.length + LOAD_NUM);
				this.items = this.items.concat(append);
			}
		},
		//Search button submit
		onSubmit: function(){
			this.items = [];
			this.loading = true;
			this.$http
				.get('/search/'.concat(this.newSearch))
				.then(function(res){
					this.results = res.data;
					this.appendItems();
					this.lastSearch = this.newSearch;
					this.loading = false;
				}, response => {
					// error callback
					this.loading = false;
					this.lastSearch = this.newSearch;
				}); //End http
			
		}, //End onSubmit
		// Add a product into the cart, if not found add one
		addItem: function(index) {
			var item = this.items[index];
			var found = false;
			// Check if item.id found in cart qty++
			for (var i = 0; i< this.cart.length; i++){
				if (this.cart[i].id === item.id) {
					found = true;
					this.cart[i].qty++;
					PRICE += this.items[index].price;
					break;
				} //End if
			} //End for
			// Push title.item.index in to cart.array
			// If found = false then run
			if (!found){
				this.cart.push({
					id: item.id,
					title: item.title,
					qty: 1,
					price: 9.99
				}); //End cart.push
				PRICE = this.price;
			} //End If		
			this.total += (this.price);
			cartTotal = this.total;
		}, //End addItem
	// update Item.quantity with ( inc , dec )
	inc: function(item){
		// ADD one item.qty
		item.qty++;
		this.total += (item.price);
		PRICE = this.total;

	},
	dec: function(item){
		//Remove ONE item.qty
		item.qty--;
		this.total -= (item.price);
		//Check if cart is zero
		if (item.qty <= 0) {
			//Remove 1 item from cart
			this.cart.splice(item, 1)
		}
		PRICE = this.total;
	}, //End decItem
}, //End methods
filters: {
	currency: function(price){
		return '$'.concat(price.toFixed(2));
	}	
}, //End Filters
mounted: function(){
	this.onSubmit();

	var vueSelf = this;
	var elem = document.getElementById('product-list-bottom');
	var watcher = scrollMonitor.create(elem);
		watcher.enterViewport(function() {
			vueSelf.appendItems();
		});
} //End Mounted

}); // VUE END

$(document).ready(function() {

});//End READY