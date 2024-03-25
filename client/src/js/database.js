import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    console.log("PUT to the database");
    const jateDb = await openDB("jate", 1);
    const text = jateDb.transaction("jate", "readwrite");
    const store = text.objectStore("jate");
    const request = store.put({ id: 1, content });
    const result = await request;
    console.log("Data saved to the database", result);
  } catch (error) {
    console.error("Error occurred", error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log("GET all from the database");
    const jateDB = await openDB("jate", 1);
    const text = jateDB.transaction("jate", "readonly");
    const store = text.objectStore("jate");
    const request = store.get(1);
    const result = await request;
    console.log("result.value", result);
    return result?.content ?? undefined;
  } catch (error) {
    console.error("Error occurred", error);
  }
};

initdb();
