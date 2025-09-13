<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  // Impor semua transisi yang akan kita gunakan
  import { fly, fade, scale } from "svelte/transition";
  // --- PERUBAHAN: Impor `flip` untuk animasi perpindahan posisi ---
  import { flip } from "svelte/animate";
  import { cubicInOut } from "svelte/easing";

  // Rangkaian kata-kata diubah menjadi objek untuk menyimpan data transisi
  const textSequence = [
    {
      text: "Yah, kita sudah sampai di akhir...",
      transition: fly,
      inParams: { y: 50, duration: 1200 }, // Masuk dari bawah
      outParams: { y: -50, duration: 600 }, // Keluar ke atas
    },
    {
      text: "... semoga kamu suka ya!",
      transition: fly,
      inParams: { x: -50, duration: 1200 }, // Masuk dari kiri
      outParams: { x: 50, duration: 600 }, // Keluar ke kanan
    },
    {
      text: "... maaf cuman bisa ngasih ini.",
      transition: fade,
      inParams: { duration: 1200 }, // Muncul memudar
      outParams: { duration: 600 }, // Hilang memudar
    },
    {
      text: "Sekali lagi, selamat ulang tahun ya!",
      transition: scale,
      inParams: { start: 0.5, duration: 1000 }, // Muncul membesar
      outParams: { end: 0.5, duration: 600 }, // Hilang mengecil
    },
    {
      text: "... sampai jumpa di wrapped berikutnya! 😉",
      transition: fade,
      inParams: { duration: 1200 }, // Muncul memudar
      outParams: { duration: 600 }, // Hilang memudar
    },
    {
      text: "💗",
      transition: scale,
      inParams: { start: 0.5, duration: 1000 }, // Muncul membesar
      outParams: { end: 0.5, duration: 600 }, // Hilang mengecil
    },
    {
      text: "",
      transition: scale,
      inParams: { start: 0.5, duration: 1000 }, // Muncul membesar
      outParams: { end: 0.5, duration: 600 }, // Hilang mengecil
    },
  ];

  // State untuk melacak indeks teks yang sedang ditampilkan
  let currentTextIndex = 0;

  // --- PERUBAHAN: `photos` dijadikan `let` agar bisa diubah ---
  let photos = [
    {
      src: "img/1 (1).jpg",
      delay: 100,
    },
    {
      src: "img/1 (1).webp",
      delay: 200,
    },
    {
      src: "img/1 (2).webp",
      delay: 150,
    },
    {
      src: "img/1 (3).webp",
      delay: 250,
    },
    {
      src: "img/1 (4).webp",
      delay: 50,
    },
    {
      src: "img/1 (5).webp",
      delay: 300,
    },
    {
      src: "img/1 (6).webp",
      delay: 120,
    },
    {
      src: "img/1 (7).webp",
      delay: 220,
    },
  ];

  // --- FUNGSI BARU UNTUK MENGACAK SEBAGIAN ARRAY ---
  function partialShufflePhotos(array) {
    const newArray = [...array]; // Buat salinan
    const len = newArray.length;

    // Tentukan jumlah pasangan yang akan ditukar (misal: 1 sampai 3 pasang)
    const swaps = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < swaps; i++) {
      // Pilih dua indeks acak yang berbeda
      let index1 = Math.floor(Math.random() * len);
      let index2 = Math.floor(Math.random() * len);

      while (index1 === index2) {
        index2 = Math.floor(Math.random() * len);
      }

      // Tukar posisi elemen pada kedua indeks tersebut
      [newArray[index1], newArray[index2]] = [
        newArray[index2],
        newArray[index1],
      ];
    }

    return newArray;
  }

  onMount(() => {
    const interval = setInterval(() => {
      currentTextIndex = (currentTextIndex + 1) % textSequence.length;
      // --- PERUBAHAN: Panggil fungsi shuffle parsial ---
      photos = partialShufflePhotos(photos);
    }, 3500);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<section class="relative h-screen w-full overflow-hidden bg-gray-900">
  <!-- 1. Latar Belakang Kolase Foto -->
  <div
    class="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-2 opacity-50 blur-[2px]"
  >
    <!-- 
      Menggunakan `animate:flip` untuk animasi perpindahan.
    -->
    {#each photos as photo (photo.src)}
      <div
        class="overflow-hidden"
        animate:flip={{ duration: 1200, easing: cubicInOut }}
      >
        <img src={photo.src} alt="Kenangan" class="photo-tile" />
      </div>
    {/each}
  </div>

  <!-- 2. Lapisan Gelap (Overlay) agar Teks Terbaca (Tetap Sama) -->
  <div
    class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"
  ></div>

  <!-- 3. Konten Teks Dinamis dengan Transisi yang Bervariasi -->
  <div
    class="relative z-10 flex h-full flex-col items-center justify-center p-8 text-center text-white"
  >
    {#key currentTextIndex}
      {@const current = textSequence[currentTextIndex]}
      <h1
        class="text-5xl font-black tracking-tight text-white drop-shadow-lg md:text-7xl"
        in:current.transition={current.inParams}
        out:current.transition={current.outParams}
      >
        {current.text}
      </h1>
    {/key}
  </div>
</section>

<style>
  /* Animasi `photo-reveal` tidak lagi diperlukan */
  .photo-tile {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
