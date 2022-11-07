import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Login } from "./Login";

jest.mock("axios", () => ({
  __esModule: true,

  default: {
    get: () => ({
      data: { id: 1, name: "John" },
    }),
  },
}));

// 檢查 placeholder="username" 元素有沒有在 Login 組件裏面
test("username input should be rendered", () => {
  render(<Login />);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  expect(usernameInputEl).toBeInTheDocument();
});

// 檢查 placeholder="password" 元素有沒有在 Login 組件裏面
test("password input should be rendered", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl).toBeInTheDocument();
});

// 檢查 button 元素有沒有在 Login 組件裏面
test("button should be rendered", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeInTheDocument();
});

// 檢查 Login 組件的 placeholder="username" 元素的 value 是否為 ""
test("username input should be empty", () => {
  render(<Login />);
  const usernameInputEl: HTMLInputElement =
    screen.getByPlaceholderText(/username/i);
  expect(usernameInputEl.value).toBe("");
});

// 檢查 Login 組件的 placeholder="password" 元素的 value 是否為 ""
test("password input should be empty", () => {
  render(<Login />);
  const usernameInputEl: HTMLInputElement =
    screen.getByPlaceholderText(/password/i);
  expect(usernameInputEl.value).toBe("");
});

// 檢查 Login 組件的 button 元素是被停用的
test("button should should be disabled", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeDisabled();
});

// Login 組件的 button 的 textContent 不應該是 please wait
test("loading should should not be render", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).not.toHaveTextContent(/please wait/i);
});

// 檢查 Login 組件的 data-testid="error" 元素是被隱藏的
test("error message should not be visible", () => {
  render(<Login />);
  const errorEl = screen.getByTestId("error");
  expect(errorEl).not.toBeVisible();
});

// 在 Login 組件的 placeholder="username" 元素輸入文字時 el.target.value 應該要被改變
test("username input should change", () => {
  render(<Login />);
  const usernameInputEl: HTMLInputElement =
    screen.getByPlaceholderText(/username/i);
  const testValue = "test";

  // https://testing-library.com/docs/dom-testing-library/api-events/
  // fireEvent[eventName](node: HTMLElement, eventProperties: Object)
  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  expect(usernameInputEl.value).toBe(testValue);
});

// 在 Login 組件的 placeholder="password" 元素輸入文字時 el.target.value 應該要被改變
test("password input should change", () => {
  render(<Login />);
  const passwordInputEl: HTMLInputElement =
    screen.getByPlaceholderText(/password/i);
  const testValue = "test";

  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  expect(passwordInputEl.value).toBe(testValue);
});

// Login 組件的 placeholder="username" 和 placeholder="password" 兩個 input 輸入值後， button 元素不應該是 disabled
test("button should not be disabled when inputs exist.", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const usernameInputEl: HTMLInputElement =
    screen.getByPlaceholderText(/username/i);
  const passwordInputEl: HTMLInputElement =
    screen.getByPlaceholderText(/password/i);
  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });

  expect(buttonEl).not.toBeDisabled();
});

// Login 組件的 button 的 textContent 在點擊之後不應該是 please wait
test("loading should be rendered when click", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const usernameInputEl: HTMLInputElement =
    screen.getByPlaceholderText(/username/i);
  const passwordInputEl: HTMLInputElement =
    screen.getByPlaceholderText(/password/i);
  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);
  expect(buttonEl).toHaveTextContent(/please wait/i);
});

// Login 組件的 button 的 textContent 在點擊之後不應該是 please wait
test("loading should not be rendered after fetching", async () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const usernameInputEl: HTMLInputElement =
    screen.getByPlaceholderText(/username/i);
  const passwordInputEl: HTMLInputElement =
    screen.getByPlaceholderText(/password/i);
  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);
  await waitFor(() => expect(buttonEl).not.toHaveTextContent(/please wait/i));
});

// Login 組件在 click button 之後應該要出現 "John" 文字
test("user should be rendered after fetching", async () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const usernameInputEl: HTMLInputElement =
    screen.getByPlaceholderText(/username/i);
  const passwordInputEl: HTMLInputElement =
    screen.getByPlaceholderText(/password/i);
  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  const userItem = await screen.findByText("John");
  expect(userItem).toBeInTheDocument()
});
