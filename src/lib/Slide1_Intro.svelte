<script>
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";

  export let name = "Guest";

  // --- STATE UNTUK ALUR ANIMASI BERLAPIS ---
  let showBlockCurtain = true; // Fase 1: Tirai ditampilkan
  let showTextIntro = false; // Fase 2: Animasi teks "Hi there!"
  let isIntroFinished = false; // Fase 3: Konten utama ditampilkan

  // Teks yang akan muncul setelah semua intro selesai
  $: textSequence = [
    {
      title: "Your 2025 Birthday Wrapped",
      subtitle: "Dibuat khusus untuk kamu",
    },
    {
      title: `Selamat Ulang Tahun, ${name}`,
      subtitle:
        "Tahun ini kita memang belum bersama, tapi akan selalu ada momen yang nggak ada duanya.",
    },
    {
      title: "Jadi…",
      subtitle: "ini rangkuman versi spesial buat kamu ❤️",
    },
  ];

  const colorPalettes = [
    ["bg-pink-500", "bg-purple-500", "bg-blue-500"],
    ["bg-yellow-400", "bg-orange-500", "bg-red-500"],
    ["bg-teal-400", "bg-cyan-500", "bg-green-400"],
  ];

  let currentTextIndex = 0;
  let isTransitioning = false;
  $: currentPalette = colorPalettes[currentTextIndex % colorPalettes.length];

  // Variabel untuk mengontrol fase animasi teks "Hi there!"
  let introPhase = 0;

  onMount(() => {
    // Rangkaian waktu yang DIPERBAIKI dan DIPERLAMBAT untuk menghindari tumpang tindih
    setTimeout(() => {
      showBlockCurtain = false;
    }, 3000); // Tirai mulai menghilang
    setTimeout(() => {
      showTextIntro = true;
    }, 4000); // Teks Intro mulai disiapkan

    // Timer di dalam fase teks intro
    setTimeout(() => {
      if (showTextIntro) introPhase = 1;
    }, 4500); // "Hi there!" masuk (selesai ~6000ms)
    setTimeout(() => {
      if (showTextIntro) introPhase = 2;
    }, 8000); // "Hi there!" keluar (selesai ~9500ms)
    setTimeout(() => {
      if (showTextIntro) introPhase = 3;
    }, 9500); // "Wrapped Time!" masuk (selesai ~10500ms)
    setTimeout(() => {
      if (showTextIntro) introPhase = 4;
    }, 12000); // "Wrapped Time!" keluar (selesai ~13000ms)
    setTimeout(() => {
      isIntroFinished = true;
    }, 13000); // Semua intro selesai

    // Interval untuk konten utama
    const textInterval = setInterval(() => {
      if (isIntroFinished) {
        currentTextIndex = (currentTextIndex + 1) % textSequence.length;
      }
    }, 6000);

    return () => clearInterval(textInterval);
  });
</script>

<section class="relative h-screen w-full overflow-hidden bg-black">
  {#if showBlockCurtain}
    <!-- FASE 1: ANIMASI TIRAI BALOK -->
    <div
      class="curtain-wrapper"
      transition:fade={{ duration: 500, delay: 2800 }}
    >
      {#each Array(10) as _, i}
        <div class="curtain-column">
          <div class="block-piece {colorPalettes[0][0]}"></div>
          <div class="block-piece {colorPalettes[0][1]}"></div>
          <div class="block-piece {colorPalettes[0][2]}"></div>
          <div class="block-piece {colorPalettes[0][0]}"></div>
        </div>
      {/each}
    </div>
  {:else}
    <!-- FASE 2 & 3: KONTEN SETELAH TIRAI TERBUKA -->
    <div class="main-content h-full w-full">
      <!-- Latar Belakang Blok Bergerak (sekarang aktif untuk semua fase setelah tirai) -->
      <div
        class="absolute inset-0 z-0 overflow-hidden"
        class:transitioning={isTransitioning}
        aria-hidden="true"
      >
        <div class="block {currentPalette[0]}"></div>
        <div class="block {currentPalette[1]}"></div>
        <div class="block {currentPalette[2]}"></div>
        <div class="block {currentPalette[0]}"></div>
        <div class="block {currentPalette[1]}"></div>
      </div>

      {#if !isIntroFinished}
        <!-- FASE 2: ANIMASI TEKS "HI THERE!" -->
        <!-- PERBAIKAN: Kontainer ini sekarang juga memiliki kelas animasi keluar -->
        <div class="intro-container" class:fade-out={introPhase === 4}>
          <div class="text-group" class:exit-left={introPhase === 2}>
            <h1 class="text-hi" class:enter-right={introPhase === 1}>
              Hi there!
            </h1>
          </div>
          <h2 class="text-wrapped" class:fade-in={introPhase === 3}>
            Wrapped Time!
          </h2>
        </div>
      {:else}
        <!-- FASE 3: KONTEN UTAMA -->
        <!-- PERBAIKAN: Transisi masuk diberi delay agar menunggu intro selesai -->
        <div
          class="relative z-10 flex h-full w-full flex-col items-center justify-center p-8 text-center text-white"
          in:fade={{ duration: 1000, delay: 200 }}
        >
          {#key currentTextIndex}
            {@const current = textSequence[currentTextIndex]}
            <div
              on:outrostart={() => (isTransitioning = true)}
              on:introend={() => (isTransitioning = false)}
            >
              <h1
                class="text-5xl font-black tracking-tight drop-shadow-lg md:text-7xl"
                in:fly={{ y: -40, duration: 1200, delay: 200 }}
                out:fly={{ y: -40, duration: 600 }}
              >
                {current.title}
              </h1>
              {#if current.subtitle}
                <p
                  class="mt-4 max-w-2xl text-xl font-medium text-gray-200 drop-shadow-md md:text-2xl mx-auto"
                  in:fly={{ y: 40, duration: 1200, delay: 400 }}
                  out:fly={{ y: 40, duration: 600 }}
                >
                  {current.subtitle}
                </p>
              {/if}
            </div>
          {/key}
        </div>
      {/if}
    </div>
  {/if}
</section>

<style>
  /* --- CSS UNTUK TIRAI BALOK --- */
  .curtain-wrapper {
    position: absolute;
    inset: 0;
    display: flex;
    width: 100%;
    height: 100%;
  }
  .curtain-column {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    animation: slide-away 2s cubic-bezier(0.86, 0, 0.07, 1) forwards;
    animation-delay: 2s;
  }
  .block-piece {
    flex-grow: 1;
    transition: background-color 0.5s;
  }
  .curtain-column:nth-child(even) {
    animation-name: slide-away-down;
  }
  @keyframes slide-away {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-100%);
    }
  }
  @keyframes slide-away-down {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  }

  /* --- CSS UNTUK INTRO TEKS --- */
  .intro-container {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
    font-weight: 800;
    z-index: 10;
    color: white;
  }
  .text-group {
    position: absolute;
    text-align: center;
  }
  .text-hi {
    font-size: clamp(3rem, 10vw, 6rem);
    opacity: 0;
  }
  .text-wrapped {
    font-size: clamp(3rem, 10vw, 6rem);
    opacity: 0;
  }
  .enter-right {
    animation: slideInFromRight 1.5s forwards cubic-bezier(0.2, 1, 0.3, 1);
  }
  .exit-left {
    animation: slideOutToLeft 1.5s forwards cubic-bezier(0.7, 0, 0.8, 0);
  }
  .fade-in {
    animation: fadeIn 1s forwards ease-in-out;
  }
  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOutToLeft {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(-100%);
      opacity: 0;
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* --- CSS BARU UNTUK KELUAR INTRO --- */
  .fade-out {
    animation: fadeOut 1s forwards;
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  /* --- CSS UNTUK BLOK BERGERAK --- */
  .block {
    position: absolute;
    transition:
      background-color 2s ease-in-out,
      border-radius 1.5s ease-in-out,
      filter 1.5s ease-in-out,
      opacity 1.5s ease-in-out;
    opacity: 0.5;
    filter: blur(32px);
    animation: move-block 20s linear infinite;
    border-radius: 20%;
  }
  .block:nth-child(1) {
    width: 30vw;
    height: 30vw;
    top: -10%;
    left: 5%;
    animation-duration: 25s;
  }
  .block:nth-child(2) {
    width: 20vw;
    height: 20vw;
    top: 15%;
    left: 60%;
    animation-duration: 18s;
    animation-delay: -5s;
  }
  .block:nth-child(3) {
    width: 40vw;
    height: 40vw;
    top: 70%;
    left: 10%;
    animation-duration: 22s;
    animation-delay: -10s;
  }
  .block:nth-child(4) {
    width: 25vw;
    height: 25vw;
    top: 50%;
    left: 80%;
    animation-duration: 30s;
    animation-delay: -2s;
  }
  .block:nth-child(5) {
    width: 15vw;
    height: 15vw;
    top: 85%;
    left: 40%;
    animation-duration: 15s;
    animation-delay: -15s;
  }
  @keyframes move-block {
    from {
      transform: translateX(-150%) rotate(0) scale(0.8);
    }
    to {
      transform: translateX(150vw) rotate(360deg) scale(1.2);
    }
  }
  .transitioning .block {
    border-radius: 50%;
    filter: blur(48px);
    opacity: 0.75;
  }
</style>
