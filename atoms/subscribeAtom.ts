import { atom } from "recoil";

export const planState = atom({
    key: 'subscribeState',
    default: 3,
  })
export const subscribeState = atom({
    key: 'subscribeState',
    default: false,
  })

