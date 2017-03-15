// let locations = [
//   {id: 1, city: "Washington", state: "DC", country: "USA", img_url: "", area: ""},
//   {id: 2, city: "New York City", state: "NY", country: "USA", img_url: "", area: ""},
//   {id: 3, city: "Boston", state: "MA", country: "USA", img_url: "", area: ""}
// ]
let states = ["AL","AK","AZ","AR","CA","CO","CT","DC","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
let countries = ["USA"];

angular
  .module("touristapp", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .factory("LocationFactory", [
    "$resource",
    LocationFactoryFunction
  ])
  .factory("EventFactory", [
    "$resource",
    EventFactoryFunction
  ])
  .factory("PhotoFactory", [
    "$resource",
    PhotoFactoryFunction
  ])

// Routes
function RouterFunction($stateProvider){
  $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "js/ng-views/welcome.html",
      controller: "WelcomeController",
      controllerAs: "vm"
    })
    .state("locationIndex", {
      url: "/locations",
      templateUrl: "js/ng-views/locations/index.html",
      controller: "LocationIndexController",
      controllerAs: "vm"
    })
    .state("locationNew", {
      url: "/locations/new",
      templateUrl: "js/ng-views/locations/new.html",
      controller: "LocationNewController",
      controllerAs: "vm"
    })
    .state("locationEdit", {
      url: "/locations/:id/edit",
      templateUrl: "js/ng-views/locations/edit.html",
      controller: "LocationEditController",
      controllerAs: "vm"
    })
    .state("locationShow", {
      url: "/locations/:id",
      templateUrl: "js/ng-views/locations/show.html",
      controller: "LocationShowController",
      controllerAs: "vm"
    })
    .state("eventIndex", {
      url: "/events",
      templateUrl: "js/ng-views/events/index.html",
      controller: "EventIndexController",
      controllerAs: "vm"
    })
    .state("eventNew", {
      url: "/events/new",
      templateUrl: "js/ng-views/events/new.html",
      controller: "EventNewController",
      controllerAs: "vm"
    })
    .state("eventEdit", {
      url: "/events/:id/edit",
      templateUrl: "js/ng-views/events/edit.html",
      controller: "EventEditController",
      controllerAs: "vm"
    })
    .state("eventShow", {
      url: "/events/:id",
      templateUrl: "js/ng-views/events/show.html",
      controller: "EventShowController",
      controllerAs: "vm"
    })
    .state("photosIndex", {
      url: "/events/:event_id/photos/:id",
      templateUrl: "js/ng-views/photos/index.html",
      controller: "PhotosIndexController",
      controllerAs: "vm"
    })
    .state("photosShow", {
      url: "/photos/show/:id",
      templateUrl: "js/ng-views/photos/show.html",
      controller: "PhotoShowController",
    })
  }
// Factory Functions

function LocationFactoryFunction($resource) {
  return $resource("http://localhost:3000/locations/:id", {}, {
    update: { method: "PUT" }
  })
}

function EventFactoryFunction($resource) {
  return $resource("http://localhost:3000/events/:id", {}, {
    update: { method: "PUT" }
  })
}

function PhotoFactoryFunction($resource) {
  return $resource("http://localhost:3000/events/:event_id/photos/:id", {}, {
    update: { method: "PUT" },
    query: { method: "GET", isArray: true}
  })
}

// Separating our controllers by data model since this might get long and ugly.
angular.module("touristapp")
  .controller("WelcomeController", [
    WelcomeControllerFunction
  ])
// Location Controllers
angular.module("touristapp")
  .controller("LocationIndexController", [
    "$stateParams",
    "$state",
    "LocationFactory",
    LocationIndexControllerFunction
  ])
  .controller("LocationNewController", [
    "$stateParams",
    "$state",
    "LocationFactory",
    LocationNewControllerFunction
  ])
  .controller("LocationEditController", [
    "$stateParams",
    "$state",
    "LocationFactory",
    LocationEditControllerFunction
  ])
  .controller("LocationShowController", [
    "$stateParams",
    "$state",
    "LocationFactory",
    "EventFactory",
    LocationShowControllerFunction
  ])  // Event Controllers
  .controller("EventIndexController", [
    "$stateParams",
    "$state",
    "EventFactory",
    EventIndexControllerFunction
  ])
  .controller("EventNewController", [
    "$stateParams",
    "$state",
    "EventFactory",
    EventNewControllerFunction
  ])
  .controller("EventEditController", [
    "$stateParams",
    "$state",
    "EventFactory",
    EventEditControllerFunction
  ])
  .controller("EventShowController", [
    "$stateParams",
    "$state",
    "EventFactory",
    EventShowControllerFunction
  ])

function WelcomeControllerFunction() {

}

// Location Controller Functions
function LocationIndexControllerFunction($stateParams, $state, LocationFactory) {
  this.locations = LocationFactory.query();
  this.setUrl = function(url) {
    return `url("${url}")`
  }
}

function LocationNewControllerFunction($stateParams, $state, LocationFactory) {
  this.location = new LocationFactory();
  this.addLocation = function(){
    this.location.$save(function(location){
      $state.go("locationShow", {id: location.id});
    })
  }
  this.states = ["AL","AK","AZ","AR","CA","CO","CT","DC","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
  this.countries = ["USA"];
}

function LocationEditControllerFunction($stateParams, $state, LocationFactory) {
  this.location = LocationFactory.get({id: $stateParams.id});
  this.updateLocation = function(){
    this.location.$update({id: $stateParams.id}, function(){
      $state.go("locationShow", {id: $stateParams.id});
    });
  }
  this.deleteLocation = function(){
    this.location.$delete({id: $stateParams.id}, function(){
      $state.go("locationIndex");
    })
  }
  this.states = ["AL","AK","AZ","AR","CA","CO","CT","DC","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
  this.countries = ["USA"];
}

function LocationShowControllerFunction($stateParams, $state, LocationFactory, EventFactory) {
  this.location = LocationFactory.get({id: $stateParams.id});
  this.events = EventFactory.query();
  this.setUrl = function(url) {
    return `url("${url}")`
  }
}


// Event Controller Functions

function EventIndexControllerFunction($stateParams, $state, EventFactory) {
  this.events = EventFactory.query();
}

function EventNewControllerFunction($stateParams, $state, EventFactory) {
  this.event = new EventFactory();
  this.addEvent = function(){
    this.event.$save(function(event){
      $state.go("eventShow", {id: location.id});
    })
  }
}

function EventEditControllerFunction($stateParams, $state, EventFactory) {
  this.event = EventFactory.get({id: $stateParams.id});
  this.updateEvent = function(){
    this.event.$update({id: $stateParams.id}, function(){
      $state.go("eventShow", {id: $stateParams.id});
    });
  }
  this.deleteEvent = function(){
    this.event.$delete({id: $stateParams.id}, function(){
      $state.go("eventIndex");
    })
  }
}

function EventShowControllerFunction($stateParams, $state, EventFactory) {
  this.event = EventFactory.get({id: $stateParams.id});
}

// Photos Controllers
angular.module("touristapp")
  .controller("PhotosIndexController", [
    "$stateParams",
    "$state",
    "PhotoFactory",
    "EventFactory",
    PhotosIndexControllerFunction
  ])
  .controller("PhotoShowController", [
    "$stateParams",
    "$state",
    "PhotoFactory",
    PhotoShowControllerFunction
  ])

// Photos Controller Functions
function PhotosIndexControllerFunction($stateParams, $state, PhotoFactory, EventFactory) {
  let self = this;
  PhotoFactory.query({event_id: $stateParams.event_id}, function(res){
    self.photos = res;
    self.currentImage = self.photos[0];
  })
  this.event = EventFactory.get({id: $stateParams.event_id});

  // this.currentImageUrl = setUrl(this.currentImage.img_url)
  this.setCurrentImage = function(photo) {
    this.currentImage = photo;
  }
  this.setUrl = function(url) {
    return `url("${url}")`
  }
  this.photo = new PhotoFactory();
  this.addPhoto = function(){
    this.photo.event_id = $stateParams.id;
    this.photo.$save(function(){
      $state.reload();
    })
  }
  this.update = function() {
    this.currentImage.$update({id: this.currentImage.id});
  }
  this.delete = function() {
    this.currentImage.$delete({id: this.currentImage.id}, function(){
      $state.reload();
    })
  }
}

function PhotoShowControllerFunction($stateParams, $state, PhotoFactory) {
  this.photo = PhotoFactory.get({id: $stateParams.id})
}

function setUrl(url) {
  return `url("${url}")`
}
