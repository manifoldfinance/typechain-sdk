 export function routine(fn: Function, msec: number): NodeJS.Timeout {
  let working = true;
  const result = fn();
  if (result instanceof Promise) {
    result.then(() => (working = false));
  } else {
    working = false;
  }

  const intervalId = setInterval(async () => {
    if (!working) {
      working = true;
      await fn();
      working = false;
    }
  }, msec);

  return intervalId;
}

export const EraswapInfo = {
  baseUrl: 'https://eraswap.info',
  getAddressHref: function (address: string) {
    return `${this.baseUrl}/address/${address}`;
  },
  getTxHref: function (txHash: string) {
    return `${this.baseUrl}/txn/${txHash}`;
  },
};

export function parseSecondsRemaining(numberOfSeconds: number): string {
  const days = Math.floor(numberOfSeconds / 60 / 60 / 24);
  const hours = Math.floor((numberOfSeconds - days * 60 * 60 * 24) / 60 / 60);
  const minutes = Math.floor(
    (numberOfSeconds - days * 60 * 60 * 24 - hours * 60 * 60) / 60
  );
  const seconds =
    numberOfSeconds - days * 60 * 60 * 24 - hours * 60 * 60 - minutes * 60;

  return `${days !== 0 ? `${days} days, ` : ''}${
    hours !== 0 ? `${hours} hours, ` : ''
  }${minutes !== 0 ? `${minutes} minutes and ` : ''}${seconds} seconds`;
}

export function parseTimestampRemaining(unixTimestampSeconds: number): string {
  const currentTimestamp = Math.round(Date.now() / 1000);
  let secondsRemaining = currentTimestamp - unixTimestampSeconds;
  if (secondsRemaining < 0) secondsRemaining = 0;
  return parseSecondsRemaining(secondsRemaining);
}

import { Logger } from 'ethers/lib/utils';

export function parseEthersJsError(error: any): string {
  const isRevert =
    (error?.error?.code || error?.code) === Logger.errors.CALL_EXCEPTION;
  const reason = error?.error?.reason || error?.reason;
  const message = error?.error?.message || error?.message;
  return (
    (isRevert && reason && `Error from Smart Contract ${reason}`) ||
    (message && `Client-side error: ${message}`) ||
    `Unknown error: ${
      typeof error === 'object' ? JSON.stringify(error) : error
    }`
  );
}
