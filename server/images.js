var image = new Meteor.Collection("imageMetadata");

Meteor.publish("recent-images", function () {
  return image.find({}, {sort:{time:-1}, limit:100});
});

var insertDefaultImageMeta = function () {

  // this gets incremented every time nextOffset is run.
  var currentOffset = 0;

  var offsetFactor = Math.ceil(2000 / 7 / 5);

  // basically a generator
  var nextOffset = function() {
    var offset = currentOffset;
    currentOffset += offsetFactor;
    return offset;
  };
  
  image.insert({"_id":"c0e645a3-f713-4408-916f-80f252ac6581","time":1372706184583,"properties":{"camera_ySize":12000,"stage_z_action":"\tThe axis is homed.\n","stage_z_fault":false,"stage_x_current":0.0641106516122818,"stage_x_homed":true,"stage_z_enabled":true,"camera_acqRunning":true,"stage_y_current":0.0523720383644104,"stage_quadDiv":0,"stage_x_enabled":true,"stage_z_homed":true,"stage_y_enabled":true,"stage_x_position":27.000025290527343,"stage_x_fault":false,"stage_y_position":42.00000397611605,"stage_y_action":"\tThe axis is enabled.\n","stage_y_homed":true,"camera_acqRequest":true,"stage_z_position":26.024136609328167,"stage_x_action":"\tThe axis is homed.\n","camera_triggerState":true,"stage_y_fault":false,"stage_z_current":-0.348597913980484,"actionQueue":[],"camera_lineRate":60000,"camera_xSize":4096},"tiled":true,"offset": nextOffset(),"slice_speed":17.46897427111185,"imageType":"image"});
  
  image.insert({"_id":"062e6226-45f5-44cc-9f54-a7014a5bbbd7","time":1372706176123,"properties":{"camera_ySize":12000,"stage_z_action":"\tThe axis is enabled.\n","stage_z_fault":false,"stage_x_current":0.22480320930480957,"stage_x_homed":true,"stage_z_enabled":true,"camera_acqRunning":true,"stage_y_current":0.09297618269920349,"stage_quadDiv":0,"stage_x_enabled":true,"stage_z_homed":true,"stage_y_enabled":true,"stage_x_position":26.999855018920897,"stage_x_fault":false,"stage_y_position":43.9999644594525,"stage_y_action":"\tThe axis is homed.\n","stage_y_homed":true,"camera_acqRequest":true,"stage_z_position":26.024183797470183,"stage_x_action":"\tThe axis is enabled.\n","camera_triggerState":true,"stage_y_fault":false,"stage_z_current":-0.6669542193412781,"actionQueue":[],"camera_lineRate":60000,"camera_xSize":4096},"stored":true,"tiled":true,"offset":nextOffset(),"slice_speed":14.020685320873937,"imageType":"image"});

  image.insert({"_id":"0b8fb417-cfc6-4b7f-9f74-001af7a3ffc5","time":1372706169397,"properties":{"camera_ySize":12000,"stage_z_action":"\tThe axis is enabled.\n","stage_z_fault":false,"stage_x_current":0.24517051875591278,"stage_x_homed":true,"stage_z_enabled":true,"camera_acqRunning":true,"stage_y_current":0.12179829180240631,"stage_quadDiv":0,"stage_x_enabled":true,"stage_z_homed":true,"stage_y_enabled":true,"stage_x_position":27.00028583190918,"stage_x_fault":false,"stage_y_position":46.00000771320688,"stage_y_action":"\tThe axis is homed.\n","stage_y_homed":true,"camera_acqRequest":true,"stage_z_position":26.02437388706863,"stage_x_action":"\tThe axis is enabled.\n","camera_triggerState":true,"stage_y_fault":false,"stage_z_current":0.0019304812885820866,"actionQueue":[],"camera_lineRate":60000,"camera_xSize":4096},"stored":true,"tiled":true,"offset":nextOffset(),"slice_speed":14.713214576769147,"imageType":"image"});

  image.insert({"_id":"58465f0b-3c3c-4549-b27b-7143994b55e5","time":1372706162698,"properties":{"camera_ySize":12000,"stage_z_action":"\tThe axis is enabled.\n","stage_z_fault":false,"stage_x_current":0.04631970822811127,"stage_x_homed":true,"stage_z_enabled":true,"camera_acqRunning":true,"stage_y_current":-0.03218467906117439,"stage_quadDiv":0,"stage_x_enabled":true,"stage_z_homed":true,"stage_y_enabled":true,"stage_x_position":27.000019232788087,"stage_x_fault":false,"stage_y_position":28.000004406137933,"stage_y_action":"\tThe axis is homed.\n","stage_y_homed":true,"camera_acqRequest":true,"stage_z_position":26.019177367158086,"stage_x_action":"\tThe axis is enabled.\n","camera_triggerState":true,"stage_y_fault":false,"stage_z_current":-0.6963375806808472,"actionQueue":[],"camera_lineRate":60000,"camera_xSize":4096},"stored":true,"tiled":true,"offset":nextOffset(),"slice_speed":14.001304488029152,"imageType":"image"});

  image.insert({"_id":"74ceb58e-f5b1-4ca3-8417-3cff931b199d","time":1372706155842,"properties":{"camera_ySize":12000,"stage_z_action":"\tThe axis is enabled.\n","stage_z_fault":false,"stage_x_current":0.00275621609762311,"stage_x_homed":true,"stage_z_enabled":true,"camera_acqRunning":true,"stage_y_current":-0.03823380917310715,"stage_quadDiv":0,"stage_x_enabled":true,"stage_z_homed":true,"stage_y_enabled":true,"stage_x_position":27.00002318359375,"stage_x_fault":false,"stage_y_position":30.000016442902552,"stage_y_action":"\tThe axis is homed.\n","stage_y_homed":true,"camera_acqRequest":true,"stage_z_position":26.0191901917623,"stage_x_action":"\tThe axis is enabled.\n","camera_triggerState":true,"stage_y_fault":false,"stage_z_current":0.5327727198600769,"actionQueue":[],"camera_lineRate":60000,"camera_xSize":4096},"stored":true,"tiled":true,"offset":nextOffset(),"slice_speed":15.295290777101629,"imageType":"image"});

  image.insert({"_id":"8884f23d-3a5e-4c43-b720-85e87ac1f784","time":1372706149039,"properties":{"camera_ySize":12000,"stage_z_action":"\tThe axis is homed.\n","stage_z_fault":false,"stage_x_current":0.20547127723693848,"stage_x_homed":true,"stage_z_enabled":true,"camera_acqRunning":true,"stage_y_current":-0.03939018398523331,"stage_quadDiv":0,"stage_x_enabled":true,"stage_z_homed":true,"stage_y_enabled":true,"stage_x_position":26.999955775146486,"stage_x_fault":false,"stage_y_position":31.999983964650575,"stage_y_action":"\tThe axis is homed.\n","stage_y_homed":true,"camera_acqRequest":true,"stage_z_position":26.019178774582148,"stage_x_action":"\tThe axis is enabled.\n","camera_triggerState":true,"stage_y_fault":false,"stage_z_current":0.7543660402297974,"actionQueue":[],"camera_lineRate":60000,"camera_xSize":4096},"stored":true,"tiled":true,"offset":nextOffset(),"slice_speed":15.680553964144305,"imageType":"image"});

  image.insert({"_id":"91aba0a7-82d3-4404-becd-6355b84728a1","time":1372706142341,"properties":{"camera_ySize":12000,"stage_z_action":"\tThe axis is enabled.\n","stage_z_fault":false,"stage_x_current":0.6029505133628845,"stage_x_homed":true,"stage_z_enabled":true,"camera_acqRunning":true,"stage_y_current":-0.015590577386319637,"stage_quadDiv":0,"stage_x_enabled":true,"stage_z_homed":true,"stage_y_enabled":true,"stage_x_position":27.000069393310547,"stage_x_fault":false,"stage_y_position":34.000016006376136,"stage_y_action":"\tThe axis is enabled.\n","stage_y_homed":true,"camera_acqRequest":true,"stage_z_position":26.020726374592854,"stage_x_action":"\tThe axis is enabled.\n","camera_triggerState":true,"stage_y_fault":false,"stage_z_current":-0.5994327068328857,"actionQueue":[],"camera_lineRate":60000,"camera_xSize":4096},"stored":true,"tiled":true,"offset":nextOffset(),"slice_speed":17.485575195407236,"imageType":"image"});

  image.insert({"_id":"3eea5c66-f9af-4f97-ab3d-585a34c483fd","time":1372706135583,"properties":{"camera_ySize":12000,"stage_z_action":"\tThe axis is homed.\n","stage_z_fault":false,"stage_x_current":0.024538319557905197,"stage_x_homed":true,"stage_z_enabled":true,"camera_acqRunning":true,"stage_y_current":0.0003207205736543983,"stage_quadDiv":0,"stage_x_enabled":true,"stage_z_homed":true,"stage_y_enabled":true,"stage_x_position":27.0001059954834,"stage_x_fault":false,"stage_y_position":36.00002867321933,"stage_y_action":"\tThe axis is homed.\n","stage_y_homed":true,"camera_acqRequest":true,"stage_z_position":26.019187416940703,"stage_x_action":"\tThe axis is enabled.\n","camera_triggerState":true,"stage_y_fault":false,"stage_z_current":0.5555682182312012,"actionQueue":[],"camera_lineRate":60000,"camera_xSize":4096},"stored":true,"tiled":true,"offset":nextOffset(),"slice_speed":16.182964078478193,"imageType":"image"});

  image.insert({"_id":"ac925c35-1e5e-4647-8352-464f81296d3b","time":1372706128805,"properties":{"camera_ySize":12000,"stage_z_action":"\tThe axis is enabled.\n","stage_z_fault":false,"stage_x_current":0.0641106516122818,"stage_x_homed":true,"stage_z_enabled":true,"camera_acqRunning":true,"stage_y_current":-0.002779386704787612,"stage_quadDiv":0,"stage_x_enabled":true,"stage_z_homed":true,"stage_y_enabled":true,"stage_x_position":26.999877282714845,"stage_x_fault":false,"stage_y_position":37.9999632863039,"stage_y_action":"\tThe axis is enabled.\n","stage_y_homed":true,"camera_acqRequest":true,"stage_z_position":26.01918187477805,"stage_x_action":"\tThe axis is enabled.\n","camera_triggerState":true,"stage_y_fault":false,"stage_z_current":0.5327727198600769,"actionQueue":[],"camera_lineRate":60000,"camera_xSize":4096},"stored":true,"tiled":true,"offset":nextOffset(),"slice_speed":17.310561119303227,"imageType":"image"});

};


Meteor.startup(function () {

  image.remove({});

  if (image.find().count() === 0) {
    insertDefaultImageMeta();
  }

  // Every 5 seconds make the oldest image look like the newest one.
  Meteor.setInterval(function(){
    var oldestImageID = image.findOne({},{sort:{time:-1}})._id;
    image.update({_id:oldestImageID}, {$set:{time:+new Date}});
  }, 5000);
});