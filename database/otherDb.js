/*//Joshua Dargan
//Following this tutorial: https://medium.com/swlh/react-native-with-sqlite-1ec64702e35e
const db = openDatabase("db");

const ready = db.tx(function* (tx) {
    yield tx.query(sql`
      CREATE TABLE IF NOT EXISTS schema_version (
        version INT NOT NULL
      );
    `);
    const versionRecord = yield tx.query(sql`
      SELECT version FROM schema_version;
    `);
    const version = (
      versionRecord.length
        ? versionRecord[0].version
        : 0
    );
    if (version < 1) {
      yield tx.query(sql`
        CREATE TABLE tasks (
          id TEXT NOT NULL PRIMARY KEY,
          name TEXT NOT NULL,
          completed BOOLEAN NOT NULL
        );
      `);
    }
    // to add other versions in the future,
    // we can just add extra if statements
    // and increase LATEST_VERSION
    const LATEST_VERSION = 1;
    if (version === 0) {
      yield tx.query(sql`
        INSERT INTO schema_version
        VALUES (${LATEST_VERSION});
      `);
    } else {
      yield tx.query(sql`
        UPDATE schema_version
        SET version = ${LATEST_VERSION};
      `);
    }
  });

  
  //Created using this tutorial: https://medium.com/@jonathan.holloway/react-native-embedded-database-options-2d04da023e4e
import React from 'react';
import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { Updates } from 'expo';

const DEBUG = true;
const DB_NAME = 'remember.db';
const SQLITE_DIRECTORY = `${FileSystem.documentDirectory}SQLite`;
const LOCAL_SQLITE_DB = `${SQLITE_DIRECTORY}/${DB_NAME}`;
const SOURCE_DB_ASSET = require(`./assets/db/${DB_NAME}`);
let db;

export default class DB extends React.Component {        
    
    constructor() {
        super();
        db = SQLite.openDatabase(DB_NAME);
    }

    async initialise() {
        try {                 
            
            const dbInfo = await FileSystem.getInfoAsync(LOCAL_SQLITE_DB, {
                intermediate: true    
            });
            await this.makeSQLiteDirectoryIfNotExist();
            console.log(dbInfo);
            if (!dbInfo['exists']) {
                if (DEBUG) console.log(`Creating DB at path: ${LOCAL_SQLITE_DB}`);
                await FileSystem.downloadAsync(Asset.fromModule(SOURCE_DB_ASSET).uri, LOCAL_SQLITE_DB).catch(error => {
                    console.error(`Error downloading the database: ${e}`);
                });
                console.log('Reloading app for database');
                Updates.reload();
            } else {                
                console.log(`Using DB found at: ${LOCAL_SQLITE_DB}`);
            }            

          } catch (e) {            
            console.log(e);
          } 
    }

    async getTableInfo() {
        try {
            const db = await this.getDatabaseRef();
            db.transaction(tx => {
            tx.executeSql('SELECT name FROM sqlite_master WHERE type="table"', [], (_, { rows }) => {
                console.log('-- TABLE INFO --');
                rows['_array'].map(function(r) {
                    console.log(` Found table: ${r.name}`);
                });
            });
            });
        } catch (e) {            
            console.log(e);            
        }
    }

    async getNumberOfTables() {
        try {
            const db = await this.getDatabaseRef();
            db.transaction(tx => {
            tx.executeSql('SELECT name FROM sqlite_master WHERE type="table"', [], (_, { rows }) => {
                const number = rows['_array'].length;
                console.log(`Get Number of tables: ${number}`);
                return number;
            });
            });
        } catch (e) {            
            console.log(e);            
        }
    }    

    async makeSQLiteDirectoryIfNotExist() {
        const { exists } = await FileSystem.getInfoAsync(SQLITE_DIRECTORY);
        if (!exists) {
            await FileSystem.makeDirectoryAsync(SQLITE_DIRECTORY);
            console.log("Created SQLite directory");
        } else {
            console.log("SQLite directory exists");
        }
    }    

    async getDatabaseRef() {  
        return db;
    }
}



*/

























