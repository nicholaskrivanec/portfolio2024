<template>
  <div class="main-area flex-container row-padding">
    <section class="third">
      <div class="card-2">
        <div class="display-container" ref="displayContainer">
          <img class="profile-pic" @load="updateHeights" src="../assets/profile_pic.png" alt="Profile" width="100%" height="auto" />
        </div>
        <div class="container" :style="{ height: thirdHeight }" ref="thirdSection">
          <h6 class="picture-title">{{ name }}</h6>
          <p><fa-icon :icon="['fas', 'briefcase']" class="fa-fw" />Full Stack Web Developer</p>
          <p><fa-icon :icon="['fas', 'home']" class="fa-fw" />{{ location }}</p>
          <p class="email_address" :title="email"><fa-icon :icon="['fas', 'envelope']" class="fa-fw" />{{ email }}
          </p>
          <hr>
          <p class="skills-label">
            <b><fa-icon :icon="['fas', 'asterisk']" class="fa-fw" />Skills</b>
          </p>

          <div class="code-icons">
            <ul class="inline-list" v-show="!showIcons">
              <li v-for="skill in expertSkills" :key="skill">{{ skill.label }}</li>
            </ul>
            <div class="flex-row" v-show="showIcons">
              <span v-for="skill in expertSkills" :key="skill" :class="skill.class" :title="skill.label"></span>
            </div>
          </div>
          <div class="status-bar">
            <div class="status-bar-fill" style="width:90%">Expert</div>
          </div>
          <div class="code-icons">
            <ul class="inline-list" v-show="!showIcons">
              <li v-for="skill in proficientSkills" :key="skill">{{ skill.label }}</li>
            </ul>
            <div class="flex-row" v-show="showIcons">
              <span v-for="skill in proficientSkills" :key="skill" :class="skill.class" :title="skill.label"></span>
            </div>
          </div>
          <div class="status-bar">
            <div class="status-bar-fill" style="width:75%">Proficient</div>
          </div>
          <br>

        </div>
      </div>
      <br>
    </section>

    <section class="twothird" ref="twothirdSection">
      <div class="container card">
        <h2 class="header-icon">
          <fa-icon :icon="['fas', 'pen-to-square']" class="fa-fw" />Summary
        </h2>
        <a href="/Nicholas_Krivanec.pdf" download class="download-resume-button">
          <fa-icon :icon="['fa', 'circle-down']" />
          <span class="dl-text">Resume</span>
        </a>
        <div class="container">
          <p>Full Stack Developer with 5+ years of professional experience in ASP.NET Core, C#, SQL, JavaScript,
            HTML, CSS, and RDL. Skilled in API development and integration, building robust back-end web services
            with schedulers and queue processors, and executing data conversions involving complex parsing and
            normalization. Beyond technical expertise, I bring a unique personality and positive energy to the
            workplace, with a knack for fostering camaraderie—undefeated in office chess and a proud winner of
            "Funniest Halloween Costume" at company events.</p>
        </div>
      </div>

      <div class="container card">
        <h2 class="header-icon">
          <fa-icon :icon="['fas', 'fa-mug-saucer']" class="fa-fw" />Work Experience
        </h2>
        <detail-box title1="Annotation Specialist" title2="DataAnnotation" date="current" :onToggle="updateHeights">
          Trained and assisted AI models in coding, cataloging and evaluating over 50,000 lines of code and text
          data
          to reduce generation errors across Python, C#, Java, and JavaScript models.
        </detail-box>
        <detail-box title1="Web Developer III" title2="Justice Works" date="2019 - 2024" :onToggle="updateHeights">
          Led the development of case management systems serving over 1,000 users, focusing on scalability and user
          experience. Mentored junior developers to improve code quality and development practices. Spearheaded over
          5
          full-stack ASP.NET projects, incorporating custom C# libraries, API creation and integration, database
          management with automated jobs, and web services. Also developed a messaging platform tailored for legal
          communications.
        </detail-box>
        <detail-box title1="Test Administrator" title2="Pearson Vue" date="2018 - 2019" :onToggle="updateHeights">
          Administered 800+ high-stakes exams for thousands of candidates, maintaining full compliance with Pearson
          VUE protocols and achieving a flawless security record. Managed and troubleshooted 15+ desktops, ensuring
          seamless testing operations and swift issue resolution.
        </detail-box>
        <detail-box title1="Driver / Package Handler" title2="UPS" date="2014 - 2018" lastRow="true"
          :onToggle="updateHeights">
          Maintained a misload frequency of 1 in 11,000, earning Employee of the Month for perfect attendance, and
          achieved 100% accuracy in on-time deliveries to residents and businesses.
        </detail-box>
      </div>

      <div class="container card">
        <h2 class="header-icon"><fa-icon :icon="['fas', 'fa-graduation-cap']" class="fa-fw" />Education</h2>
        <detail-box title1="Weber State University" title2="" date="2015 - 2019" lastRow="true"
          :onToggle="updateHeights" :logoSrc="wsuLogoPath">Associate of Science, Computer Science</detail-box>
      </div>

    </section>
  </div>
  <footer-area />
</template>

<script>
import wsuLogo from "../assets/wsu-logo.svg";
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/userStore"; // User-related store
import { useLoadingStore } from "../stores/loading"; // Loading state store

export default {
  name: "HomeView",
  setup(_, { emit }) {
    const ds = useUserStore(); // Access user store instance
    const loadingStore = useLoadingStore(); // Access loading store instance
    const { isLoading } = storeToRefs(loadingStore); // Reactive `isLoading`

    const { name, location, email, expertSkills, proficientSkills } = storeToRefs(ds);

    const showIcons = ref(localStorage.getItem("iconMode") === "enabled");
    const wsuLogoPath = wsuLogo;

    const thirdHeight = computed(() => {
      return (winWidth.value > 601)
        ? `${twothirdHeight.value - displayContainerHeight.value - 16}px`
        : "auto";
    });

    const twothirdHeight = ref(0);
    const displayContainerHeight = ref(0);
    const winWidth = ref(0);

    const toggleIcons = (data) => {
      showIcons.value = data;
      localStorage.setItem("iconMode", data ? "enabled" : "disabled");
    };

    const updateHeights = () => {
      winWidth.value = window.innerWidth || 0;
      twothirdHeight.value = document.querySelector(".twothird")?.clientHeight || 0;
      displayContainerHeight.value = document.querySelector(".display-container")?.clientHeight || 0;
    };

    onMounted(() => {
      emit('view-loaded', { data: { showIconSwitch: true } });
        
      watch(isLoading, async (loading) => {
        if (!loading) {
            updateHeights(); // Adjust heights after preloader disappears
            window.addEventListener("resize", updateHeights);
          }
      });

    });

    onUnmounted(() => {
      window.removeEventListener("resize", updateHeights);
    });

    return {
      name,
      location,
      email,
      expertSkills,
      proficientSkills,
      thirdHeight,
      showIcons,
      toggleIcons,
      updateHeights,
      wsuLogoPath,
      isLoading, // Return `isLoading` for use in the template or logic
    };
  },
};
</script>

<style scoped>
/* Your styles here */
</style>
