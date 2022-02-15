import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import MainScreen from '../screens/MainScreen'
import AboutScreen from '../screens/AboutScreen'
import PreviewScreen from '../screens/PreviewScreen'

import NavBar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import SearchScreen from '../screens/SearchScreen'
import { RootDrawerParamList } from './RootDrawerParams'

const Drawer = createDrawerNavigator<RootDrawerParamList>()

const RootNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContent={props => <Sidebar {...props} />}
      screenOptions={{
        drawerType: 'back',
        header: props => <NavBar {...props} />
      }}
    >
      <Drawer.Screen name="Main" component={MainScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="Search" component={SearchScreen} />
      <Drawer.Screen name="Preview" component={PreviewScreen} />
    </Drawer.Navigator>
  )
}

export default RootNavigation
