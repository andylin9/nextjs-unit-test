import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";
/*
基礎語法:
import 組件
test('測試描述'.() => {
  1. 渲染組件 render(組件)
  2. 選擇 html 元素
})
*/

test("render welcome to next.js! heading", () => {
  // 1. 渲染組件
  render(<Home />);
  // 2. 選擇 html 元素
  // screen 指的是整個 dociment
  // screen.getByText(/welcome to next\.js!/i); 表示找到有 welcome to next\.js! 文字的元素
  // /welcome to next\.js!/i 是正則表達式
  const heading = screen.getByText(/welcome to next\.js!/i);
  // 3. 寫出我們預期的結果
  // expect(heading).toBeInTheDocument(); 我們預期 heading 在我們的 document 裡面
  expect(heading).toBeInTheDocument();
});

test("render 3 list items", () => {
  render(<Home />);
  // html tag 名稱對應表
  // https://www.w3.org/TR/html-aria/#docconformance
  // getAllByRole 選擇所有元素
  const listItems = screen.getAllByRole("listitem");
  // 預期 listItems 會有三個
  expect(listItems).toHaveLength(3); // 第 1 種寫法
  expect(listItems.length).toBe(3); // 第 2 種寫法
  expect(listItems.length).toEqual(3); // 第 3 種寫法
});

// 測試 data-testid="mytestid" 這個元素在不在文件裡面
test("render title", () => {
  render(<Home />);
  const title = screen.getByTestId("mytestid");
  expect(title).toBeInTheDocument();
});

// 測試 title="sum" 的元素的內文應該是不是"6"
test("sum should be 6", () => {
  render(<Home />);
  const sum = screen.getByTitle("sum");
  expect(sum.textContent).toBe("6");
});
