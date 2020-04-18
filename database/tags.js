//Schema for tags
export default async function(connection) {
    await connection.execute(
      `create table if not exists tags (
        tagID integer primary key autoincrement, 
        name text not null,
        color text not null
      )`
    );
    await connection.execute(
      `create unique index uk_tags_name on tags (name)`
    );
  }