import { shallowMount } from "@vue/test-utils";
import { describe, expect, test } from 'vitest'
import SingleDeck from "../../src/components/SingleDeck.vue";

describe("Testing SingleDeck Component Methods", () => {
  const wrapper = shallowMount(SingleDeck, {
    propsData: {
      emittedObject: {
        _id: "10938497987519739874", //fake id
        cards: [
          { cardFront: "spam", cardBack: "hool" },
          { cardFront: "neo", cardBack: "goo" },
          { cardFront: "foo", cardBack: "bar" },
        ],
        deckName: "Javi",
      },
    },
  });

  let obj = wrapper.vm;

  test("correctly updates the index by 1 when updateCardIndex(1) is called", () => {
    obj.updateCardIndex(1);
    expect(obj.cardsListIndex).toBe(1);
    expect(obj.cardSide).toBe("Front");
    expect(obj.cardPrompt).toBe("neo");
  });

  test("correctly updates the index by -1 when updateCardIndex(-1) is called", () => {
    obj.updateCardIndex(-1);
    expect(obj.cardsListIndex).toBe(0);
    expect(obj.cardSide).toBe("Front");
    expect(obj.cardPrompt).toBe("spam");
  });

  test("correctly updates the index by -2 when updateCardIndex(-1) is called twice", () => {
    obj.updateCardIndex(-1);
    obj.updateCardIndex(-1);
    expect(obj.cardsListIndex).toBe(1);
    expect(obj.cardSide).toBe("Front");
    expect(obj.cardPrompt).toBe("neo");
  });

  test("correctly updates the index by 4 when updateCardIndex(1) is called four times", () => {
    for (let i = 0; i < 4; i++) {
      obj.updateCardIndex(1);
    }
    expect(obj.cardsListIndex).toBe(2);
    expect(obj.cardSide).toBe("Front");
    expect(obj.cardPrompt).toBe("foo");
  });

  test("correctly flips the card from front to back", () => {
    obj.flipCard();
    expect(obj.cardSide).toBe("Back");
    expect(obj.cardPrompt).toBe("bar");
  });

  test("correctly flips the card from back to front", () => {
    obj.flipCard();
    expect(obj.cardSide).toBe("Front");
    expect(obj.cardPrompt).toBe("foo");
  });
});