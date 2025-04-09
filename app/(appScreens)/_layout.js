import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#44c710',
        tabBarInactiveTintColor: 'gray', 
        tabBarStyle: {
          height: 60, 
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12, 
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome name="heart" size={28} color={color} />, 
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" size={28} color={color} />
        }}
      />
    </Tabs>
  );
}
