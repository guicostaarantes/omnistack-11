exports.up = function(knex) {
  return knex.schema.createTable("incidents", function(table) {
    table.increments();
    table.string("ngo_id").notNullable();
    table.string("title").notNullable();
    table.string("description").notNullable();
    table.decimal("value").notNullable();
    table
      .foreign("ngo_id")
      .references("id")
      .inTable("ngos");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("incidents");
};
