import confetti from 'canvas-confetti';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      confetti: () => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }
  }
});
