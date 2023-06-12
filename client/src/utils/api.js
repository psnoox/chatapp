import axios from "axios";
export function Register(nick, email, pass, dateOfbirth, sex) {
  return axios.post(`http://192.168.0.15:3001/auth/register`, {
    username: nick,
    email: email,
    password: pass,
    sex: sex,
    dateOfBirth: dateOfbirth,
  });
}

export function Login(username, password, ip, browser) {
  return axios.post(`http://192.168.0.15:3001/auth/login`, {
    username: username,
    password: password,
    ip: ip,
    browser: browser
  });
}

export function GenerateKey(email, ip, browser) {
  return axios.post(`http://192.168.0.15:3001/auth/recovery-key`, {
    email: email,
    ip: ip,
    browser: browser
  });
}

export function RecoveryPass(email, key, pass, passconf, ip, browser) {
  return axios.post(`http://192.168.0.15:3001/auth/password-recovery`, {
    email: email,
    recoveryKey: key,
    newPassword: pass,
    newPasswordConf: passconf,
    ip: ip,
    browser: browser
  });
}
export function CreateRoom(user, name){
  const token = localStorage.getItem("authToken");
  return axios.post(`http://192.168.0.15:3001/api/create-room`, {
    authToken: token,
    user: user,
    name: name
  });
}
export function JoinRoom(user, code){
  const token = localStorage.getItem("authToken");
  return axios.post(`http://192.168.0.15:3001/api/join-room`, {
    authToken: token,
    user: user,
    code: code
  });
}
export function Chats(user){
  return axios.post(`http://192.168.0.15:3001/api/chats`, {
    user: user,
  });
}
export function Room(id){
  return axios.post(`http://192.168.0.15:3001/api/room`, {
    id: id,
  });
}
export function Logs(id){
  return axios.post(`http://192.168.0.15:3001/user/logs`, {
    id: id,
  });
}
export function accountDelete(user, pass, ip, browser){
  const token = localStorage.getItem("authToken");
  return axios.post(`http://192.168.0.15:3001/auth/deleteacc`, {
    authToken: token,
    user: user,
    pass: pass,
    ip: ip,
    browser: browser
  });
}
export function changePassword(user, oldPassword, newPassword, ip, browser){
  const token = localStorage.getItem("authToken");
  return axios.post(`http://192.168.0.15:3001/auth/changepassword`, {
    authToken: token,
    user: user,
    oldPassword: oldPassword,
    newPassword: newPassword,
    ip: ip,
    browser: browser
  })
}
export function changeColor(color, user, ip, browser){
  const token = localStorage.getItem("authToken");
  return axios.post(`http://192.168.0.15:3001/auth/changecolor`, {
    authToken: token,
    color: color,
    user: user,
    ip: ip,
    browser: browser
  })
}
export function changeInfo(user, email, username){
  const token = localStorage.getItem("authToken");
  return axios.post(`http://192.168.0.15:3001/auth/changeinfo`, {
    authToken: token,
    email: email,
    username: username,
    user: user
  })
}