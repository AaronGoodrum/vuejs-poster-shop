console.log('Server Started');
var PRICE = PRICE + 0;
var cartTotal;
	// create a new Vue instance plain property
new Vue({
	// Tell Vue where to be located/anchored in DOM (#id)
	el:'#app',
		data: {
			total: 0,
			items:[],
			cart: [],
			search:'',
		},
	methods: {
		//Search button submit
		onSubmit: function(){
			var self = this.search;
			console.log (self);
			
			this.$http
				.get(flickrAPI, flickrOptions, displayPhotos)
				.then(function(res){
					console.log( res.media.m)
					self.items = res.items.media.m;
				}); //end .then
			
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
					PRICE += this.items[index].Price;
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
					price: item.Price
				}); //End cart.push
				PRICE = this.items[index].Price;
			} //End If		
			this.total += (this.items[index].Price);
			cartTotal = this.total;
			console.log(PRICE);
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
			console.log(item.qty);
			// //Check if cart is zero
			if (item.qty <= 0) {
				//Remove 1 item from cart
				this.cart.splice(item, 1)
			}
			PRICE = this.total;
		} //End decItem
	}, // End methods
	filters: {
		currency: function(price){
			return '$'.concat(price.toFixed(2));
		}
	} //End Filters
}); // VUE END

$(document).ready(function() {
//*******************************************************
  //When the FORM Button is Click starts the function
	$('form').submit(function(evt){
		evt.preventDefault();

		//Set animal from the search form text used from html
				var flickrImage = $('#search').val();

//getJSON form the API of flickr API with "?jsoncallback=?"
		var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

//Data to send to API as
		var flickrOptions = {
			//Query string parameters from flickr API content matching some criteria  (ID : option)
			tags: flickrImage,
			format: "json"
		};


		//Build the HTML from all the data from JSON
			function displayPhotos(data) {
				var photoHTML = '<ul>';
				$.each(data.items, function(i, photo){
					photoHTML += '<li class="grid-25 tablet-grid-50">';
					photoHTML += '<a href="'+ photo.link +'" class="image">';
					photoHTML += '<img src="'+ photo.media.m +'"></a></li>';
				});
				photoHTML += '</ul>';
				$('#photos').html(photoHTML);
			};//END displayPhotos

		$.getJSON(flickrAPI, flickrOptions, displayPhotos);
	});//end FORM

});//End READY