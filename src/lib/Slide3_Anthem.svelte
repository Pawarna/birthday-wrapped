<script>
  // @ts-nocheck

  // Menerima props, meskipun mungkin tidak kita gunakan di sini,
  // ini untuk menjaga konsistensi dengan slide lain.
  export let name = "";
</script>

<!--
  PERUBAHAN: Latar belakang utama diubah menjadi hitam pekat.
  Efek visual sekarang ditangani oleh div animasi di dalamnya.
-->
<section
  class="h-screen w-full flex flex-col justify-center items-center bg-black text-white p-8 relative overflow-hidden"
>
  <!-- BACKGROUND ANIMASI BARU -->
  <div class="absolute inset-0 z-0 opacity-60">
    <!-- Blob 1 -->
    <div
      class="absolute top-0 -left-1/4 w-96 h-96 bg-rose-500 rounded-full filter blur-3xl animate-blob"
    ></div>
    <!-- Blob 2 -->
    <div
      class="absolute top-0 -right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-blob"
      style="animation-delay: 2s;"
    ></div>
    <!-- Blob 3 -->
    <div
      class="absolute -bottom-8 left-1/4 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl animate-blob"
      style="animation-delay: 4s;"
    ></div>
  </div>

  <!-- Konten tetap berada di atas background (z-10) -->
  <div class="z-10 text-center">
    <h2 class="text-5xl font-bold mb-4">Lagu Kebangsaan Tahun Ini</h2>
    <p class="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
      Satu lagu yang selalu ada, menemani setiap momen, dan mendefinisikan
      tahunmu.
    </p>

    <!--
      PENTING: Ganti URL di bawah ini dengan URL "Embed" dari YouTube atau Spotify.
    -->
    <div
      class="w-full max-w-xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20"
    >
      <iframe
        data-testid="embed-iframe"
        style="border-radius:12px"
        src="https://open.spotify.com/embed/track/0FTmksd2dxiE5e3rWyJXs6?utm_source=generator&theme=0"
        width="100%"
        height="352"
        frameBorder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  </div>
</section>

<!-- CSS UNTUK ANIMASI BLOB -->
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
</style>
