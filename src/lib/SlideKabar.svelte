<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";

  // --- DATA ---
  const lines = [
    {
      text: "jujur cape liat kabar indonesia sekarang...",
      class: "text-xl md:text-2xl text-gray-300",
    },
    { text: "...btw", class: "text-xl md:text-2xl text-gray-300" },
    { text: "kabar kamu gimana?", class: "text-4xl md:text-5xl font-bold" },
    { text: "udah", class: "text-4xl md:text-5xl font-bold" },
    { text: "lama ga", class: "text-4xl md:text-5xl font-bold" },
    { text: "denger hehe", class: "text-4xl md:text-5xl font-bold" },
  ];

  // Ganti URL gambar di sini dengan foto-foto pilihan Anda
  const photos = [
    {
      src: "img/catcry/1.jpg",
    },
    {
      src: "img/catcry/2.jpg",
    },
    {
      src: "img/catcry/3.jpg",
    },
    {
      src: "img/catcry/4.jpg",
    },
    {
      src: "img/catcry/5.jpg",
    },
    {
      src: "img/catcry/6.jpg",
    },
    {
      src: "img/catcry/7.jpg",
    },
    {
      src: "img/catcry/8.jpg",
    },
    {
      src: "img/catcry/9.jpg",
    },
    {
      src: "img/catcry/10.jpg",
    },
  ];

  // --- STATE ANIMASI ---
  let activeLineIndex = -1;
  let showCarousel = false;
  let currentPhotoIndex = 0;
  let autoScrollInterval;

  // --- FUNGSI CAROUSEL ---
  function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
  }
  function prevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
  }

  function handleManualNav(direction) {
    clearInterval(autoScrollInterval); // Hentikan auto-scroll saat manual
    if (direction === "next") nextPhoto();
    else prevPhoto();
    // Mulai lagi auto-scroll setelah jeda
    autoScrollInterval = setInterval(nextPhoto, 4000);
  }

  onMount(() => {
    // Rangkaian waktu untuk teks
    const timeouts = [
      setTimeout(() => {
        activeLineIndex = 0;
      }, 500),
      setTimeout(() => {
        activeLineIndex = 1;
      }, 3000),
      setTimeout(() => {
        activeLineIndex = 2;
      }, 5000),
      setTimeout(() => {
        activeLineIndex = 3;
      }, 7500),
      setTimeout(() => {
        activeLineIndex = 4;
      }, 8500),
      setTimeout(() => {
        activeLineIndex = 5;
      }, 9500),
      // Transisi ke carousel
      setTimeout(() => {
        showCarousel = true;
      }, 12000),
    ];

    // Mulai auto-scroll saat carousel muncul
    const startCarouselTimeout = setTimeout(() => {
      autoScrollInterval = setInterval(nextPhoto, 1000);
    }, 12500);

    // Fungsi pembersihan
    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(startCarouselTimeout);
      clearInterval(autoScrollInterval);
    };
  });
</script>

<section
  class="relative h-screen w-full flex flex-col justify-center items-center bg-indigo-900 text-white p-4 md:p-8 overflow-hidden"
>
  <!-- Latar Belakang Blob Baru yang Unik -->
  <div class="absolute inset-0 z-0 opacity-40">
    <div class="blob blob-1 bg-cyan-400"></div>
    <div class="blob blob-2 bg-pink-400"></div>
    <div class="blob blob-3 bg-purple-500"></div>
  </div>

  {#if !showCarousel}
    <!-- FASE 1: Teks Muncul Satu per Satu -->
    <div
      class="z-10 w-full max-w-2xl text-center h-24 flex justify-center items-center"
      out:fade={{ duration: 500 }}
    >
      {#key activeLineIndex}
        {#if activeLineIndex > -1}
          <p
            class={lines[activeLineIndex].class}
            in:fly={{ y: 20, duration: 1000, delay: 200 }}
            out:fly={{ y: -20, duration: 500 }}
          >
            {lines[activeLineIndex].text}
          </p>
        {/if}
      {/key}
    </div>
  {:else}
    <!-- FASE 2: Galeri Foto Carousel -->
    <div
      class="z-10 w-full max-w-xl mx-auto"
      in:fade={{ duration: 1000, delay: 300 }}
    >
      <div class="relative">
        <!-- Kontainer Carousel -->
        <div
          class="carousel-wrapper aspect-video rounded-lg overflow-hidden shadow-2xl"
        >
          <div
            class="carousel-track"
            style="transform: translateX(-{currentPhotoIndex * 100}%)"
          >
            {#each photos as photo}
              <div class="carousel-slide">
                <img
                  src={photo.src}
                  alt="Galeri Foto"
                  class="w-full h-full object-cover"
                />
              </div>
            {/each}
          </div>
        </div>

        <!-- Tombol Navigasi Manual -->
        <button
          on:click={() => handleManualNav("prev")}
          class="nav-button left-2 md:-left-12"
        >
          &lt;
        </button>
        <button
          on:click={() => handleManualNav("next")}
          class="nav-button right-2 md:-right-12"
        >
          &gt;
        </button>
      </div>
    </div>
  {/if}
</section>

<style>
  /* --- CSS BARU UNTUK LATAR BELAKANG BLOB --- */
  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(70px);
    animation: dance 20s infinite ease-in-out;
  }
  .blob-1 {
    width: 300px;
    height: 300px;
    top: 10%;
    left: 15%;
  }
  .blob-2 {
    width: 250px;
    height: 250px;
    bottom: 10%;
    right: 15%;
    animation-delay: -5s;
  }
  .blob-3 {
    width: 200px;
    height: 200px;
    top: 40%;
    left: 45%;
    animation-delay: -10s;
  }

  @keyframes dance {
    0%,
    100% {
      transform: translate(0, 0) rotate(0deg) scale(1);
    }
    25% {
      transform: translate(40px, -30px) rotate(45deg) scale(1.1);
    }
    50% {
      transform: translate(-20px, 50px) rotate(-45deg) scale(0.9);
    }
    75% {
      transform: translate(-30px, -40px) rotate(90deg) scale(1.2);
    }
  }

  /* --- CSS BARU UNTUK CAROUSEL --- */
  .carousel-wrapper {
    position: relative;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .carousel-track {
    display: flex;
    height: 100%;
    transition: transform 0.6s cubic-bezier(0.76, 0, 0.24, 1);
  }
  .carousel-slide {
    flex: 0 0 100%;
    width: 100%;
    height: 100%;
  }
  .nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .nav-button:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
</style>
