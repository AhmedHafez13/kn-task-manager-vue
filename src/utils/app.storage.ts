export default class AppStorage {
  static setData(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static getData(key: string) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static hasKey(key: string) {
    return localStorage.getItem(key) != null;
  }

  static removeData(key: string) {
    localStorage.removeItem(key);
  }
}
