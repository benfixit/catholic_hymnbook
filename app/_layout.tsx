import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { router, UnknownOutputParams, useGlobalSearchParams } from 'expo-router';
import 'react-native-reanimated';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import HymnProvider from '@/store/HymnProvider';
import { ThemeProvider } from '@/store/ThemeProvider';
import { categories } from '@/constants/categories';
import { Category } from '@/typings';

const activeTintColor='#3478F6';
const activeBackgroundColor='#E3EEFD';

export default function RootLayout() {
  const customDrawerContent = (props: DrawerContentComponentProps) => {
    const params: UnknownOutputParams & { category: Category} = useGlobalSearchParams();
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <View style={styles.hr} />
        <DrawerItem 
          activeTintColor={activeTintColor} 
          activeBackgroundColor={activeBackgroundColor}
          focused={!params.category}
          label={"All"} 
          onPress={() => {
            router.push('/');
          }} 
        />
        {categories.map(item => {
          return (
            <DrawerItem 
              activeTintColor={activeTintColor} 
              activeBackgroundColor={activeBackgroundColor}
              focused={params.category === item.slug}
              key={item.id} 
              label={item.title} 
              onPress={() => {
                router.push({ pathname: "/", params: { category: item.slug } });
              }} 
            />
          );
        })}
      </DrawerContentScrollView>
    );
  }

  return (
    <ThemeProvider>
      <HymnProvider>
        <Drawer
          drawerContent={customDrawerContent} 
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
              drawerItemStyle: {
                display: "none"
              }
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
        <StatusBar style='light' />
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