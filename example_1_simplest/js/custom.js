var p1 = $.ajax({
  url: "data/spec_bar.json",
  dataType: "json"
});


$.when(p1).done(run)

function run(vegaJSON) {

	//Note that vegaJSON is already parsed by jQuery - i.e. it is a javascript object, not a string of json waiting to be parsed 

	var runtime = vega.parse(vegaJSON);  //We parse the object into a runtime

	var view = new vega.View(runtime)
	  .logLevel(vega.Warn) // set view logging level
	  .renderer('svg')  // set renderer (canvas or svg)
	  .initialize('#vis_holder') // initialize view within parent DOM container	
	  .hover()  //This is needed to enable the hover behaviour specified in the spec
	  .run();   // run the dataflow and render the view

}
