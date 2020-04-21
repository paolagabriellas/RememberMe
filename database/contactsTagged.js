//Schema for many to many relationship between
export default async function(connection) {
    await connection.execute(
      `create table if not exists ContactsTagged (
        contactID integer,
        tagID integer,
        FOREIGN KEY(contactID) REFERENCES contacts(contactID),
        FOREIGN KEY(tagID) REFERENCES tags(tagID)
      )`
    );
  }