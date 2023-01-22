import Router from "./Router";
import { expect } from "chai";
import sinon from "sinon";

describe("Router", () => {
  const originalForward = window.history.forward;
  const originalBack = window.history.back;

  beforeEach(() => {
    Router.reset();
  });

  after(() => {
    window.history.forward = originalForward;
    window.history.back = originalBack;
  });

  it("test forward", () => {
    Router.forward();
  });

  it("test back", () => {
    Router.back();
  });
});
