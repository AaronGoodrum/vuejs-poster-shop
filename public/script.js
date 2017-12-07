console.log('Server Started');
	// create a new Vue instance plain property
new Vue({
	// Tell Vue where to be located/anchored in DOM (#id)
	el:'#app',
		data: {
			total: 0,
			items:[
				{title: 'Item 1'},
				{title: 'Item 2'},
				{title: 'Item 3'},
				{title: 'Item 4'}
			],
			cart: []
		},
	methods: {
		addItem: function(index) {
			console.log (index);
			this.total += 9.99
		}
	}



}); // VUE END
