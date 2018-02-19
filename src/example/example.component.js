angular
    .module('example.component', [
        'example.controller'
    ])
    .component('example', {
        templateUrl: 'example/example.component.html',
        controller: 'ExampleController'
    });