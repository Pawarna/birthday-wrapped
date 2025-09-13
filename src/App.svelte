<script>
  // @ts-nocheck

  import { onMount } from "svelte";
  // Impor komponen-komponen slide kita
  import StartScreen from "./lib/StartScreen.svelte";
  import Slide1_Intro from "./lib/Slide1_Intro.svelte";
  import Slide2_Stats from "./lib/Slide2_Stats.svelte";
  import Slide3_Anthem from "./lib/Slide3_Anthem.svelte";
  import Slide4_Memories from "./lib/Slide4_Memories.svelte";
  import SlideStatsYapping from "./lib/SlideStatsYapping.svelte";
  import SlideTop4 from "./lib/SlideTop4.svelte";
  import SlideKabar from "./lib/SlideKabar.svelte";
  import SlideWishes from "./lib/SlideWishes.svelte";
  import SlideIntroVideo from "./lib/SlideIntroVideo.svelte";
  import SlideVideo from "./lib/SlideVideo.svelte";
  import SlideHarapan from "./lib/SlideHarapan.svelte";
  import SlideFoto from "./lib/SlideFoto.svelte";

  import Countdown from "./lib/Countdown.svelte";
  import ProgressBar from "./lib/ProgressBar.svelte";

  // --- KONFIGURASI ---
  const birthdayPersonName = "Tania";
  // Ambil tanggal ulang tahun dari environment variable (VITE_BIRTHDAY_DATE, format: YYYY-MM-DD)
  const birthdayDateStr = import.meta.env.VITE_BIRTHDAY_DATE || "2025-09-15";
  const [year, month, day] = birthdayDateStr.split("-").map(Number);
  // Bulan di JS dimulai dari 0, jadi dikurangi 1
  const birthdayDate = new Date(year, month - 1, day);

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
      component: SlideTop4,
      music: "/music/I Wanna Be Yours-[AudioTrimmer.com].mp3",
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
      component: SlideIntroVideo,
      music: "/music/NIKI - Take A Chance With Me (Official Lyric Video).mp3",
    },
    {
      component: SlideVideo,
      music: "/video/video.mp4",
    },
    {
      component: SlideHarapan,
      music:
        "/music/Pamungkas - To The Bone (Official Music Video)-[AudioTrimmer.com].mp3",
    },
    {
      component: SlideFoto,
      music: "/music/backburner-[AudioTrimmer.com].mp3",
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

  function preloadVideo(src) {
    // Fungsi ini membuat elemen video virtual untuk memicu download di background
    const video = document.createElement("video");
    video.src = src;
    video.preload = "auto";
    video.load();
    console.log(`Memulai preload untuk video: ${src}`);
  }

  onMount(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (today >= birthdayDate) {
      isBirthday = true;
      // ubah title nya
      document.title = `Birthday Wrapped 2025 - ${birthdayPersonName}`;
    }

    preloadVideo("/video/video.mp4");
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
    <StartScreen name={birthdayPersonName} on:start={startExperience} />
  {:else}
    <div class="relative h-full w-full">
      <div
        class="absolute left-0 top-0 z-20 h-full w-1/2"
        on:click={handlePrev}
      ></div>
      <div
        class="absolute right-0 top-0 z-20 h-full w-1/2"
        on:click={handleNext}
      ></div>

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
