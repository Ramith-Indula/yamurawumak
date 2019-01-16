var railPaaraApp = angular.module('railPaaraApp', []);

/*railPaaraApp.controller('loginController', function ($scope, $http) {

    $(window).load(function(){
        $('#cover').fadeOut(1000);

    });

    $scope.baseURL = "https://ramith-indula.github.io/yamurawumak/";

    if (sessionStorage.getItem('user')) {
        window.location = 'home.html'
    }

    $scope.login = function (username, password) {



        var body = {
            "email": username,
            "password": password
        };

        $http.post($scope.baseURL + 'home.html', body)
            .then(function (res) {
               /!* if (!res.data.error) {
                    console.log(res.data);
                    sessionStorage.setItem("user", res.data);
                    window.location = 'home.html';
                }
                else {*!/
                    /!*console.log(res.data);
                    $scope.login_error = res.data.error;*!/
                    console.log(res.data);
                    //sessionStorage.setItem("user", res.data);
                    window.location = 'home.html';
                //}
            }, function (res) {
                console.log(res);
            });
    };
});*/

railPaaraApp.controller('registerController', function ($scope, $http) {

    $scope.baseURL = "http://localhost/YamuRawumak/";

    $scope.register = function (email, name, password, confPassword) {

        if (password !== confPassword) {

        }
        else {

            var body = {
                "email": email,
                "password": password,
                "firstname": name.split(' ')[0],
                "lastname": name.split(' ')[1]
            };

            $http.post($scope.baseURL + 'signup', body)
                .then(function (res) {
                    if (!res.data.error) {
                        console.log(res.data);
                        if (res.data.ok == 1) {
                            window.location = 'index.html';
                        }

                    }
                    else {
                        console.log(res.data);
                    }
                }, function (res) {
                    console.log(res);
                });
        }

    };
});

railPaaraApp.controller('logoutController', function ($scope) {

    $scope.logout = function () {
        sessionStorage.removeItem('user');
        console.log("Hit!");
        window.location = 'index.html';
    };



});

railPaaraApp.controller('placeController', function ($scope, $http) {

    $scope.baseURL = "http://localhost/YamuRawumak/images/";

    $http.get($scope.baseURL + 'place/' + sessionStorage.getItem('place-Id'))
        .then(function (res) {
            if (!res.data.error) {
                console.log(res.data);
                $scope.place = res.data;

                if ($scope.place.name == "Gangaramaya Temple") {
                    $scope.isGangaramaya = true;
                    $scope.challengeLink = "challenge.html";
                }
                else {
                    $scope.isGangaramaya = false;
                    $scope.challengeLink = "challenge-galleface.html";
                }
            }
            else {
                console.log(res.data);
            }
        }, function (res) {
            console.log(res);
        });

    $scope.toggleLike = function () {

        $scope.place.is_liked = true;

        var body = {
            user: sessionStorage.getItem(user)._id,
            place_id: sessionStorage.getItem('place-Id')
        };

        $http.post($scope.baseURL + 'addFavPlace', body)
            .then(function (res) {
                if (!res.data.error) {
                    console.log(res.data);

                }
                else {
                    console.log(res.data);
                }
            }, function (res) {
                console.log(res);
            });


    }

});

railPaaraApp.controller('favPlacesController', function ($scope, $http) {

    $scope.baseURL = "http://localhost/railpara/";

    $scope.isDeleted = false;

    $scope.deleteFavPlace = function (placeID) {

        $scope.isDeleted = true;

        var body = {
            user: sessionStorage.getItem(user)._id,
            place: placeID
        };

        $http.post($scope.baseURL + 'removeFavPlace', body)
            .then(function (res) {
                if (!res.data.error) {
                    console.log(res.data);

                }
                else {
                    console.log(res.data);
                }
            }, function (res) {
                console.log(res);
            });
    }

});

railPaaraApp.controller('upcomingTripController', function ($scope, $http) {

    $scope.baseURL = "http://localhost/railpara/";

    $scope.isTripCancelled = false;

    $scope.cancelTrip = function (tripID) {

        $scope.isTripCancelled = true;

        var body = {
            user: sessionStorage.getItem(user)._id,
            trip: tripID
        };

        $http.post($scope.baseURL + 'cancelTrip', body)
            .then(function (res) {
                if (!res.data.error) {
                    console.log(res.data);

                }
                else {
                    console.log(res.data);
                }
            }, function (res) {
                console.log(res);
            });
    }

});

