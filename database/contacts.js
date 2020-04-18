//Schema for contacts
export default async function(connection) {
    await connection.execute(
      `create table if not exists contacts (
        contactID integer primary key autoincrement, 
        name text not null,
        appearance text,
        demeanor text,
        interests text,
        firstMeet text,
        dateOfMeet text,
        birthday text,
        major text,
        job text,
        description text,
        other text
      )`
    );
    await connection.execute(
      `create unique index uk_contact_name on tags (name)`
    );
  }