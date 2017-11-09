export default class LocalStorage {
  static setData(key, value) {
    let JSONString = JSON.stringify(value);
    localStorage.setItem(key, JSONString);
  }

  static getData(key) {
    let JSONString = localStorage.getItem(key);
    return JSON.parse(JSONString);
  }

  static removeData(key) {
    localStorage.removeItem(key);
  }
}