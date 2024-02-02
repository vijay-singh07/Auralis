// use-sound.d.ts

declare module 'use-sound' {
  const useSound: (src: string, options?: any) => [() => void, { pause: () => void; sound: any }];
  export default useSound;
}
