var loading_screen = pleaseWait({
    logo: "assets/images/headphone4.svg",
    backgroundColor: '#B10F2E',
    loadingHtml: '<div class="spinner"> <div class="rect1"> </div> <div class="rect2"> </div> <div class="rect3"> </div> <div class="rect4"></div> <div class="rect5"></div></div>'
});
//setTimeout(function () {
//    loading_screen.finish();
//}, 2000);
loading_screen.finish();
