var p1 = $.ajax({
  url: "data/spec_bar.json",
  dataType: "json"
});


$.when(p1).done(run)

function run(vegaJSON) {

	//Note that vegaJSON is already parsed by jQuery - i.e. it is a javascript object, not a string of json waiting to be parsed 

	var runtime = vega.parse(vegaJSON);  //We parse the object into a runtime

	//Note that in constrast to the simple example, this json spec includes a signal

	var view = new vega.View(runtime)
	  .logLevel(vega.Warn) // set view logging level
	  .renderer('svg')  // set renderer (canvas or svg)
	  .initialize('#vis_holder') // initialize view within parent DOM container	
	  .hover()  //This is needed to enable the hover behaviour specified in the spec
	  .run();   // run the dataflow and render the view


	//A changeset for the data.  There is also a 'remove' method.
	var changeset = vega.changeset().insert([{"u": 10,  "v": 28}, {"u": 20,  "v": 55}])

	//You have to match the name of the dataset (in this case 'table') for it to work
	view.change('table', changeset).run()

	// add a function to the dataflow to update pre with the hovered value
	// Note that we add this to the view so that it has access to the view's internal properties
    var hoverfollower = view.add( function() {
        console.log((JSON.stringify(view._signals.label.value)));
      }
    );

    // react to the label event stream
    view.on(view._signals.label, hoverfollower);

}
