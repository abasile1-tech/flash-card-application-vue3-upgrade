<template>
  <div id="singleDeck_css">
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
        <h1 id="deckNameWelcome" v-if="!editDeckNameSelected">
          {{ emittedObject.deckName ? emittedObject.deckName : '' }}
        </h1>
        <div id="welcomeWordsInput">
          <input
            type="text"
            placeholder="Type the new deck name"
            v-model="editDeckNameInput"
            v-if="editDeckNameSelected"
            v-focus
            @keyup.enter="submitEditedDeckName"
          />
        </div>
      </div>
      <div
        id="hamburgerMenu"
        v-on:click="hamburgerWasClicked"
        v-clickOutside="pageWasClicked"
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
      <button v-on:click="goBackToDecks">To Decks</button> <br />
      <button v-if="!darkModeOn" v-on:click="enableDarkMode">DarkMode</button>
      <button v-if="darkModeOn" v-on:click="disableDarkMode">LightMode</button>
      <br />
      <button v-if="!backModeOn" v-on:click="enableBackMode">ShowBacks</button>
      <button v-if="backModeOn" v-on:click="disableBackMode">ShowFronts</button>
    </div>

    <div>
      <button class="deckEditButton" v-on:click="editDeckName">
        Edit Deck
      </button>
      <button class="deckDeleteButton" v-on:click="deleteDeckPressed">
        Delete Deck
      </button>
      <button
        class="decksReturnButton"
        v-if="!deckIsShuffled"
        v-on:click="shuffleDeck"
      >
        Shuffle
      </button>
      <button
        class="decksReturnButton"
        v-if="deckIsShuffled"
        v-on:click="unShuffleDeck"
      >
        Un-Shuffle
      </button>
      <br />
      <input
        class="cardInputBox"
        type="text"
        placeholder="Search the deck:"
        v-model="deckSearchInput"
        @keyup.enter="deckSearch"
      />
    </div>

    <p v-if="deleteDeckButtonPressed">
      Are you sure that you want to delete
      {{ emittedObject.deckName ? emittedObject.deckName : '' }}?
    </p>
    <button
      class="decksReturnButton"
      v-if="deleteDeckButtonPressed"
      v-on:click="deleteDeck"
    >
      Yes, delete the deck.
    </button>
    <button
      class="decksReturnButton"
      v-if="deleteDeckButtonPressed"
      v-on:click="doNotDeleteDeck"
    >
      No, don't delete the deck.
    </button>

    <p v-if="deleteCardButtonPressed">
      Are you sure that you want to delete this card?
    </p>
    <button
      class="decksReturnButton"
      v-if="deleteCardButtonPressed"
      v-on:click="deleteCard"
    >
      Yes, delete the card.
    </button>
    <button
      class="decksReturnButton"
      v-if="deleteCardButtonPressed"
      v-on:click="doNotDeleteCard"
    >
      No, don't delete the card.
    </button>

    <div class="card" v-bind:class="{ flipped: cardSide === 'Front' }">
      <p class="cardPromptClass1" v-if="!addCardFront && !addCardBack">
        {{ cardSide }}
        <input
          id="cardNumberBox"
          type="number"
          v-model="numberSearchInput"
          @keyup.enter="numberSearch"
        />/{{ emittedObject.cards ? emittedObject.cards.length : '' }}
      </p>
      <p
        class="cardPromptClass1"
        v-if="emittedObject.cards?.length == 0 && (addCardFront || addCardBack)"
      >
        New {{ cardSide }} at position 1
      </p>
      <p
        class="cardPromptClass1"
        v-if="emittedObject.cards?.length == 1 && (addCardFront || addCardBack)"
      >
        New {{ cardSide }} at position 2
      </p>
      <p
        class="cardPromptClass1"
        v-if="emittedObject.cards?.length > 1 && (addCardFront || addCardBack)"
      >
        New {{ cardSide }} at position {{ cardsListIndex + 2 }}
      </p>
      <p class="cardPromptClass2" v-if="!addCardFront && !addCardBack">
        {{ cardPrompt }}
      </p>

      <input
        type="text"
        ref="frontInput"
        class="cardInputBox"
        placeholder="Type front text"
        v-model="cardFrontInput"
        v-if="addCardFront && !backModeOn"
        v-focus
        @keyup.enter="flipCard"
      />
      <input
        type="text"
        ref="backInput"
        class="cardInputBox"
        placeholder="Type back text"
        v-model="cardBackInput"
        v-if="addCardBack && !backModeOn"
        v-focus
        @keyup.enter="submitCard"
      />
      <input
        type="text"
        ref="frontInput"
        class="cardInputBox"
        placeholder="Type front text"
        v-model="cardFrontInput"
        v-if="addCardFront && backModeOn"
        v-focus
        @keyup.enter="submitCard"
      />
      <input
        type="text"
        ref="backInput"
        class="cardInputBox"
        placeholder="Type back text"
        v-model="cardBackInput"
        v-if="addCardBack && backModeOn"
        v-focus
        @keyup.enter="flipCard"
      />

      <!-- edit card -->
      <input
        type="text"
        ref="frontInput"
        class="cardInputBox"
        placeholder="Type new front text"
        v-model="cardFrontInput"
        v-if="editCardButtonPressed && cardSide === 'Front'"
        v-focus
        @keyup.enter="submitEditedCardFront"
      />
      <input
        type="text"
        ref="backInput"
        class="cardInputBox"
        placeholder="Type new back text"
        v-model="cardBackInput"
        v-if="editCardButtonPressed && cardSide === 'Back'"
        v-focus
        @keyup.enter="submitEditedCardBack"
      />

      <div id="cardButtonsDiv">
        <em v-if="!isListeningForSpeech && speechInputResult != ''"
          >{{ speechScore }}% Correct</em
        >
        <select id="selectBlock" v-if="!isMobile" v-model="selectedLanguage">
          <option disabled value="">Please select a language:</option>
          <option
            :value="option.name"
            :key="option.name"
            v-for="option in optionList"
          >
            {{ option.name }}
          </option>
        </select>
        <em v-if="isListeningForSpeech">Listening to you...</em>
        <em v-if="!isListeningForSpeech && speechInputResult != ''">{{
          speechInputResult
        }}</em>
        <br />
        <button class="cardButton" v-on:click="readCard">Listen</button>
        <button class="cardButton" v-on:click="getSpeechInput">Speak</button>
        <br />
        <div id="arrowsDiv">
          <img
            id="cardNavigationButton1"
            v-on:click="updateCardIndex(-1)"
            class="arrowImages"
            src="../assets/leftArrow.png"
            alt="left arrow"
          />

          <button
            class="cardButton"
            v-on:click="flipCard"
            v-if="!addCardBack && !editCardButtonPressed && !backModeOn"
          >
            Flip Card
          </button>
          <button
            class="cardButton"
            v-on:click="submitCard"
            v-if="addCardBack && !editCardButtonPressed && !backModeOn"
          >
            Submit Card
          </button>
          <button
            class="cardButton"
            v-on:click="flipCard"
            v-if="!addCardFront && !editCardButtonPressed && backModeOn"
          >
            Flip Card
          </button>
          <button
            class="cardButton"
            v-on:click="submitCard"
            v-if="addCardFront && !editCardButtonPressed && backModeOn"
          >
            Submit Card
          </button>

          <button
            class="cardButton"
            v-on:click="submitEditedCardFront"
            v-if="editCardFront && editCardButtonPressed"
          >
            Submit Edit
          </button>
          <button
            class="cardButton"
            v-on:click="submitEditedCardBack"
            v-if="editCardBack && editCardButtonPressed"
          >
            Submit Edit
          </button>

          <img
            id="cardNavigationButton2"
            v-on:click="updateCardIndex(1)"
            class="arrowImages"
            src="../assets/rightArrow.png"
            alt="right arrow"
          />
        </div>
      </div>
    </div>
    <button
      class="decksReturnButton"
      v-if="addCardFront || addCardBack"
      v-on:click="abortAddCard"
    >
      Abort Add Card
    </button>
    <button
      class="addCardButton"
      v-if="!addCardFront && !addCardBack"
      v-on:click="addCard"
    >
      Add Card
    </button>
    <button class="deleteCardButton" v-on:click="deleteCardPressed">
      Delete Card
    </button>
    <button class="editCardButton" v-on:click="editCardPressed">
      Edit Card
    </button>

    <div class="snackbar" id="snackbar1">
      There is only one card in the deck. Please add more cards.
    </div>
    <div class="snackbar" id="snackbar2">
      There is no card to flip. Please add a card.
    </div>
    <div class="snackbar" id="snackbar3">
      There are no cards in the deck. Please add a card.
    </div>
    <div class="snackbar" id="snackbar4">Please enter a valid deck name.</div>
    <div class="snackbar" id="snackbar5">
      Any card with blank front or back will not be submitted.
    </div>
    <div class="snackbar" id="snackbar6">
      There are no cards to delete in this deck.
    </div>
    <div class="snackbar" id="snackbar7">
      No card matching the search term was found.
    </div>
    <div class="snackbar" id="snackbar8">
      There are no cards to edit in this deck.
    </div>
    <div class="snackbar" id="snackbar9">
      Please unshuffle the deck before editing or deleting cards.
    </div>
    <div class="snackbar" id="snackbar10">
      Please enter a number greater than zero and try the search again.
    </div>
  </div>
</template>

<!-- <script setup lang="ts"></script> -->

<script setup lang="ts">
import axios from 'axios';
import { ref, defineProps} from 'vue';
import { useRouter } from 'vue-router';

const url = '/api/decks/';
const router = useRouter();

try {
  var speechSynthesis = window.speechSynthesis;
} catch (err) {
  console.log('Error with speechSynthesis initialization.\n');
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Option {
  name: string;
  lang?: string;
}

interface Data {
  cardSide: string;
  cardPrompt: string;
  cardFrontInput: string;
  cardBackInput: string;
  addCardFront: boolean;
  addCardBack: boolean;
  editCardFront: boolean;
  editCardBack: boolean;
  cardsListIndex: number;
  editDeckNameSelected: boolean;
  editDeckNameInput: string;
  numberSearchInput: number;
  cardId: string;
  deleteDeckButtonPressed: boolean;
  deleteCardButtonPressed: boolean;
  editCardButtonPressed: boolean;
  optionList: Option[];
  selectedLanguage: string;
  isMobile: boolean;
  deckSearchInput: string;
  deckIsShuffled: boolean;
  hamburgerClicked: boolean;
  darkModeOn: boolean;
  backModeOn: boolean;
  isListeningForSpeech: boolean;
  speechInputResult: string;
  speechScore: number;
}

interface Card {
  cardFront: string;
  cardBack: string;
}

try {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
} catch (err) {
  console.log('Error with speechRecognition initialization.\n');
}

if (typeof navigator !== 'undefined') {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

const props = defineProps( {
  emittedObject: {
    type: Object,
    required: true,
    _id: {
      type: String,
      required: true,
    },
    cards: {
      type: Array,
      required: true,
    },
    deckName: {
      type: String,
      required: true,
    },
  },
});
const vFocus = {
  mounted(el) => {
    el.focus();
  },
};
const vClickOutside = {
  mounted(el, binding) => {
    const onClick = (event: Event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.body.addEventListener('click', onClick);
    el.clickOutsideEvent = onClick;
  },
  unmounted(el) => {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  },
};


const cardSide = ref('Front');
const cardPrompt = ref("Please add a card by clicking the 'Add Card' button below.");
const cardFrontInput = ref('');
const cardBackInput = ref('');
const addCardFront = ref(false);
const addCardBack = ref(false);
const editCardFront = ref(false);
const editCardBack = ref(false)
const cardsListIndex = ref(0)
const editDeckNameSelected = ref(false)
const editDeckNameInput = ref('')
const numberSearchInput = ref(1)
const cardId = ref('')
const deleteDeckButtonPressed = ref(false)
const deleteCardButtonPressed = ref(false)
const editCardButtonPressed = ref(false)
const optionList = ref([])
const selectedLanguage = ref('')
const isMobile = ref(isMobile)
const deckSearchInput = ref('')
const deckIsShuffled = ref(false)
const hamburgerClicked = ref(false)
const darkModeOn = ref(false)
const backModeOn = ref(false)
const isListeningForSpeech = ref(false)
const speechInputResult = ref('')
const speechScore = ref(0)

const returnToLoginPage = () => {
  localStorage.removeItem('emittedUser._id');
  localStorage.removeItem('emittedObject._id');
  router.push({ path: `/` });
};
const hamburgerWasClicked = () => {
  if (!hamburgerClicked.value) {
    hamburgerClicked.value = true;
  } else {
    hamburgerClicked.value = false;
  }
};
const pageWasClicked = () => {
  if (hamburgerClicked.value) {
    hamburgerClicked.value = false;
  }
};
const disableDarkMode = () => {
  darkModeOn.value = false;
  localStorage.setItem('darkModeOn', String(darkModeOn.value));
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
const enableDarkMode = () => {
  darkModeOn.value = true;
  localStorage.setItem('darkModeOn', String(darkModeOn.value));
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
};
const disableBackMode = () => {
  backModeOn.value = false;
  cardSide.value = 'Front';
  cardPrompt.value = props.emittedObject.cards.value[cardsListIndex.value].cardFront;
};
const enableBackMode = () => {
  backModeOn.value = true;
  cardSide.value = 'Back';
  cardPrompt.value =props.emittedObject.cards[cardsListIndex.value].cardBack;
};
const deckSearch = async() => {
  if (await checkForMatchRecursive(1)) {
    return;
  }
  // if there was no match, show the snackbar saying that there wasn't a match
  else {
    deckSearchInput.value = '';
    showSnackBar('snackbar7');
    return;
  }
};

const checkForMatchRecursive = async(
  similarityRequirement: number
): Promise<boolean> => {
  let cardFound = false;
  let indexVar = -1;
  let side = 'Front';
  // Search the card fronts for the search term
  [cardFound, indexVar] = await searchOneSideOfCardsForPartial(
    cardFound,
    indexVar,
    side,
    similarityRequirement
  );

  // if there was a match on the card fronts, show that card front
  if (cardFound === true) {
    await showFoundCardSide(indexVar, side);
    return true;
  }
  side = 'Back';
  // if the card still hasn't been found, check the backs of the cards
  if (cardFound === false) {
    [cardFound, indexVar] = await searchOneSideOfCardsForPartial(
      cardFound,
      indexVar,
      side,
      similarityRequirement
    );
  }
  // if there was a match on the card backs, show that card back
  if (cardFound === true) {
    await showFoundCardSide(indexVar, side);
    return true;
  }
  similarityRequirement -= 0.1;
  while (similarityRequirement > 0.3) {
    return checkForMatchRecursive(similarityRequirement);
  }

  return false;
};

const searchOneSideOfCardsForPartial= async(
  cardFound: boolean,
  indexVar: number,
  sideToSearch: string,
  similarityRequirement: number
): Promise<[boolean, number]> => {
  let searchProperty = sideToSearch === 'Back' ? 'cardBack' : 'cardFront';
  for (let i = 0; i < props.emittedObject.cards?.length; i++) {
    if (
      calculateSimilarity(
        props.emittedObject.cards[i][searchProperty],
        deckSearchInput.value
      ) >= similarityRequirement
    ) {
      indexVar = i;
      cardFound = true;
      break;
    }
  }
  return [cardFound, indexVar];
};

const showFoundCardSide = async(indexVar: number, sideToDisplay: string)=>{
  let searchProperty = sideToDisplay === 'Back' ? 'cardBack' : 'cardFront';
  cardsListIndex.value = indexVar;
  cardSide.value = sideToDisplay;
  cardPrompt.value =
    props.emittedObject.cards[cardsListIndex.value][searchProperty];
  deckSearchInput.value = '';
  numberSearchInput.value = cardsListIndex.value + 1;
};

const numberSearch = async() => {
  const numberInput = numberSearchInput.value;
  if (numberInput > 0 && numberInput <= props.emittedObject.cards?.length) {
    cardsListIndex.value = numberInput - 1;
    if (backModeOn.value) {
      cardSide.value = 'Back';
      cardPrompt.value =
        props.emittedObject.cards[cardsListIndex.value].cardBack;
    } else {
      cardSide.value = 'Front';
      cardPrompt.value =
        props.emittedObject.cards[cardsListIndex.value].cardFront;
    }
    return;
  } else {
    numberSearchInput.value = cardsListIndex.value + 1;
    showSnackBar('snackbar10');
    return;
  }
};
const populateVoiceList = () => {
  try {
    optionList.value = speechSynthesis.getVoices();
  } catch (err) {
    console.log('Error with getVoices in populateVoiceList.\n');
  }
};
const shuffleArray = (array: Card[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
const focusOnCardFrontInput = () => {
  this.$nextTick(() => {
    (this.$refs.frontInput as HTMLInputElement).focus();
  });
};
const focusOnCardBackInput = () => {
  this.$nextTick(() => {
    (this.$refs.backInput as HTMLInputElement).focus();
  });
};
const readCard = () => {
  try {
    const language = optionList.value.filter(
      (item) => item.name === selectedLanguage.value
    );
    let utterance = new SpeechSynthesisUtterance(cardPrompt.value);
    utterance.voice = language[0] as SpeechSynthesisVoice;
    speechSynthesis.speak(utterance);
  } catch (err) {
    console.log('Error with speechSynthesis for readCard.\n');
  }
};
const resetSpeechInput = () => {
  isListeningForSpeech.value = false;
  speechInputResult.value = '';
  speechScore.value = 0;
};
const editDistance = (s1: string, s2: string) => {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue =
              Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
};
const calculateSimilarity = (s1: string, s2: string) => {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / longerLength;
};
const calculateSpeechScore = () => {
  const similarityResult = calculateSimilarity(
    cardPrompt.value,
    speechInputResult.value
  );
  speechScore.value = similarityResult * 100;
};
const getSpeechInput = () => {
  const recognition = new SpeechRecognition();
  recognition.continuous = false;

  const language = optionList.value.filter(
    (item) => item.name === selectedLanguage.value
  );
  if (language[0]) {
    recognition.lang = language[0].lang ? language[0].lang : 'en-US';
  } else {
    recognition.lang = 'en-US';
  }
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();
  isListeningForSpeech.value = true;

  recognition.onspeechend = () => {
    recognition.stop();
    isListeningForSpeech.value = false;
  };

  recognition.onresult = (event: { results: any }) => {
    const speechInputResult = event.results[0][0].transcript;
    speechInputResult.value = speechInputResult;
    calculateSpeechScore();
    setTimeout(() => resetSpeechInput(), 2000);
  };
  recognition.onnomatch = (event: {}) => {
    console.log("I didn't recognize that word.");
    console.log('event: ', event);
    recognition.stop();
    resetSpeechInput();
  };
  recognition.onerror = (event: { error: any }) => {
    console.log(`Error occurred in recognition: ${event.error}`);
    recognition.stop();
    resetSpeechInput();
  };
};
const flipCard = () => {
  if (
    props.emittedObject.cards?.length === 0 &&
    !addCardBack.value &&
    !addCardFront.value
  ) {
    showSnackBar('snackbar2');
    return;
  }
  if (addCardFront.value) {
    cardSide.value = 'Back';
    addCardBack.value = true;
    addCardFront.value = false;
    focusOnCardBackInput();
    return;
  }
  if (addCardBack.value) {
    cardSide.value = 'Front';
    addCardBack.value = false;
    addCardFront.value = true;
    focusOnCardFrontInput();
    return;
  }
  if (cardSide.value === 'Front') {
    cardSide.value = 'Back';
    cardPrompt.value =
      props.emittedObject.cards[cardsListIndex.value].cardBack;
  } else {
    cardSide.value = 'Front';
    cardPrompt.value =
      props.emittedObject.cards[cardsListIndex.value].cardFront;
  }
};
const addCard = () => {
  if (backModeOn.value) {
    cardSide.value = 'Back';
    addCardBack.value = true;
  } else {
    cardSide.value = 'Front';
    addCardFront.value = true;
  }
};
const abortAddCard = () => {
  addCardFront.value = false;
  addCardBack.value = false;
  if (backModeOn.value) {
    cardSide.value = 'Back';
  } else {
    cardSide.value = 'Front';
  }
  cardFrontInput.value = '';
  cardBackInput.value = '';
  if (props.emittedObject.cards?.length === 0) {
    return;
  } else {
    if (backModeOn.value) {
      cardPrompt.value =
        props.emittedObject.cards[cardsListIndex.value].cardBack;
    } else {
      cardPrompt.value =
        props.emittedObject.cards[cardsListIndex.value].cardFront;
    }
    cardId.value = props.emittedObject.cards[cardsListIndex.value]._id;
    return;
  }
};
const abortEditCard = () => {
  editCardButtonPressed.value = false;
  editCardFront.value = false;
  editCardBack.value = false;
  if (backModeOn.value) {
    cardSide.value = 'Back';
  } else {
    cardSide.value = 'Front';
  }
  cardFrontInput.value = '';
  cardBackInput.value = '';
  if (props.emittedObject.cards?.length === 0) {
    return;
  } else {
    if (backModeOn.value) {
      cardPrompt.value =
        props.emittedObject.cards[cardsListIndex.value].cardBack;
    } else {
      cardPrompt.value =
        props.emittedObject.cards[cardsListIndex.value].cardFront;
    }
    cardId.value = props.emittedObject.cards[cardsListIndex.value]._id;
    return;
  }
};
const submitCard = async() => {
  if (cardFrontInput.value == '' || cardBackInput.value == '') {
    abortAddCard();
    showSnackBar('snackbar5');
    return;
  }
  const response = await axios.post(
    url + props.emittedObject._id + '/cards/' + cardsListIndex.value,
    { cardFront: cardFrontInput.value, cardBack: cardBackInput.value }
  );
  if (response.status !== 201) {
    console.log('error: ', response);
  }
  // props.emittedObject.cards = response.data.cards;
  const updatedDeck = updateAndEmitDeck({
    cards: response.data.cards,
  });

  addCardFront.value = false;
  addCardBack.value = false;
  if (backModeOn.value) {
    cardSide.value = 'Back';
  } else {
    cardSide.value = 'Front';
  }
  cardFrontInput.value = '';
  cardBackInput.value = '';
  if (updatedDeck.cards?.length - cardsListIndex.value > 1) {
    cardsListIndex.value += 1;
  }
  if (backModeOn.value) {
    cardPrompt.value = updatedDeck.cards[cardsListIndex.value].cardBack;
  } else {
    cardPrompt.value = updatedDeck.cards[cardsListIndex.value].cardFront;
  }
  cardId.value = updatedDeck.cards[cardsListIndex.value]._id;
  numberSearchInput.value = cardsListIndex.value + 1;
};
const submitEditedCardFront = () => {
  if (cardFrontInput.value == '') {
    abortEditCard();
    showSnackBar('snackbar5');
    return;
  }
  const response = await axios.put(
    url +
      props.emittedObject._id +
      '/cards/' +
      'front/' +
      cardId.value +
      '/' +
      cardsListIndex.value,
    {
      cardFront: cardFrontInput.value,
      cardBack: props.emittedObject.cards[cardsListIndex.value].cardBack,
    }
  );
  if (response.status !== 201) {
    console.log('error: ', response);
  }
  // props.emittedObject.cards = response.data.cards;
  const updatedDeck = updateAndEmitDeck({
    cards: response.data.cards,
  });

  editCardFront.value = false;
  editCardButtonPressed.value = false;
  cardFrontInput.value = '';
  cardPrompt.value = updatedDeck.cards[cardsListIndex.value].cardFront;
};
const updateAndEmitDeck = ({
  _id = null,
  deckName = null as string | null,
  cards = null,
}) => {
  const updatedDeckObject = JSON.parse(JSON.stringify(props.emittedObject));
  updatedDeckObject._id = _id === null ? updatedDeckObject._id : _id;
  updatedDeckObject.deckName =
    deckName === null ? updatedDeckObject.deckName : deckName;
  updatedDeckObject.cards =
    cards === null ? updatedDeckObject.cards : cards;
  this.$emit('emitDeck', updatedDeckObject);
  return updatedDeckObject;
};
const submitEditedCardBack = async()=> {
  if (cardBackInput.value == '') {
    abortEditCard();
    showSnackBar('snackbar5');
    return;
  }
  const response = await axios.put(
    url +
      props.emittedObject._id +
      '/cards/' +
      'back/' +
      cardId.value +
      '/' +
      cardsListIndex.value,
    {
      cardFront: props.emittedObject.cards[cardsListIndex.value].cardFront,
      cardBack: cardBackInput.value,
    }
  );
  if (response.status !== 201) {
    console.log('error: ', response);
  }
  // props.emittedObject.cards = response.data.cards;
  const updatedDeck = updateAndEmitDeck({
    cards: response.data.cards,
  });

  editCardBack.value = false;
  editCardButtonPressed.value = false;
  cardBackInput.value = '';
  cardPrompt.value = updatedDeck.cards[cardsListIndex.value].cardBack;
};
const updateCardIndex = (indexToAdd: number) => {
  if (props.emittedObject.cards?.length === 0) {
    showSnackBar('snackbar3');
    return;
  }
  if (props.emittedObject.cards?.length === 1) {
    showSnackBar('snackbar1');
    return;
  }
  if (indexToAdd + cardsListIndex.value < 0) {
    cardsListIndex.value = props.emittedObject.cards?.length - 1;
  } else if (
    indexToAdd + cardsListIndex.value >
    props.emittedObject.cards?.length - 1
  ) {
    cardsListIndex.value = 0;
  } else {
    cardsListIndex.value = indexToAdd + cardsListIndex.value;
  }
  if (backModeOn.value) {
    cardSide.value = 'Back';
    cardPrompt.value =
      props.emittedObject.cards[cardsListIndex.value].cardBack;
  } else {
    cardSide.value = 'Front';
    cardPrompt.value =
      props.emittedObject.cards[cardsListIndex.value].cardFront;
  }
  cardId.value = props.emittedObject.cards[cardsListIndex.value]._id;
  numberSearchInput.value = cardsListIndex.value + 1;
};
const editCardPressed = () => {
  if (deckIsShuffled.value) {
    showSnackBar('snackbar9');
    return;
  }
  if (props.emittedObject.cards?.length === 0) {
    showSnackBar('snackbar8');
    return;
  } else {
    editCardButtonPressed.value = true;
    if (cardSide.value === 'Front') {
      editCardFront.value = true;
    }
    if (cardSide.value === 'Back') {
      editCardBack.value = true;
    }
    return;
  }
};
const deleteCardPressed = () => {
  if (deckIsShuffled.value) {
    showSnackBar('snackbar9');
    return;
  }
  if (props.emittedObject.cards?.length === 0) {
    showSnackBar('snackbar6');
    return;
  } else {
    deleteCardButtonPressed.value = true;
    return;
  }
},
const deleteCard = async() => {
  deleteCardButtonPressed.value = false;
  await axios.delete(
    url + props.emittedObject._id + '/cards/' + cardId.value
  );
  // props.emittedObject.cards.splice(cardsListIndex.value, 1);
  const updatedDeckObject = JSON.parse(JSON.stringify(props.emittedObject));
  updatedDeckObject.cards.splice(cardsListIndex.value, 1);
  this.$emit('emitDeck', updatedDeckObject);

  if (updatedDeckObject.cards?.length - 1 >= 0) {
    cardsListIndex.value =
      cardsListIndex.value === 0 ? 0 : cardsListIndex.value - 1;
    cardId.value = updatedDeckObject.cards[cardsListIndex.value]._id;
    if (backModeOn.value) {
      cardSide.value = 'Back';
      cardPrompt.value =
        updatedDeckObject.cards[cardsListIndex.value].cardBack;
    } else {
      cardSide.value = 'Front';
      cardPrompt.value =
        updatedDeckObject.cards[cardsListIndex.value].cardFront;
    }
  } else {
    cardPrompt.value =
      "Please add a card by clicking the 'Add Card' button below.";
  }
  numberSearchInput.value = cardsListIndex.value + 1;
};
const doNotDeleteCard = async () => {
  deleteCardButtonPressed.value = false;
};
const goBackToDecks = () => {
  localStorage.removeItem('emittedObject._id');
  //advance route back to the Welcome Page
  router.push({ path: '/welcome' });
};
// because I am shuffling the emittedObject.cards array, the shuffling is only temporary. The database is not changed in any way.
const shuffleDeck = () => {
  if (props.emittedObject.cards?.length === 0) {
    showSnackBar('snackbar3');
    return;
  }
  if (props.emittedObject.cards?.length === 1) {
    showSnackBar('snackbar1');
    return;
  }
  shuffleArray(props.emittedObject.cards);
  if (backModeOn.value) {
    cardSide.value = 'Back';
    cardPrompt.value =
      props.emittedObject.cards[cardsListIndex.value].cardBack;
  } else {
    cardSide.value = 'Front';
    cardPrompt.value =
      props.emittedObject.cards[cardsListIndex.value].cardFront;
  }
  cardId.value = props.emittedObject.cards[cardsListIndex.value].cardId;
  deckIsShuffled.value = true;
};
const unShuffleDeck = async () => {
  // props.emittedObject._id = localStorage.getItem("emittedObject._id");
  const localStorageId = localStorage.getItem('emittedObject._id');
  const responseFromDecks = await axios.get(
    url + '/deck/' + localStorageId
  );
  // props.emittedObject = responseFromDecks.data;
  const updatedDeck = updateAndEmitDeck(responseFromDecks.data);

  if (backModeOn.value) {
    cardSide.value = 'Back';
    cardPrompt.value = updatedDeck.cards[cardsListIndex.value].cardBack;
  } else {
    cardSide.value = 'Front';
    cardPrompt.value = updatedDeck.cards[cardsListIndex.value].cardFront;
  }
  cardId.value = updatedDeck.cards[cardsListIndex.value]._id;
  deckIsShuffled.value = false;
};
const deleteDeckPressed = () => {
  deleteDeckButtonPressed.value = true;
};
const deleteDeck = async() =>{
  deleteDeckButtonPressed.value = false;
  await axios.delete(url + props.emittedObject._id + '/deckName');
  goBackToDecks();
};
const doNotDeleteDeck = async() => {
  deleteDeckButtonPressed.value = false;
};
const editDeckName = () => {
  editDeckNameSelected.value = true;
};
const submitEditedDeckName = async () => {
  if (editDeckNameInput.value == '') {
    editDeckNameSelected.value = false;
    showSnackBar('snackbar4');
    return;
  }
  // props.emittedObject.deckName = editDeckNameInput.value;
  updateAndEmitDeck({ deckName: editDeckNameInput.value });

  const response = await axios.put(
    url + props.emittedObject._id + '/deckName',
    { deckName: editDeckNameInput.value }
  );
  if (response.status !== 201) {
    console.log('error: ', response);
  }
  editDeckNameInput.value = '';
  editDeckNameSelected.value = false;
};

const showSnackBar = (snackBarNum: string) => {
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
};
const localDarkMode = localStorage.getItem('darkModeOn');
if (localDarkMode === 'true') {
  darkModeOn.value = true;
} else if (localDarkMode === 'false') {
  darkModeOn.value = false;
}
if (darkModeOn.value == undefined || darkModeOn.value == false) {
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
} else if (darkModeOn.value == true) {
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

populateVoiceList();
try {
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
} catch (err) {
  console.log('Error with speechSynthesis in created.\n');
}

if (props.emittedObject._id != undefined) {
  localStorage.setItem('emittedObject._id', props.emittedObject._id);
}

const objectId =
  props.emittedObject._id == undefined
    ? localStorage.getItem('emittedObject._id')
    : props.emittedObject._id;

if (objectId == undefined) {
  goBackToDecks();
  return;
}

const responseFromDecks = await axios.get(url + '/deck/' + objectId);
// props.emittedObject = responseFromDecks.data;
const updatedDeck = updateAndEmitDeck(responseFromDecks.data);

if (updatedDeck.cards != undefined && updatedDeck.cards != null) {
  if (updatedDeck.cards?.length != 0) {
    cardPrompt.value = updatedDeck.cards[0].cardFront;
    cardId.value = updatedDeck.cards[0]._id;
  }
}
deckIsShuffled.value = false;
</script>

<style scoped>
:root {
  --primary-color: #8c1a62;
  --secondary-color: #81175a;
  --tertiary-color: #eee1d6;
  --quaternary-color: #ddd1c7;
}

#cardButtonsDiv {
  vertical-align: 40%;
}

#singleDeck_css {
  background-color: var(--tertiary-color);
  color: var(--primary-color);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  overflow-y: auto;
}

#welcomeUser {
  display: flex;
  justify-content: space-between;
}

#logoImage {
  padding-left: 0.5em;
  padding-top: 0.5em;
}

#welcomeWords {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#deckNameWelcome {
  overflow-wrap: anywhere;
}

#hamburgerImage {
  padding-top: 1.4em;
  padding-right: 1.4em;
}

#hamburgerDropdown {
  position: absolute;
  top: 4em;
  right: 0em;
  background-color: var(--quaternary-color);
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
}

#selectBlock {
  border-radius: 8px;
}

.cardButton {
  width: fit-content;
  height: 2em;
  font-size: large;
  margin-top: 0.75em;
}

.cardInputBox {
  width: 17em;
  max-width: 80%;
  margin: 0.5em auto;
  font-size: large;
}

#cardNumberBox {
  width: 4em;
}

.cardPromptClass1 {
  font-size: x-large;
  color: white;
  display: inline;
}

.cardPromptClass2 {
  font-size: x-large;
}

.card {
  border: 0.1em;
  border-radius: 0.5em;
  padding: 0em 0em 1.5em 0em;
  width: 80%;
  max-width: 20em;
  height: 60%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--primary-color);
  color: var(--tertiary-color);
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
}

.flipped {
  background-color: var(--secondary-color);
}

.textBox input {
  font-size: 25px;
  border: 0.1em solid rgb(131, 131, 131);
  border-radius: 0.5em;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cardNavigationButtons {
  width: fit-content;
  height: 2em;
}

.arrowImages {
  border-radius: 8em;
  max-width: 3em;
}

#arrowsDiv {
  display: flex;
  justify-content: space-evenly;
}

select {
  width: 83%;
  display: block;
  margin: 0 auto;
  font-family: sans-serif;
  font-size: 16px;
  padding: 5px;
}
</style>
