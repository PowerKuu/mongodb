import {Db, MongoClient, Document, Collection, ServerApiVersion} from "mongodb"

export class database {
    #uri: string
    MongoDatabase: Db
    MongodbClient: MongoClient

    constructor(DatabaseName, uri: string){  
        this.#uri = uri
        this.MongodbClient = new MongoClient(this.#uri, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            serverApi: ServerApiVersion.v1 
        } as any)

        this.MongoDatabase = this.MongodbClient.db(DatabaseName)
    }

    async connect() {
        await this.MongodbClient.connect()
        return this
    }
}


//! Extend this class to create a custom collection
export class collection {
    name: string
    database:database

    collection:Collection<Document>


    constructor(name, database:database) {
        this.database = database
        this.collection = this.database.MongoDatabase.collection(name)
    }    


    //? GET
    async GetAll() {
        return this.collection.find().toArray()
    }
    async GetMultiple(quarry:Document) {
        return this.collection.find(quarry).toArray()
    }
    async GetOne(quarry) {
        return this.collection.findOne(quarry)
    }

    //? ADD
    async AddOne(quarry) {
        return this.collection.insertOne(quarry)
    }
    async AddMultiple(quarry) {
        return this.collection.insertMany(quarry)
    }

    //? DELETE
    async DeleteOne(quarry) {
        return this.collection.deleteOne(quarry)
    }
    async DeleteMany(quarry) {
        return this.collection.deleteMany(quarry)
    }
}
