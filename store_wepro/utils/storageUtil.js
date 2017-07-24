
/**
 * Storage 封装类
 */
class StorageUtil {
  constructor() {

  }

  test(){
      console.log('test');
  }

  // Sync
  setter(key,data){
    try {
      wx.setStorageSync(key,data);
      return true;
    } catch (e) {
      return false;
    }
  }

  getter(key){
    try {
      return wx.getStorageSync(key);
    } catch (e) {
      return '';
    }
  }

  remove(key){
    try {
      return wx.removeStorageSync(key);
    } catch (e) {
      return false;
    }
  }

  clear(){
    try {
      return wx.clearStorageSync();
    } catch (e) {
      return false;
    }
  }

  // TODO: Async 

}

export {StorageUtil};