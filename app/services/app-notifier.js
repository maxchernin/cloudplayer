(function (angular) {
    var notifierFn = function () {
        toastr.options.closeButton = true;
        toastr.options.progressBar = true;
        toastr.options.showMethod = 'slideDown';
        toastr.options.hideMethod = 'slideUp';
        toastr.options.closeMethod = 'slideUp';
        toastr.options.timeOut = 2000;
        var msg = "Now Playing: ";
        var space = " ";
        return {
            clickedSongnotify: function (song) {
                toastr.success(msg + space + song.title);
            },
            displayGeneralInfoMsg: function (msg) {
                toastr.info(msg)
            }
        }
    };
    angular.module('cpServices').factory('notifier', notifierFn);
})(angular);