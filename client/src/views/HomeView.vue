<template>
  <div>
    <header class="menu-bar light-drop">
      <div class="menu-content">
        <span class="menu-title">Nicholas Krivanec</span>
        
        <!--More to come-->
        <div class="menu-togglers">
          <div class="col-1">
            <ToggleSwitch label="Colors" id="color-toggle" :checked="showColors" :onChange="toggleColors"/>
          </div>
          <div class="col-2">
            <ToggleSwitch label="Dark Mode" id="dark-mode-toggle" :checked="isDarkMode" :onChange="toggleDarkMode" />
            <ToggleSwitch label="Icons" id="icon-toggle" :checked="showIcons" :onChange="toggleIcons" />
          </div>
        </div>
      </div>
    </header>

    <nav v-show="showColors" ref="navSection">
        <ColorSlider varName="--background-primary" label="Main"/>
        <ColorSlider varName="--image-background" label="Image"/>
        <ColorSlider varName="--menu-background" label="Menu"/>
        <ColorSlider varName="--icon-header-text" label="Header"/>
        <ColorSlider varName="--header-icon" label="Header Icon"/>
        <ColorSlider varName="--container" label="Text Box"/>
    </nav>

    <div class="main-area margin-top flex-container" :style="{paddingLeft: margin}">
      <div class="row-padding">
        <section class="third">
          <div class="white text-grey card-4">
            <div class="display-container" ref="displayContainer">
              <img class="profile-pic" src="../assets/profile_pic.png" alt="Profile" width="100%" height="auto"
                @load="updateThirdHeight" ref="profilePic">
            </div>
            <div class="container" :style="{ height: thirdHeight }" ref="thirdSection">
              <p><i class="fa-solid fa-briefcase fa-fw large margin-right text-teal label-icon"></i>Full Stack Web
                Developer</p>
              <p><i class="fa fa-home fa-fw margin-right large text-teal label-icon label-icon"></i>Centerville, UT</p>
              <p class="email_address" title="nickkrivanec@gmail.com"><i
                  class="fa fa-envelope fa-fw margin-right large text-teal label-icon"></i>nickkrivanec@gmail.com</p>
              <hr>
              <p class="large"><b><i class="fa fa-asterisk fa-fw margin-right text-teal label-icon"></i>Skills</b></p>

              <div class="code_icons">
                <p v-show="!showIcons" class="code_icon_text">C#, JavaScript, HTML, CSS, T-SQL</p>
                <div v-show="showIcons">
                  <span title="C#" class="csharp_icon"></span>
                  <span title="JavaScript" class="js_icon"></span>
                  <span title="HTML" class="html_icon"></span>
                  <span title="CSS" class="css_icon"></span>
                  <span title="T-SQL" class="sql_icon"></span>
                </div>
              </div>
              <div class="status-bar light-grey round-xlarge small">
                <div class="status-bar-fill container center round-xlarge" style="width:90%">Expert</div>
              </div>
              <div class="code_icons">
                <p v-show="!showIcons" class="code_icon_text">C++, C, Python, Java, SVG</p>
                <div v-show="showIcons">
                  <span title="C++" class="cpp_icon"></span>
                  <span title="C" class="c_icon"></span>
                  <span title="Python" class="python_icon"></span>
                  <span title="Java" class="java_icon"></span>
                  <span title="SVG" class="dna-spinner"></span>
                </div>
              </div>
              <div class="status-bar light-grey round-xlarge small">
                <div class="status-bar-fill container center round-xlarge" style="width:75%">Proficient</div>
              </div>
              <br>
            </div>
          </div>
          <br>
        </section>
        <section class="twothird" ref="twothirdSection">
          <div class="container card white margin-bottom">
            <h2 class="text-grey"><i class="fa-solid fa-pen-to-square fa-fw margin-right text-teal label-icon"></i>Summary</h2>
            <a href="/Nicholas_Krivanec.pdf" download class="download-resume-button">
              <i class="fa-regular fa-circle-down"></i>
              <span class="dl-text">Resume</span>
            </a>
            <div class="container">
              <p>Full Stack Developer with 5+ years of professional experience in ASP.NET Core, C#, SQL, JavaScript, HTML, CSS, and RDL. Skilled in API development and integration, building robust back-end web services with schedulers and queue processors, and executing data conversions involving complex parsing and normalization. Beyond technical expertise, I bring a unique personality and positive energy to the workplace, with a knack for fostering camaraderie—undefeated in office chess and a proud winner of "Funniest Halloween Costume" at company events.</p>
            </div>
          </div>
          <div class="container card white margin-bottom">
            <h2 class="text-grey"><i class="fa-solid fa-mug-saucer fa-fw margin-right text-teal label-icon"></i>Work Experience</h2>
     
            <DetailBox title1=" Annotation Specialist" title2="DataAnnotation" date="current"
              details="Trained and assisted AI models in coding, cataloging and evaluating over 50,000 lines of code and text data to reduce generation errors across Python, C#, Java, and JavaScript models."
              :onToggle="updateThirdHeight" />
            <DetailBox title1=" Web Developer III" title2="Justice Works" date="2019 - 2024"
              details="Led the development of case management systems serving over 1,000 users, focusing on scalability and user experience. Mentored junior developers to improve code quality and development practices. Spearheaded over 5 full-stack ASP.NET projects, incorporating custom C# libraries, API creation and integration, database management with automated jobs, and web services. Also developed a messaging platform tailored for legal communications."
              :onToggle="updateThirdHeight" />
            <DetailBox title1=" Test Administrator" title2="Pearson Vue" date="2018 - 2019"
              details="Administered 800+ high-stakes exams for thousands of candidates, maintaining full compliance with Pearson VUE protocols and achieving a flawless security record. Managed and troubleshooted 15+ desktops, ensuring seamless testing operations and swift issue resolution."
              :onToggle="updateThirdHeight" />
            <DetailBox title1=" Driver / Package Handler" title2="UPS" date="2014 - 2018"
              details="Maintained a misload frequency of 1 in 11,000, earning Employee of the Month for perfect attendance, and achieved 100% accuracy in on-time deliveries to residents and businesses."
              lastRow="true" :onToggle="updateThirdHeight" />
          </div>
          <div class="container card white margin-bottom">
            <h2 class="text-grey"><i
                class="fa-solid fa-graduation-cap fa-fw margin-right text-teal label-icon"></i>Education</h2>
            <DetailBox title1=" Weber State University" title2="" date="2015 - 2019"
              details="Associate of Science, Computer Science" lastRow="true" 
              :onToggle="updateThirdHeight" 
              :logoSrc="wsuLogoPath" />
          </div>
          <div class="container card white margin-bottom">
            <h2 class="text-grey"><i class="fa fa-code fa-fw margin-right text-teal label-icon"></i>Projects</h2>
            <div class="container">
              <h5 class="opacity"><b></b></h5>
              <p><a href="https://github.com/nicholaskrivanec" target="_blank">View on GitHub</a></p>
            </div>
          </div>
        </section>
      </div>
    </div>

    <footer class="container margin-top">
      <p>Find me on social media.</p>
      <span class="foot_icon">
        <a href="https://www.facebook.com/nickkrivanec" title="www.facebook.com/nickkrivanec" target="_blank">
          <i title="Facebook" class="fa fa-lg fa-facebook-official footer_link"></i>
        </a>
      </span>
      <span class="foot_icon">
        <a href="https://www.instagram.com/nickkrivanec" title="www.instagram.com/nickkrivanec" target="_blank">
          <i title="Instagram" class="fa fa-lg fa-instagram footer_link"></i>
        </a>
      </span>
      <span class="foot_icon">
        <a href="https://www.linkedin.com/in/nkrivanec" title="www.linkedin.com/in/nkrivanec" target="_blank">
          <i title="LinkedIn" class="fa fa-lg fa-linkedin footer_link"></i>
        </a>
      </span>
      <span class="foot_icon">
        <a href="https://github.com/nicholaskrivanec" title="www.github.com/nicholaskrivanec" target="_blank">
          <i title="GitHub" class="fa fa-lg fa-github footer_link"></i>
        </a>
      </span>
    </footer>
  </div>
</template>


<script>
  import wsuLogo from '../assets/wsu-logo.svg';
  import DetailBox from '../components/DetailBox.vue';
  import ColorSlider from '../components/ColorSlider.vue';
  import ToggleSwitch from '../components/ToggleSwitch.vue';

  export default {
    name: 'HomeView'
    , components: { DetailBox, ToggleSwitch, ColorSlider }
    , data() {
      return {
        margin: 'auto',
        thirdHeight: 'auto',
        showIcons: (localStorage.getItem("iconMode") ?? "enabled") === "enabled",
        isDarkMode: (localStorage.getItem("darkMode") ?? "enabled") === "enabled",
        showColors: (localStorage.getItem("colorMode") ?? "enabled") === "enabled",
        wsuLogoPath: wsuLogo
      };
    },
    methods: {
      toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        document.body.classList.toggle("dark-mode", this.isDarkMode);
        localStorage.setItem("darkMode", this.isDarkMode ? "enabled" : "disabled");
      },
      toggleIcons() {
        this.showIcons = !this.showIcons;
        localStorage.setItem("iconMode", this.showIcons ? "enabled" : "disabled");
      },
      toggleColors() {
        this.showColors = !this.showColors;
        localStorage.setItem("colorMode", this.showColors ? "enabled" : "disabled");
        this.$nextTick(()=> {this.updatePadding();});
      },
      updateThirdHeight() {
        if (window.innerWidth <= 601)
          this.thirdHeight = "inherit";
        else {
          const twothirdHeight = this.$refs.twothirdSection?.clientHeight || 0;
          const displayContainerHeight = this.$refs.displayContainer?.clientHeight || 0;
          this.thirdHeight = `${twothirdHeight - displayContainerHeight - 16}px`;
        }
      }
      ,updatePadding() {
        const navSection = this.$refs.navSection; 
        if (navSection) {
          const navWidth = navSection.offsetWidth;

          this.margin = `${navWidth}px` ;
        }

        this.$nextTick(()=> {this.updateThirdHeight();});
      }


    },
    mounted() {
      if (this.isDarkMode) document.body.classList.add("dark-mode");
      if (this.showColors) 
      window.addEventListener("resize", this.updateThirdHeight);
      document.body.classList.remove('preload');
      this.$nextTick(()=> {this.updatePadding();});
    },
    beforeUnmount() {
      window.removeEventListener("resize", this.updateThirdHeight);
    }
  };
</script>

<style scoped></style>
