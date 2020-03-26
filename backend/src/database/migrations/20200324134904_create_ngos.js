exports.up = function(knex) {
  return knex.schema.createTable("ngos", function(table) {
    table.increments();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("password_hash").notNullable();
    table.string("phone").notNullable();
    table.string("city").notNullable();
    table.string("uf").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("ngos");
};
