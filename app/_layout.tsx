import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, View, Text } from 'react-native';
import { router, usePathname } from 'expo-router';
import 'react-native-reanimated';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import HymnProvider, { useHymns } from '@/store/HymnProvider';
import { ThemeProvider, useTheme } from '@/store/ThemeProvider';
import { categories } from '@/constants/categories';
import { ColorsType } from '@/typings';
import { mainColor, borderBottomColor, Colors } from '@/constants/theme';
import HeaderRight from '@/components/HeaderRight';
import { APP_TITLE } from '@/constants/app';
import { useOrientation } from '@/hooks/useOrientation';

const activeTintColor='#3478F6';
// const activeBackgroundColor='#E3EEFD';

const InitialLayout = () => {
  const { colors } = useTheme();
  const { category, setCategory } = useHymns();
  const styles = makeStyles(colors);
  const pathname = usePathname();
  const orientation = useOrientation();

  const customDrawerContent = (props: DrawerContentComponentProps) => {

    return (
      <DrawerContentScrollView showsVerticalScrollIndicator={false} {...props}>
        <View style={styles.view}>
          <Image source={require('@/assets/images/image.png')} style={styles.image} />
          <Text style={styles.text}>{APP_TITLE}</Text>
        </View>
        <View style={styles.hr} />
        <DrawerItem 
          activeTintColor={activeTintColor}
          inactiveTintColor={colors.text}
          focused={!category}
          label={"All"} 
          onPress={() => {
            setCategory(null);
            router.push('/');
          }} 
        />
        {categories.map(item => {
          return (
            <DrawerItem 
              activeTintColor={activeTintColor}
              inactiveTintColor={colors.text}
              focused={category === item.slug}
              key={item.id} 
              label={item.title} 
              onPress={() => {
                setCategory(item.slug);
                router.push("/");
              }} 
            />
          );
        })}
        <View style={styles.hr} />
        <DrawerItem 
          activeTintColor={activeTintColor}
          inactiveTintColor={colors.text}
          focused={pathname === '/about'}
          label={"About"} 
          onPress={() => {
            setCategory(null);
            router.push('/about');
          }} 
        />
      </DrawerContentScrollView>
    );
  }

  const height = orientation === "LANDSCAPE" ? { height: 60 } : {}

  return (
    <>
      <Drawer
          drawerContent={customDrawerContent}
          screenOptions={{
            headerStyle: {
              backgroundColor: mainColor,
              ...height
            },
            headerTintColor: Colors.dark.text,
            drawerStyle: {
              backgroundColor: colors.background,
            },
          }}
          >
          <Drawer.Screen
            name='index' 
            options={{ 
              title: APP_TITLE,
              headerTitleStyle: { fontSize: 14 },
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
            name='about' options={{ 
              title: 'About',
              headerTitleStyle: { fontSize: 14 },
              drawerItemStyle: {
                display: 'none'
              },
              headerRight: () => <HeaderRight />
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

const makeStyles = (colors: ColorsType) => StyleSheet.create({
  view: {
    alignItems: 'center',
    marginBottom: 8
  },
  image: { 
    marginBottom: 16,
    resizeMode: 'contain', 
    width: 120, 
    height: 120 
  },
  text: {
    color: colors.text,
    fontSize: 14
  },
  hr: {
    borderBottomColor: borderBottomColor,
    borderBottomWidth: 1,
    marginTop: 16,
    marginBottom: 16
  }
});