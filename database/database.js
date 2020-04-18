//Adapted from https://gist.github.com/GendelfLugansk/db31d7742c4dbc3d6d768fa525474aff
import * as SQLite from "expo-sqlite";

//This does the magic of connections and transactions don't touch it.
class Connection {
    constructor(databaseName) {
        this._db = SQLite.openDatabase(databaseName);
        this.transacting = false;
    }
    execute(sqlStatement, args = []) {
        return new Promise((resolve, reject) => {
            this._db.exec([{sql: sqlStatement, args}], false, (err, res) => {
                if (err) {
                    return reject(err);
                }
                
                if (res[0].error) {
                    return reject(res[0].error);
                }
                resolve(res[0]);
            });
        });
    }
    close() {
        this._db._db.close();
    }
    async beginTransaction() {
        await this.execute("begin transaction");
        this.transacting = true;
    }
    async commitTransaction() {
        await this.execute("commit");
        this.transacting = false;
    }
    async rollbackTransaction() {
        await this.execute("rollback");
        this.transacting = false;
    }
}

//Class to abstract the SQLite code
export class Database {
    constructor(name = "main", {prepareConnFn, migrateFn} = {}) {
        this._dbName = name;
        this._connection = new Connection(this._dbName);
        this._params = {prepareConnFn, migrateFn};
        this._prepareConnectionPromise =
            typeof this._params.prepareConnFn === "function"
                ? this._params.prepareConnFn(this._connection)
                : Promise.resolve();
        const performMigration = async () => {
            const connection = new Connection(this._dbName);
            await this._params.migrateFn(connection);
            connection.close();
        };
        this._migrationPromise =
            typeof this._params.migrateFn === "function"
                ? performMigration()
                : Promise.resolve();
    }

    /// Executes a single SQL query
    /// If you want to pass in arguments, put them in an array and put ? in the query in their place.
    /// Returns the result in the form of a ResultSet https://docs.expo.io/versions/latest/sdk/sqlite/#resultset-objects
    async execute(sqlQuery, args = []) {
        await this._prepareConnectionPromise;
        await this._migrationPromise;
        return await this._connection.execute(sqlQuery, args);
    }

    //Creates a tag if it doesn't exist or replaces it if it already exists 
    async createTag(name, color="blue") {
        try 
        {
            var result = await this.execute("INSERT OR REPLACE INTO tags (name, color)\
            VALUES(? , ?);", [name,color]);
            console.log(result); 
        }
        catch(e)
        {
            console.log("Error in createTag");
        }  
    }

    //Updates the tag based on id
    //Returns null if an error occurred else a result set
    async updateTag(id, name ="", color="") {
        var result = null;
        if (name == "" && color == "")
        {
            console.log("No updates to be made.");
            return;
        }
        else if (name != "" && color != "") //Both are getting changed
        {
            try
            {
                result = await this.execute("UPDATE tags\
                                            SET  name = ?, color = ?\
                                            WHERE tagID = ?;", [name,color, id]);
            }
            catch (e)
            {
                console.log("Error on trying to update a tag - updateTag");
            }
        }
        else if (name != "" && color == "")
        {
            try
            {
                result = await this.execute("UPDATE tags\
                                             SET  name = ?\
                                             WHERE tagID = ?;", [name, id]);
            }
            catch (e)
            {
                console.log("Error on trying to update a tag - updateTag");
            }
        }
        else if (name == "" && color != "")
        {
            try
            {
                result = await this.execute("UPDATE tags\
                                             SET  color = ?\
                                             WHERE tagID = ?;", [color, id]);
            }
            catch (e)
            {
                console.log("Error on trying to update a tag - updateTag");
            }
        }
        return result;
    }

    //Returns null if unsuccessful or a ResultSet of tags if successful.
    async getAllTags() {
        var result = null;
        try 
        {
            result = await this.execute("SELECT * FROM tags;");
        }
        catch(e)
        {
            console.log("Error in getAllTags");
        }
        return result;
    }
    
    //This one is vulnerable to SQL injections, because I couldn't figure out how to use the like operator with the ? syntax
    //Returns null on an error otherwise a ResultSet.
    async findAllTagsWithNameLike(name) {
        var result = null;
        try 
        {
            result = await this.execute("SELECT * FROM tags WHERE name LIKE \"%" +  name + "%\";");
        }
        catch(e)
        {
            console.log("Error in findAllTagsWithNameLike");
        }
        return result;
    }

    async createContact(name, appearance=null, demeanor=null, interests=null, firstMeet=null, dateOfMeet=null,birthday=null,major=null,job=null,description=null,other=null)
    {
        try 
        {
            var result = await this.execute("INSERT OR REPLACE INTO tags (name, color)\
            VALUES(? , ?);", [name,color]);
            console.log(result); 
        }
        catch(e)
        {
            console.log("Error in createTag");
        }
    }

    /// Performs a transaction where multiple SQL Queries are executed
    /// Doesn't return anything as far as I can tell. Not really planning on using this
    async transaction(cb) {
        await this._prepareConnectionPromise;
        await this._migrationPromise;
        const connection = new Connection(this._dbName);
        if (typeof this._params.prepareConnFn === "function") {
            await this._params.prepareConnFn(connection);
        }
        try {
            await connection.beginTransaction();
            try {
                await cb(connection);
                await connection.commitTransaction();
            } catch (e) {
                await connection.rollbackTransaction();
                throw e;
            }
        } catch (e) {
            connection.close();
            throw e;
        }
        await connection.close();
    }
    close() {
        this._connection._db.close();
    }
}
