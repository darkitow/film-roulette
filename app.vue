<script setup>
import csv from "~/assets/film_list.csv";
import "~/assets/seedrandom.js";

useHead({
  title: "Wordle",
  link: { rel: "icon", href: "https://letterboxd.com/favicon.ico" },
});
</script>

<script>
export default {
  data() {
    return {
      films: [],
      last: 10,
    };
  },

  methods: {
    getMovies() {
      const nums = new Set();
      while (nums.size !== 9) {
        nums.add(Math.floor(Math.random() * 1400) + 1);
      }

      for (let item of nums) {
        let selecFilm = csv[item];
        this.films.push({
          hidden: true,
          gray: false,
          href: selecFilm.href,
          src: "https://a.ltrbxd.com/resized/" + selecFilm.src,
        });
      }
    },

    randomFilms() {
      Math.seedrandom(Date().slice(0, 15), { entropy: true });
      for (let film of this.films) {
        film["hidden"] = true;
      }
      setTimeout(() => {
        this.films = [];
        this.last = 10;
        this.getMovies();
      }, 500);
    },

    grayFilm(i) {
      if (this.last < 10) {
        this.films[this.last]["gray"] = true;
      }
      this.last = i;
    },

    confirm() {
      if (this.last == 10) {
        return;
      }
      for (let film of this.films) {
        if (film["hidden"]) {
          film["hidden"] = false;
          film["gray"] = true;
        }
      }
    },

    open(ele) {
      this.$refs[ele].style.display = "flex";
    },
    close(ele) {
      this.$refs[ele].style.display = "none";
    },
  },

  head: {
    link: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      {
        rel: "stylesheet",
        href: 'https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;600;700&display=swap" rel="stylesheet',
      },
    ],
  },

  mounted() {
    Math.seedrandom(Date().slice(0, 15));
    this.getMovies();
    this.open("info-box");
  },
};
</script>

<template>
  <div class="flex flex-col items-center h-full m-0 app">
    <div class="header">
      <div class="header-items">
        <div class="flex flex-1 h-fit">
          <img src="~/assets/info.svg" class="icon" @click="open(info - box)" />
        </div>
        <h1 class="text-3xl font-semibold">Wordle</h1>
        <div class="flex justify-end flex-1 h-fit">
          <img
            src="~/assets/settings.svg"
            class="icon"
            @click="open(settings - box)"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center w-full game">
      <div class="grid w-full grid-cols-3 overflow-hidden card-list">
        <Card
          v-for="(film, i) in films"
          :film="film"
          :i="i"
          :key="i"
          @flip="grayFilm"
        ></Card>
      </div>
      <div
        class="my-6 button"
        :class="{ 'bg-emerald-500': last != 10, 'bg-slate-500': last == 10 }"
        @click="confirm"
      >
        CONFIRM
      </div>
    </div>

    <div ref="info-box" class="overlay">
      <div class="p-5 boxx">
        <div class="flex items-center mb-4">
          <h2 class="flex-1 font-semibold">HOW TO PLAY</h2>
          <img
            src="~/assets/x.svg"
            class="w-6 h-6"
            @click="close('info-box')"
          />
        </div>
        <p class="mb-2 text-sm font-light">
          Inspired by
          <a href="https://www.nytimes.com/games/wordle/index.html">Wordle</a>
          and
          <a
            href="https://letterboxd.com/tobiasandersen2/list/random-movie-roulette/"
            >this list</a
          >.
        </p>
        <p class="mb-2 text-sm font-light">
          Every day there's a new random set of films from the 2000 most popular
          on Letterboxd.
        </p>
        <p class="mb-2 text-sm font-light">
          After you select a film, you can choose to select another, but you
          can't go back. If you want to stop, just click confirm
        </p>
      </div>
    </div>

    <div ref="settings-box" class="overlay">
      <div class="p-5 boxx">
        <div class="flex items-center mb-4">
          <h2 class="flex-1 font-semibold">SETTINGS</h2>
          <img
            src="~/assets/x.svg"
            class="w-6 h-6"
            @click="close('settings-box')"
          />
        </div>
        <p class="mb-2 text-sm font-light">
          Settings and new sets of films coming in the future!
        </p>
        <div class="my-6 button bg-cyan-600" @click="randomFilms">RANDOM</div>
      </div>
    </div>
  </div>
</template>
