/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import Routes from './routes';

export function convertDate(d) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
}

export function goBack(navigator){
  const routes = navigator.getCurrentRoutes();
  if(routes.length && routes[0].id === Routes.settings.id ){
    navigator.replace({id:Routes.home.id});
    return true;
  }
  return false;
}

export function saveContributor(){

}

export function pingValo(host='localhost', port=8888){

}

export function saveStream(){

}

export function postToStream(){

}
