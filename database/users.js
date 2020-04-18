//Schema for users if we were to actually have any
export default async function(connection) {
  await connection.execute(
    `create table if not exists users (
      id integer primary key autoincrement, 
      name text not null
    )`
  );
  await connection.execute(
    `create unique index uk_users_name on users (name)`
  );
}