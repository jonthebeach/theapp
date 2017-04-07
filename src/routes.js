/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import HomeView from './login';
import SettingsView from './configure';
// import TalksView from './talks';

export default {
  home: {
    id: 'home',
    title: 'Home',
    component: HomeView
  }
  ,settings: {
    id: 'settings',
    title: 'Settings',
    component: SettingsView
  }
  // ,talks: {
  //   id: 'talks',
  //   title: 'Talks',
  //   component: TalksView
  // }
}
