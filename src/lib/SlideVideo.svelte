<script>
  // @ts-nocheck
  import { onMount } from "svelte";

  let videoPlayer;

  onMount(() => {
    // Coba putar video secara otomatis saat slide ini muncul
    // Browser akan menggunakan video yang sudah di-preload dari App.svelte
    if (videoPlayer) {
      videoPlayer.muted = true; // Mute diperlukan untuk autoplay di banyak browser
      videoPlayer.play().catch((error) => {
        // Jika autoplay gagal, pengguna harus menekan tombol play secara manual
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
         Pastikan path ini SAMA PERSIS dengan yang di-preload di App.svelte.
      2. Letakkan file video (misal: "ucapan.mp4") di dalam folder `public/videos/`.
    -->
    <video
      bind:this={videoPlayer}
      src="/videos/placeholder.mp4"
      controls
      playsinline
      preload="auto"
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
