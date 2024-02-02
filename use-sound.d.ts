declare module 'use-sound' {
  const useSound: (src: string, options?: any) => [() => void, boolean];
  export default useSound;
}
