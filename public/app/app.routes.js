(function () {
    'use strict';

    var routerApp = angular.module('app', ['ui.router', 'ngResource']);

    var routeRoleChecks = {
        admin: requireAdmin,
        user: requireAuth
    };

    routerApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
        // for any unmatched url
        $urlRouterProvider.otherwise("/");

        $locationProvider.html5Mode(true);

        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/partials/main/main',
            controller: 'edMainCtrl as vm',
        })
        .state('seat-map', {
            url: '/seat-map/:pos',
            templateUrl: '/partials/seat-map/seat-map',
            controller: 'edSeatMapCtrl as vm'
        })
        .state('login', {
            url: '/login',
            templateUrl: '/partials/account/login',
            controller: 'edLoginCtrl as vm'
        })
        .state('admin', {
            url: '/admin',
            template: '<div ui-view></div>',
        })
        .state('admin.users', {
            url: '/users',
            templateUrl: '/partials/admin/user-list',
            controller: 'edUserListCtrl as vm',
            resolve: {
                auth: routeRoleChecks.admin
            }
        })
        .state('admin.create-user', {
            url: '/create-user',
            templateUrl: '/partials/admin/create-user',
            controller: 'edCreateUserCtrl as vm',
            resolve: {
                auth: routeRoleChecks.admin
            }
        })
        .state('admin.update-user', {
            url: '/update-user',
            templateUrl: '/partials/admin/update-user',
            controller: 'edUpdateUserCtrl as vm',
            resolve: {
                auth: routeRoleChecks.user
            }
        });
    }]);
   
    requireAdmin.$inject = ['edAuthService'];

    function requireAdmin(edAuthService) {
        return edAuthService.authorizeCurrentUserForRoute('admin');
    }

    requireAuth.$inject = ['edAuthService'];

    function requireAuth(edAuthService) {
        return edAuthService.authorizeAuthenticatedUserForRoute();
    }
})();
