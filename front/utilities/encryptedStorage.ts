import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setData(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
    //console.log("Data saved successfully " + value);
  } catch (e) {
    console.error(
      "Error when saving data with key: " + key + " and value: " + value
    );
  }
}

export async function getData(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value !== null) {
      //console.log("Data successfully recover " + value);
      return value;
    }
  } catch (e) {
    console.error("Error when try to get the data with the key: " + key);
  }
}

export async function deleteData(key: string) {
  try {
    await AsyncStorage.removeItem(key);
    //console.log("Data deleted successfully");
  } catch (e) {
    console.error("Error when you try the delete de data with the key: " + key);
  }
}
