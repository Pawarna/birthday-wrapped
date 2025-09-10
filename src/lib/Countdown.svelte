<script>
  import { onMount } from "svelte";

  // PERBAIKAN: Menerima prop 'birthdayDate' dari App.svelte
  export let birthdayDate;

  let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  let interval;

  function calculateTimeLeft() {
    const difference = +new Date(birthdayDate) - +new Date();
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      clearInterval(interval);
    }
  }

  onMount(() => {
    calculateTimeLeft();
    interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  });

  // Helper untuk format angka (01, 02, dst.)
  const format = (num) => num.toString().padStart(2, "0");
</script>

<div
  class="h-full w-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-black text-white p-4"
>
  <h1 class="text-2xl md:text-3xl font-bold text-center text-gray-300 mb-2">
    Kejutan akan segera tiba...
  </h1>
  <p class="text-base text-gray-400 mb-8">
    Sebuah hadiah spesial sedang dipersiapkan untukmu.
  </p>

  <div class="grid grid-cols-4 gap-4 md:gap-8 text-center">
    <div class="p-4 rounded-lg bg-white/5">
      <div class="text-4xl md:text-6xl font-black text-yellow-300">
        {format(timeLeft.days)}
      </div>
      <div class="text-xs uppercase tracking-widest text-gray-400 mt-1">
        Hari
      </div>
    </div>
    <div class="p-4 rounded-lg bg-white/5">
      <div class="text-4xl md:text-6xl font-black text-yellow-300">
        {format(timeLeft.hours)}
      </div>
      <div class="text-xs uppercase tracking-widest text-gray-400 mt-1">
        Jam
      </div>
    </div>
    <div class="p-4 rounded-lg bg-white/5">
      <div class="text-4xl md:text-6xl font-black text-yellow-300">
        {format(timeLeft.minutes)}
      </div>
      <div class="text-xs uppercase tracking-widest text-gray-400 mt-1">
        Menit
      </div>
    </div>
    <div class="p-4 rounded-lg bg-white/5">
      <div class="text-4xl md:text-6xl font-black text-yellow-300">
        {format(timeLeft.seconds)}
      </div>
      <div class="text-xs uppercase tracking-widest text-gray-400 mt-1">
        Detik
      </div>
    </div>
  </div>
</div>
