import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

import Address from "./pages/Address.vue";
import PersonalProfiles from "./pages/PersonalProfiles.vue";
import AddNewAddress from "./pages/AddNewAddress.vue";
import PaymentMethodNoMastercard from "./pages/PaymentMethodNoMastercard.vue";
import AddCard from "./pages/AddCard.vue";
import MyCart from "./pages/MyCart.vue";
import PaymentMethod from "./pages/PaymentMethod.vue";
import PaymentSuccessfull from "./pages/PaymentSuccessfull.vue";
import EditProfile from "./pages/EditProfile.vue";
import MyOrders02 from "./pages/MyOrders02.vue";
import TrackingOrder02 from "./pages/TrackingOrder02.vue";
import DeliveryManCallScreen from "./pages/DeliveryManCallScreen.vue";
import Menu from "./pages/Menu.vue";
import SellerDashboardHome from "./pages/SellerDashboardHome.vue";
import RunningOrders from "./pages/RunningOrders.vue";
import MyFood from "./pages/MyFood.vue";
import AddNewItems from "./pages/AddNewItems.vue";
import ChefFoodDetails from "./pages/ChefFoodDetails.vue";
import Menu1 from "./pages/Menu.vue";
import PaymentWithdrawSucessful from "./pages/PaymentWithdrawSucessful.vue";
import Notification1 from "./pages/Notification1.vue";
import Massages from "./pages/Massages.vue";
import ReviewScreen from "./pages/ReviewScreen.vue";
import SplashPage01 from "./pages/SplashPage01.vue";
import Onboarding02 from "./pages/Onboarding02.vue";
import HomeV2 from "./pages/HomeV2.vue";
import LocationAccess from "./pages/LocationAccess.vue";
import Offer from "./pages/Offer.vue";
import Onboarding03 from "./pages/Onboarding03.vue";
import Onboarding04 from "./pages/Onboarding04.vue";
import Onboarding01 from "./pages/Onboarding01.vue";
import SplashPage02 from "./pages/SplashPage02.vue";
import LogInEmpty from "./pages/LogInEmpty.vue";
import LogInType from "./pages/LogInType.vue";
import ForgotPassword from "./pages/ForgotPassword.vue";
import Verification from "./pages/Verification.vue";
import SignUp from "./pages/SignUp.vue";
import Search from "./pages/Search.vue";
import "./global.css";

const routes = [
  {
    path: "/",
    name: "Address",
    component: Address,
  },
  {
    path: "/personal-profiles",
    name: "PersonalProfiles",
    component: PersonalProfiles,
  },
  {
    path: "/add-new-address",
    name: "AddNewAddress",
    component: AddNewAddress,
  },
  {
    path: "/payment-method-no-mastercard",
    name: "PaymentMethodNoMastercard",
    component: PaymentMethodNoMastercard,
  },
  {
    path: "/add-card",
    name: "AddCard",
    component: AddCard,
  },
  {
    path: "/my-cart",
    name: "MyCart",
    component: MyCart,
  },
  {
    path: "/payment-method",
    name: "PaymentMethod",
    component: PaymentMethod,
  },
  {
    path: "/payment-successfull",
    name: "PaymentSuccessfull",
    component: PaymentSuccessfull,
  },
  {
    path: "/edit-profile",
    name: "EditProfile",
    component: EditProfile,
  },
  {
    path: "/my-orders-02",
    name: "MyOrders02",
    component: MyOrders02,
  },
  {
    path: "/tracking-order-02",
    name: "TrackingOrder02",
    component: TrackingOrder02,
  },
  {
    path: "/delivery-man-call-screen",
    name: "DeliveryManCallScreen",
    component: DeliveryManCallScreen,
  },
  {
    path: "/menu",
    name: "Menu",
    component: Menu,
  },
  {
    path: "/seller-dashboard-home",
    name: "SellerDashboardHome",
    component: SellerDashboardHome,
  },
  {
    path: "/running-orders",
    name: "RunningOrders",
    component: RunningOrders,
  },
  {
    path: "/my-food",
    name: "MyFood",
    component: MyFood,
  },
  {
    path: "/add-new-items",
    name: "AddNewItems",
    component: AddNewItems,
  },
  {
    path: "/chef-food-details",
    name: "ChefFoodDetails",
    component: ChefFoodDetails,
  },
  {
    path: "/menu1",
    name: "Menu1",
    component: Menu1,
  },
  {
    path: "/payment-withdraw-sucessful",
    name: "PaymentWithdrawSucessful",
    component: PaymentWithdrawSucessful,
  },
  {
    path: "/notification",
    name: "Notification1",
    component: Notification1,
  },
  {
    path: "/massages",
    name: "Massages",
    component: Massages,
  },
  {
    path: "/review-screen",
    name: "ReviewScreen",
    component: ReviewScreen,
  },
  {
    path: "/splash-page-01",
    name: "SplashPage01",
    component: SplashPage01,
  },
  {
    path: "/onboarding-02",
    name: "Onboarding02",
    component: Onboarding02,
  },
  {
    path: "/home-v2",
    name: "HomeV2",
    component: HomeV2,
  },
  {
    path: "/location-access",
    name: "LocationAccess",
    component: LocationAccess,
  },
  {
    path: "/offer",
    name: "Offer",
    component: Offer,
  },
  {
    path: "/onboarding-03",
    name: "Onboarding03",
    component: Onboarding03,
  },
  {
    path: "/onboarding-04",
    name: "Onboarding04",
    component: Onboarding04,
  },
  {
    path: "/onboarding-01",
    name: "Onboarding01",
    component: Onboarding01,
  },
  {
    path: "/splash-page-02",
    name: "SplashPage02",
    component: SplashPage02,
  },
  {
    path: "/log-in-empty",
    name: "LogInEmpty",
    component: LogInEmpty,
  },
  {
    path: "/log-in-type",
    name: "LogInType",
    component: LogInType,
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/verification",
    name: "Verification",
    component: Verification,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((toRoute, fromRoute, next) => {
  const documentTitle =
    toRoute?.meta && toRoute?.meta?.title ? toRoute?.meta?.title : "test";
  window.document.title = documentTitle;
  if (toRoute?.meta?.description) {
    addMetaTag(toRoute?.meta?.description);
  }
  next();
});

const addMetaTag = (value) => {
  let element = document.querySelector(`meta[name='description']`);

  if (element) {
    element.setAttribute("content", value);
  } else {
    element = `<meta name="description" content="${value}" />`;
    document.head.insertAdjacentHTML("beforeend", element);
  }
};

createApp(App).use(router).mount("#app");

export default router;
