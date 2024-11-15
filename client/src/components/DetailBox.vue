<template>
    <details class="container" @toggle="toggleCaret">
      <summary :class="{ 'bottom-summary': lastRow }">
        <h5 class="col-1 opacity">
          <i class="fa-solid fa-caret-down" v-show="isOpen"></i>
          <i class="fa-solid fa-caret-right" v-show="!isOpen"></i>
          <b> {{ title1 }}</b>
          <img v-if="logoSrc" :src="logoSrc" class="dblogo" alt="logo" />
        </h5>
        <h6 class="col-2 text-teal">
          <i class="fa-solid fa-calendar fa-fw margin-right label-icon"></i>{{ date }}
        </h6>
      </summary>
      <h5 class="col-3 opacity"><b>{{ title2 }}</b></h5>
      <p>{{ details }}</p>
      <hr v-if="!lastRow"> 
      <br v-if="lastRow">
    </details>
  </template>
  
  <script>


  export default {
    name: 'DetailBox',
    props: {
        title1: { type: String, required: true },
        title2: { type: String, required: false },
        date: { type: String, required: false },
        details: { type: String, required: false },
        lastRow: { type: Boolean, required: false, default: false },
        onOpen: { type: Function, default: null },
        onClose: { type: Function, default: null },
        onToggle: { type: Function, default: null },
        logoSrc: { type: String, default: null } 
    }
    ,data: ()=> ({ isOpen: false })
    ,methods: {
      toggleCaret() {
        this.isOpen = !this.isOpen;
        
        if (this.onToggle) 
            this.onToggle();
        if (this.isOpen && this.onOpen) 
            this.onOpen();
        if (!this.isOpen && this.onClose) 
            this.onClose();
      }
    }
  }
  </script>
  
  <style scoped>
    summary {
        display: flex;
        width: 100%;
        align-items: flex-start;
        flex-direction: row;
        justify-content: space-between;
        cursor: pointer;
        padding: 0px 8px 0px 8px;
        margin-left: -10px;
        margin-top: 10px;
        border: solid 2px transparent;
        border-radius: 10px;
    }
    body.dark-mode summary, body.dark-mode summary .text-teal, body.dark-mode summary .opacity {
        background-color: #4f5961;
    }
    body.dark-mode summary:hover, body.dark-mode summary:hover .text-teal, body.dark-mode summary:hover .opacity {
        background-color:#1F2A33;
        color: aliceblue;
        opacity: 1 !important;
    }
    summary:hover, summary:hover .text-teal, summary:hover .opacity{
        background-color:#009688;
        color:white;
        opacity:1 !important;
    }
    summary h5 {
        cursor: pointer;
        text-align: left;
    }
    details[closed] > summary:after {
        margin-bottom: 0;
    }
    details:not([open]) summary.bottom-summary {
        margin-bottom: 16px;
    }
    summary h6.col-1{
        padding-right: 8px;
    }
    summary::marker, summary h6{
        display:inline-block;
        cursor:pointer;
    }
    h5.col-3 {
        text-align: center;
        font-size: 13pt;
        margin: 0;
    }

    @media (max-width: 601px){
        summary h6.col-1, summary h5.col-2{
            padding-right: 8px;
        }
    } 
    @media (min-width: 601px) {
        details[closed] > summary:after {
            margin-bottom: 0;
        }
        details.bottom-summary:not([open]) {
            margin-bottom: 16px;
        }
    }
    .container:after,
    .container:before {
        content: "";
        display: table;
        clear: both;
    }
    .container {
        padding: 0.01em 8px 0.01em 8px;
    }
    .opacity { opacity: 0.6; }
    body.dark-mode .opacity { opacity: 0.8; }

    body.dark-mode summary, body.dark-mode summary .text-teal, body.dark-mode summary .opacity {
        background-color: #4f5961;
    }
    h5 i{
        margin-right:4px;
    }
  </style>
  