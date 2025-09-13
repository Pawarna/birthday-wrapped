<script>
  // @ts-nocheck
  import { onMount } from "svelte";

  // --- STATE UNTUK ANIMASI BERLAPIS ---
  let animationPhase = 0; // 0=awal, 1=judul, 2..6=kartu aktif, 7=semua kartu selesai, 8=keluar

  // --- DATA TOP 5 ---
  const top5Things = [
    { id: 5, text: "I like Your Hands", imageUrl: "/img/nobg/1.png" },
    { id: 4, text: "I like Your Lips", imageUrl: "/img/89.webp" },
    { id: 3, text: "I like Your Smile", imageUrl: "/img/nobg/4.png" },
    { id: 2, text: "I Like Your Eyes", imageUrl: "/img/nobg/3.png" },
    { id: 1, text: "YOU", imageUrl: "/img/nobg/5.png" },
  ];

  onMount(() => {
    const timeouts = [];
    const initialDelay = 2000; // Waktu sebelum kartu pertama muncul
    const cardDuration = 2500; // Waktu setiap kartu berada di tengah

    timeouts.push(
      setTimeout(() => {
        animationPhase = 1;
      }, 500)
    ); // Judul muncul

    // Memunculkan setiap kartu secara berurutan
    for (let i = 0; i < top5Things.length; i++) {
      timeouts.push(
        setTimeout(
          () => {
            animationPhase = i + 2; // Fase 2, 3, 4, 5, 6
          },
          initialDelay + i * cardDuration
        )
      );
    }

    // --- PERBAIKAN LOGIKA WAKTU ---

    // 1. Tentukan waktu kapan kartu terakhir SELESAI berada di tengah
    const lastCardEndTime = initialDelay + top5Things.length * cardDuration;

    // 2. Pindahkan kartu terakhir ke posisinya TEPAT pada waktu tersebut
    timeouts.push(
      setTimeout(() => {
        // Fase ini akan membuat kartu terakhir mendapat kelas 'finished'
        animationPhase = top5Things.length + 2; // Fase 7
      }, lastCardEndTime)
    );

    // 3. Beri jeda untuk menikmati semua kartu, LALU mulai transisi keluar
    const finalViewDuration = 4000; // 4 detik untuk melihat semua kartu
    timeouts.push(
      setTimeout(() => {
        animationPhase = top5Things.length + 3; // Fase 8 (keluar)
      }, lastCardEndTime + finalViewDuration)
    );

    return () => timeouts.forEach(clearTimeout);
  });
</script>

<section
  class="relative h-screen w-full flex flex-col justify-center items-center bg-gray-900 text-white p-4 md:p-8 overflow-hidden"
>
  <!-- Latar belakang Aurora -->
  <div class="aurora-container" aria-hidden="true">
    <div class="aurora-blob bg-pink-400"></div>
    <div class="aurora-blob bg-purple-400"></div>
    <div class="aurora-blob bg-cyan-300"></div>
  </div>

  <!-- Wrapper untuk mengontrol transisi keluar -->
  <div
    class="z-10 w-full h-full flex flex-col items-center justify-center text-center"
    class:exit-fade={animationPhase === top5Things.length + 3}
  >
    {#if animationPhase >= 1}
      <div class="title-wrapper">
        <h2 class="text-3xl md:text-4xl font-bold">
          Top 5 Things I Like About You
        </h2>
      </div>
    {/if}

    <!-- Kontainer untuk Barisan Kartu -->
    <div class="card-row-container">
      {#each top5Things as item, i}
        <div
          class="card"
          class:active={animationPhase === i + 2}
          class:finished={animationPhase > i + 2}
          style="--index: {i};"
        >
          <!-- Gambar sebagai latar belakang kartu -->
          <img
            src={item.imageUrl}
            alt={item.text}
            class="card-background-image"
          />
          <!-- Lapisan gelap untuk keterbacaan teks -->
          <div class="card-overlay"></div>

          <!-- Konten kartu sekarang ada di dalam wrapper -->
          <div class="card-content">
            <span class="card-number">{item.id}</span>
            <p class="card-text">{item.text}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  /* --- CSS BARU UNTUK LATAR BELAKANG AURORA --- */
  .aurora-container {
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: 0;
  }
  .aurora-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px); /* Blur yang sangat lembut */
    opacity: 0.4;
    animation: dance 25s infinite alternate;
  }
  .aurora-blob:nth-child(1) {
    width: 50vw;
    height: 50vw;
    top: -15%;
    left: -10%;
    animation-duration: 20s;
  }
  .aurora-blob:nth-child(2) {
    width: 60vw;
    height: 60vw;
    bottom: -25%;
    right: -15%;
    animation-duration: 25s;
    animation-delay: -5s;
  }
  .aurora-blob:nth-child(3) {
    width: 45vw;
    height: 45vw;
    top: 10%;
    right: 15%;
    animation-duration: 30s;
    animation-delay: -10s;
  }

  @keyframes dance {
    from {
      transform: translateY(-20px) translateX(30px) rotate(0deg) scale(1);
    }
    to {
      transform: translateY(40px) translateX(-50px) rotate(120deg) scale(1.3);
    }
  }

  /* --- CSS ANIMASI JUDUL --- */
  .title-wrapper {
    position: absolute;
    top: 15%;
    width: 90%;
    opacity: 0;
    animation: fade-in-title 1s forwards;
    animation-delay: 0.5s;
  }
  @keyframes fade-in-title {
    to {
      opacity: 1;
    }
  }

  /* --- CSS BARU UNTUK BARISAN KARTU --- */
  .card-row-container {
    position: relative;
    width: 100%;
    height: 400px;
    margin-top: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* --- PERUBAHAN BESAR: CSS UNTUK KARTU DENGAN LATAR BELAKANG FOTO --- */
  .card {
    position: absolute;
    width: 150px;
    height: 200px;
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition:
      transform 1.2s cubic-bezier(0.22, 1, 0.36, 1),
      opacity 1.2s;
    opacity: 0;
    transform: translateY(100px) scale(0.8);
    overflow: hidden; /* Penting untuk menjaga gambar di dalam kartu */
  }

  .card-background-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* Memastikan gambar memenuhi kartu */
    z-index: 0;
  }

  .card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    z-index: 1;
  }

  .card-content {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end; /* Mendorong teks ke bawah */
    align-items: center;
    padding: 1rem;
  }

  /* Saat kartu aktif, ia akan muncul di tengah dan membesar */
  .card.active {
    opacity: 1;
    transform: translateY(0) scale(1.1);
    z-index: 10;
  }

  /* Setelah aktif, kartu akan bergeser ke posisinya di barisan */
  .card.finished {
    opacity: 1;
    transform: translateX(calc((var(--index) - 2) * 110%)) scale(1);
    z-index: 5;
  }

  .card-number {
    font-size: 1.5rem;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 0.75rem;
    left: 1rem;
  }
  .card-text {
    font-size: 1.25rem;
    font-weight: 700;
    color: #fff;
    text-align: center;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5); /* Menambah bayangan agar lebih terbaca */
  }

  /* --- Media Query untuk Mobile --- */
  @media (max-width: 767px) {
    .title-wrapper {
      top: 10%;
    }
    .card-row-container {
      margin-top: 2rem;
      height: 500px;
    }
    .card {
      width: 130px;
      height: 180px;
    }
    .card-text {
      font-size: 1.1rem;
    }

    .card.finished {
      transform: scale(1);
    }
    .card.finished[style*="--index: 0;"] {
      transform: translate(-60%, -85%);
    }
    .card.finished[style*="--index: 1;"] {
      transform: translate(60%, -85%);
    }
    .card.finished[style*="--index: 2;"] {
      transform: translate(-60%, 50%);
    }
    .card.finished[style*="--index: 3;"] {
      transform: translate(60%, 50%);
    }
    .card.finished[style*="--index: 4;"] {
      transform: translate(0, 185%);
    }
  }

  @media (min-width: 768px) {
    .card {
      width: 180px;
      height: 240px;
    }
    .card-text {
      font-size: 1.5rem;
    }
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
