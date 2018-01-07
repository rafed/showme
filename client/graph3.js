var cy = cytoscape({

	container: document.getElementById('cy'), // container to render in

	elements: [ // list of graph elements to start with
		{ // node a
		  data: { "id": "a","author":"mou" }
		},
		{ // node b
		  data: {"id": "b","author":"rafu"}
		},
		{ // node c
		  data: { "id": "c","author":"mou" }
		},
		{ // node d
		  data: {"id": "d","author":"aqu" }
		},
		{ // node e
		  data: { "id": "e","author":"eusha" }
		},
		{ // node f
		  data: {"id": "f","author":"rafu" }
		},
		{ // node g
		  data: { "id": "g","author":"eusha" }
		},
		{ // node h
		  data: {"id": "h","author":"rafu" }
		},
		{ // node i
		  data: {"id": "i","author":"rafu" }
		},
		{ // node j
		  data: {"id": "j","author":"rafu" }
		},
		{ // node k
		  data: {"id": "k","author":"rafu" }
		},
		{ // node l
		  data: { "id": "l","author":"eusha" }
		},
		{ // node m
		  data: {"id": "m","author":"rafu" }
		},
		{ // node n
		  data: {"id": "n","author":"rafu" }
		},
		{ // node o
		  data: {"id": "o","author":"rafu" }
		},
		{ // node p
		  data: {"id": "p","author":"rafu" }
		},
		{ // node q
		  data: {"id": "q","author":"rafu" }
		},
		{ // node r
		  data: { "id": "r","author":"eusha" }
		},
		{ // node s
		  data: {"id": "s","author":"rafu" }
		},
		{ // node t
		  data: {"id": "t","author":"rafu" }
		},
		{ // node u
		  data: {"id": "u","author":"rafu" }
		},
		
		
		
		
		{ // edge ab
		  data: { id: 'ab', source: 'b', target: 'a' }
		},
		{ // edge bc
		  data: { id: 'bc', source: 'b', target: 'c' }
		},
		{ // edge bd
		  data: { id: 'bd', source: 'b', target: 'd' }
		},
		{ // edge be
		  data: { id: 'be', source: 'b', target: 'e' }
		},
		{ // edge bf
		  data: { id: 'bf', source: 'b', target: 'f' }
		},
		{ // edge bg
		  data: { id: 'bg', source: 'b', target: 'g' }
		},
		{ // edge bh
		  data: { id: 'bh', source: 'b', target: 'h' }
		},	
		{ // edge bi
		  data: { id: 'bi', source: 'b', target: 'i' }
		},	
		{ // edge bj
		  data: { id: 'bj', source: 'b', target: 'j' }
		},
		{ // edge bk
		  data: { id: 'bk', source: 'b', target: 'k' }
		},
		{ // edge bl
		  data: { id: 'bl', source: 'b', target: 'l' }
		},
		{ // edge bm
		  data: { id: 'bm', source: 'b', target: 'm' }
		},	
		{ // edge bn
		  data: { id: 'bn', source: 'b', target: 'n' }
		},	
		{ // edge bo
		  data: { id: 'bo', source: 'b', target: 'o' }
		},	
		{ // edge bp
		  data: { id: 'bp', source: 'b', target: 'p' }
		},
		{ // edge bq
		  data: { id: 'bq', source: 'b', target: 'q' }
		},
		{ // edge br
		  data: { id: 'br', source: 'b', target: 'r' }
		},
		{ // edge bs
		  data: { id: 'bs', source: 'b', target: 's' }
		},	
		{ // edge bt
		  data: { id: 'bt', source: 'b', target: 't' }
		},	
		{ // edge bu
		  data: { id: 'bu', source: 'b', target: 'u' }
		},
		
	],
		

	style: [ // the stylesheet for the graph
		{
		  selector: 'node',
		  style: {
			'background-color': '#0000ff',
			'label': 'data(id)', //author dile author dekhabe
			'text-valign' : 'center',
		  }
		},

		{
		  selector: 'edge',
		  style: {
			'width': 3,
			'line-color': '#0000dd', 
			'target-arrow-color': '#ccc', //keno dorkar bujhi ni
			'target-arrow-shape': 'triangle' //keno dorkar bujhi ni
		  }
		}
	],
	
});


//on click puraton
cy.nodes().on("click", function(){
	document.getElementById("para").innerHTML="Author "+ this.data("author");
	//alert("Author "+ this.data("author"));
});

//hover puraton
cy.on('mouseover', 'node', function(){
	document.getElementById("para").innerHTML="hovered " + this.id();
	//alert( 'hovered ' + this.id());
});

// on click
cy.elements().qtip({
	overwrite: false,
	
	content: function(){ return 'click korecho mama ' + this.id() },
	position: {
		my: 'top center',
		at: 'bottom center'
	},
	style: {
		tip: {
			width: 16,
			height: 8
		}
	}		
});
// outside node on click
cy.qtip({
	content: 'kono node nai mama ekhane',
	position: {
		my: 'top center',
		at: 'bottom center'
	},
	show: {
		cyBgOnly: true
	},
	style: {

		tip: {
			width: 16,
			height: 8
		}
	}
});

// hover
cy.elements().qtip({
	overwrite: false,
	show: {
        event: 'mouseover'
    },
    hide: {
        event: 'mouseout'
    },
	content: function(){ return 'hover korchi :D  : ' + this.id() },
	position: {
		my: 'top center',
		at: 'bottom center'
	},
	style: {
		classes: 'qtip-bootstrap',
		tip: {
			width: 16,
			height: 8
		}
	}		
});


  

//cy.nodes().selector(".tooltip");
var layout = cy.layout({ name: 'cose' });

layout.run();



cy.$('#b').position('x', document.getElementById("cy").offsetHeight/2);
cy.$('#b').position('y', document.getElementById("cy").offsetWidth/2);

