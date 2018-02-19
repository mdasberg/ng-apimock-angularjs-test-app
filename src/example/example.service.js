angular
    .module('example.service', [
        'ngResource'
    ])
    .service('ExampleService', ExampleService);

ExampleService.$inject = [
    '$resource'
];

function ExampleService($resource) {
    return $resource('/items', {}, {
        get: {
            method: 'GET',
            transformResponse: transformResponse
        },
        getAsJsonp: {
            method: 'JSONP',
            transformResponse: transformResponse
        },
        post: {
            method: 'POST',
            transformResponse: transformResponse
        },
        binary: {
            method: 'GET',
            headers: {
                accept: 'application/pdf'
            },
            responseType: 'arraybuffer',
            transformResponse: transformResponse
        }
    });

    /**
     * Transform the response.
     * @param data The data.
     * @param headers The headers.
     * @param status The status.
     * @return {{body: *, headers: *, status: *}}
     */
    function transformResponse(data, headers, status) {
        return {
            body: data,
            headers: headers,
            status: status
        };
    }
}