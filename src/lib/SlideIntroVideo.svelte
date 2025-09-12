<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  const textSequence = [
    {
      title: "Wow",
      subtitle: "Kamu sampai di sini juga ya?",
    },
    {
      title: "Btw, aku ada sesuatu buat kamu...",
      subtitle: "...hope you like it!",
    },
    {
      title: "Satu Pesan Spesial...",
      subtitle: "...langsung buat kamu.",
    },
  ];

  // --- STATE BARU UNTUK ALUR ANIMASI ---
  let currentSequenceIndex = 0;
  let showSubtitle = false;
  let isTextFinished = false; // State baru untuk memicu animasi foto terakhir

  const backgroundPhotos = [
    { src: "/img/nobg/1.png" },
    { src: "/img/nobg/2.png" },
    { src: "/img/nobg/3.png" },
    { src: "/img/nobg/4.png" },
  ];

  onMount(() => {
    // --- RANGKAIAN WAKTU ANIMASI BARU DENGAN setTimeout ---
    const timeouts = [];

    // Fungsi untuk menjalankan sekuens
    function runSequence(index) {
      currentSequenceIndex = index;
      showSubtitle = false;

      timeouts.push(
        setTimeout(() => {
          showSubtitle = true;
        }, 2000)
      );

      // Jika ini bukan sekuens terakhir, jadwalkan yang berikutnya
      if (index < textSequence.length - 1) {
        timeouts.push(
          setTimeout(() => {
            runSequence(index + 1);
          }, 5000)
        );
      } else {
        // Jika ini sekuens terakhir, jadwalkan animasi foto
        timeouts.push(
          setTimeout(() => {
            isTextFinished = true;
          }, 5000)
        ); // Tunggu 5 detik setelah teks terakhir muncul
      }
    }

    // Mulai sekuens pertama
    runSequence(0);

    // Fungsi pembersihan
    return () => timeouts.forEach(clearTimeout);
  });
</script>

<section
  class="relative h-screen w-full flex flex-col justify-center items-center text-white p-4 md:p-8 overflow-hidden bg-black"
>
  <!-- Latar Belakang Aurora -->
  <div class="aurora-container" aria-hidden="true">
    <div class="aurora-blob bg-purple-600"></div>
    <div class="aurora-blob bg-pink-500"></div>
    <div class="aurora-blob bg-cyan-400"></div>
  </div>

  <!-- Kontainer animasi foto "wayang" -->
  <div class="photo-background-container" aria-hidden="true">
    {#each backgroundPhotos as photo, i}
      <div
        class="photo-wrapper"
        class:center-stage={isTextFinished}
        style="--delay: {i * 2}s; --duration: {15 + i * 2}s;"
      >
        <!-- 
          PERUBAHAN: Menambahkan div baru di dalam untuk menangani animasi "sway"
          secara terpisah dari pergerakan posisi.
        -->
        <div
          class="sway-container"
          style="--duration: {15 + i * 2}s; --delay: {i * 2}s;"
        >
          <img src={photo.src} alt="Kenangan" class="floating-photo" />
        </div>
      </div>
    {/each}
  </div>

  <div
    class="z-10 text-center flex flex-col items-center justify-center transition-opacity duration-1000"
    class:opacity-0={isTextFinished}
  >
    {#key currentSequenceIndex}
      {@const current = textSequence[currentSequenceIndex]}
      <div
        class="text-wrapper"
        in:fly={{ x: "100vw", duration: 1200 }}
        out:fly={{ x: "-100vw", duration: 800 }}
      >
        <div class="title-container" class:shifted-up={showSubtitle}>
          <h2 class="text-3xl md:text-5xl font-bold text-gray-200">
            {current.title}
          </h2>
        </div>

        {#if showSubtitle}
          <div class="subtitle-container">
            <p
              class="text-xl md:text-2xl mt-4 text-gray-400"
              in:fly={{ y: -20, duration: 1000, delay: 300 }}
            >
              {current.subtitle}
            </p>
          </div>
        {/if}
      </div>
    {/key}
  </div>
</section>

<style>
  /* --- CSS ANIMASI JUDUL & SUBJUDUL --- */
  .title-container {
    transition: transform 1.2s cubic-bezier(0.76, 0, 0.24, 1);
    transform: translateY(0);
  }
  .title-container.shifted-up {
    transform: translateY(-2rem);
  }
  .subtitle-container {
    transform: translateY(-2rem);
  }

  /* --- CSS LATAR BELAKANG AURORA --- */
  .aurora-container {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    opacity: 0.5;
  }
  .aurora-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    animation: aurora-move 25s infinite alternate;
  }
  .aurora-blob:nth-child(1) {
    width: 40vw;
    height: 40vw;
    top: -10%;
    left: -5%;
    animation-duration: 20s;
  }
  .aurora-blob:nth-child(2) {
    width: 50vw;
    height: 50vw;
    bottom: -20%;
    right: -10%;
    animation-duration: 25s;
    animation-delay: -5s;
  }
  .aurora-blob:nth-child(3) {
    width: 35vw;
    height: 35vw;
    top: 20%;
    right: 20%;
    animation-duration: 30s;
    animation-delay: -10s;
  }
  @keyframes aurora-move {
    from {
      transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
    }
    to {
      transform: translateY(100px) translateX(-50px) rotate(90deg) scale(1.2);
    }
  }

  /* --- CSS ANIMASI FOTO "WAYANG" --- */
  .photo-background-container {
    position: absolute;
    inset: 0;
    z-index: 1;
  }
  .photo-wrapper {
    position: absolute;
    bottom: -35%;
    width: 120px;
    height: 160px;
    opacity: 0;
    /* PERUBAHAN: Hanya animasi float-up di sini */
    animation: float-up 2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
    animation-delay: var(--delay, 0s);
    transition: all 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }

  @media (min-width: 768px) {
    .photo-wrapper {
      width: 180px;
      height: 240px;
    }
  }

  .photo-wrapper:nth-child(1) {
    left: 5%;
  }
  .photo-wrapper:nth-child(2) {
    right: 5%;
    animation-delay: calc(var(--delay, 0s) + 1s);
  }
  .photo-wrapper:nth-child(3) {
    left: 20%;
    animation-delay: calc(var(--delay, 0s) + 2s);
  }
  .photo-wrapper:nth-child(4) {
    right: 20%;
    animation-delay: calc(var(--delay, 0s) + 3s);
  }

  .floating-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.75rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    border: 2px solid rgba(255, 255, 255, 0.1);
  }

  @keyframes float-up {
    to {
      bottom: -1%;
      opacity: 0.7;
    }
  }

  /* --- CSS BARU UNTUK WADAH ANIMASI SWAY --- */
  .sway-container {
    width: 100%;
    height: 100%;
    /* Animasi sway sekarang di sini, dimulai setelah float-up selesai */
    animation: sway var(--duration, 15s) ease-in-out infinite;
    animation-delay: calc(var(--delay, 0s) + 2s);
  }

  @keyframes sway {
    0%,
    100% {
      transform: translateY(0) rotate(-4deg);
    }
    50% {
      transform: translateY(-25px) rotate(4deg);
    }
  }

  /* PERBAIKAN: CSS UNTUK ANIMASI FOTO KE TENGAH VERTIKAL */
  .photo-wrapper.center-stage {
    bottom: 50%;
    opacity: 1;
    transform: translateY(-80%);
  }
</style>
