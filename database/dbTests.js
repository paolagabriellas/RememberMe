
import db from "./db";
export class DBTest {
    static async doAllTests() {
        try
        {
            var tagName = "Test" + parseInt(Math.random()*10000);
            var result = null;

            //TAG Tests
            db.createTag(tagName, "Blue");
            //ALWAYS USE AWAIT if you want to access the data returned by the call!!!! These are async functions
            // result = await db.findAllTagsWithNameLike("Test");
            // result = await db.findAllTagsWithNameLike(tagName);
            // result = result.rows[0].tagID; //This is how you access the attributes inside the ResultSet array
            // result = await db.getTag(result);
            //console.log(result);
            await db.updateTag(result.rows[0].tagID, "Josh", "Red");
            result = await db.getTag(result.rows[0].tagID);
            //console.log(result);
            // db.deleteTag(result.rows[0].tagID);
            // //console.log("Tag " + tagName + " RIP");
            // result = await db.getAllTags();
            // //console.log(result.rows);

            console.log("\n\n\nContact Tests");
            var contactName = "John Test" + parseInt(Math.random()*10000);
            result = await db.createContact(contactName, birthday="07/04/1776");
            // result = await db.getContact(result.insertId); //Here you see that you can get the contact by the insertId.
            // var id = result.rows[0].contactID;
            // result = await db.findAllContactsWithNameLike("John Test");
            // //console.log(result);
            result = await db.updateContact(id,"AAAAHH", null, "nerdy");
            // result = await db.getAllContacts(); //
            // console.log(result);
            // await db.deleteContact(id);

            // console.log("\n\n\nContactsTagged Tests");
            result = await db.createTag(tagName, "Blue");
            // var tag_id = result.insertId
            result = await db.createContact(contactName, birthday="07/04/1776");
            // var contact_id = result.insertId
            result = await db.addTagToContact(tag_id, contact_id)
            //console.log(result);
            // result = await db.getAllTagsForContact(contact_id)
            // //console.log(result);
            // result = await db.getAllContactsWithTag(tag_id)
            // //console.log(result);
            // result = await db.getAllFromContactsTagged()
            //console.log(result);

            //These work, only uncomment out one delete at a time.
            //await db.deleteTagFromContact(tag_id, contact_id)
            //await db.deleteAllOfOneContact(contact_id)
            //await db.deleteAllOfOneTag(tag_id)
            //console.log("After delete")
            //result = await db.getAllFromContactsTagged()
            console.log(result);

        //    await db.deleteTag(tag_id);
        //    await db.deleteContact(contact_id);
        }
        catch(e)
        {
            console.log(e);
            console.log("Error in db tests")
        }

    }
}
