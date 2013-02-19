App.Database = DS.Model.extend({
    name:DS.attr('string'),
    collections: DS.hasMany('App.Collection')
});

