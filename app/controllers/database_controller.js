
App.UserRemoveController = Ember.ObjectController.extend({

    remove:function (context) {
        this.get('content').deleteRecord();
        App.store.commit();
        this.transitionToRoute('user.index');

    }
});
App.UserAddController = Ember.ObjectController.extend({
    save:function () {
        var user = App.User.createRecord(this.get('content'));
        this.set('content', user);
        // send to backend to save
        App.store.commit();
        this.transitionToRoute('user.index');
    }

});
App.UserUpdateController = Ember.ObjectController.extend({
    save:function () {
        // send to backend to save
        App.store.commit();
        debugger;
        this.content.toString();
        this.transitionToRoute('user.show', this.content);
    }

});
App.UserController = Ember.ArrayController.extend({});

App.UserAddView = Ember.View.extend({
    templateName:'user/form',
    save:function () {
        this.get('controller').save();
    }
});

App.UserUpdateView = Ember.View.extend({
    templateName:'user/form',
    save:function () {
        this.get('controller').save();
    }
});

