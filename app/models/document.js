App.Document = DS.Model.extend({
    id: DS.attr('number'),
    data: DS.attr('string'),
    collections: DS.belongsTo('Collection')
});

