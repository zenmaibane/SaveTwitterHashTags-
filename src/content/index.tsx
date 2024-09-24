import 'webextension-polyfill';
import 'construct-style-sheets-polyfill';
import { proxyStore } from '../app/proxyStore';

proxyStore.ready().then(async () => {
  // Note:DOMが構築されるまで待つ。もっと頭のいい方法をしたい。
  await sleep(3000);
  const tweetButtonDom = document.querySelector<HTMLAnchorElement>(
    'a[data-testid="SideNav_NewTweet_Button"]'
  );
  const shortCutFunction = (e: KeyboardEvent) => {
    if (!e.target) {
      return;
    }
    const isFocusingTextArea = e.target instanceof HTMLTextAreaElement;
    // note: input未定義のときもtextになるので一応拾えるようにする
    const isFocusingInputText =
      e.target instanceof HTMLInputElement && (!e.target.type || e.target.type === 'text');
    if (e.key === 'n') {
      if (isFocusingTextArea || isFocusingInputText) {
        return;
      }
      // note:元々あるNのショートカットキーを無効化
      e.preventDefault();
      tweetButtonDom?.click();
    }
  };
  document.addEventListener('keydown', shortCutFunction);
});

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time)); //timeはミリ秒
