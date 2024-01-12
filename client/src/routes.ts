import Welcome from "./components/Welcome.vue";
import SingleDeck from "./components/SingleDeck.vue";
import LoginPage from "./components/LoginPage.vue";

export default [
  { path: "/welcome/", component: Welcome, props: true },
  {
    path: "/welcome/single-deck/:deckName",
    component: SingleDeck,
    props: true,
  },
  { path: "/", component: LoginPage, props: true },
];