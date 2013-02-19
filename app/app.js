require('app/dependencies/compiled/templates');

var App = Ember.Application.create({
    LOG_TRANSITIONS: true
});

window.App = App;
App.CurrentUser = null;

App.store = DS.Store.create({
    revision:11,
    adapter:DS.RESTAdapter.create({ namespace: 'api', bulkCommit:false })
});

App.store.adapter.serializer.primaryKey = function (type) {
    return '_id';
};

//******************* Models *********************//
require('app/models/database');
require('app/models/collection');
require('app/models/document');

//******************************** Routing *************//
require('app/routes');
//***** Controllers and Views *****////
require('app/controllers/database_controller');

App.ApplicationController = Ember.Controller.extend();
App.ApplicationView = Ember.View.extend({
    templateName:'application'
});

App.NavBarItem = Em.Object.extend({
    displayText:'',
    routePath:'',
    routeName:'',
    url:'#'
});

var navigationItems = App.Database.find();
/***************** Navigation ***********************/
App.NavigationController = Ember.ArrayController.extend({
    content:[],
    selected:null,
    init:function () {
        this._super();
        this.pushObjects(navigationItems);
    }
});

App.NavigationView = Ember.View.extend({
    navItems: navigationItems,
    templateName:'navigation/side',
    selectBinding:'controller.selected',
    NavigationItemView:Ember.View.extend({
        tagName:'li',
        classNameBindings:'isActive:active'.w(),
        isActive:function () {
            return this.get('menu') === this.get('parentView.selected');
        }.property('item', 'parentView.selected').cacheable(),

        navigateTo:function (routeName) {
            this.get('controller').transitionToRoute(routeName);
        }
    })

});


