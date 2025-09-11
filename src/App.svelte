<script>
  // @ts-nocheck

  import { onMount } from "svelte";
  // Impor komponen-komponen slide kita
  import Slide1_Intro from "./lib/Slide1_Intro.svelte";
  import Slide2_Stats from "./lib/Slide2_Stats.svelte";
  import Slide3_Anthem from "./lib/Slide3_Anthem.svelte";
  import Slide4_Memories from "./lib/Slide4_Memories.svelte";
  import SlideStatsYapping from "./lib/SlideStatsYapping.svelte";
  import SlideKabar from "./lib/SlideKabar.svelte";
  import SlideWishes from "./lib/SlideWishes.svelte";
  import SlideFoto from "./lib/SlideFoto.svelte";

  import Countdown from "./lib/Countdown.svelte";
  import ProgressBar from "./lib/ProgressBar.svelte";

  // --- KONFIGURASI ---
  const birthdayPersonName = "Tania";
  const birthdayDate = new Date(2025, 8, 1);

  const slides = [
    {
      component: Slide1_Intro,
      music: "music/Jamrud-SelamatUlangTahunnewVersion-[AudioTrimmer.com].mp3",
    },
    {
      component: Slide2_Stats,
      music:
        "music/ytmp3free.cc_hindia-everything-u-are-youtubemp3free.org-[AudioTrimmer.com].mp3",
    },
    {
      component: Slide3_Anthem,
      music: "music/backburner-[AudioTrimmer.com].mp3",
    },
    {
      component: Slide4_Memories,
      music:
        "music/ytmp3free.cc_sombr-back-to-friends-youtubemp3free.org-[AudioTrimmer.com].mp3",
    },
    {
      component: SlideStatsYapping,
      music:
        "/music/Vietsub _ La La Lost You -  88rising & NIKI _ Lyrics Video-[AudioTrimmer.com].mp3",
    },
    {
      component: SlideKabar,
      music: "/music/Juicy Luicy - Lampu Kuning (Official Lyric Video).mp3",
    },
    {
      component: SlideWishes,
      music: "/music/The 1975 - About You-[AudioTrimmer.com].mp3",
    },
    {
      component: SlideFoto,
      music:
        "/music/Pamungkas - To The Bone (Official Music Video)-[AudioTrimmer.com].mp3",
    },
  ];
  const totalSlides = slides.length;

  // --- STATE APLIKASI ---
  let isBirthday = false;
  let hasStarted = false;
  let currentSlide = 0;
  let isPlaying = true;

  // State baru untuk melacak progres audio
  let audioPlayer;
  let audioCurrentTime = 0;
  let audioDuration = 0;

  onMount(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (today >= birthdayDate) {
      isBirthday = true;
    }
  });

  // --- FUNGSI & LOGIKA ---
  function startExperience() {
    hasStarted = true;
    playCurrentMusic();
  }

  function playCurrentMusic() {
    if (audioPlayer && slides[currentSlide].music) {
      audioPlayer.src = slides[currentSlide].music;
      audioPlayer.play().catch((e) => console.error("Audio play failed:", e));
    }
  }

  function togglePlayPause() {
    if (!audioPlayer) return;
    isPlaying ? audioPlayer.pause() : audioPlayer.play();
  }

  function handleNext() {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      playCurrentMusic();
    } else {
      // Opsi: tutup cerita jika sudah slide terakhir
      closeStory();
    }
  }

  function handlePrev() {
    if (currentSlide > 0) {
      currentSlide--;
      playCurrentMusic();
    }
  }

  function closeStory() {
    hasStarted = false;
    currentSlide = 0;
    if (audioPlayer) audioPlayer.pause();
  }
</script>

<main class="h-screen w-screen bg-black text-white font-sans">
  <!-- 
    Elemen Audio Player Diperbarui:
    - 'loop' dihapus.
    - 'on:ended' ditambahkan untuk memicu slide berikutnya.
    - 'on:timeupdate' dan 'on:loadedmetadata' untuk melacak progres.
  -->
  <!-- svelte-ignore element_invalid_self_closing_tag -->
  <audio
    bind:this={audioPlayer}
    on:pause={() => (isPlaying = false)}
    on:play={() => (isPlaying = true)}
    on:ended={handleNext}
    on:timeupdate={() => (audioCurrentTime = audioPlayer.currentTime)}
    on:loadedmetadata={() => (audioDuration = audioPlayer.duration)}
  />

  {#if !isBirthday}
    <Countdown {birthdayDate} />
  {:else if !hasStarted}
    <div
      class="h-full w-full flex flex-col justify-center items-center text-center p-8 bg-gray-900"
    >
      <h1 class="text-4xl font-bold">Hari Spesial Telah Tiba</h1>
      <p class="text-lg mt-2 text-gray-300">
        Sebuah hadiah kecil untukmu, {birthdayPersonName}.
      </p>
      <button
        on:click={startExperience}
        class="mt-8 px-6 py-3 bg-pink-500 rounded-full font-bold hover:bg-pink-600 transition-colors"
      >
        Mulai Petualangan
      </button>
    </div>
  {:else}
    <div class="relative h-full w-full">
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <div
        class="absolute left-0 top-0 z-20 h-full w-1/2"
        on:click={handlePrev}
      ></div>
      <div
        class="absolute right-0 top-0 z-20 h-full w-1/2"
        on:click={handleNext}
      ></div>

      <!-- 
        Progress Bar Diperbarui:
        - Tidak lagi menerima 'duration' dan 'on:next'.
        - Menerima progres audio asli melalui 'currentTime' dan 'totalDuration'.
      -->
      <ProgressBar
        {totalSlides}
        {currentSlide}
        {isPlaying}
        currentTime={audioCurrentTime}
        totalDuration={audioDuration}
        on:toggleplay={togglePlayPause}
        on:close={closeStory}
      />

      <div class="absolute inset-0">
        <svelte:component
          this={slides[currentSlide].component}
          name={birthdayPersonName}
        />
      </div>
    </div>
  {/if}
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: "Inter", sans-serif;
  }
</style>
