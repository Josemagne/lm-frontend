import lssv from "localpersistence/lssv";
import LM_Metadata from '../../types/common/metadata';

/**
 * Class to interact with LocalStorage and SessionStorage
 */
class LocalPersistence {
    storage: Storage;
    public static defaultMetadata: LM_Metadata = {
        amountOfBooks: 0,
        favoriteBooks: [],
        user: { email: "", name: "" }
    }

    constructor(storage: Storage) {
        this.storage = storage;
    }


    /**
     * Gets the metadata object from localStorage
     */
    public static getMetaData(): LM_Metadata {
        let result!: LM_Metadata;
        // If there is already a metadata object
        if (new lssv().getStorageObject("metadata")) {
        }
        // Else create the standard object
        else {
            new lssv().createStorageObject("metadata", this.defaultMetadata).then((value: LM_Metadata) => {
                result = value;
            })
        }

        return result;
    }

}

export default LocalPersistence;