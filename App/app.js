var LiveOdiaApp = angular.module('LiveOdia', ['ngRoute', 'LocalStorageModule']);
LiveOdiaApp.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

    $routeProvider.when('/login', {
        templateUrl: 'App/Views/login.html',
        controller: 'loginController'
    });
    $routeProvider.when('/home', {
        controller: 'homeController',
        templateUrl: 'App/Views/home.html'
    });
    $routeProvider.when('/about', {
        controller: 'aboutController',
        templateUrl: 'App/Views/about.html'
    });
    $routeProvider.when('/contact', {
        controller: 'contactController',
        templateUrl: 'contact.html'
    });
    $routeProvider.when('/detailnews/:id', {
        controller: 'detailnewsController',
        templateUrl: 'App/Views/detailnews.html'
    });
    $routeProvider.when('/detailhotnews/:id', {
        controller: 'hotnewsController',
        templateUrl: 'App/Views/hotnews.html'
    });
    $routeProvider.when('/admin', {
        controller: 'adminController',
        templateUrl: 'App/Views/admin.html'
    });
    $routeProvider.when('/hotnewsdetail/:id', {
        controller: 'detailHotnewsController',
        templateUrl: 'App/Views/hotdetailnews.html'
    });

    $routeProvider.otherwise({ redirectTo: '/home' });
}]);
LiveOdiaApp.run(function ($rootScope, $location, loginServiceFactory) {
    loginServiceFactory.fillAuthData();
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        debugger;
        var path = $location.path();
        if (!loginServiceFactory.authentication.isAuth && path == '/login') {
            // event.preventDefault();
            $location.path('/login');
        }

        if (loginServiceFactory.authentication.isAuth && path == '/login') {
            // event.preventDefault();
            $location.path('/admin');
        }
        //event.preventDefault();
        if ($location.path() != '/home') {
            $rootScope.hideit = true;
        }
        else {
            $rootScope.hideit = false;
        }
    });
});

//LiveOdiaApp.directive('head', ['$rootScope','$compile',
//    function($rootScope, $compile){
//        return {
//            restrict: 'E',
//            link: function(scope, elem){
//                var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" />';
//                elem.append($compile(html)(scope));
//                scope.routeStyles = {};
//                $rootScope.$on('$routeChangeStart', function (e, next, current) {
//                    if(current && current.$$route && current.$$route.css){
//                        if(!angular.isArray(current.$$route.css)){
//                            current.$$route.css = [current.$$route.css];
//                        }
//                        angular.forEach(current.$$route.css, function(sheet){
//                            delete scope.routeStyles[sheet];
//                        });
//                    }
//                    if(next && next.$$route && next.$$route.css){
//                        if(!angular.isArray(next.$$route.css)){
//                            next.$$route.css = [next.$$route.css];
//                        }
//                        angular.forEach(next.$$route.css, function(sheet){
//                            scope.routeStyles[sheet] = sheet;
//                        });
//                    }
//                });
//            }
//        };
//    }
//]);