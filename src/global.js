export const getToken = () => {
   let loginData = JSON.parse(localStorage.getItem('user'));
   return loginData ? loginData.token : '';
}

export const getId = () => {
   let loginData = JSON.parse(localStorage.getItem('user'));
   return loginData.data.id;
}