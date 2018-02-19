angular
    .module('example.controller', [
        'example.service'
    ])
    .controller('ExampleController', ExampleController);


ExampleController.$inject = [
    'ExampleService',
    '$window',
    '$document',
    '$sce'
];

function ExampleController(ExampleService, $window, $document, $sce) {
    var vm = this;

    vm.$onInit = $onInit;
    vm.get = get;
    vm.getAsJsonp = getAsJsonp;
    vm.post = post;
    vm.binary = binary;

    /** {@inheritDoc}. */
    function $onInit() {
        vm.response = this.get();
        vm.done = true;
    }

    /** Gets the data. */
    function get() {
        vm.done = false;
        vm.response = {};
        ExampleService.get({}, function (response) {
            vm.response = response;
            vm.done = true;
        }, function (error) {
            vm.response = error;
            vm.done = true;
        });
    }

    /** Gets the binary data. */
    function binary() {
        vm.done = false;
        vm.response = {};
        ExampleService.binary({}, function (response) {
            var blob = new $window.Blob([response.body], {type: 'application/pdf'});
            var fileURL = $window.URL.createObjectURL(blob);
            var a = $document[0].createElement('a');

            a.download = response.headers('filename');
            a.href = $sce.trustAsResourceUrl(fileURL);
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, false);
            a.dispatchEvent(event);
            vm.done = true;
        }, function (error) {
            vm.response = error;
            vm.done = true;
        });
    }

    /** Gets the data with jsonp. */
    function getAsJsonp() {
        vm.done = false;
        vm.response = {};
        ExampleService.getAsJsonp({}, function (response) {
            vm.response = response;
            vm.done = true;
        }, function (error) {
            vm.response = error;
            vm.done = true;
        });
    }

    /** Posts the data. */
    function post() {
        vm.done = false;
        vm.response = {};
        ExampleService.post({item: vm.item}, function (response) {
            vm.response = response;
            vm.done = true;
        }, function (error) {
            vm.response = error;
            vm.done = true;
        });
    }
}
