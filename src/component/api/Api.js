import * as interceptor from './../httpinterceptor/Httpinterceptor';

const baseUrl = 'http://localhost:8080/api';

export const getUserList = (activeTab, current_page, limit, filter_string) => {
  const apiurl = `/user/list?status=${activeTab}&page=${current_page}&limit=${limit}${filter_string}`;
  let fullUrl = `${baseUrl}${apiurl}`;
  return interceptor.posts(fullUrl).get();
};

export const getFamilyList = (activeTab, current_page, limit, filter_string, sorted) => {
  const apiurl = `/family/list?status=${activeTab}&page=${current_page}&limit=${limit}${filter_string}&sort=${sorted.desc}&field=${sorted.id}`;
  let fullUrl = `${baseUrl}${apiurl}`;
  return interceptor.posts(fullUrl).get();
}

export const getOwnerList = (current_page, limit, filter_string) => {
  const apiurl = `/owner/list?page=${current_page}&limit=${limit}${filter_string}`;
  let fullUrl = `${baseUrl}${apiurl}`;
  return interceptor.posts(fullUrl).get();
}

export const getReceptionList = (current_page, limit, filter_string) => {
  const apiurl = `/reception/reception-users-list?&page=${current_page}&limit=${limit}${filter_string}`;
  let fullUrl = `${baseUrl}${apiurl}`;
  return interceptor.posts(fullUrl).get();
}

export const getPacket = (current_page, limit, activeTab, filter_string) => {
  const apiurl = `/reception/packets-List?&page=${current_page}&limit=${limit}&dateTimeRecovered=${activeTab}${filter_string}`;
  let fullUrl = `${baseUrl}${apiurl}`;
  return interceptor.posts(fullUrl).get();
}

export const getLastPacketIn = () => {
  const apiurl = `/reception/lastpacket-in`;
  let fullUrl = `${baseUrl}${apiurl}`;
  return interceptor.posts(fullUrl).get();
}

export const getUnitList = (current_page, limit, filter_string) => {
  const apiurl = `/unit/list?&page=${current_page}&limit=${limit}${filter_string}`;
  let fullUrl = `${baseUrl}${apiurl}`;
  return interceptor.posts(fullUrl).get();
}

export const getVehicle = (current_page, limit, filter_string) => {
  const apiurl = `/vehicle/list?&page=${current_page}&limit=${limit}${filter_string}`;
  let fullUrl = `${baseUrl}${apiurl}`;
  return interceptor.posts(fullUrl).get();
}

// export const getPacket = () => {
//   const apiurl = `/reception/getpacket/:id`;
//   let fullUrl = `${baseUrl}${apiurl}`;
//   return interceptor.posts(fullUrl).get();
// }