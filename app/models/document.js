App.Document = DS.Model.extend({
    data: DS.attr('string'),
    collections: DS.belongsTo('App.Collection')
});

