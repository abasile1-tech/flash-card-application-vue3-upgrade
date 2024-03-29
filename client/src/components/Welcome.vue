<template>
  <div id="welcome_css">
    <div id="welcomeUser">
      <div id="websiteIcon">
        <img
          id="logoImage"
          v-if="!darkModeOn"
          src="../assets/flashcardLogoSmall.png"
          alt="LOGO"
        />
        <img
          id="logoImage"
          v-if="darkModeOn"
          src="../assets/flashcardLogoSmallBlue.png"
          alt="LOGO"
        />
      </div>
      <div id="welcomeWords">
        <h1 id="welcomeName">
          Welcome,
          {{ emittedUser.userName ? emittedUser.userName : '' }}
        </h1>
      </div>
      <div
        id="hamburgerMenu"
        v-on:click="hamburgerWasClicked"
        v-click-outside="pageWasClicked"
      >
        <img
          id="hamburgerImage"
          src="../assets/Hamburger_icon_small.svg.png"
          alt="MENU"
        />
      </div>
    </div>
    <div id="hamburgerDropdown" v-if="hamburgerClicked">
      <button v-on:click="returnToLoginPage()">Log Out</button> <br />
      <button v-on:click="deleteAccountPressed()">Delete Account</button> <br />
      <button v-if="!darkModeOn" v-on:click="enableDarkMode">DarkMode</button>
      <button v-if="darkModeOn" v-on:click="disableDarkMode">LightMode</button>
    </div>
    <p v-if="deleteAccountButtonPressed">
      Are you sure that you want to delete your account?
    </p>
    <button
      v-if="deleteAccountButtonPressed"
      v-on:click="deleteAccountPressedTwice"
    >
      Yes, delete my account.
    </button>
    <br v-if="deleteAccountButtonPressed" /><br
      v-if="deleteAccountButtonPressed"
    />
    <button v-if="deleteAccountButtonPressed" v-on:click="doNotDeleteAccount">
      No, don't delete my account.
    </button>
    <p v-if="deleteAccountButtonPressedTwice">
      Are you REALLY sure that you want to delete your account?
    </p>
    <button v-if="deleteAccountButtonPressedTwice" v-on:click="deleteAccount">
      Yes, DELETE my account.
    </button>
    <br v-if="deleteAccountButtonPressedTwice" /><br
      v-if="deleteAccountButtonPressedTwice"
    />
    <button
      v-if="deleteAccountButtonPressedTwice"
      v-on:click="doNotDeleteAccount"
    >
      No, don't delete my account.
    </button>
    <br v-if="deleteAccountButtonPressed || deleteAccountButtonPressedTwice" />

    <p class="displayInline" v-if="onlyOneDeck">
      You currently have {{ deckObjectList.length }} deck in your library.
    </p>
    <p class="displayInline" v-else>
      You currently have {{ deckObjectList.length }} decks in your library.
    </p>
    <br /><br />
    <p class="displayInline">
      Please enter the name of your new deck into the textbox:
    </p>
    <input
      type="text"
      placeholder="Type the new deck name:"
      v-model="deckInput"
      @keyup.enter="submit"
    />
    <button v-on:click="submit">Submit</button>
    <br />
    <p>When you have decks, they show up here.</p>
    <p>
      Click on the deck that you want to work on and you will be redirected to
      that deck's page.
    </p>
    <div class="flexContainer">
      <div
        id="notebookWhole"
        :key="index"
        v-for="(deck, index) in deckObjectList"
      >
        <img src="../assets/notebookRingLeft.png" alt="" />
        <div
          data-testid="notebook-button"
          :style="{ backgroundColor: colorList[index % colorList.length] }"
          id="notebookColorSection"
          v-on:click="goToDeck(deck)"
        >
          <img src="../assets/notebookRingRight.png" alt="" />
          <div id="notebookTape">
            <div id="notebookName">{{ deck.deckName }}</div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="snackbar" id="snackbar4">Please enter a valid deck name.</div>
  </div>
</template>

<!-- <script setup lang="ts"></script> -->

<script lang="ts">
import axios from 'axios';
const url = '/api/decks/';
const urlForUsers = '/api/users/';

interface Card {
  cardFront: string;
  cardBack: string;
}

interface Deck {
  userId: string;
  deckName: string;
  cards: Card[];
}

interface Data {
  deckInput: string;
  deckObjectList: Deck[];
  onlyOneDeck: boolean;
  hamburgerClicked: boolean;
  darkModeOn: boolean;
  deleteAccountButtonPressed: boolean;
  deleteAccountButtonPressedTwice: boolean;
  colorList: string[];
}

export default {
  name: 'Welcome',
  components: {},
  props: {
    emittedUser: {
      type: Object,
      required: true,
      validator: (value: any) => {
        return (
          typeof value._id === 'string' && typeof value.userName === 'string'
        );
      },
    },
  },
  directives: {
    'click-outside': {
      mounted(el, binding) {
        const onClick = (event: { target: any }) => {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event);
          }
        };
        document.body.addEventListener('click', onClick);
        el.clickOutsideEvent = onClick;
      },
      unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
      },
    },
  },
  data(): Data {
    return {
      deckInput: '',
      deckObjectList: [],
      onlyOneDeck: false,
      hamburgerClicked: false,
      darkModeOn: false,
      deleteAccountButtonPressed: false,
      deleteAccountButtonPressedTwice: false,
      colorList: ['#7660D6', '#6EEBE4', '#9DD66D', '#FA8EA1'],
    };
  },
  methods: {
    async submit() {
      if (this.deckInput == '') {
        this.showSnackBar('snackbar4');
        return;
      }
      const response = await axios.post(url, {
        deckName: this.deckInput,
        userId: this.emittedUser._id,
      });
      if (response.status !== 201) {
        console.log('error: ', response);
      }
      this.deckObjectList.push(response.data);
      if (this.deckObjectList.length == 1) {
        this.onlyOneDeck = true;
      } else {
        this.onlyOneDeck = false;
      }
      this.deckInput = '';
    },
    hamburgerWasClicked() {
      if (!this.hamburgerClicked) {
        this.hamburgerClicked = true;
      } else {
        this.hamburgerClicked = false;
      }
    },
    pageWasClicked() {
      if (this.hamburgerClicked) {
        this.hamburgerClicked = false;
      }
    },
    disableDarkMode() {
      this.darkModeOn = false;
      localStorage.setItem('darkModeOn', String(this.darkModeOn));
      document.documentElement.style.setProperty('--primary-color', '#8C1A62');
      document.documentElement.style.setProperty(
        '--secondary-color',
        '#81175a'
      );
      document.documentElement.style.setProperty('--tertiary-color', '#EEE1D6');
      document.documentElement.style.setProperty(
        '--quaternary-color',
        '#ddd1c7'
      );
    },
    enableDarkMode() {
      this.darkModeOn = true;
      localStorage.setItem('darkModeOn', String(this.darkModeOn));
      document.documentElement.style.setProperty('--primary-color', '#325573');
      document.documentElement.style.setProperty(
        '--secondary-color',
        '#2d4c68'
      );
      document.documentElement.style.setProperty('--tertiary-color', '#B6D6F2');
      document.documentElement.style.setProperty(
        '--quaternary-color',
        '#517EA6'
      );
    },
    deleteAccountPressed() {
      this.deleteAccountButtonPressed = true;
      this.hamburgerClicked = false;
    },
    deleteAccountPressedTwice() {
      this.deleteAccountButtonPressed = false;
      this.deleteAccountButtonPressedTwice = true;
    },
    async deleteAccount() {
      this.deleteAccountButtonPressedTwice = false;
      //Delete the User's Decks
      await axios.delete(url + this.emittedUser._id);
      //Delete the User
      await axios.delete(urlForUsers + this.emittedUser._id);
      //Log Out for the last time
      this.returnToLoginPage();
    },
    async doNotDeleteAccount() {
      this.deleteAccountButtonPressed = false;
      this.deleteAccountButtonPressedTwice = false;
    },
    goToDeck(deckObj: Deck) {
      //emit deck
      this.$emit('emitDeck', deckObj);
      //advance route
      this.$router.push({ path: `/welcome/single-deck/${deckObj.deckName}` });
    },
    returnToLoginPage() {
      localStorage.removeItem('emittedUser._id');
      this.$router.push({ path: `/` });
    },
    showSnackBar(snackBarNum: string) {
      // Get the snackbar DIV
      let snackBarElement = document.getElementById(snackBarNum);
      // Add the "show" class to DIV
      if (snackBarElement != null) {
        snackBarElement.classList.add('show');
      }
      // After 3 seconds, remove the show class from DIV
      setTimeout(function () {
        if (snackBarElement != null) {
          snackBarElement.classList.remove('show');
        }
      }, 3000);
    },
  },
  async created() {
    const localDarkMode = localStorage.getItem('darkModeOn');
    if (localDarkMode === 'true') {
      this.darkModeOn = true;
    } else if (localDarkMode === 'false') {
      this.darkModeOn = false;
    }
    if (this.darkModeOn == undefined || this.darkModeOn == false) {
      document.documentElement.style.setProperty('--primary-color', '#8C1A62');
      document.documentElement.style.setProperty(
        '--secondary-color',
        '#81175a'
      );
      document.documentElement.style.setProperty('--tertiary-color', '#EEE1D6');
      document.documentElement.style.setProperty(
        '--quaternary-color',
        '#ddd1c7'
      );
    } else if (this.darkModeOn == true) {
      document.documentElement.style.setProperty('--primary-color', '#325573');
      document.documentElement.style.setProperty(
        '--secondary-color',
        '#2d4c68'
      );
      document.documentElement.style.setProperty('--tertiary-color', '#B6D6F2');
      document.documentElement.style.setProperty(
        '--quaternary-color',
        '#517EA6'
      );
    }
    if (this.emittedUser._id != undefined) {
      localStorage.setItem('emittedUser._id', this.emittedUser._id);
      if (this.emittedUser.userName == undefined) {
        const responseFromUsers = await axios.get(
          urlForUsers + this.emittedUser._id
        );
        this.$emit('emitUser', responseFromUsers.data);
      }
    }
    if (this.emittedUser._id == undefined) {
      const userIdFromLocalStorage = localStorage.getItem('emittedUser._id');

      if (userIdFromLocalStorage == undefined) {
        this.returnToLoginPage();
        return;
      }
      const responseFromUsers = await axios.get(
        urlForUsers + userIdFromLocalStorage
      );
      this.$emit('emitUser', responseFromUsers.data);
      const response = await axios.get(url + userIdFromLocalStorage);
      this.deckObjectList = response.data;
      if (this.deckObjectList.length == 1) {
        this.onlyOneDeck = true;
      }
      return;
    }
    const response = await axios.get(url + this.emittedUser._id);
    this.deckObjectList = response.data;
    if (this.deckObjectList.length == 1) {
      this.onlyOneDeck = true;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
:root {
  --primary-color: #8c1a62;
  --secondary-color: #81175a;
  --tertiary-color: #eee1d6;
  --quaternary-color: #ddd1c7;
}
#welcome_css {
  background-color: var(--tertiary-color);
  color: var(--primary-color);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  /* this extends the background color when you scroll */
  overflow-y: auto;
}

#welcomeUser {
  display: flex;
  justify-content: space-between;
}

#welcomeName {
  overflow-wrap: anywhere;
}

#logoImage {
  padding: 0.5em;
}

#welcomeWords {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#hamburgerImage {
  padding: 1.2em;
}

#hamburgerDropdown {
  position: absolute;
  top: 4em;
  right: 0em;
  background-color: var(--quaternary-color);
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
}

#notebookColorSection {
  display: inline-flex;
  color: black;
  background-color: #2ad592;
  width: 10em;
  border-bottom: solid floralwhite;
  border-right: solid floralwhite;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
}

#notebookTape {
  margin: auto;
  background: url('../assets/tape.png') no-repeat;
  background-size: cover;
}

#notebookName {
  margin: auto;
  padding: 0.4em;
  font-family: 'Permanent Marker', cursive;
  width: 150px;
  height: 50px;
  align-items: center;
  display: inline-flex;
  justify-content: center;
}

.displayInline {
  display: inline;
}

.flexContainer {
  display: flex;
  justify-content: center;
  row-gap: 20px;
  column-gap: 20px;
  flex-flow: wrap;
}
</style>
