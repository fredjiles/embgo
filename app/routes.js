/**
 * User: Fred Jiles <fredjiles@gmail.com>
 * Date: 2/18/13
 */
App.Router.map(function () {
    this.resource("database", { path: "database/:database_id" }, function () {
        this.resource("collection", { path: "collection/:collection_id" }, function () {

        });
    });
});

App.DatabaseRoute = Ember.Route.extend({

});
