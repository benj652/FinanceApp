declare global {
  interface Window {
    context: {
      locale: string;
      createLinkToken: (...args: any) => any;
      setAccessToken: (...args: any) => any;
    };
  }
}
export {};
