import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderButton, Text } from "@react-navigation/elements";
import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { HomeTabIcon, MessageTabIcon, ProfileTabIcon, SettingsTabIcon } from "../components/TabBarIcons";
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
import { LoginScreen } from "../screens/Auth/LoginScreen";
import { RegisterScreen } from "../screens/Auth/RegisterScreen";
import { SocialLoginScreen } from "../screens/Auth/SocialLoginScreen";
import { UpdateProfileScreen } from "../screens/Auth/UserNameScreen";

const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        headerShown: false,
        title: "Inicio",
        tabBarIcon: ({ color, size }) => <HomeTabIcon color={color} size={size} />,
      },
    },
    Chats: {
      screen: Chats,
      options: {
        headerShown: false,
        title: "Mensajes",
        tabBarIcon: ({ color, size }) => <MessageTabIcon color={color} size={size} />,
      },
    },
    Profile: {
      screen: Profile,
      options: {
        headerShown: false,
        title: "Perfil",
        tabBarIcon: ({ color, size }) => <ProfileTabIcon color={color} size={size} />,
      },
    },
    Settings: {
      screen: Settings,
      options: {
        headerShown: false,
        title: "Configuración",
        tabBarIcon: ({ color, size }) => <SettingsTabIcon color={color} size={size} />,
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
        statusBarBackgroundColor: "transparent",
      },
    },
    Login: {
      screen: LoginScreen,
      options: {
        headerShown: false,
        statusBarTranslucent: true,
        statusBarBackgroundColor: "transparent",
      },
    },
    Register: {
      screen: RegisterScreen,
      options: {
        headerShown: false,
        statusBarTranslucent: true,
        statusBarBackgroundColor: "transparent",
      },
    },
    UserName: {
      screen: UpdateProfileScreen,
      options: {
        headerShown: false,
        statusBarTranslucent: true,
        statusBarBackgroundColor: "transparent",
      },
    },
    SocialLogin: {
      screen: SocialLoginScreen,
      options: {
        headerShown: false,
        statusBarTranslucent: true,
        statusBarBackgroundColor: "transparent",
      },
    },
    HomeTabs: {
      screen: HomeTabs,
      options: {
        headerShown: false,
        statusBarTranslucent: true,
        statusBarBackgroundColor: "transparent",
      },
    },
    ProductCamera: {
      screen: ProductCamera,
      options: {
        title: "Nuevo Producto",
        headerShown: false,
        statusBarTranslucent: true,
        statusBarColor: "transparent",
        statusBarStyle: "dark",
        statusBarTextColor: "dark",
        statusBarIconColor: "dark",
        statusBarBackgroundColor: "transparent",
      },
    },
    ProductForm: {
      screen: ProductForm,
      options: {
        title: "Detalles del Producto",
        headerShown: false,
      },
    },
    Chat: {
      screen: Chat,
      options: {
        title: "Chat",
        headerShown: false,
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
        statusBarBackgroundColor: "transparent",
        statusBarColor: "transparent",
        statusBarStyle: "light",
        statusBarTextColor: "light",
        statusBarIconColor: "light",
        contentStyle: {
          backgroundColor: "#fff",
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
