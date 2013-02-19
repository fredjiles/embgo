
require('app/routes/secure');
App.BaseUserRoute = Ember.Route.extend({
    setupController:function (controller, model) {

        this._super();
        this.controllerFor('user').set('content', App.store.findAll(App.User));
    }
});

App.UserRoute = Ember.Route.extend({
    model:function () {
        return App.store.findAll(App.User);
    },
    setupController:function (controller, model) {
        controller.set('content', model);
    },
    events:{

    },
    enter: function(){}

});
App.UserUpdateRoute = App.BaseUserRoute.extend({});
App.UserRemoveRoute = App.BaseUserRoute.extend({});
App.UserShowRoute = App.BaseUserRoute.extend({});
App.UserAddRoute = App.BaseUserRoute.extend({
    model:function () {
        return {};
    }

});

