<script>
  // @ts-nocheck
  import { onMount } from "svelte";

  let videoPlayer;

  onMount(() => {
    // Coba putar video secara otomatis saat slide ini muncul
    if (videoPlayer) {
      videoPlayer.muted = true; // Mute diperlukan untuk autoplay di banyak browser
      videoPlayer.play().catch((error) => {
        console.log(
          "Autoplay dicegah oleh browser, kontrol manual diperlukan.",
          error
        );
      });
    }
  });
</script>

<section class="relative h-screen w-full bg-black text-white overflow-hidden">
  <div class="fullscreen-video-container">
    <!-- 
      PENTING: 
      1. Ganti `src` di bawah ini dengan path ke file video Anda.
      2. Letakkan file video (misal: "ucapan.mp4") di dalam folder `public/videos/`.
    -->
    <video
      bind:this={videoPlayer}
      src="/video/video.MOV"
      controls
      playsinline
      class="fullscreen-video"
    >
      Browser kamu tidak mendukung pemutar video ini.
    </video>
  </div>
</section>

<style>
  .fullscreen-video-container {
    position: absolute;
    inset: 0;
    z-index: 20;
  }

  .fullscreen-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
