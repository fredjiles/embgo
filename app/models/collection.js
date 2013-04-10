App.Collection = DS.Model.extend({
    name:DS.attr('string'),
    database: DS.belongsTo('App.Database')

});
