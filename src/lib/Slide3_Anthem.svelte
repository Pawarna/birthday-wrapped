<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  // State untuk mengontrol alur animasi
  let showContent = false; // Memunculkan konten awal
  let showLeaderboard = false; // Memulai transisi ke leaderboard

  // --- DATA LAGU ---
  // Anda bisa mengganti data ini dengan lagu-lagu pilihan Anda
  const topSongs = [
    {
      id: 1,
      // URL embed compact (tinggi 152px)
      embedUrl:
        "https://open.spotify.com/embed/track/2MHgRSAYRmY2FA1GCjBkCR?utm_source=generator",
    },
    {
      id: 2,
      embedUrl:
        "https://open.spotify.com/embed/track/0QZLSImbxep9NyhhlCGOWh?utm_source=generator",
    },
    {
      id: 3,
      embedUrl:
        "https://open.spotify.com/embed/track/7gqdZpe7MlTLA59viClLoY?utm_source=generator",
    },
  ];

  onMount(() => {
    // Tampilkan konten awal setelah 0.5 detik
    setTimeout(() => {
      showContent = true;
    }, 500);

    // Tampilkan leaderboard setelah 4.5 detik
    setTimeout(() => {
      showLeaderboard = true;
    }, 4500);
  });
</script>

<section
  class="h-screen w-full flex flex-col justify-center items-center bg-black text-white p-4 md:p-8 relative overflow-hidden"
>
  <!-- BACKGROUND ANIMASI (tidak berubah) -->
  <div class="absolute inset-0 z-0 opacity-60">
    <div
      class="absolute top-0 -left-1/4 w-96 h-96 bg-rose-500 rounded-full filter blur-3xl animate-blob"
    ></div>
    <div
      class="absolute top-0 -right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-blob"
      style="animation-delay: 2s;"
    ></div>
    <div
      class="absolute -bottom-8 left-1/4 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl animate-blob"
      style="animation-delay: 4s;"
    ></div>
  </div>

  <!-- KONTEN UTAMA DENGAN ANIMASI -->
  {#if showContent}
    <!--
      PERUBAHAN: Kontainer utama diberi kelas dinamis
      untuk memicu animasi pergeseran ke atas.
    -->
    <div
      class="z-10 text-center w-full flex flex-col items-center transition-all duration-1000 ease-in-out"
      class:move-to-top={showLeaderboard}
    >
      <!-- Teks dengan animasi masuk dari atas -->
      <div in:fly={{ y: -30, duration: 1000, delay: 200 }}>
        <h2 class="text-4xl md:text-5xl font-bold mb-4">
          Lagu Kebangsaan Tahun Ini
        </h2>
        <!-- PERUBAHAN: Subtitle akan menghilang saat leaderboard muncul -->
        {#if !showLeaderboard}
          <p
            class="text-base md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
            transition:fly={{ y: 0, duration: 500 }}
          >
            Aku gatau kenapa kamu suka banget lagu-lagu ini, kamu lagi galau ya?
          </p>
        {/if}
      </div>

      <!--
        PERUBAHAN: Kontainer untuk daftar lagu, menggunakan #each
      -->
      <div class="w-full max-w-md mx-auto space-y-4">
        {#each topSongs as song, i}
          <!-- Lagu pertama akan selalu terlihat -->
          {#if i === 0}
            <div
              in:fly={{ y: 30, duration: 1000, delay: 500 }}
              class="leaderboard-item"
            >
              <span class="leaderboard-number">1</span>
              <div class="leaderboard-iframe-wrapper">
                <iframe
                  title="Spotify Embed Player {song.id}"
                  style="border-radius:12px"
                  src={song.embedUrl}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowfullscreen=""
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
            <!-- Lagu selanjutnya hanya muncul saat leaderboard aktif -->
          {:else if showLeaderboard}
            <div
              in:fly={{ y: 30, duration: 800, delay: 500 + i * 300 }}
              class="leaderboard-item"
            >
              <span class="leaderboard-number">{song.id}</span>
              <div class="leaderboard-iframe-wrapper">
                <iframe
                  title="Spotify Embed Player {song.id}"
                  style="border-radius:12px"
                  src={song.embedUrl}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowfullscreen=""
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          {/if}
        {/each}
      </div>
    </div>
  {/if}
</section>

<!-- CSS UNTUK ANIMASI BLOB (tidak berubah) -->
<style>
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }

  .animate-blob {
    animation: blob 7s infinite;
  }

  /* --- CSS BARU UNTUK LEADERBOARD --- */
  .move-to-top {
    /* Menggeser seluruh kontainer ke atas */
    transform: translateY(-15%);
  }

  .leaderboard-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
  }

  .leaderboard-number {
    font-size: 2rem;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.8);
  }

  .leaderboard-iframe-wrapper {
    flex-grow: 1; /* Memastikan iframe mengisi sisa ruang */
    border-radius: 12px;
    overflow: hidden;
    border: 2px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
</style>
