<template>
  <div class="body-scroll-area scrollbar-y scrollbar-x">
    <div class="main-area flex-container row-padding">
      <section class="third">
        <div class="card-2">
          <div class="display-container" ref="displayContainer">
            <img class="profile-pic" @load="updateHeights" :src="profilePic" alt="Profile Picture" width="100%" height="auto" />
          </div>
          <div class="container" :style="{ height: thirdHeight }" ref="thirdSection">
            <h6 class="picture-title">{{ name }}</h6>
            <p><fa-icon :icon="['fas', 'briefcase']" class="fa-fw" />Full Stack Web Developer</p>
            <p><fa-icon :icon="['fas', 'home']" class="fa-fw" />{{ location }}</p>
            <p class="email_address" :data-tooltip="email"><fa-icon :icon="['fas', 'envelope']" class="fa-fw" />{{ email }}
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
                <span v-for="skill in expertSkills" :key="skill" :class="[skill.class, 'tooltip']" :data-tooltip="skill.label"></span>
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
                <span v-for="skill in proficientSkills" :key="skill" :class="[skill.class, 'tooltip']" :data-tooltip="skill.label"></span>
              </div>
            </div>
            <div class="status-bar">
              <div class="status-bar-fill" style="width:75%">Proficient</div>
            </div>
            <br>

          </div>
        </div>
        <br>
        <div style="clear:both;"></div>
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
          <detail-box  date="2015 - 2019" lastRow="true"
            :onToggle="updateHeights">
            <template v-slot:title1>Weber State University
              <svg class="wsulogo" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="40px" height="22px" viewBox="0 0 54.9 76.7"
                xml:space="preserve">
                <path fill="#4A0D66" d="M54.9,20.8V0H0v21c0,39.5,27.4,55.7,27.4,55.7l0,0c0,0,27.6-15.2,27.4-55.8V20.8z" />
                <path fill="#FFFFFF" d="M39.6,17.4c-3.9-5.1-3.2-7.4-3.2-7.4s-2.1,3.7-3.1,6.8c-1.3,3.7,1.2,7.6,1.2,7.6l4.3,6.2
                    c1.6,2.6-2.4,8.6-2.4,8.6l-8.8-20.5C23.9,10.2,26.1,7,26.1,7c-7.3,7.7-6.3,12.5-5.2,15.9c0,0,1.6,4,3.7,9.1l-2.8,7.4L16,25.9
                    c-2-5.1,0.1-8.6,0.1-8.6c-9.2,8-5.8,16.2-4,20.4c3.9,9.5,6.5,15.5,7.1,17.1c0.1,0.4,0.2,0.6,0.2,0.6h1.7c0.1,0,0.3-0.1,0.4-0.2
                    c0.1-0.1,0.7-2,0.7-2l4.6-15.6c3,7.5,6.8,16.7,7,17.3c0.1,0.3,0.2,0.5,0.2,0.5c0,0,1.7,0,1.7,0c0.1,0,0.2-0.1,0.3-0.2
                    c0.1-0.2,0.7-2,0.7-2l6.8-19.5C46.9,25.1,42.7,21.5,39.6,17.4z" />
              </svg>
            </template>
            <template v-slot>
              Associate of Science, Computer Science
            </template>
          </detail-box>
        </div>
        <div style="clear:both;"></div>
      </section>
    </div>
    <footer-area />
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, nextTick, watch, onActivated, onDeactivated } from "vue";
import { storeToRefs } from "pinia";
import { useLoadingStore } from "../stores/loading"; // Loading state store
import { useUserStore } from "../stores/userStore"; // User-related store
import { useEventStore } from "@/stores/eventStore";

export default {
  name: "HomeView",
  setup(_, { emit }) {
    
    const eventStore = useEventStore();
    const ds = useUserStore(); 
    const loadingStore = useLoadingStore(); 
    const { isLoading } = storeToRefs(loadingStore);
    const { name, location, email, expertSkills, proficientSkills, profilePic } = storeToRefs(ds);
   
    const thirdHeight = computed(() => {
      return (winWidth.value > 601)
        ? `${twothirdHeight.value - displayContainerHeight.value - 16}px`
        : "auto";
    });

    const twothirdHeight = ref(0);
    const displayContainerHeight = ref(0);
    const winWidth = ref(0);

    const showIcons = ref(localStorage.getItem("iconMode") === "enabled");
    const toggleIcons = (data) => {
      showIcons.value = data;
    };


    const updateHeights = () => {
      winWidth.value = window.innerWidth || 0;
      twothirdHeight.value = document.querySelector(".twothird")?.clientHeight || 0;
      displayContainerHeight.value = document.querySelector(".display-container")?.clientHeight || 0;
    };
    
    onMounted(() => {
      emit('view-loaded', { data: { includeIconSwitch: true, includeColorSwitch: false} });
      watch(
        () => eventStore.events["toggle-icons"],
          (newValue) => {
            if (newValue !== undefined) {
              toggleIcons(newValue);
            }
        }
      );
      watch(isLoading, async (loading) => {
        if (!loading) {
          await nextTick(); 
          updateHeights(); // Adjust heights after preloader disappears
          
        }
      });
      
      window.addEventListener("resize", updateHeights);
    });
    
    onUnmounted(() => {
      window.removeEventListener("resize", updateHeights);
    });
    
    onActivated(() => {
      updateHeights();
      window.addEventListener("resize", updateHeights);
    });
    
    onDeactivated(() => {
      window.removeEventListener("resize", updateHeights);
    });



 
    return {
      profilePic,
      name,
      location,
      email,
      expertSkills,
      proficientSkills,
      thirdHeight,
      showIcons,
      isLoading,
      toggleIcons,
      updateHeights
    };
  },
};
</script>

<style scoped>
.wsulogo{
  vertical-align: middle;
}
/* Your styles here */
</style>
