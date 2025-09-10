<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  // Menerima prop 'name' meskipun tidak digunakan.
  // Ini diperlukan agar <svelte:component> di App.svelte tidak error.
  export let name = "";

  let visibleCards = 0;

  const stats = [
    { label: "Total Tawa", value: "1.2M", icon: "😂" },
    { label: "Energi Kopi", value: "365 cangkir", icon: "☕" },
    { label: "Episode Ditonton", value: "730", icon: "📺" },
    { label: "Ide Cemerlang", value: "Tak Terhingga", icon: "💡" },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      if (visibleCards < stats.length) {
        visibleCards++;
      } else {
        clearInterval(interval);
      }
    }, 500); // Setiap 0.5 detik, satu kartu muncul

    return () => clearInterval(interval);
  });
</script>

<section
  class="h-screen w-full flex flex-col justify-center items-center bg-black text-white p-8 relative overflow-hidden"
>
  <!-- BACKGROUND ANIMASI BARU -->
  <div class="absolute inset-0 z-0 opacity-50">
    <!-- Blob 1 -->
    <div
      class="absolute top-0 -left-1/4 w-96 h-96 bg-green-500 rounded-full filter blur-3xl animate-blob"
    ></div>
    <!-- Blob 2 -->
    <div
      class="absolute -bottom-8 -right-1/4 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl animate-blob"
      style="animation-delay: 2s;"
    ></div>
    <!-- Blob 3 -->
    <div
      class="absolute top-1/4 left-1/3 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl animate-blob"
      style="animation-delay: 4s;"
    ></div>
  </div>

  <div class="z-10 text-center w-full">
    <h2 class="text-5xl font-bold mb-2">Tahunmu dalam Angka</h2>
    <p class="text-lg text-gray-300 mb-12">
      Beberapa highlight dari petualanganmu setahun ini.
    </p>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl mx-auto">
      {#each stats as stat, i}
        {#if i < visibleCards}
          <div
            class="bg-white/10 p-6 rounded-2xl text-center backdrop-blur-sm border border-white/20"
            in:fly={{ y: 50, duration: 800 }}
          >
            <div class="text-5xl mb-3">{stat.icon}</div>
            <div class="text-2xl font-bold">{stat.value}</div>
            <div class="text-sm text-gray-300">{stat.label}</div>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</section>

<style>
  /* CSS UNTUK ANIMASI BLOB */
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
