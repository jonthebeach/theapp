/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {AsyncStorage} from 'react-native';
import uuid  from 'react-native-uuid';
import Routes from './routes';

const DEFAULT_HOST = "http://192.168.34.2:8888";
const DEFAULT_TENANT = "demo";

const DEFAULT_CONTRIB_ID='jotb';
const DEFAULT_CONTRIB_SCHEMA= {
  "schema": {
    "type": "record",
    "properties": {
      "contributor": {
        "type": "contributor"
      },
      "gender": {
        "type": "string",
        "optional": true
      },
      "birthday": {
        "type": "date",
        "optional": true
      },
      "country": {
        "type": "string",
        "optional": true
      },
      "company": {
        "type": "string",
        "optional": true
      },
      "role": {
        "type": "string",
        "optional": true
      },
      "diet": {
        "type": "string",
        "optional": true
      }
    }
  }
};

const DEFAULT_STREAM_COLLECTION = "jotb";
const DEFAULT_STREAM_ID = "attenders";
const DEFAULT_STREAM_SCHEMA = {
    "schema" : {
        "version": "1.0",
        "topDef" : {
            "type" : "record",
            "properties" : {
                "contributor": {
                  "type": "contributor",
                  "definition": DEFAULT_CONTRIB_ID
                },
                "position": {
                  "type" : "record",
                  "properties": {
                    "speed": {
                      "type": "double"
                    },
                    "heading": {
                      "type": "double"
                    },
                    "longitude": {
                      "type": "double"
                    },
                    "latitude": {
                      "type": "double"
                    },
                    "altitude": {
                      "type": "double"
                    },
                    "accuracy": {
                      "type": "double"
                    }
                  }
                },
                "status": { "type" : "string" },
                "timestamp" : {
                  "type": "datetime",
                  "annotations": [
                    "urn:itrs:default-timestamp"
                  ]
                }
            }
        }
    }
};

export function convertDate(d) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
}

export function toDateType(dateStr) {
    var parts = dateStr.split("/");
    console.log(dateStr, parts)
    return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0])+1);
}

export function toValoDate(dateStr) {
    var parts = dateStr.split("/");
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

export function fromValoDate(dateStr) {
    var parts = dateStr.split("-");
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

export function goBack(navigator){
  const routes = navigator.getCurrentRoutes();
  if(routes.length && routes[0].id === Routes.settings.id ){
    navigator.replace({id:Routes.home.id});
    return true;
  }
  return false;
}

export async function pingValo(host=DEFAULT_HOST){
  try {
      const response = await fetch(
        `${host}/admin/system/tenants`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if(!response || response.status !== 200) return false;
      const responseJson = await response.json();
      return responseJson ? true : false;
    } catch(error) {
      console.error(error);
      return false
    }
}

export async function getContributor(host=DEFAULT_HOST, tenant=DEFAULT_TENANT, id=DEFAULT_CONTRIB_ID){
  try {
      const response = await fetch(
        `${host}/contributors/${tenant}/${id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if(!response || response.status !== 200) return false;
      const responseJson = await response.json();
      return responseJson ? responseJson : false;
    } catch(error) {
      console.error(error);
      return false
    }
}

export async function saveContributor(host=DEFAULT_HOST, tenant=DEFAULT_TENANT, id=DEFAULT_CONTRIB_ID, schema=DEFAULT_CONTRIB_SCHEMA){
  try {
      const response = await fetch(
        `${host}/contributors/${tenant}/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(schema)
      });
      if(!response || response.status !== 200) return false;
      const responseJson = await response.json();
      return responseJson ? responseJson : false;
    } catch(error) {
      throw error;
    }
}

export async function getStream(host=DEFAULT_HOST, tenant=DEFAULT_TENANT, collection=DEFAULT_STREAM_COLLECTION, id=DEFAULT_STREAM_ID){
  try {
      const response = await fetch(
        `${host}/streams/${tenant}/${collection}/${id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if(!response || response.status !== 200) return false;
      const responseJson = await response.json();
      return responseJson ? responseJson : false;
    } catch(error) {
      console.error(error);
      return false
    }
}

export async function saveStream(host=DEFAULT_HOST, tenant=DEFAULT_TENANT, collection=DEFAULT_STREAM_COLLECTION, id=DEFAULT_STREAM_ID, schema=DEFAULT_STREAM_SCHEMA){
  try {
      const response = await fetch(
        `${host}/streams/${tenant}/${collection}/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(schema)
      });
      if(!response || response.status !== 200) return false;
      const repoResponse = await fetch(
        `${host}/streams/${tenant}/${collection}/${id}/repository`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: "ssr"})
      });
      console.log(repoResponse)
      if(!repoResponse || repoResponse.status !== 200) return false;
      const responseJson = await response.json();
      return responseJson ? responseJson : false;
    } catch(error) {
      console.error(error);
      return false
    }
}

export async function getContributorInstance(id, host=DEFAULT_HOST, tenant=DEFAULT_TENANT, collection=DEFAULT_CONTRIB_ID){
  try {
      const response = await fetch(
        `${host}/contributors/${tenant}/${collection}/instances/${id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if(!response || response.status !== 200) return false;
      const responseJson = await response.json();
      return responseJson ? {data: responseJson, version: response.headers.get('valo-config-version')} : false;
    } catch(error) {
      console.error(error);
      return false
    }
}

export async function saveContributorInstance(id, doc, version="", host=DEFAULT_HOST, tenant=DEFAULT_TENANT, collection=DEFAULT_STREAM_COLLECTION){
  try {
      const response = await fetch(
        `${host}/contributors/${tenant}/${collection}/instances/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Valo-Config-Version': version
        },
        body: JSON.stringify(doc)
      });
      // console.log('R2', await response.json())
      if(!response || response.status !== 200) return false;
      const responseJson = await response.json();
      return responseJson ? responseJson : false;
    } catch(error) {
      console.error(error);
      return false
    }
}

export async function postToStream(data, host=DEFAULT_HOST, tenant=DEFAULT_TENANT, collection=DEFAULT_STREAM_COLLECTION, id=DEFAULT_STREAM_ID){
  try {
      const response = await fetch(
        `${host}/streams/${tenant}/${collection}/${id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      // console.log('R2', await response.json())
      if(!response || response.status !== 200) return false;
      return true;
    } catch(error) {
      console.error(error);
      return false
    }
}

export async function createValoAssets(host, tenant){
  try {
    const ping = await pingValo(host);
    console.debug('ping', ping);
    if(!ping) return false;
    const jotbContributor = await getContributor(host, tenant);
    console.debug('contributor type', jotbContributor)
    if(!jotbContributor){
      await saveContributor(host, tenant);
    }
    const jotbStream = await getStream(host, tenant);
    console.debug('stream', jotbStream)
    if(!jotbStream){
      await saveStream(host, tenant);
    }
    let contributorID = await getContributorID();
    if(!contributorID){
      contributorID = uuid.v1();
      await setContributorID(contributorID);
    }
    console.debug('contributor instance id', contributorID);
    const jotbContributorInstance = await getContributorInstance(contributorID, host, tenant);
    console.debug('contributor instance', jotbContributorInstance);
    if(!jotbContributorInstance){
      await saveContributorInstance(contributorID, {contributor:contributorID}, host, tenant);
    }
    return true;
  } catch (e) {
    console.error(e);
    return false
  }
}

export async function getContributorID(){
  try {
    return await AsyncStorage.getItem('@jotb:contribID');
  } catch (error) {
    // Error retrieving data
    console.error(error)
  }
}

export async function setContributorID(id){
  try {
    await AsyncStorage.setItem('@jotb:contribID', id);
  } catch (error) {
    // Error saving data
  }
}

export async function getValoHost(){
  try {
    const host = await AsyncStorage.getItem('@jotb:host');
    return host ? host : undefined;
  } catch (error) {
    // Error retrieving data
    console.error(error)
  }
}

export async function setValoHost(host){
  try {
    await AsyncStorage.setItem('@jotb:host', host);
  } catch (error) {
    // Error saving data
  }
}

export async function getValoTenant(){
  try {
    const tenant = await AsyncStorage.getItem('@jotb:tenant');
    return tenant ? tenant : undefined;
  } catch (error) {
    // Error retrieving data
    console.error(error)
  }
}

export async function setValoTenant(tenant){
  try {
    return await AsyncStorage.setItem('@jotb:tenant', tenant);
  } catch (error) {
    // Error saving data
  }
}
