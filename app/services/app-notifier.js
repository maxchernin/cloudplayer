(function (angular) {
        var appNotifiyFn = function () {
            toastr.options.closeButton = true;
            toastr.options.progressBar = true;
            toastr.options.timeOut = 3000;
            return {
                notify: function (msg) {
                    toastr.success(msg);
                }
            }
        };
     angular.module('cpServices').factory('appNotify', appNotifiyFn);
})(angular);