<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { fly, fade } from "svelte/transition";

  // --- STATE BARU UNTUK ANIMASI BERLAPIS ---
  let animationPhase = 0; // 0=awal, 1=count-up, 2=sub1, 3=kata utama, 4=sub2, 5=leaderboard, 6=keluar

  // --- DATA STATISTIK ---
  const initialCount = 103293302230047;
  const mainWord = "K*NTOL";
  const mainWordCountTarget = 187700;
  // Data baru untuk Top 5
  const topWords = [
    { id: 1, text: "Kontol" },
    { id: 2, text: "Ga" },
    { id: 3, text: "Jir" },
    { id: 4, text: "Yaudah gausah chat aku lagi" },
    { id: 5, text: "wkwkwk" },
  ];

  // --- Stores untuk animasi angka ---
  const yappingCount = tweened(0, { duration: 3000, easing: cubicOut });
  const mainWordCount = tweened(0, { duration: 2500, easing: cubicOut });

  onMount(() => {
    // --- RANGKAIAN WAKTU ANIMASI ---
    setTimeout(() => {
      animationPhase = 1;
      yappingCount.set(initialCount);
    }, 500);
    setTimeout(() => {
      animationPhase = 2;
    }, 4500);
    setTimeout(() => {
      animationPhase = 3;
      mainWordCount.set(mainWordCountTarget);
    }, 7500);
    setTimeout(() => {
      animationPhase = 4;
    }, 11000);
    // Fase transisi ke leaderboard (menyembunyikan yang lama)
    setTimeout(() => {
      animationPhase = 5;
    }, 15000);
    // Fase keluar terakhir
    setTimeout(() => {
      animationPhase = 6;
    }, 26000);
  });

  // Data foto untuk latar belakang
  const photos = [
    {
      src: "https://i.pinimg.com/1200x/77/b7/d9/77b7d9b8c4f0a7aed3b9bb4c732bed2d.jpg",
      delay: 100,
    },
    {
      src: "https://i.pinimg.com/474x/20/b7/46/20b7464a25c71d89e9c09251ad74f6d0.jpg",
      delay: 200,
    },
    {
      src: "https://i.pinimg.com/736x/ec/31/75/ec3175e3a449367489e9c59e186c0a97.jpg",
      delay: 150,
    },
    {
      src: "https://media.tenor.com/n1D_257ONacAAAAM/yap-yapping.gif",
      delay: 250,
    },
  ];
</script>

<section
  class="relative h-screen w-full flex flex-col justify-center items-center bg-gray-900 text-white p-4 md:p-8 overflow-hidden text-center"
>
  <!-- Latar Belakang Kolase Foto Baru -->
  <div
    class="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2 opacity-20 blur-[3px]"
  >
    {#each photos as photo}
      <div class="overflow-hidden">
        <img
          src={photo.src}
          alt="Kenangan Yapping"
          class="photo-tile"
          style="animation-delay: {photo.delay}ms;"
        />
      </div>
    {/each}
  </div>
  <div class="absolute inset-0 bg-black/70"></div>

  <!-- Wrapper untuk mengontrol transisi keluar -->
  <div class="z-10 w-full h-full" class:exit-fade={animationPhase === 6}>
    <!-- FASE 1 & 2: Statistik Awal -->
    {#if animationPhase >= 1 && animationPhase < 3}
      <div
        class="absolute-center w-full"
        class:move-up-sm={animationPhase >= 2}
        out:fade={{ duration: 500 }}
      >
        <div in:fly={{ y: -30, duration: 1000 }}>
          <h2 class="text-2xl md:text-3xl font-bold text-gray-300">
            Statistik Yapping Tahun Ini
          </h2>
          <p
            class="text-5xl md:text-8xl font-black my-4 text-cyan-300 drop-shadow-lg"
          >
            {Math.floor($yappingCount).toLocaleString("id-ID")}
          </p>
          <span
            class="text-2xl md:text-4xl font-bold tracking-widest uppercase text-gray-300"
            >Kata</span
          >
        </div>
      </div>
    {/if}

    <!-- FASE 2: Subtitle 1 -->
    {#if animationPhase === 2}
      <div
        class="absolute-center w-full text-center"
        in:fly={{ y: 50, duration: 1000, delay: 500 }}
        out:fade={{ duration: 500 }}
      >
        <p class="subtitle-text mx-auto">
          tapi kata yang lagi, lagi, dan lagi kamu ucapkan adalah...
        </p>
      </div>
    {/if}

    <!-- FASE 3 & 4: Kata Utama -->
    {#if animationPhase >= 3 && animationPhase < 5}
      <div
        class="absolute-center w-full"
        class:move-up-lg={animationPhase >= 4}
        out:fade={{ duration: 500, delay: 200 }}
      >
        <div in:fade={{ duration: 1000 }}>
          <h1 class="main-word-text">{mainWord}</h1>
        </div>
      </div>
    {/if}

    <!-- FASE 4: Subtitle 2 -->
    {#if animationPhase === 4}
      <div
        class="absolute-center w-full text-center"
        style="top: 55%;"
        in:fly={{ y: 50, duration: 1000, delay: 500 }}
        out:fade={{ duration: 500 }}
      >
        <p class="subtitle-text mx-auto">
          kamu mengatakannya <span class="font-bold text-cyan-300"
            >{Math.floor($mainWordCount).toLocaleString("id-ID")}</span
          > kali
        </p>
      </div>
    {/if}

    <!-- FASE 5: Leaderboard Kata-Kata Manis -->
    {#if animationPhase === 5}
      <!-- 
        PERBAIKAN: Judul dan leaderboard digabung dalam satu wadah flexbox
        untuk memastikan layout yang benar dan tidak tumpang tindih.
      -->
      <div class="leaderboard-wrapper" in:fade={{ duration: 1200, delay: 500 }}>
        <h2 class="text-3xl md:text-4xl font-bold mb-8">
          Top 5 Kata-Kata Yapping Mu
        </h2>
        <div class="w-full max-w-md space-y-4">
          {#each topWords as word, i}
            <div
              class="leaderboard-item"
              in:fly={{ x: -30, duration: 800, delay: 500 + i * 400 }}
            >
              <span class="leaderboard-number">{word.id}</span>
              <span class="leaderboard-text">{word.text}</span>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  /* --- CSS LATAR BELAKANG FOTO --- */
  @keyframes photo-reveal {
    from {
      transform: scale(1.2);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
  .photo-tile {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    animation: photo-reveal 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  /* --- CSS ALUR ANIMASI --- */
  .absolute-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: transform 1.2s cubic-bezier(0.76, 0, 0.24, 1);
  }
  .move-up-sm {
    transform: translate(-50%, -120%);
  }
  .move-up-lg {
    transform: translate(-50%, -80%);
  }
  .subtitle-text {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.8);
    max-width: 90%;
  }
  .main-word-text {
    font-size: clamp(4rem, 15vw, 10rem);
    font-weight: 900;
    color: #fff;
    text-shadow: 0 0 20px rgba(100, 255, 255, 0.5);
  }

  /* --- CSS BARU UNTUK LEADERBOARD KATA-KATA --- */
  .leaderboard-wrapper {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }
  .leaderboard-item {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  .leaderboard-number {
    font-size: 2rem;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.5);
  }
  .leaderboard-text {
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
  }

  /* --- CSS TRANSISI KELUAR --- */
  .exit-fade {
    animation: fade-out-slide 1s forwards;
  }
  @keyframes fade-out-slide {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
</style>
