import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import 'react-native-reanimated';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import HymnProvider from '@/store/HymnProvider';
import { ThemeProvider } from '@/store/ThemeProvider';
import { categories } from '@/constants/categories';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={styles.hr} />
      {categories.map(item => (
        <DrawerItem key={item.id} label={item.title} onPress={() => console.log("Here")} /> // set the category context or pass a route param
      ))}
    </DrawerContentScrollView>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <HymnProvider>
        <Drawer 
          drawerContent={CustomDrawerContent} 
          screenOptions={{
            headerStyle: {
              backgroundColor: "#0078d7"
            },
            headerTintColor: "#ffffff",
            
          }}
          >
          <Drawer.Screen 
            name='index' options={{ 
              title: "Catholic Hymnbook (Nigeria)", 
              drawerLabel: "Home", 
              drawerIcon: ({ color, size}) => <Ionicons name='home' color={color} size={size} />
            }}
          />
          <Drawer.Screen 
            name='settings' options={{ 
              title: "Settings", 
              drawerLabel: "Settings", 
              drawerIcon: ({ color, size}) => <Ionicons name='settings' color={color} size={size} />
            }}
          />
          <Drawer.Screen 
            name='hymn' options={{ 
              drawerItemStyle: {
                display: 'none'
              } 
            }}
          />
          <Drawer.Screen 
            name='+not-found' options={{ 
              drawerItemStyle: {
                display: 'none'
              } 
            }}
          />
        </Drawer>
        {/* <Stack screenOptions={{
          headerStyle: {
            backgroundColor: "#0078d7"
          },
          headerTintColor: Colors["dark"].tint,
          headerTitleStyle: {
            fontWeight: 600,
            color: Colors["dark"].text
          },
          headerBackButtonDisplayMode: "minimal",
          headerBackIcon: {
            type: "image",
            source: require("@/assets/images/back-icon.png"),
          },
          headerRight: () => <Right />
        }}>
        </Stack>
        <StatusBar style="auto" /> */}
      </HymnProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  hr: {
    borderBottomColor: "#cdcdcd",
    borderBottomWidth: 1,
    marginTop: 16,
    marginBottom: 16
  }
});