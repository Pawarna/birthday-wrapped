<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  // --- DATA TEKS ---
  // Anda bisa mengubah kata-kata di sini sesuai keinginan
  const lines = [
    { text: "Untuk 365 hari ke depan," },
    { text: "aku berharap kamu menemukan..." },
    { text: "...lebih banyak tawa," },
    { text: "...cerita baru," },
    { text: "...pokoknya bahagiaa teruss," },
  ];

  // --- STATE ANIMASI ---
  let activeLineIndex = -1; // -1 berarti tidak ada yang ditampilkan
  let isExiting = false; // Untuk transisi keluar

  onMount(() => {
    const timeouts = [];

    // Rangkaian waktu untuk menampilkan setiap baris satu per satu
    lines.forEach((_, i) => {
      timeouts.push(
        setTimeout(
          () => {
            activeLineIndex = i;
          },
          1000 + i * 2500
        )
      ); // Setiap baris muncul setelah 2.5 detik
    });

    // Waktu total untuk semua teks muncul + jeda
    const totalDuration = 1000 + lines.length * 2500;

    // Memicu animasi keluar setelah semua selesai
    timeouts.push(
      setTimeout(() => {
        isExiting = true;
      }, totalDuration)
    );

    return () => timeouts.forEach(clearTimeout);
  });
</script>

<section
  class="relative h-screen w-full flex flex-col justify-center items-center bg-black text-white p-8 overflow-hidden"
>
  <!-- Latar Belakang Partikel Bintang yang Elegan -->
  <div class="absolute inset-0 z-0 opacity-50">
    <div class="particle-star"></div>
  </div>

  <!-- 
    PERUBAHAN: Kontainer balon diganti namanya menjadi blob-container
    dan isinya diubah menjadi div sederhana.
  -->
  <div class="blob-container" aria-hidden="true">
    {#each Array(7) as _}
      <div class="blob"></div>
    {/each}
  </div>

  <!-- Wrapper untuk mengontrol transisi keluar -->
  <div class="z-10 w-full max-w-3xl text-center" class:exit-fade={isExiting}>
    <div class="h-24 flex justify-center items-center">
      {#key activeLineIndex}
        {#if activeLineIndex > -1}
          <p
            class="text-3xl md:text-4xl font-bold"
            in:fly={{ y: 20, duration: 1200, delay: 200 }}
            out:fly={{ y: -20, duration: 800 }}
          >
            {lines[activeLineIndex].text}
          </p>
        {/if}
      {/key}
    </div>
  </div>
</section>

<style>
  /* --- CSS UNTUK LATAR BELAKANG PARTIKEL --- */
  .particle-star {
    border-radius: 50%;
    box-shadow:
      20vw 15vh 1px 1px #fff,
      9vw 8vh 1px 1px #fff,
      19vw 18vh 0px 1px #fff,
      83vw 28vh 1px 0px #fff,
      30vw 94vh 1px 0px #fff,
      39vw 69vh 1px 1px #fff;
    animation: particle-anim 200s linear infinite;
    width: 2px;
    height: 2px;
  }
  @keyframes particle-anim {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(-2000px);
    }
  }

  /* --- CSS BARU UNTUK ANIMASI BLOB --- */
  .blob-container {
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: 5; /* Di atas partikel, di bawah teks */
  }

  .blob {
    position: absolute;
    bottom: -30%; /* Mulai dari bawah layar */
    border-radius: 50%;
    opacity: 0.5;
    filter: blur(50px); /* Efek blur yang lembut */
    animation: float-up 20s linear infinite;
  }

  /* Mengatur properti acak untuk setiap blob */
  .blob:nth-child(1) {
    left: 10%;
    width: 150px;
    height: 150px;
    animation-duration: 22s;
    animation-delay: -2s;
  }
  .blob:nth-child(2) {
    left: 25%;
    width: 100px;
    height: 100px;
    animation-duration: 18s;
    animation-delay: -5s;
  }
  .blob:nth-child(3) {
    left: 40%;
    width: 180px;
    height: 180px;
    animation-duration: 25s;
    animation-delay: -1s;
  }
  .blob:nth-child(4) {
    left: 55%;
    width: 120px;
    height: 120px;
    animation-duration: 17s;
    animation-delay: -6s;
  }
  .blob:nth-child(5) {
    left: 70%;
    width: 160px;
    height: 160px;
    animation-duration: 23s;
    animation-delay: 0s;
  }
  .blob:nth-child(6) {
    left: 85%;
    width: 110px;
    height: 110px;
    animation-duration: 19s;
    animation-delay: -4s;
  }
  .blob:nth-child(7) {
    left: 5%;
    width: 130px;
    height: 130px;
    animation-duration: 20s;
    animation-delay: -8s;
  }

  /* Memberi warna berbeda untuk setiap blob */
  .blob:nth-child(3n) {
    background-color: #ec4899;
  } /* Pink */
  .blob:nth-child(3n + 1) {
    background-color: #a855f7;
  } /* Purple */
  .blob:nth-child(3n + 2) {
    background-color: #22d3ee;
  } /* Cyan */

  @keyframes float-up {
    100% {
      transform: translateY(-150vh); /* Bergerak jauh ke atas layar */
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
