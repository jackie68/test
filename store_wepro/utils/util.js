function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function clog(log) {
  console.log(log);
}

function getCurrentTimestamp() {
  return (Date.parse(new Date())) / 1000;
}

function toast(msg, icon, duration) {
  icon = icon || 'success';
  duration = duration || 2000;
  wx.showToast({
    title: msg,
    icon: icon,
    duration: duration
  });
  
}

function redirect(url) {
  wx.redirectTo({
    url: url
  });
}

module.exports = {
  formatTime: formatTime,
  clog: clog,
  getCurrentTimestamp: getCurrentTimestamp,
  toast: toast,
  redirect: redirect
}
