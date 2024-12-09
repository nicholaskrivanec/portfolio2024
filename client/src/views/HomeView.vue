

<template>
  <div>
    <div v-if="isLoading" class="preloader">
      <svg class="spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path class="path1"
            d="M60.9 403.1a48 48 0 1 0 96 0 48 48 0 1 0 -96 0z
            M208 464a48 48 0 1 0 96 0 48 48 0 1 0 -96 0z
            M369.1 75A48 48 0 1 0 437 142.9 48 48 0 1 0 369.1 75z
            m0 294.2A48 48 0 1 0 437 437a48 48 0 1 0 -67.9-67.9z
            M416 256a48 48 0 1 0 96 0 48 48 0 1 0 -96 0z" />
        <path class="path2"
            d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z
            M96 256A48 48 0 1 0 0 256a48 48 0 1 0 96 0z
            M75 142.9A48 48 0 1 0 142.9 75 48 48 0 1 0 75 142.9z" />
      </svg>
    </div>
    <div :class="{ hidden: isLoading }">
      <menu-bar @toggle-icons="toggleIcons" @toggle-dark-mode="toggleDarkMode" includeIconSwitch="true" />
  
      <div class="main-area flex-container row-padding">
        <section class="third">
          <div class="card-2">
            <div class="display-container" ref="displayContainer">
              <img 
                class="profile-pic" 
                src="../assets/profile_pic.png" 
                alt="Profile" 
                width="100%" height="auto" 
                @load="imageLoaded = true" 
                @error="imageLoaded = true" 
              />
            </div>
            <div class="container" :style="{ height: thirdHeight }" ref="thirdSection">
              <h6 class="picture-title">{{ name }}</h6>
              <p><fa-icon :icon="['fas', 'briefcase']" class="fa-fw" />Full Stack Web Developer</p>
              <p><fa-icon :icon="['fas', 'home']" class="fa-fw" />{{ location }}</p>
              <p class="email_address" :title="email"><fa-icon :icon="['fas', 'envelope']" class="fa-fw" />{{ email }}</p>
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
            <detail-box title1="Annotation Specialist" title2="DataAnnotation" date="current"
              :onToggle="updateHeights">
              Trained and assisted AI models in coding, cataloging and evaluating over 50,000 lines of code and text data
              to reduce generation errors across Python, C#, Java, and JavaScript models.
            </detail-box>
            <detail-box title1="Web Developer III" title2="Justice Works" date="2019 - 2024"
              :onToggle="updateHeights">
              Led the development of case management systems serving over 1,000 users, focusing on scalability and user
              experience. Mentored junior developers to improve code quality and development practices. Spearheaded over 5
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
  
          <div class="container card">
            <h2 class="header-icon"><fa-icon :icon="['fas', 'code']" class="fa-fw" />Projects</h2>
            <div class="container">
              <p><a href="https://github.com/nicholaskrivanec" target="_blank">View on GitHub</a></p>
            </div>
          </div>
  
        </section>
      </div>
      <footer-area />
    </div>
  </div>
</template>

<script>
import wsuLogo from "../assets/wsu-logo.svg";
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/userStore"; // Correct import

export default {
  name: "HomeView",
  setup() {
    const ds = useUserStore(); // Access the store instance
    const { isLoading, name, location, email, expertSkills, proficientSkills } = storeToRefs(ds);

    const showIcons = ref(localStorage.getItem("iconMode") === "enabled");
    const imageLoaded = ref(false);
    const wsuLogoPath = wsuLogo;

    const thirdHeight = computed(() => {
      return (winWidth.value > 601) ? `${twothirdHeight.value - displayContainerHeight.value - 16}px`: "auto";
    });

    // Update heights
    const updateHeights = () => {
      winWidth.value = window.innerWidth || 0;
      twothirdHeight.value = document.querySelector(".twothird")?.clientHeight || 0;
      displayContainerHeight.value = document.querySelector(".display-container")?.clientHeight || 0;
    };


    // Reactive heights
    const twothirdHeight = ref(0);
    const displayContainerHeight = ref(0);
    const winWidth = ref(0);

    const toggleIcons = (data) => {
      showIcons.value = data;
      localStorage.setItem("iconMode", data ? "enabled" : "disabled");
    };

    watch(
      () => [isLoading.value, ds.data], // Add other dependencies as needed
      () => {
        nextTick(() => updateHeights());
      }
    );


    onMounted(() => {
      ds.isLoading = true;
      ds.loadData?.()
        .then(() => {
          nextTick(() => updateHeights());
        })
        .finally(() => {
          ds.isLoading = false;
        });

      window.addEventListener("resize", updateHeights);
    });


    onUnmounted(() => {
      window.removeEventListener("resize", updateHeights);
    });

    return {
      isLoading,
      name,
      location,
      email,
      expertSkills,
      proficientSkills,
      thirdHeight,
      showIcons,
      imageLoaded,
      toggleIcons,
      updateHeights,
      wsuLogoPath
    };
  },
};
</script>

<style scoped>
/* Your styles here */
</style>
