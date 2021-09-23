import { validateEmail } from "./Signup";

describe("Signup", () => {
  it("validateEmail", () => {
    // given
    const email1 = "abc1234@naver.com";
    const email2 = "abcde@gmail.com";

    // when
    const result1 = validateEmail(email1);
    const result2 = validateEmail(email2);

    // then
    expect(result1).toBe(true);
    expect(result2).toBe(true);
  });

  it("validateEmail: empty id", () => {
    // given
    const email1 = "@naver.com";
    const email2 = "@gmail.com";

    // when
    const result1 = validateEmail(email1);
    const result2 = validateEmail(email2);

    // then
    expect(result1).toBe(false);
    expect(result2).toBe(false);
  });

  it("validateEmail no @", () => {
    // given
    const email1 = "abc1234naver.com";
    const email2 = "abcdegmail.com";

    // when
    const result1 = validateEmail(email1);
    const result2 = validateEmail(email2);

    // then
    expect(result1).toBe(false);
    expect(result2).toBe(false);
  });

  it("validateEmail invalid email domain", () => {
    // given
    const email1 = "abc1234@naver";
    const email2 = "abcde@gmail";
    const email3 = "abcde@.com";
    const email4 = "abcde@a.c";

    // when
    const result1 = validateEmail(email1);
    const result2 = validateEmail(email2);
    const result3 = validateEmail(email3);
    const result4 = validateEmail(email4);

    // then
    expect(result1).toBe(false);
    expect(result2).toBe(false);
    expect(result3).toBe(false);
    expect(result4).toBe(false);
  });
});
