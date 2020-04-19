//Adapted from https://gist.github.com/GendelfLugansk/db31d7742c4dbc3d6d768fa525474aff
import {Database} from "./database";
import users from "./users";
import tags from "./tags";
import contacts from "./contacts";
import contactsTagged from "./contactsTagged"

//When adding new migrations in already deployed app, append them to the end of array, do not re-arrange
//Do not modify migration after app version containing it is published
//These are the tables to create
const migrations = [null, users, tags, contacts, contactsTagged];
const migrationsTable = "_migrations";

//Constant representing the database that you should de
const db = new Database("main", {
  prepareConnFn: async connection => {
    try {
      await connection.execute("PRAGMA foreign_keys = ON;");
    } catch (e) {
      console.log(e);
    }
  },
  migrateFn: async connection => {
    
    //Inside migration function you can use `connection.beginTransaction`, `connection.commitTransaction` and 
    //`connection.rollbackTransaction` methods to control transactions, as needed. In this example I simply 
    //run all migrations inside single transaction. Your needs might be different
    //Outside of migration use `transaction` method of `Database` class for transactions
    await connection.beginTransaction();
    try {
      await connection.execute(
        `create table if not exists ${migrationsTable} (version integer primary key, updatedAt text not null)`
      );
      const versions = (
          await connection.execute(`select * from ${migrationsTable}`)
      ).rows.map(({ version }) => version);
      const currentVersion = Math.max(0, ...versions);
      for (let i = currentVersion + 1; i < migrations.length; i++) {
        
        await migrations[i](connection);
        await connection.execute(`insert into ${migrationsTable} values (?, ?)`, [
          i,
          new Date().toISOString()
        ]);
        console.log(`Applied migration ${i}`)
      }
      console.log("Database Initialized and Ready!")
      await connection.commitTransaction();
    } catch (e) {
      console.log("An error has occurred while initializing the database. Rolling back transaction.");
      await connection.rollbackTransaction();
      console.log(e);
    }    
    
  }
});

export default db;