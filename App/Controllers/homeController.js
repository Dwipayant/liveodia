'use strict';
LiveOdiaApp.controller('homeController', ['$scope', '$rootScope', '$location', 'homeServiceFactory', 'HotnewsServiceFactory', function ($scope, $rootScope, $location, homeServiceFactory, HotnewsServiceFactory) {
    $scope.fullnews = [];
    $scope.hotNews = [];
    $scope.topstories = [];
    $scope.newsories = [];
    $scope.getAllNews = function () {
        homeServiceFactory.getAllNews().then(function (newsData) {
            debugger;
            if (newsData) {
                $scope.fullnews = newsData.fullnews;
                angular.forEach($scope.fullnews, function (value, key) {
                    //if (value.HotNews)
                    //    if (value.HotNews.HID != 0)
                    //        $scope.hotNews.push({ "title": value.HotNews.TITLE, "newsid": value.HotNews.HID });
                    if (value.TopNews)
                        if (value.TopNews.TID != 0)
                            $scope.topstories.push({ "title": value.TopNews.TITLE, "topnews": value.TopNews.TopNews, "newsid": value.TopNews.TID, "imgurl": value.TopNews.TopImg });
                    if (value.NewStory)
                        if (value.NewStory.NSID != 0)
                            $scope.newsories.push({ "title": value.NewStory.TITLE, "newstory": value.NewStory.NewStory, "newsid": value.NewStory.NSID, "imgurl": value.NewStory.NewImg });
                });
                $scope.getHotNewsTitle();
            }
        });
    };

    $scope.getHotNewsTitle = function () {
        debugger;
        HotnewsServiceFactory.getHotFullNewsTitle().then(function (hnewsdata) {
            if (hnewsdata) {
                debugger;
                $scope.hotNews = hnewsdata.HotNewsTitle;
            };
        })
    };

    $scope.getHotFullNews = function (hnid) {
        debugger;
        homeServiceFactory.getHotFullNews(hnid).then(function (hnewsdata) {
            if (hnewsdata) {
                debugger;
                $scope.hnewsDetail = hnewsdata;
            };
        })
    };


    $scope.getAllNews();
    
}]);