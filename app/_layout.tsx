import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, View } from 'react-native';
import { router, UnknownOutputParams, useGlobalSearchParams } from 'expo-router';
import 'react-native-reanimated';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import HymnProvider from '@/store/HymnProvider';
import { ThemeProvider, useTheme } from '@/store/ThemeProvider';
import { categories } from '@/constants/categories';
import { Category } from '@/typings';
import { mainColor, borderBottomColor, Colors } from '@/constants/theme';
import HeaderRight from '@/components/HeaderRight';

const activeTintColor='#3478F6';
// const activeBackgroundColor='#E3EEFD';

const InitialLayout = () => {
  const { colors } = useTheme();

  const customDrawerContent = (props: DrawerContentComponentProps) => {
    const params: UnknownOutputParams & { category: Category} = useGlobalSearchParams();

    return (
      <DrawerContentScrollView showsVerticalScrollIndicator={false} {...props}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('@/assets/images/icon.png')} style={{ resizeMode: 'contain', width: 120, height: 120 }} />
        </View>
        <View style={styles.hr} />
        <DrawerItem 
          activeTintColor={activeTintColor}
          inactiveTintColor={colors.text}
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
              inactiveTintColor={colors.text}
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
    <>
      <Drawer
          drawerContent={customDrawerContent}
          screenOptions={{
            headerStyle: {
              backgroundColor: mainColor
            },
            headerTintColor: Colors.dark.text,
            drawerStyle: {
              backgroundColor: colors.background,
            },
          }}
          >
          <Drawer.Screen
            name='index' options={{ 
              title: "Catholic Hymnbook (Nigeria)", 
              drawerItemStyle: {
                display: "none"
              },
              headerRight: () => <HeaderRight />
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
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <HymnProvider>
        <InitialLayout />
      </HymnProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  hr: {
    borderBottomColor: borderBottomColor,
    borderBottomWidth: 1,
    marginTop: 16,
    marginBottom: 16
  }
});