<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";

  // --- DATA ---
  const lines = [
    {
      text: "jujur cape liat kabar indonesia sekarang,...",
      class: "text-xl md:text-2xl text-gray-300",
    },
    { text: "btw", class: "text-xl md:text-2xl text-gray-300" },
    { text: "kabar kamu gimana?", class: "text-4xl md:text-5xl font-bold" },
    { text: "udah", class: "text-4xl md:text-5xl font-bold" },
    { text: "lama ga", class: "text-4xl md:text-5xl font-bold" },
    { text: "denger hehe", class: "text-4xl md:text-5xl font-bold" },
  ];

  // Ganti URL gambar di sini dengan foto-foto pilihan Anda
  const photos = [
    {
      src: "https://media.igram.world/get?__sig=6_Aft-zu_uJcOYFCGTGOaQ&__expires=1757563883&uri=https%3A%2F%2Fscontent-lga3-3.cdninstagram.com%2Fv%2Ft51.2885-15%2F524305135_18077885126494484_8652120055128085092_n.jpg%3Fstp%3Ddst-jpg_e15_fr_p1080x1080_tt6%26_nc_ht%3Dscontent-lga3-3.cdninstagram.com%26_nc_cat%3D108%26_nc_oc%3DQ6cZ2QFRWXvPMNISkrLkFJZCDtbpgSa_5eMNmnbg2GPkvbDRXG72N5JXS11GOlKHXvg21SD7cFS671OykXmxtLZZEgGZ%26_nc_ohc%3DReZZjoFGqGgQ7kNvwHFxrUK%26_nc_gid%3DDJmcjyUJ2p2sdZzmhD5-MA%26edm%3DANTKIIoBAAAA%26ccb%3D7-5%26oh%3D00_AfZZoaF8G0XfWqDAXYtnIai70bWLD6Ud1fK4Rj8MbaeXVQ%26oe%3D68C8121A%26_nc_sid%3Dd885a2&filename=524305135_18077885126494484_8652120055128085092_n.jpg",
    },
    {
      src: "https://media.igram.world/get?__sig=V4qGahCjpdGjWK5P-vUPCw&__expires=1757563883&uri=https%3A%2F%2Fscontent-lga3-3.cdninstagram.com%2Fv%2Ft51.2885-15%2F524968255_18077885135494484_2925362539361529761_n.jpg%3Fstp%3Ddst-jpg_e15_fr_p1080x1080_tt6%26_nc_ht%3Dscontent-lga3-3.cdninstagram.com%26_nc_cat%3D108%26_nc_oc%3DQ6cZ2QFRWXvPMNISkrLkFJZCDtbpgSa_5eMNmnbg2GPkvbDRXG72N5JXS11GOlKHXvg21SD7cFS671OykXmxtLZZEgGZ%26_nc_ohc%3DSO4q_RF_XskQ7kNvwHzjyMS%26_nc_gid%3DDJmcjyUJ2p2sdZzmhD5-MA%26edm%3DANTKIIoBAAAA%26ccb%3D7-5%26oh%3D00_AfZtRdvlbNBSIAzU1_I2PEzut7tIAZo3wY-JgVLg6Dkrog%26oe%3D68C82B0A%26_nc_sid%3Dd885a2&filename=524968255_18077885135494484_2925362539361529761_n.jpg",
    },
    {
      src: "https://media.igram.world/get?__sig=GjwO2hkSX9xQI_s8NhXzpw&__expires=1757563883&uri=https%3A%2F%2Fscontent-lga3-3.cdninstagram.com%2Fv%2Ft51.2885-15%2F524290922_18077885144494484_9125240099166967538_n.jpg%3Fstp%3Ddst-jpg_e15_fr_p1080x1080_tt6%26_nc_ht%3Dscontent-lga3-3.cdninstagram.com%26_nc_cat%3D108%26_nc_oc%3DQ6cZ2QFRWXvPMNISkrLkFJZCDtbpgSa_5eMNmnbg2GPkvbDRXG72N5JXS11GOlKHXvg21SD7cFS671OykXmxtLZZEgGZ%26_nc_ohc%3DDcrxF1Gj0DcQ7kNvwFF_9yC%26_nc_gid%3DDJmcjyUJ2p2sdZzmhD5-MA%26edm%3DANTKIIoBAAAA%26ccb%3D7-5%26oh%3D00_AfYVmaE0fL1ixQz8r1tEfm5ycTzrn7GfW2-xoH9uPzmZHA%26oe%3D68C831F5%26_nc_sid%3Dd885a2&filename=524290922_18077885144494484_9125240099166967538_n.jpg",
    },
    {
      src: "https://media.igram.world/get?__sig=jXbzYjadP7V7OY_b2C9k-A&__expires=1757563883&uri=https%3A%2F%2Fscontent-lga3-3.cdninstagram.com%2Fv%2Ft51.2885-15%2F524299974_18077885153494484_1074357218880761680_n.jpg%3Fstp%3Ddst-jpg_e15_fr_p1080x1080_tt6%26_nc_ht%3Dscontent-lga3-3.cdninstagram.com%26_nc_cat%3D108%26_nc_oc%3DQ6cZ2QFRWXvPMNISkrLkFJZCDtbpgSa_5eMNmnbg2GPkvbDRXG72N5JXS11GOlKHXvg21SD7cFS671OykXmxtLZZEgGZ%26_nc_ohc%3D3kxu6anA3fIQ7kNvwEkdJhE%26_nc_gid%3DDJmcjyUJ2p2sdZzmhD5-MA%26edm%3DANTKIIoBAAAA%26ccb%3D7-5%26oh%3D00_AfZt4wy5pVVfNZb5rVo0qYtYN191qnql09YQREt9DkLKtg%26oe%3D68C826C6%26_nc_sid%3Dd885a2&filename=524299974_18077885153494484_1074357218880761680_n.jpg",
    },
    {
      src: "https://media.igram.world/get?__sig=sJ_TQe5K44hOgpfVLHtBgQ&__expires=1757563883&uri=https%3A%2F%2Fscontent-lga3-3.cdninstagram.com%2Fv%2Ft51.2885-15%2F524279076_18077885162494484_6927078273080269920_n.jpg%3Fstp%3Ddst-jpg_e15_fr_p1080x1080_tt6%26_nc_ht%3Dscontent-lga3-3.cdninstagram.com%26_nc_cat%3D108%26_nc_oc%3DQ6cZ2QFRWXvPMNISkrLkFJZCDtbpgSa_5eMNmnbg2GPkvbDRXG72N5JXS11GOlKHXvg21SD7cFS671OykXmxtLZZEgGZ%26_nc_ohc%3DokEpQOj0r4YQ7kNvwFhiVOK%26_nc_gid%3DDJmcjyUJ2p2sdZzmhD5-MA%26edm%3DANTKIIoBAAAA%26ccb%3D7-5%26oh%3D00_AfYvcZq_FgBbrrb3Ml80Qt45Rqu82fQk_6cH7cuxyxW25A%26oe%3D68C834D5%26_nc_sid%3Dd885a2&filename=524279076_18077885162494484_6927078273080269920_n.jpg",
    },
    {
      src: "https://media.igram.world/get?__sig=rWnqObkqvWIgbMMyuQow-w&__expires=1757563883&uri=https%3A%2F%2Fscontent-lga3-3.cdninstagram.com%2Fv%2Ft51.2885-15%2F524440549_18077885171494484_2654857412978320315_n.jpg%3Fstp%3Ddst-jpg_e15_fr_p1080x1080_tt6%26_nc_ht%3Dscontent-lga3-3.cdninstagram.com%26_nc_cat%3D108%26_nc_oc%3DQ6cZ2QFRWXvPMNISkrLkFJZCDtbpgSa_5eMNmnbg2GPkvbDRXG72N5JXS11GOlKHXvg21SD7cFS671OykXmxtLZZEgGZ%26_nc_ohc%3DpDbNbkk-_uoQ7kNvwHuN6q3%26_nc_gid%3DDJmcjyUJ2p2sdZzmhD5-MA%26edm%3DANTKIIoBAAAA%26ccb%3D7-5%26oh%3D00_AfZMsTH1HyD4zsSooLsvI1zSfApTP7LhoCRBWYE7VyHwIw%26oe%3D68C80524%26_nc_sid%3Dd885a2&filename=524440549_18077885171494484_2654857412978320315_n.jpg",
    },
    {
      src: "https://media.igram.world/get?__sig=7s6ov7lntd2R9Ghqd8ertQ&__expires=1757563883&uri=https%3A%2F%2Fscontent-lga3-3.cdninstagram.com%2Fv%2Ft51.2885-15%2F524383052_18077885180494484_5745543778574674691_n.jpg%3Fstp%3Ddst-jpg_e15_fr_p1080x1080_tt6%26_nc_ht%3Dscontent-lga3-3.cdninstagram.com%26_nc_cat%3D108%26_nc_oc%3DQ6cZ2QFRWXvPMNISkrLkFJZCDtbpgSa_5eMNmnbg2GPkvbDRXG72N5JXS11GOlKHXvg21SD7cFS671OykXmxtLZZEgGZ%26_nc_ohc%3DR3XrSZazmRgQ7kNvwF3iBI5%26_nc_gid%3DDJmcjyUJ2p2sdZzmhD5-MA%26edm%3DANTKIIoBAAAA%26ccb%3D7-5%26oh%3D00_Afbg8-Qm5zkdr5bx4VZMT8ofJnA2voBsOCnhv_KNU-CT0w%26oe%3D68C824E7%26_nc_sid%3Dd885a2&filename=524383052_18077885180494484_5745543778574674691_n.jpg",
    },
    {
      src: "https://media.igram.world/get?__sig=MxaIU2X8-vdc2ytvcNmHBQ&__expires=1757563883&uri=https%3A%2F%2Fscontent-lga3-3.cdninstagram.com%2Fv%2Ft51.2885-15%2F524355249_18077885189494484_1022730201612239613_n.jpg%3Fstp%3Ddst-jpg_e15_fr_p1080x1080_tt6%26_nc_ht%3Dscontent-lga3-3.cdninstagram.com%26_nc_cat%3D108%26_nc_oc%3DQ6cZ2QFRWXvPMNISkrLkFJZCDtbpgSa_5eMNmnbg2GPkvbDRXG72N5JXS11GOlKHXvg21SD7cFS671OykXmxtLZZEgGZ%26_nc_ohc%3Diwz5Bog3n74Q7kNvwGUJSiC%26_nc_gid%3DDJmcjyUJ2p2sdZzmhD5-MA%26edm%3DANTKIIoBAAAA%26ccb%3D7-5%26oh%3D00_AfbsWxzHv9sH3dOqyLZSVtPfmE7oJP3x4yc1Ss7yJgzYyQ%26oe%3D68C823AE%26_nc_sid%3Dd885a2&filename=524355249_18077885189494484_1022730201612239613_n.jpg",
    },
    {
      src: "https://media.igram.world/get?__sig=WJifq8jqr94FSfH-QQcV0g&__expires=1757563883&uri=https%3A%2F%2Fscontent-lga3-3.cdninstagram.com%2Fv%2Ft51.2885-15%2F524372938_18077885198494484_5651622943531697937_n.jpg%3Fstp%3Ddst-jpg_e15_fr_p1080x1080_tt6%26_nc_ht%3Dscontent-lga3-3.cdninstagram.com%26_nc_cat%3D108%26_nc_oc%3DQ6cZ2QFRWXvPMNISkrLkFJZCDtbpgSa_5eMNmnbg2GPkvbDRXG72N5JXS11GOlKHXvg21SD7cFS671OykXmxtLZZEgGZ%26_nc_ohc%3DfODL4LdzO7IQ7kNvwHcpSDG%26_nc_gid%3DDJmcjyUJ2p2sdZzmhD5-MA%26edm%3DANTKIIoBAAAA%26ccb%3D7-5%26oh%3D00_AfbM_OMQtrbzAL62h1d7GXaT3wRXtnq78nNnea1uE_3CkQ%26oe%3D68C815EA%26_nc_sid%3Dd885a2&filename=524372938_18077885198494484_5651622943531697937_n.jpg",
    },
    {
      src: "https://media.igram.world/get?__sig=466n5GVz1jhY5g8Wjw5sQw&__expires=1757563883&uri=https%3A%2F%2Fscontent-lga3-3.cdninstagram.com%2Fv%2Ft51.2885-15%2F524814664_18077885207494484_2083965687752089981_n.jpg%3Fstp%3Ddst-jpg_e15_fr_p1080x1080_tt6%26_nc_ht%3Dscontent-lga3-3.cdninstagram.com%26_nc_cat%3D108%26_nc_oc%3DQ6cZ2QFRWXvPMNISkrLkFJZCDtbpgSa_5eMNmnbg2GPkvbDRXG72N5JXS11GOlKHXvg21SD7cFS671OykXmxtLZZEgGZ%26_nc_ohc%3D4A6R1MdPIJcQ7kNvwGK-HlD%26_nc_gid%3DDJmcjyUJ2p2sdZzmhD5-MA%26edm%3DANTKIIoBAAAA%26ccb%3D7-5%26oh%3D00_AfZmzApOEGnAXNH_vXx24AA2Oa86RD0IwIZO8vytIXcNZA%26oe%3D68C81C9D%26_nc_sid%3Dd885a2&filename=524814664_18077885207494484_2083965687752089981_n.jpg",
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
