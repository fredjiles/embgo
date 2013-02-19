App.Database = DS.Model.extend({
    name:DS.attr('string'),
    documents: DS.hasMany('App.Document'),
    database: DS.belongsTo('App.Database')
});

