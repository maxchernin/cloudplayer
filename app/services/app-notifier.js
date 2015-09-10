(function (angular) {
        var notifierFn = function () {
            toastr.options.closeButton = true;
            toastr.options.progressBar = true;
            toastr.options.timeOut = 3000;
            var msg = "Now Playing: ";
            var space = " ";
            return {
                clickedSongnotify: function (song) {
                toastr.success(msg + space + song.title);
                }
            }
        };
     angular.module('cpServices').factory('notifier', notifierFn);
})(angular);