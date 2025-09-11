<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";

  // --- STATE BARU UNTUK ANIMASI BERLAPIS ---
  let animationPhase = 0; // 0=awal, 1=pembukaan, 2=transisi ke judul, 3=leaderboard, 4=keluar

  // --- DATA TOP 3 ---
  // Menambahkan caption untuk item pertama
  const topMemories = [
    {
      id: 1,
      title: "Kucing",
      imageUrl: "https://pbs.twimg.com/media/Fw2zyXNaYAA8sy8.jpg",
      caption: "Gatau kenapa kalo liat kucing aku selalu keinget kamu",
    },
    {
      id: 2,
      title: "Botol Yakult",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/0/0e/Yakult_drink.jpg",
    },
    {
      id: 3,
      title: "Ubi Cilembu",
      imageUrl:
        "https://cdn.rri.co.id/berita/Pekanbaru/o/1749889734226-Ubi_Cilembu/nlq05nv8jx8xeop.jpeg",
    },
  ];

  // Mengambil item pertama untuk adegan pembukaan
  const featuredMemory = topMemories[0];

  onMount(() => {
    // Rangkaian waktu untuk animasi baru yang berlapis
    setTimeout(() => {
      animationPhase = 1; // Tampilkan adegan pembukaan (foto besar)
    }, 500);

    setTimeout(() => {
      animationPhase = 2; // Sembunyikan pembukaan, tampilkan judul di tengah
    }, 4500); // Setelah 4 detik

    setTimeout(() => {
      animationPhase = 3; // Geser judul ke atas, tampilkan leaderboard
    }, 6500); // Setelah 2 detik

    // --- FASE BARU: Transisi Keluar ---
    setTimeout(() => {
      animationPhase = 4; // Picu animasi keluar untuk seluruh slide
    }, 12500); // Setelah leaderboard ditampilkan selama beberapa detik
  });
</script>

<section
  class="relative h-screen w-full flex flex-col justify-center items-center bg-gray-900 text-white p-4 md:p-8 overflow-hidden"
>
  <!-- Latar belakang (tidak berubah) -->
  <div class="absolute inset-0 z-0 opacity-40">
    <div class="shape shape-1 bg-pink-400"></div>
    <div class="shape shape-2 bg-yellow-400"></div>
    <div class="shape shape-3 bg-cyan-400"></div>
  </div>

  <!-- PERBAIKAN: Pembungkus baru untuk mengontrol animasi keluar dari keseluruhan slide -->
  <div class="slide-content-wrapper" class:exit-up={animationPhase === 4}>
    <!-- Kontainer utama untuk semua konten yang terlihat -->
    <div
      class="z-10 w-full h-full flex flex-col items-center justify-center text-center relative"
    >
      <!-- FASE 1: Adegan Pembukaan dengan Foto Besar -->
      {#if animationPhase === 1}
        <div
          class="feature-wrapper"
          in:fly={{ y: 20, duration: 1000 }}
          out:fly={{ x: -100, duration: 800 }}
        >
          <div class="feature-image-wrapper">
            <img
              src={featuredMemory.imageUrl}
              alt={featuredMemory.title}
              class="w-full h-full object-cover"
            />
          </div>
          <p class="feature-caption">{featuredMemory.caption}</p>
        </div>
      {/if}

      <!-- FASE 2 & 3: Judul dan Leaderboard -->
      {#if animationPhase >= 2}
        <div
          class="title-wrapper"
          class:move-up={animationPhase === 3}
          in:fly={{ y: 0, duration: 1000 }}
        >
          <h2 class="text-3xl md:text-4xl font-bold">
            Top 3 Hal yang Bikin Aku Keinget Kamu
          </h2>
        </div>
      {/if}

      {#if animationPhase === 3}
        <div
          class="w-full max-w-md mx-auto space-y-6 leaderboard-container"
          in:fade={{ duration: 800, delay: 500 }}
        >
          {#each topMemories as item, i}
            <div
              in:fly={{ x: -30, duration: 800, delay: 600 + i * 1000 }}
              class="memory-item flex items-center gap-4 text-left"
            >
              <span class="memory-number">{item.id}</span>
              <div class="memory-image-wrapper">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  class="w-full h-full object-cover"
                />
              </div>
              <h3 class="memory-title">{item.title}</h3>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  /* --- CSS BARU UNTUK TRANSISI KELUAR --- */
  .slide-content-wrapper {
    width: 100%;
    height: 100%;
  }
  .slide-content-wrapper.exit-up {
    animation: slide-out-up 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
  }
  @keyframes slide-out-up {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-100%);
    }
  }

  /* --- CSS BARU UNTUK ADEGAN PEMBUKAAN --- */
  .feature-wrapper {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .feature-image-wrapper {
    width: 16rem; /* 256px */
    height: 16rem; /* 256px */
    border-radius: 0.75rem; /* rounded-xl */
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  }
  @media (min-width: 768px) {
    .feature-image-wrapper {
      width: 20rem; /* 320px */
      height: 20rem; /* 320px */
    }
  }
  .feature-caption {
    margin-top: 1.5rem;
    font-size: 1.125rem; /* text-lg */
    color: rgba(255, 255, 255, 0.8);
    max-width: 24rem;
  }

  /* --- CSS UNTUK ANIMASI JUDUL & LEADERBOARD --- */
  .title-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    transition: top 1.2s cubic-bezier(0.76, 0, 0.24, 1);
  }
  .title-wrapper.move-up {
    top: 15%;
  }

  .leaderboard-container {
    padding-top: 10rem;
  }
  @media (min-width: 768px) {
    .leaderboard-container {
      padding-top: 8rem;
    }
  }

  /* --- CSS UNTUK ITEM LEADERBOARD BARU --- */
  .memory-number {
    font-size: 3rem;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.8);
    width: 3rem;
    text-align: center;
    flex-shrink: 0;
  }

  .memory-image-wrapper {
    width: 10rem;
    height: 10rem;
    border-radius: 0.5rem;
    overflow: hidden;
    flex-shrink: 0;
  }

  .memory-title {
    flex-grow: 1;
    font-size: 1.25rem;
    font-weight: 700;
  }

  /* --- CSS LATAR BELAKANG (tidak berubah) --- */
  .shape {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    animation: float 15s infinite ease-in-out;
  }
  .shape-1 {
    width: 250px;
    height: 250px;
    top: 10%;
    left: 10%;
  }
  .shape-2 {
    width: 200px;
    height: 200px;
    top: 60%;
    right: 10%;
    animation-delay: 3s;
  }
  .shape-3 {
    width: 150px;
    height: 150px;
    bottom: 5%;
    left: 40%;
    animation-delay: 6s;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0) translateX(0);
    }
    50% {
      transform: translateY(-30px) translateX(20px);
    }
  }
</style>
