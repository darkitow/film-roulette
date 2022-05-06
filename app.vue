<script setup>
import csv from "~/assets/film_list.csv";
import "~/assets/seedrandom.js";

useHead({
  title: "Watchbox",
  link: { rel: "icon", type: 'image/x-icon', href: "/assets/favicon.ico" },
});
</script>

<script>
export default {
  data() {
    return {
      films: [],
      last: 10,
      end: false,
      results: false,
    };
  },

  methods: {
    getMovies() {
      const nums = new Set();
      while (nums.size !== 9) {
        nums.add(Math.floor(Math.random() * 2000));
      }

      for (let item of nums) {
        let selecFilm = csv[item];
        this.films.push({
          hidden: true,
          gray: false,
          href: selecFilm.href,
          src_small: "https://a.ltrbxd.com/resized/" + selecFilm.src + "-0-125-0-187-crop.jpg",
          src_big: "https://a.ltrbxd.com/resized/" + selecFilm.src + "-0-460-0-690-crop.jpg",
          backd: "https://a.ltrbxd.com/resized/sm/upload/" + selecFilm.backd + "-1200-1200-675-675-crop-000000.jpg",
          title: selecFilm.title,
          direc: selecFilm.direc,
          year: selecFilm.year,
        });
      }
    },

    randomFilms() {
      this.end = false
      this.results = false
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
      setTimeout(() => { this.end = true; this.results = true; },1500)
    },

    open(ele) {
      this.$refs[ele].style.display = "flex";
    },
    close(ele) {
      this.$refs[ele].style.display = "none";
    },
    back() {
      this.end = false;
    },
    open_results() {
      this.end = true;
    }
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
    console.log(this.films)
  },
};
</script>

<template>
  <div class="flex flex-col items-center h-full m-0 app">
    <div class="backdrop abs" :class="[!end && 'hidden']">
      <img :src="films[last]?.backd">
      <div class="abs w-full h-full"></div>
    </div>

    <div class="header z-10" :class="[end && 'opacity-70']">
      <div class="header-items">
        <div class="flex flex-1 h-fit">
          <img src="~/assets/info.svg" class="icon" @click="open('info-box')" />
        </div>
        <h1 class="text-3xl font-semibold">Watchbox</h1>
        <div class="flex justify-end flex-1 h-fit">
          <img
            src="~/assets/settings.svg"
            class="icon"
            @click="open('settings-box')"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center w-full game">
      <div class="grid w-full grid-cols-3 overflow-hidden card-list" :class="[end && 'hidden']">
        <Card
          v-for="(film, i) in films"
          :film="film"
          :key="i"
          @flip="grayFilm(i)"
        ></Card>
      </div>
      <div class="flex gap-6 my-6 buttons" :class="[end && 'hidden']">
        <div :class="{ 'hidden': results }">
          <div
            class="button"
            :class="{ 'bg-emerald-500': last != 10, 'bg-slate-500': last == 10 }"
            @click="confirm"
          >
            CONFIRM
          </div>
        </div>
        <div :class="{ 'hidden': !results }">
          <div
            class="button bg-cyan-500"
            :class="{ 'hidden': !results }"
            @click="open_results"
            >
              RESULTS
          </div>
        </div>
      </div>
      <div class="w-full h-full flex flex-col p-10 align-center justify-center text-center max-w-[400px]" :class="[!end && 'hidden']">
        <img class="chosen" :src="films[last]?.src_big">
        <p class="font-semibold text-2xl pt-4">{{ films[last]?.title }}</p>
        <p class="text-l">{{ films[last]?.direc }}</p>
        <p class="font-light text-xl text-slate-400">{{ films[last]?.year }}</p>
        <div class="button bg-cyan-500 mt-4 mx-auto" @click="back">BACK</div>
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
          A new way to find new films to watch
        </p>
        <p class="mb-2 text-sm font-light">
          Every day there's a new random set of films from the most popular on Letterboxd.
        </p>
        <p class="mb-2 text-sm font-light">
          You can flip a random card revealing a film, then you have to choose if you want
          to flip another, but if you do, you can't go back. When you want to stop, just press confirm
        </p>
        <p class="mb-2 text-sm font-light text-slate-400">
          Inspired by
          <a href="https://www.nytimes.com/games/wordle/index.html">Wordle</a>
          and
          <a
            href="https://letterboxd.com/tobiasandersen2/list/random-movie-roulette/"
            >this list</a
          >.
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
        <div class="my-6 button bg-cyan-500" @click="randomFilms">RANDOM</div>
      </div>
    </div>
  </div>
</template>
