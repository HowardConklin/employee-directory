(function () {
  'use strict';
  angular.module('app').directive('edDesk', edDesk);

  edDesk.$inject = ['$rootScope', '$routeParams'];

  function edDesk($rootScope, $routeParams) {
    var directive = {
      restrict: 'E',
      templateUrl: '/partials/components/desk',
      replace: true,
      scope: {
        pos: '@',
        orientation: '@',
        xpos: '@',
        ypos: '@'
      },
      link: linkFunc
    };

    return directive;

    function linkFunc(scope, el, attrs) {
      if ($routeParams.pos === attrs.pos) {
        el.addClass('active').append('<div class="marker"><div class="pulse"></div><div class="pin"></div>');
      }

      $rootScope.$on('selectedEmployeeChange', function (event, selectedEmployees) {
        if (selectedEmployees.length === 1 && (selectedEmployees[0].deskLoc.pos === attrs.pos)) {
          el.addClass('active').append('<div class="marker"><div class="pulse"></div><div class="pin"></div>');
        } else {
          el.removeClass('active').find('.marker').remove();
        }
      });
    }
  }
})();