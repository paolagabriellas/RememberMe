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
        var result = null;
        try 
        {
            result = await this.execute("INSERT INTO tags (name, color) \
            VALUES(? , ?);", [name,color]);
            //console.log(result); 
        }
        catch(e)
        {
            console.log(e);
            console.log("Error in createTag");
        }  
        return result;
    }

    //Updates the tag based on id
    //Nothing gets returned
    async updateTag(id, name ="", color="") {
        if (name === "" && color === "")
        {
            console.log("No updates to be made.");
            return;
        }
        else if (name !== "" && color !== "") //Both are getting changed
        {
            try
            {
                await this.execute("UPDATE tags \
                                    SET  name = ?, color = ? \
                                    WHERE tagID = ?;", [name,color, id]);
            }
            catch (e)
            {
                console.log(e);
                console.log("Error on trying to update a tag - updateTag1");
            }
        }
        else if (name !== "" && color === "")
        {
            try
            {
                await this.execute("UPDATE tags \
                                    SET  name = ? \
                                    WHERE tagID = ?;", [name, id]);
            }
            catch (e)
            {
                console.log(e);
                console.log("Error on trying to update a tag - updateTag2");
            }
        }
        else if (name === "" && color !== "")
        {
            try
            {
                await this.execute("UPDATE tags \
                                    SET  color = ? \
                                    WHERE tagID = ?;", [color, id]);
            }
            catch (e)
            {
                console.log(e);
                console.log("Error on trying to update a tag - updateTag3");
            }
        }
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
            console.log(e);
            console.log("Error in getAllTags");
        }
        return result;
    }

    async getTag(id) {
        var result = null;
        try 
        {
            //console.log(typeof(id));
            result = await this.execute("SELECT * FROM tags WHERE tagID = ?;", [id]);
        }
        catch(e)
        {
            console.log(e);
            console.log("Error in getTag");
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

    //Deletes tag with id; void
    async deleteTag(id) {
        try 
        {
            await this.deleteAllOfOneTag(id);
            await this.execute("DELETE FROM tags WHERE tagID = ?", Array.of(id));
        }
        catch(e)
        {
            console.log(e)
            console.log("Error in deleteTag");
        }  
    }

    //Creates a contact. Requires a name, all other parameters are optional
    async createContact(name, appearance="", demeanor="", interests="", firstMeet="", dateOfMeet="",birthday="",major="",job="",description="",other="",imagePath="")
    {
        var result = null;
        try 
        {
            result = await this.execute("INSERT INTO contacts (name, appearance,demeanor,interests,firstMeet,dateOfMeet,birthday,major,job,description,other,imagePath)\
                                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [name,appearance,demeanor,interests,firstMeet,dateOfMeet,birthday,major,job,description,other,imagePath]);
        
            //console.log(result);
        }
        catch(e)
        {
            console.log(e);
            console.log("Error in createTag");
        }
        return result;
    }

    //Gets all the data for a contact with id
    async getContact(id) {
        var result = null;
        try 
        {
            result = await this.execute("SELECT * FROM contacts WHERE contactID = ?;", Array.of(id));
        }
        catch(e)
        {
            console.log(e);
            console.log("Error in getContact");
        }
        return result;
    }

    //Gets all of the contacts listed by name alphabetically; returns an array in the ResultSet
    async getAllContacts(){
        var result = null
        try 
        {
            result = await this.execute("SELECT * FROM contacts ORDER BY name ASC;");
        }
        catch(e)
        {
            console.log(e);
            console.log("Error in getAllContacts");
        }
        return result;
    }

    //This one is vulnerable to SQL injections, because I couldn't figure out how to use the like operator with the ? syntax
    //Returns null on an error otherwise a ResultSet.
    async findAllContactsWithNameLike(name) {
        var result = null;
        try 
        {
            result = await this.execute("SELECT * FROM contacts WHERE name LIKE \"%" +  name + "%\";");
        }
        catch(e)
        {
            console.log(e)
            console.log("Error in findAllTagsWithNameLike");
        }
        return result;
    }

    //Updates a contact's info
    async updateContact(id,name=null,appearance=null, demeanor=null, interests=null, firstMeet=null, dateOfMeet=null,birthday=null,major=null,job=null,description=null,other=null,imagePath=null) {
        try
            {
                await this.execute("UPDATE contacts \
                                    SET  name = coalesce(?, name), appearance = coalesce(?, appearance), demeanor = coalesce(?, demeanor), interests = coalesce(?, interests), firstMeet = coalesce(?, firstMeet), dateOfMeet = coalesce(?, dateOfMeet), birthday = coalesce(?, birthday), major = coalesce(?, major), job = coalesce(?, job), description = coalesce(?, description), other = coalesce(?, other), imagePath = coalesce(?, imagePath)\
                                    WHERE contactID = ?;", [name, appearance,demeanor, interests, firstMeet, dateOfMeet,birthday,major,job,description,other,imagePath, id]);
            }
            catch (e)
            {
                console.log(e);
                console.log("Error on trying to update a tag - updateTag3");
            }
    }

    //Deletes a contact by their id; void; automatically deletes all tags from it.
    async deleteContact(id){
        try
        {
            await this.deleteAllOfOneContact(id);
            await this.execute("DELETE FROM contacts WHERE contactID = ?;", [id]);
        }
        catch(e)
        {
            console.log(e);
            console.log("Error in deleteContact");
        }
    }

    //Gets all tags for a contact
    async getAllTagsForContact(contactID) {
        var result = null;
        try 
        {
            result = await this.execute("SELECT * FROM ContactsTagged WHERE contactID = ?", [contactID]);
            //console.log(result);
        }
        catch(e)
        {
            console.log(e);
            console.log("Error in getAllTagsForContact");
        }
        return result;
    }

    //Gets all contacts that have a particular tag
    async getAllContactsWithTag(tagID) {
        var result = null;
        try 
        {
            result = await this.execute("SELECT * FROM ContactsTagged WHERE tagID = ?", [tagID]);
            //console.log(result);
        }
        catch(e)
        {
            console.log(e);
            console.log("Error in getAllContactsWithTag");
        }
        return result;
    }

    //Gets all the different relationships from ContactsTagged
    async getAllFromContactsTagged() {
        var result = null;
        try 
        {
            result = await this.execute("SELECT * FROM ContactsTagged");
            //console.log(result);
        }
        catch(e)
        {
            console.log(e);
            console.log("Error in getAllFromContactsTagged");
        }
        return result;
    }

    //Adds a tag to the the contact
    async addTagToContact(tagID, contactID) {
        var result = null;
        try 
        {
            result = await this.execute("INSERT INTO ContactsTagged (contactID, tagID)\
                                VALUES(?, ?);",[contactID,tagID] );
        
            //console.log(result);
        }
        catch(e)
        {
            console.log(e);
            console.log("Error in addTagToContact");
        }
        return result;
    }

    //Deletes a tag from a contact
    async deleteTagFromContact(tagID, contactID) {
        try
        {
            await this.execute("DELETE FROM ContactsTagged \
                                WHERE contactID = ? AND tagID = ?;", [contactID, tagID]);
        }
        catch(e)
        {
            console.log(e);
            console.log("Error in deleteTagFromContact");
        }
    }

    //Removes this contact from all tags (called when a contact is deleted)
    async deleteAllOfOneContact(contactID) {
        try
        {
            await this.execute("DELETE FROM ContactsTagged WHERE contactID = ?;", [contactID]);
        }
        catch(e)
        {
            console.log(e);
            console.log("Error in deleteAllOfOneContact");
        }
    }

    //Removes this tag from all contacts (called when a tag is deleted)
    async deleteAllOfOneTag(tagID) {
        try
        {
            await this.execute("DELETE FROM ContactsTagged WHERE tagID = ?;", [tagID]);
        }
        catch(e)
        {
            console.log(e);
            console.log("Error in deleteAllOfOneTag");
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
