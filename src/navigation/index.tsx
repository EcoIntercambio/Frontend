import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderButton, Text } from "@react-navigation/elements";
import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image } from "react-native";
import bell from "../assets/bell.png";
import newspaper from "../assets/newspaper.png";
import message from "../assets/newspaper.png";
import profile from "../assets/newspaper.png";
import heart from "../assets/newspaper.png";
import { Home } from "./screens/Home";
import { Profile } from "./screens/Profile";
import { Settings } from "./screens/Settings";
import { Updates } from "./screens/Updates";
import { NotFound } from "./screens/NotFound";
import { ProductDetails } from "./screens/ProductDetails";
import { Chat } from "./screens/Chat";
import { Chats } from "../screens/Chats";
import { ProductCamera } from "./screens/ProductCamera";
import { ProductForm } from "./screens/ProductForm";
import { Onboarding } from "../screens/Onboarding";
import { Login } from "../screens/Login";

const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        headerShown: false,
        title: "Inicio",
        tabBarIcon: ({ color, size }) => (
          <Image
            source={newspaper}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Chats: {
      screen: Chats,
      options: {
        headerShown: false,
        title: "Mensajes",
        tabBarIcon: ({ color, size }) => (
          <Image
            source={message}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Profile: {
      screen: Profile,
      options: {
        headerShown: false,
        title: "Perfil",
        tabBarIcon: ({ color, size }) => (
          <Image
            source={profile}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Favorites: {
      screen: Updates,
      options: {
        headerShown: false,
        title: "Favoritos",
        tabBarIcon: ({ color, size }) => (
          <Image
            source={heart}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    Onboarding: {
      screen: Onboarding,
      options: {
        headerShown: false,
        statusBarTranslucent: true,
        statusBarColor: 'transparent',
        statusBarStyle: 'dark',
      },
    },
    Login: {
      screen: Login,
      options: {
        headerShown: false,
        statusBarTranslucent: true,
        statusBarColor: 'transparent',
        statusBarStyle: 'dark',
      },
    },
    HomeTabs: {
      screen: HomeTabs,
      options: {
        headerShown: false,
        statusBarTranslucent: true,
        statusBarColor: 'transparent',
        statusBarStyle: 'dark',
        statusBarTextColor: 'dark',
        statusBarIconColor: 'dark',
        statusBarBackgroundColor: 'transparent',
      },
    },
    ProductCamera: {
      screen: ProductCamera,
      options: {
        title: "Nuevo Producto",
        headerShown: false,
        statusBarTranslucent: true,
        statusBarColor: 'transparent',
        statusBarStyle: 'dark',
        statusBarTextColor: 'dark',
        statusBarIconColor: 'dark',
        statusBarBackgroundColor: 'transparent',
      },
    },
    ProductForm: {
      screen: ProductForm,
      options: {
        title: "Detalles del Producto",
        headerShown: false,
        statusBarTranslucent: true,
        statusBarColor: 'transparent',
        statusBarStyle: 'dark',
        statusBarTextColor: 'dark',
        statusBarIconColor: 'dark',
        statusBarBackgroundColor: 'transparent',
      },
    },
    Chat: {
      screen: Chat,
      options: {
        title: "Chat",
        headerShown: false,
        statusBarTranslucent: true,
        statusBarColor: 'transparent',
        statusBarStyle: 'dark',
        statusBarTextColor: 'dark',
        statusBarIconColor: 'dark',
        statusBarBackgroundColor: 'transparent',
      },
      linking: {
        path: "chat/:userId/:productId",
        parse: {
          userId: (value) => value,
          productId: (value) => parseInt(value, 10),
        },
        stringify: {
          userId: (value) => value,
          productId: (value) => value.toString(),
        },
      },
    },
    ProductDetails: {
      screen: ProductDetails,
      options: {
        headerShown: false,
        title: "Detalles del Producto",
        statusBarTranslucent: true,
        statusBarColor: 'transparent',
        statusBarStyle: 'light',
        statusBarTextColor: 'light',
        statusBarIconColor: 'light',
        statusBarBackgroundColor: 'transparent',
        contentStyle: {
          backgroundColor: 'transparent',
        },
      },
    },
    Profile: {
      screen: Profile,
      linking: {
        path: ":user(@[a-zA-Z0-9-_]+)",
        parse: {
          user: (value) => value.replace(/^@/, ""),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: "modal",
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: "404",
      },
      linking: {
        path: "*",
      },
    },
  },
  initialRouteName: "Onboarding",
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
