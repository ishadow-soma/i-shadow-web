import { validateEmail, validatePassword } from "./Signup";

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

  it("validateEmail - empty id", () => {
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

  it("validateEmail - no @", () => {
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

  it("validateEmail - invalid email domain", () => {
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

  it("validatePassword", () => {
    // given
    const password1 = "abcd1234";
    const password2 = "1234aaaabbbbcccc";

    // when
    const result1 = validatePassword(password1);
    const result2 = validatePassword(password2);

    // then
    expect(result1).toBe(true);
    expect(result2).toBe(true);
  });

  it("validatePassword - only alphabet", () => {
    // given
    const password1 = "abcdefgh";
    const password2 = "aaaabbbbcccc";

    // when
    const result1 = validatePassword(password1);
    const result2 = validatePassword(password2);

    // then
    expect(result1).toBe(false);
    expect(result2).toBe(false);
  });

  it("validatePassword - only numbers", () => {
    // given
    const password1 = "11112222";
    const password2 = "123456781234";

    // when
    const result1 = validatePassword(password1);
    const result2 = validatePassword(password2);

    // then
    expect(result1).toBe(false);
    expect(result2).toBe(false);
  });

  it("validatePassword - invalid length", () => {
    // given
    const password1 = "abc123";
    const password2 = "abcdefg12345678901234567890";

    // when
    const result1 = validatePassword(password1);
    const result2 = validatePassword(password2);

    // then
    expect(result1).toBe(false);
    expect(result2).toBe(false);
  });
});
