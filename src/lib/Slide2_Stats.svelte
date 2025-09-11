<script>
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { fly, fade } from "svelte/transition";

  // Menerima tanggal lahir dari App.svelte
  export let dateOfBirth = new Date(2000, 0, 1);

  // --- STATE BARU UNTUK ANIMASI BERLAPIS ---
  let statPhase = 0; // 0 = Usia, 1 = Absurd, 2 = Keluar
  let showAgeStats = false;
  let showAbsurdStats = false;

  // --- Stores untuk Statistik (tidak berubah) ---
  const easing = cubicOut;
  const duration = 2000;
  const years = tweened(0, { duration, easing });
  const months = tweened(0, { duration, easing });
  const days = tweened(0, { duration, easing });
  const hours = tweened(0, { duration, easing });
  const minutes = tweened(0, { duration, easing });
  const seconds = tweened(0, { duration, easing });
  const breaths = tweened(0, { duration, easing });
  const heartbeats = tweened(0, { duration, easing });
  const laughs = tweened(0, { duration, easing });
  const showers = tweened(0, { duration, easing });
  const songs = tweened(0, { duration, easing });
  const dreams = tweened(0, { duration, easing });

  onMount(() => {
    // Kalkulasi tetap sama
    const now = new Date();
    const diff = now.getTime() - dateOfBirth.getTime();
    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const totalYears = Math.floor(totalDays / 365.25);
    const totalMonths =
      totalYears * 12 + (now.getMonth() - dateOfBirth.getMonth());
    const totalBreaths = totalMinutes * 16;
    const totalHeartbeats = totalMinutes * 80;
    const totalLaughs = totalDays * 20;
    const totalShowers = Math.floor(totalDays * 1.5);
    const totalSongs = totalDays * 10;
    const totalDreams = totalDays * 2;

    // --- RANGKAIAN WAKTU ANIMASI BARU ---
    // Fase 1: Statistik Usia
    setTimeout(() => {
      showAgeStats = true; // Picu judul geser ke atas & statistik muncul
      // Mulai animasi angka
      years.set(totalYears);
      months.set(totalMonths);
      days.set(totalDays);
      hours.set(totalHours);
      minutes.set(totalMinutes);
      seconds.set(totalSeconds);
    }, 1500); // Tunggu 1.5 detik setelah slide muncul

    // Fase 2: Transisi ke Statistik Absurd
    setTimeout(() => {
      statPhase = 1; // Picu scene pertama keluar & scene kedua masuk
    }, 10500); // Durasi diperpanjang untuk memberi waktu animasi 1 per 1

    // Fase 3: Statistik Absurd
    setTimeout(() => {
      showAbsurdStats = true; // Picu judul kedua geser ke atas & statistik muncul
      // Mulai animasi angka absurd
      breaths.set(totalBreaths);
      heartbeats.set(totalHeartbeats);
      laughs.set(totalLaughs);
      showers.set(totalShowers);
      songs.set(totalSongs);
      dreams.set(totalDreams);
    }, 16000); // Disesuaikan dengan timing baru

    // --- FASE BARU: Transisi Keluar ---
    setTimeout(() => {
      statPhase = 2; // Picu animasi keluar untuk seluruh slide

      // PERUBAHAN: Semua angka dihitung mundur kembali ke nol
      const exitDuration = 1500;
      const exitEasing = cubicOut;
      years.set(0, { duration: exitDuration, easing: exitEasing });
      months.set(0, { duration: exitDuration, easing: exitEasing });
      days.set(0, { duration: exitDuration, easing: exitEasing });
      hours.set(0, { duration: exitDuration, easing: exitEasing });
      minutes.set(0, { duration: exitDuration, easing: exitEasing });
      seconds.set(0, { duration: exitDuration, easing: exitEasing });
      breaths.set(0, { duration: exitDuration, easing: exitEasing });
      heartbeats.set(0, { duration: exitDuration, easing: exitEasing });
      laughs.set(0, { duration: exitDuration, easing: exitEasing });
      showers.set(0, { duration: exitDuration, easing: exitEasing });
      songs.set(0, { duration: exitDuration, easing: exitEasing });
      dreams.set(0, { duration: exitDuration, easing: exitEasing });
    }, 24500); // Setelah statistik absurd ditampilkan selama beberapa detik
  });
</script>

<section class="relative h-screen w-full overflow-hidden bg-gray-900 p-8">
  <!-- Latar belakang (tidak berubah) -->
  <div class="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
    <!-- PERUBAHAN: Palet warna diganti menjadi lebih sejuk -->
    <div class="block bg-teal-400"></div>
    <div class="block bg-cyan-500"></div>
    <div class="block bg-sky-400"></div>
    <div class="block bg-teal-400"></div>
    <div class="block bg-cyan-500"></div>
  </div>

  <!-- PERBAIKAN: Pembungkus baru untuk mengontrol animasi keluar dari keseluruhan slide -->
  <div class="slide-content-wrapper" class:exit-fade={statPhase === 2}>
    <!-- Kontainer untuk setiap adegan agar bisa transisi masuk/keluar -->
    {#if statPhase === 0}
      <div
        class="scene"
        out:fly={{ x: "100vw", duration: 800, easing: cubicOut }}
      >
        <h1 class="title" class:move-up={showAgeStats}>
          Selama ini, kamu telah...
        </h1>
        {#if showAgeStats}
          <div class="stats-grid" in:fade={{ duration: 1000 }}>
            <div class="stat-item" style="animation-delay: 200ms">
              <span class="stat-number"
                >{Math.floor($years).toLocaleString("id-ID")}</span
              ><span class="stat-unit">tahun</span><span class="stat-text"
                >bersinar di dunia ini</span
              >
            </div>
            <div class="stat-item" style="animation-delay: 400ms">
              <span class="stat-number"
                >{Math.floor($months).toLocaleString("id-ID")}</span
              ><span class="stat-unit">bulan</span><span class="stat-text"
                >penuh tawa dan cerita</span
              >
            </div>
            <div class="stat-item" style="animation-delay: 600ms">
              <span class="stat-number"
                >{Math.floor($days).toLocaleString("id-ID")}</span
              ><span class="stat-unit">hari</span><span class="stat-text"
                >mewarnai hari-hari</span
              >
            </div>
            <div class="stat-item" style="animation-delay: 800ms">
              <span class="stat-number"
                >{Math.floor($hours).toLocaleString("id-ID")}</span
              ><span class="stat-unit">jam</span><span class="stat-text"
                >mengukir kenangan</span
              >
            </div>
            <div class="stat-item" style="animation-delay: 1000ms">
              <span class="stat-number"
                >{Math.floor($minutes).toLocaleString("id-ID")}</span
              ><span class="stat-unit">menit</span><span class="stat-text"
                >menginspirasi sekitar</span
              >
            </div>
            <div class="stat-item" style="animation-delay: 1200ms">
              <span class="stat-number"
                >{Math.floor($seconds).toLocaleString("id-ID")}</span
              ><span class="stat-unit">detik</span><span class="stat-text"
                >menjadi dirimu yang luar biasa</span
              >
            </div>
          </div>
        {/if}
      </div>
    {/if}

    <!-- 
      PERBAIKAN KUNCI DI SINI:
      Kondisi diubah dari `statPhase === 1` menjadi `statPhase >= 1`.
      Ini memastikan bahwa konten di dalamnya tetap ada di layar saat `statPhase` menjadi 2,
      sehingga kita bisa melihat animasi hitung mundurnya sebelum menghilang.
    -->
    {#if statPhase >= 1}
      <div
        class="scene"
        in:fly={{ x: "-100vw", duration: 800, easing: cubicOut }}
      >
        <h1 class="title" class:move-up={showAbsurdStats}>
          ...dan dalam perjalanan itu:
        </h1>
        {#if showAbsurdStats}
          <div class="stats-grid" in:fade={{ duration: 1000 }}>
            <div class="stat-item" style="animation-delay: 200ms">
              <span class="stat-number"
                >{Math.floor($breaths).toLocaleString("id-ID")}</span
              ><span class="stat-unit">kali</span><span class="stat-text"
                >kamu bernafas</span
              >
            </div>
            <div class="stat-item" style="animation-delay: 400ms">
              <span class="stat-number"
                >{Math.floor($heartbeats).toLocaleString("id-ID")}</span
              ><span class="stat-unit">detak</span><span class="stat-text"
                >jantungmu berdetak</span
              >
            </div>
            <div class="stat-item" style="animation-delay: 600ms">
              <span class="stat-number"
                >{Math.floor($laughs).toLocaleString("id-ID")}</span
              ><span class="stat-unit">kali</span><span class="stat-text"
                >kamu tertawa (semoga)</span
              >
            </div>
            <div class="stat-item" style="animation-delay: 800ms">
              <span class="stat-number"
                >{Math.floor($showers).toLocaleString("id-ID")}</span
              ><span class="stat-unit">kali</span><span class="stat-text"
                >kamu mandi keramas</span
              >
            </div>
            <div class="stat-item" style="animation-delay: 1000ms">
              <span class="stat-number"
                >{Math.floor($songs).toLocaleString("id-ID")}</span
              ><span class="stat-unit">lagu</span><span class="stat-text"
                >telah kamu dengarkan</span
              >
            </div>
            <div class="stat-item" style="animation-delay: 1200ms">
              <span class="stat-number"
                >{Math.floor($dreams).toLocaleString("id-ID")}</span
              ><span class="stat-unit">mimpi</span><span class="stat-text"
                >telah kamu jelajahi</span
              >
            </div>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</section>

<style>
  /* --- PERUBAHAN: CSS Transisi Keluar Diganti Menjadi Fade --- */
  .slide-content-wrapper {
    width: 100%;
    height: 100%;
  }
  .slide-content-wrapper.exit-fade {
    /* Animasi fade akan dimulai 0.5 detik setelah angka mulai menghitung mundur */
    animation: fade-out-slide 1.5s cubic-bezier(0.76, 0, 0.24, 1) forwards;
    animation-delay: 0.5s;
  }
  @keyframes fade-out-slide {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  /* --- CSS BARU UNTUK STRUKTUR ADEGAN --- */
  .scene {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }
  .title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* PERBAIKAN: Ukuran font disesuaikan dan dipaksa satu baris */
    font-size: clamp(1.5rem, 4vw, 2.25rem);
    white-space: nowrap;
    text-align: center;
    font-weight: 700;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    transition: top 1s cubic-bezier(0.76, 0, 0.24, 1);
  }
  .title.move-up {
    /* PERBAIKAN: Posisi judul setelah bergerak disesuaikan */
    top: 20%;
  }
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem 1rem;
    /* PERBAIKAN: Margin atas dikurangi agar lebih dekat dengan judul */
    margin-top: 2rem;
    width: 100%;
    max-width: 800px;
  }
  @media (min-width: 768px) {
    .stats-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 3rem 1rem;
      margin-top: 4rem;
    }
  }

  /* --- CSS BARU UNTUK ANIMASI ITEM STATISTIK --- */
  .stat-item {
    opacity: 0;
    transform: translateY(20px);
    animation: item-appear 1s forwards cubic-bezier(0.25, 1, 0.5, 1);
  }
  @keyframes item-appear {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Styling individual item (tidak berubah) */
  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .stat-number {
    font-size: clamp(1.75rem, 7vw, 3rem);
    font-weight: 900;
    line-height: 1;
    color: #fff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    word-break: break-all;
  }
  .stat-unit {
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.7);
    margin-top: 0.25rem;
  }
  .stat-text {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.9);
    margin-top: 0.5rem;
    max-width: 150px;
  }

  /* --- PERUBAHAN: CSS Latar Belakang Baru --- */
  .block {
    position: absolute;
    transition: background-color 2s ease-in-out;
    opacity: 0.6;
    filter: blur(48px); /* Blur diperhalus */
    /* Animasi diganti menjadi "pulse" */
    animation: pulse-block 10s ease-in-out infinite;
    border-radius: 50%; /* Dibuat bulat permanen */
  }
  /* Posisi dan durasi diatur ulang untuk efek "bernapas" */
  .block:nth-child(1) {
    width: 40vw;
    height: 40vw;
    top: 5%;
    left: 10%;
    animation-duration: 12s;
  }
  .block:nth-child(2) {
    width: 25vw;
    height: 25vw;
    top: 15%;
    left: 70%;
    animation-duration: 9s;
    animation-delay: -3s;
  }
  .block:nth-child(3) {
    width: 35vw;
    height: 35vw;
    top: 60%;
    left: 5%;
    animation-duration: 11s;
    animation-delay: -6s;
  }
  .block:nth-child(4) {
    width: 20vw;
    height: 20vw;
    top: 55%;
    left: 80%;
    animation-duration: 15s;
    animation-delay: -1s;
  }
  .block:nth-child(5) {
    width: 30vw;
    height: 30vw;
    top: 75%;
    left: 40%;
    animation-duration: 8s;
    animation-delay: -9s;
  }

  /* Keyframe baru untuk animasi "bernapas" */
  @keyframes pulse-block {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.7;
    }
  }
</style>
