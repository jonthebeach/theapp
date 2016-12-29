/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import HomeView from './login';
import TalksView from './talks';

export default {
  home: {
    id: 'home',
    title: 'Home',
    component: HomeView
  },
  talks: {
    id: 'talks',
    title: 'Talks',
    component: TalksView
  }
}
