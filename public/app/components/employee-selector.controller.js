(function () {
  'use strict';
  angular.module('app').controller('edEmployeeSelectorCtrl', edEmployeeSelectorCtrl);

  edEmployeeSelectorCtrl.$inject = ['$rootScope', 'edEmployeeService'];

  function edEmployeeSelectorCtrl($rootScope, edEmployeeService) {
    var vm = this;
    vm.employees = edEmployeeService.getAllEmployees();
    vm.selectedEmployees = edEmployeeService.getSelectedEmployees();
    vm.selectEmployee = selectEmployee;

    function selectEmployee(employee) {
      edEmployeeService.updateSelectedEmployees(employee);
    }
  }
})();
