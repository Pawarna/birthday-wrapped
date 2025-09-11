<script>
  // @ts-nocheck
  import { onMount, tick } from "svelte";
  import { fly, fade } from "svelte/transition";

  import { initializeApp } from "firebase/app";
  import {
    getFirestore,
    collection,
    addDoc,
    onSnapshot,
    serverTimestamp,
    query,
    orderBy,
  } from "firebase/firestore";
  import { getAuth, signInAnonymously } from "firebase/auth";

  import { firebaseConfig } from "../lib/firebase/config.js";

  let wishes = [];
  let newWish = "";
  let wishesContainer;
  let isSubmitting = false;

  onMount(async () => {
    try {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const auth = getAuth(app);

      await signInAnonymously(auth);

      const wishesCollectionPath = `/artifacts/default-app-id/public/data/wishes`;
      const q = query(
        collection(db, wishesCollectionPath),
        orderBy("createdAt", "asc")
      );

      onSnapshot(q, (querySnapshot) => {
        const fetchedWishes = [];
        querySnapshot.forEach((doc) => {
          fetchedWishes.push({ id: doc.id, ...doc.data() });
        });
        wishes = fetchedWishes;

        tick().then(() => {
          if (wishesContainer) {
            wishesContainer.scrollTop = wishesContainer.scrollHeight;
          }
        });
      });
    } catch (error) {
      console.error("Error initializing Firebase:", error);
    }
  });

  async function handleSubmit() {
    if (newWish.trim() === "" || isSubmitting) return;
    isSubmitting = true;

    try {
      const app = initializeApp(firebaseConfig, "submitApp");
      const db = getFirestore(app);
      const wishesCollectionPath = `/artifacts/default-app-id/public/data/wishes`;

      await addDoc(collection(db, wishesCollectionPath), {
        text: newWish,
        createdAt: serverTimestamp(),
      });

      newWish = "";
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      isSubmitting = false;
    }
  }
</script>

<section
  class="relative h-screen w-full flex flex-col justify-center items-center bg-gray-900 text-white p-4 md:p-8 overflow-hidden"
>
  <!-- Latar Belakang Animasi Kunang-kunang -->
  <div class="fireflies">
    {#each Array(20) as _}
      <div
        class="firefly"
        style="
          --translateX: {-50 + Math.random() * 100}vw;
          --translateY: {-50 + Math.random() * 100}vh;
          --rotate: {Math.random() * 360}deg;
          --flash-duration: {2 + Math.random() * 4}s;
          --animation-duration: {100 + Math.random() * 100}s;
          --animation-delay: {Math.random() * -200}s;
        "
      ></div>
    {/each}
  </div>

  <!-- 
    PERBAIKAN: 
    1. z-index dinaikkan menjadi z-30 agar berada di atas navigasi (z-20).
    2. Event on:click|stopPropagation ditambahkan untuk mencegah klik "menembus" ke lapisan navigasi.
  -->
  <div
    class="z-30 w-full h-full flex flex-col items-center text-center pt-20"
    on:click|stopPropagation
  >
    <div in:fly={{ y: -30, duration: 1000, delay: 500 }}>
      <h2 class="text-4xl md:text-5xl font-bold">Wishes for You</h2>
      <p class="mt-2 text-lg text-gray-300">
        Tinggalkan ucapan dan doamu di sini!
      </p>
    </div>

    <!-- Kontainer Daftar Ucapan -->
    <div
      bind:this={wishesContainer}
      class="wishes-list w-full max-w-2xl my-6 flex-grow bg-black/30 rounded-lg p-4 border border-white/20 overflow-y-auto"
      in:fade={{ duration: 1000, delay: 800 }}
    >
      {#each wishes as wish, i (wish.id)}
        <div
          class="wish-item"
          in:fly={{ y: 20, duration: 800, delay: 100 * i }}
        >
          <p>{wish.text}</p>
        </div>
      {:else}
        <p class="text-gray-400">Jadilah yang pertama mengirim ucapan!</p>
      {/each}
    </div>

    <!-- Formulir Input Ucapan -->
    <form
      on:submit|preventDefault={handleSubmit}
      class="w-full max-w-2xl"
      in:fly={{ y: 30, duration: 1000, delay: 1200 }}
    >
      <div class="flex gap-2">
        <input
          type="text"
          bind:value={newWish}
          placeholder="Tulis ucapanmu di sini..."
          class="flex-grow bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          class="bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-full px-8 py-3 transition-colors disabled:opacity-50"
          disabled={isSubmitting}
        >
          Kirim
        </button>
      </div>
    </form>
  </div>
</section>

<style>
  /* --- CSS BARU UNTUK LATAR BELAKANG KUNANG-KUNANG --- */
  .fireflies {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }
  .firefly {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 0.4vw;
    height: 0.4vw;
    margin: -0.2vw 0 0 -0.2vw;
    animation: move-up var(--animation-duration, 200s) alternate infinite
      ease-in-out var(--animation-delay, 0s);
    pointer-events: none;
  }
  .firefly::before,
  .firefly::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    transform-origin: -10vw;
  }
  .firefly::before {
    background: white;
    opacity: 0.4;
    animation: drift var(--animation-duration, 200s) alternate infinite
      ease-in-out var(--animation-delay, 0s);
  }
  .firefly::after {
    background: white;
    opacity: 0;
    box-shadow: 0 0 0vw 0vw #f0f8ff; /* aliceblue */
    animation:
      drift var(--animation-duration, 200s) alternate infinite ease-in-out
        var(--animation-delay, 0s),
      flash var(--flash-duration, 4s) ease infinite;
  }

  /* PERBAIKAN: Keyframes sekarang menggunakan CSS Variables */
  @keyframes move-up {
    100% {
      transform: translateY(var(--translateY, 50vh))
        translateX(var(--translateX, 50vw));
    }
  }
  @keyframes drift {
    100% {
      transform: rotate(var(--rotate, 360deg));
    }
  }
  @keyframes flash {
    0%,
    30%,
    100% {
      opacity: 0;
      box-shadow: 0 0 0vw 0vw #f0f8ff;
    }
    5% {
      opacity: 1;
      box-shadow: 0 0 2vw 0.4vw #f0f8ff;
    }
  }

  /* --- CSS BARU UNTUK DAFTAR UCAPAN --- */
  .wishes-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    scrollbar-width: thin;
    scrollbar-color: rgba(100, 255, 255, 0.5) transparent;
  }
  .wish-item {
    background-color: rgba(255, 255, 255, 0.05);
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    text-align: left;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
</style>
