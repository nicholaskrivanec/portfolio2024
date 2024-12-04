<template>
  <div>
    <menu-bar @toggle-icons="toggleIcons" @toggle-dark-mode="toggleDarkMode" />

    <div class="main-area flex-container row-padding">
      <section class="third">
        <div class="card-2">
          <div class="display-container" ref="displayContainer">
            <img class="profile-pic" src="../assets/profile_pic.png" alt="Profile" width="100%" height="auto"
              @load="updateThirdHeight" ref="profilePic">
          </div>
          <div class="container" :style="{ height: thirdHeight }" ref="thirdSection">
            <h6 class="picture-title">Nicholas Krivanec</h6>
            <p><fa-icon :icon="['fas', 'briefcase']" class="fa-fw" />Full Stack Web Developer</p>
            <p><fa-icon :icon="['fas', 'home']" class="fa-fw" />Centerville, UT</p>
            <p class="email_address" title="nickkrivanec@gmail.com"><fa-icon :icon="['fas', 'envelope']"
                class="fa-fw" />nickkrivanec@gmail.com</p>
            <hr>

            <p class="skills-label">
              <b><fa-icon :icon="['fas', 'asterisk']" class="fa-fw" />Skills</b>
            </p>
            <div class="code-icons">
              <p v-show="!showIcons" class="code_icon_text">C#, JavaScript, HTML, CSS, T-SQL</p>
              <div class="flex-row" v-show="showIcons">
                <span title="C#" class="csharp_icon"></span>
                <span title="JavaScript" class="js_icon"></span>
                <span title="HTML" class="html_icon"></span>
                <span title="CSS" class="css_icon"></span>
                <span title="T-SQL" class="sql_icon"></span>
              </div>
            </div>
            <div class="status-bar">
              <div class="status-bar-fill" style="width:90%">Expert</div>
            </div>
            <div class="code-icons">
              <p v-show="!showIcons" class="code_icon_text">C++, C, Python, Java, SVG</p>
              <div class="flex-row" v-show="showIcons">
                <span title="C++" class="cpp_icon"></span>
                <span title="C" class="c_icon"></span>
                <span title="Python" class="python_icon"></span>
                <span title="Java" class="java_icon"></span>
                <span title="SVG" class="dna-spinner"></span>
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
            :onToggle="updateThirdHeight">
            Trained and assisted AI models in coding, cataloging and evaluating over 50,000 lines of code and text data
            to reduce generation errors across Python, C#, Java, and JavaScript models.
          </detail-box>
          <detail-box title1="Web Developer III" title2="Justice Works" date="2019 - 2024"
            :onToggle="updateThirdHeight">
            Led the development of case management systems serving over 1,000 users, focusing on scalability and user
            experience. Mentored junior developers to improve code quality and development practices. Spearheaded over 5
            full-stack ASP.NET projects, incorporating custom C# libraries, API creation and integration, database
            management with automated jobs, and web services. Also developed a messaging platform tailored for legal
            communications.
          </detail-box>
          <detail-box title1="Test Administrator" title2="Pearson Vue" date="2018 - 2019" :onToggle="updateThirdHeight">
            Administered 800+ high-stakes exams for thousands of candidates, maintaining full compliance with Pearson
            VUE protocols and achieving a flawless security record. Managed and troubleshooted 15+ desktops, ensuring
            seamless testing operations and swift issue resolution.
          </detail-box>
          <detail-box title1="Driver / Package Handler" title2="UPS" date="2014 - 2018" lastRow="true"
            :onToggle="updateThirdHeight">
            Maintained a misload frequency of 1 in 11,000, earning Employee of the Month for perfect attendance, and
            achieved 100% accuracy in on-time deliveries to residents and businesses.
          </detail-box>
        </div>

        <div class="container card">
          <h2 class="header-icon"><fa-icon :icon="['fas', 'fa-graduation-cap']" class="fa-fw" />Education</h2>
          <detail-box title1="Weber State University" title2="" date="2015 - 2019" lastRow="true"
            :onToggle="updateThirdHeight" :logoSrc="wsuLogoPath">Associate of Science, Computer Science</detail-box>
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
</template>


<script>
import wsuLogo from '../assets/wsu-logo.svg';

export default {
  name: 'HomeView'

  , data() {
    return {
      padding: '0'
      , thirdHeight: 'auto'
      , showIcons: (localStorage.getItem("iconMode") ?? "enabled") === "enabled"
      , wsuLogoPath: wsuLogo
    };
  }
  , methods: {
    toggleIcons(data) {
      this.showIcons = data;
      localStorage.setItem("iconMode", this.showIcons ? "enabled" : "disabled");
    }

    , updateThirdHeight() {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 601)
        this.thirdHeight = "inherit";
      else {
        const twothirdHeight = this.$refs.twothirdSection?.clientHeight || 0;
        const displayContainerHeight = this.$refs.displayContainer?.clientHeight || 0;
        this.thirdHeight = `${twothirdHeight - displayContainerHeight - 16}px`;
      }
    }
  }
  , mounted() {
    window.addEventListener("resize", this.updateThirdHeight);
  }
  , beforeUnmount() {
    window.removeEventListener("resize", this.updateThirdHeight);
  }
  
}

</script>

<style scoped></style>
