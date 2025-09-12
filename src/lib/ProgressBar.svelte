<script>
  import { createEventDispatcher } from "svelte";

  // Props LAMA dihapus (duration)
  // Props BARU untuk merefleksikan audio asli
  export let totalSlides = 1;
  export let currentSlide = 0;
  export let isPlaying = true;
  export let currentTime = 0;
  export let totalDuration = 0;

  const dispatch = createEventDispatcher();

  // Variabel reaktif untuk menghitung persentase progres bar secara real-time
  $: progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;
</script>

<header class="absolute top-0 left-0 right-0 z-30 p-4 pt-6">
  <!-- Progress Bar Segments -->
  <div class="flex items-center gap-1.5">
    {#each { length: totalSlides } as _, i}
      <div class="relative h-1 flex-1 rounded-full bg-white/30 overflow-hidden">
        <!-- Lapisan progres yang terisi -->
        {#if i < currentSlide}
          <!-- Bar untuk slide yang sudah lewat (penuh) -->
          <div class="absolute inset-0 bg-white"></div>
        {:else if i === currentSlide}
          <!-- Bar untuk slide saat ini (mengisi sesuai progres musik) -->
          <div
            class="absolute inset-0 bg-white transition-all duration-200 ease-linear"
            style="width: {progress}%"
          ></div>
        {/if}
      </div>
    {/each}
  </div>

  <!-- Kontrol UI (Pause, Mute, Close) -->
  <div
    class="absolute top-10 left-4 right-4 flex justify-between items-center text-white"
  >
    <!-- Info dan Kontrol Play/Pause -->
    <div class="flex items-center gap-3">
      <img
        src="icon.jpg"
        alt="Happy Birthday Icon"
        class="w-8 h-8 rounded-full"
      />
      <p class="font-bold text-sm">Tania Birthday Wrapped</p>
      <button on:click={() => dispatch("toggleplay")} class="ml-2">
        {#if isPlaying}
          <!-- Pause Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><rect x="6" y="4" width="4" height="16"></rect><rect
              x="14"
              y="4"
              width="4"
              height="16"
            ></rect></svg
          >
        {:else}
          <!-- Play Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><polygon points="5 3 19 12 5 21 5 3"></polygon></svg
          >
        {/if}
      </button>
    </div>

    <!-- Kontrol Mute dan Close -->
    <div class="flex items-center gap-4">
      <button>
        <!-- Mute/Unmute Icon (logika belum diimplementasi) -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          ><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path
            d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"
          ></path></svg
        >
      </button>
      <button on:click={() => dispatch("close")} class="text-2xl font-light"
        >✕</button
      >
    </div>
  </div>
</header>

<style>
  /* Logika animasi CSS (@keyframes fill) tidak lagi diperlukan 
    karena progres bar sekarang dikontrol oleh JavaScript secara real-time.
  */
</style>
