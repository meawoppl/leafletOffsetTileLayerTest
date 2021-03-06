// Subscribe to the relevent collections
Meteor.subscribe("recent-images");
// Get the property and image metadata collections
Props = new Meteor.Collection("prop"); 
imageMeta = new Meteor.Collection('imageMetadata');
var hostUrl = 'http://kesm.no-ip.org';

Template.leafletViewer.rendered = function() {

  console.log("Running rendered() callback.");

  // Initialize the leaflet map
  map = L.map('leaflet-container', {crs: L.CRS.Simple}).setView([-12000/256, 4098/256], 0); // MRG TODO: remove global after testing.

  // A hash keying all the current offsets to tile-layers
  var offsetToLayer = {};

  // Autorunning function to keep the current tiles up to date
  Deps.autorun( function() {
    // Fetch all the recent tiled images, make sure they have offsets (some early metadata records dont)
    var images = imageMeta.find({tiled:true, offset:{ $exists:true }}, {sort:{time:-1}}).fetch();
    
    // Compute the number of unique offsets, and sort them
    var currentOffsets = _.uniq( _.pluck( images, "offset" ) );
    currentOffsets.sort();

    console.log('currentOffsets: ');
    console.log(currentOffsets);

    // Go through all of the valid offsets and either make layers for the image, or set the url appropriately.
    _.each(currentOffsets, function ( currentOffset ) {
      // Get the most recent image for this offset
      var imageForThisOffset = imageMeta.findOne({tiled:true, offset:currentOffset}, {sort:{time:-1}} );
      
      // HACK to always use the same image for testing
      var tileImageID = 'abcdef'; // imageForThisOffset._id;
      
      // Compute the URL and offset of this tile layer
      var dx = imageForThisOffset.offset; 
      console.log('dx: '+dx);   
      var dy = 0; 
      var imageUrl = hostUrl + '/tileImages/' + tileImageID + '/{z}/{x}_{y}.png';

      var layer;

      // Check to see if the offset keys to a layer
      if( currentOffset in offsetToLayer ) {
        // Get the layer of interest
        layer = offsetToLayer[currentOffset];

        // Check that this is actully a URL change
        // if( ! imageUrl === layer._url ) {
          // Set the url correctly
          layer.setUrl(imageUrl);
          console.log("Setting url on layer: " + tileImageID );
        // } else {
        //   console.log('same url...');
        // }
      } else {
        // If there is not a tile layer for this offset, make one
        layer = new offsetTileLayer(imageUrl, {
          minZoom: 0,
          maxZoom: 6,
          attribution: '3Scan - TAMU',
          noWrap: true,
          continuousWorld: true,
          offset: new L.point(-dx, -dy), // totes need to check the signs
        });
        
        console.log(layer);
        // Add it to the map, and the list of offsetsToLayers
        map.addLayer(layer);
        offsetToLayer[imageForThisOffset.offset] = layer;
      }
    });

    // // Clean up layers who no longer appear
    // _.each( _.keys( offsetToLayer ), function(thisOffset) {
    //   // We computed the current offsets in a view set, so now we can 
    //   // cull out layers no longer belonging to this offset
    //   if (! ( thisOffset in currentOffsets ) ) {
    //     var deadLayer = offsetToLayer[thisOffset];
    //     // Remove the layer from the map, and nuke it from our layer list
    //     console.log('removing layer: ');
    //     console.log(deadLayer);
    //     map.removeLayer(deadLayer);
    //     delete offsetToLayer[thisOffset];
    //   }
    // });
  });    
};