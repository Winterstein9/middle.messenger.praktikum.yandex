import Block from "../components/mold/block";

describe("test Block", () => {
  class Component extends Block {
    rebder() {
      return new DocumentFragment();
    }
  }

  it("Block", () => {
    const instance = new Component();
  });
});
