<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { fly } from "svelte/transition";

  // Menerima nama orang yang berulang tahun dari App.svelte
  export let name = "Kamu";

  const dispatch = createEventDispatcher();

  // State baru untuk mengontrol animasi
  let isBlownOut = false;
  let showConfetti = false;
  let showCurtainClose = false; // State baru untuk tirai penutup

  // Fungsi ini akan memicu animasi dan memulai cerita
  function blowCandle() {
    if (isBlownOut) return; // Mencegah klik berulang

    isBlownOut = true;
    showConfetti = true;

    // Setelah konfeti berjalan, mulai tutup tirai
    setTimeout(() => {
      showCurtainClose = true;
    }, 1500); // Tirai mulai menutup setelah 1.5 detik

    // Setelah tirai tertutup, kirim sinyal untuk memulai cerita
    setTimeout(() => {
      dispatch("start");
    }, 3500); // Total durasi 3.5 detik (1.5s konfeti + 2s tirai)
  }
</script>

<div
  class="h-full w-full flex flex-col justify-center items-center text-center p-8 bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-950 relative overflow-hidden"
>
  <!-- Animasi Balon di Latar Belakang (Ditingkatkan) -->
  <div class="balloons-container" aria-hidden="true">
    {#each Array(7) as _}
      <div class="balloon-wrapper">
        <svg viewBox="0 0 100 125" class="balloon-svg">
          <path
            class="balloon-path"
            d="M50,5A45,45 0,0,1 95,50c0,24.85-20.15,45-45,45S5,74.85,5,50A45,45 0,0,1 50,5Z"
          />
          <path
            class="highlight"
            d="M35 20 A 25 25 0 0 1 65 35 A 25 25 0 0 1 35 20 Z"
          />
        </svg>
      </div>
    {/each}
  </div>

  <!-- Adegan utama dengan animasi masuk -->
  <div
    class="z-10 flex flex-col items-center"
    in:fly={{ y: 50, duration: 1500 }}
  >
    <div class="mb-4">
      <h1 class="text-4xl font-bold text-white">Hari Spesial Telah Tiba</h1>
      <p class="text-lg mt-2 text-gray-300">
        Sebuah hadiah kecil untukmu, {name}.
      </p>
    </div>

    <!-- Ilustrasi Kue dan Lilin menggunakan SVG yang lebih detail -->
    <div class="cake-container">
      <div class="smoke" class:active={isBlownOut}>
        <div class="smoke-puff"></div>
      </div>
      <div class="flame-wrapper" class:blown-out={isBlownOut}>
        <div class="flame"></div>
        <div class="wick"></div>
      </div>
      <div class="candle"></div>
      <div class="cake">
        <div class="icing"></div>
        <div class="layer-top"></div>
        <div class="layer-middle"></div>
        <div class="layer-bottom"></div>
      </div>
    </div>

    <!-- Tombol "Tiup Lilin" -->
    <button
      on:click={blowCandle}
      disabled={isBlownOut}
      class="mt-10 px-8 py-4 bg-pink-500 rounded-full font-bold text-white text-xl shadow-lg shadow-pink-500/30 hover:bg-pink-600 transition-all duration-300 disabled:opacity-50 disabled:scale-95"
    >
      Tiup Lilin!
    </button>

    <!-- Animasi Konfeti -->
    {#if showConfetti}
      <div class="confetti-container">
        {#each Array(50) as _}
          <div
            class="confetti"
            style="
              left: {Math.random() * 100}%;
              animation-delay: {Math.random()}s;
              animation-duration: {1.5 + Math.random()}s;
            "
          ></div>
        {/each}
      </div>
    {/if}
  </div>

  <!-- 
    Transisi tirai penutup 
  -->
  {#if showCurtainClose}
    <div class="curtain-wrapper-close" aria-hidden="true">
      {#each Array(10) as _}
        <div class="curtain-column-close">
          <div class="block-piece bg-pink-500"></div>
          <div class="block-piece bg-purple-500"></div>
          <div class="block-piece bg-blue-500"></div>
          <div class="block-piece bg-pink-500"></div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  /* --- CSS KUE & LILIN --- */
  .cake-container {
    position: relative;
    width: 200px;
    height: 180px;
  }
  .cake {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .icing {
    width: 100%;
    height: 30px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 4px 0px rgba(0, 0, 0, 0.1);
  }
  .layer-top,
  .layer-middle,
  .layer-bottom {
    width: 100%;
    height: 40px;
    border-radius: 8px;
  }
  .layer-top {
    background: #ffc2d1;
    margin-top: -15px;
  }
  .layer-middle {
    background: #ffb3c6;
  }
  .layer-bottom {
    background: #ff8fab;
  }

  .candle {
    position: absolute;
    bottom: 110px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 40px;
    background: repeating-linear-gradient(
      45deg,
      #a8dff3,
      #a8dff3 5px,
      #fff 5px,
      #fff 10px
    );
    border-radius: 4px 4px 0 0;
  }
  .wick {
    position: absolute;
    bottom: 150px;
    left: 50%;
    transform: translateX(-50%);
    width: 3px;
    height: 8px;
    background: #333;
  }
  .flame-wrapper {
    position: absolute;
    bottom: 158px;
    left: 50%;
    transform-origin: bottom center;
  }
  .flame {
    width: 12px;
    height: 25px;
    background: #ffc700;
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    box-shadow:
      0 0 15px #ffc107,
      0 0 20px #ffc107;
    animation: flicker 1.2s ease-in-out infinite;
    transform-origin: bottom center;
    transition: all 0.3s ease-out;
  }
  .flame-wrapper.blown-out .flame {
    transform: scale(0) skew(30deg);
    opacity: 0;
  }

  .smoke {
    position: absolute;
    bottom: 158px;
    left: 50%;
    opacity: 0;
    transition: opacity 0.5s ease-out 0.3s;
  }
  .smoke.active {
    opacity: 1;
  }
  .smoke-puff {
    width: 4px;
    height: 20px;
    background: #aaa;
    border-radius: 50%;
    animation: smoke-rise 1s ease-out forwards;
  }
  @keyframes smoke-rise {
    from {
      transform: translateY(0) scale(1);
      opacity: 0.8;
    }
    to {
      transform: translateY(-30px) scale(0.5);
      opacity: 0;
    }
  }

  @keyframes flicker {
    0%,
    100% {
      transform: scaleY(1) skewX(0);
    }
    50% {
      transform: scaleY(1.05) skewX(5deg);
    }
  }

  /* --- CSS BALON & KONFETI --- */
  .balloons-container {
    position: absolute;
    inset: 0;
  }
  .balloon-wrapper {
    position: absolute;
    bottom: -150px;
    width: 80px;
    animation: float 20s infinite ease-in-out;
  }
  .balloon-svg {
    width: 100%;
    height: auto;
    filter: drop-shadow(0 8px 10px rgba(0, 0, 0, 0.3));
    opacity: 0.8;
  }
  .highlight {
    fill: rgba(255, 255, 255, 0.3);
  }
  /* Properti acak untuk setiap balon */
  .balloon-wrapper:nth-child(1) {
    left: 10%;
    animation-duration: 22s;
    animation-delay: -2s;
  }
  .balloon-wrapper:nth-child(2) {
    left: 25%;
    animation-duration: 18s;
    animation-delay: -5s;
  }
  .balloon-wrapper:nth-child(3) {
    left: 75%;
    animation-duration: 25s;
    animation-delay: -1s;
  }
  .balloon-wrapper:nth-child(4) {
    left: 60%;
    animation-duration: 17s;
    animation-delay: -6s;
  }
  .balloon-wrapper:nth-child(5) {
    left: 85%;
    animation-duration: 23s;
    animation-delay: 0s;
  }
  /* Warna berbeda untuk setiap balon */
  .balloon-wrapper:nth-child(3n) .balloon-path {
    fill: #ec4899;
  } /* Pink */
  .balloon-wrapper:nth-child(3n + 1) .balloon-path {
    fill: #a855f7;
  } /* Purple */
  .balloon-wrapper:nth-child(3n + 2) .balloon-path {
    fill: #22d3ee;
  } /* Cyan */

  @keyframes float {
    to {
      transform: translateY(-120vh) translateX(10vw) rotate(180deg);
    }
  }

  .confetti-container {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }
  .confetti {
    position: absolute;
    width: 8px;
    height: 16px;
    background: #facc15;
    top: -20px;
    animation: fall 2s ease-out forwards;
  }
  .confetti:nth-child(5n) {
    background: #ec4899;
  } /* pink-500 */
  .confetti:nth-child(3n) {
    background: #38bdf8;
  } /* lightBlue-400 */

  @keyframes fall {
    to {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }

  /* --- CSS BARU UNTUK TRANSISI TIRAI PENUTUP --- */
  .curtain-wrapper-close {
    position: absolute;
    inset: 0;
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 50; /* Pastikan di atas segalanya */
  }
  .curtain-column-close {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    animation: slide-in 2s cubic-bezier(0.86, 0, 0.07, 1) forwards;
  }
  .block-piece {
    flex-grow: 1;
  }
  .curtain-column-close:nth-child(even) {
    animation-name: slide-in-down;
  }

  @keyframes slide-in {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0%);
    }
  }
  @keyframes slide-in-down {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0%);
    }
  }
</style>
