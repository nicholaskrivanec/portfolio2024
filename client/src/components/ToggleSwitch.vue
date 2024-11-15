<template>
  <div class="menu-toggle">
    <label class="switch-label" :for="id">{{ label }}</label>
    <label class="switch">
      <input 
        type="checkbox" 
        :id="id" 
        :checked="checked" 
        @change="onChange"
      >
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'ToggleSwitch',
  props: {
    label: {
      type: String
    },
    id: {
      type: String,
      required: true 
    },
    checked: {
      type: Boolean,
      required: true
    },
    onChange: {
      type: Function,
      required: true 
    }
  }
};
</script>
  
<style scoped>
  .switch-label {
    width: 70px;
  }
  .switch {
    position: relative;
    top: 0px;
    left: 4px;
    display: inline-block;
    width: 35px;
    height: 20px;
  }
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }
  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }
  input:checked+.slider {
    background-color: #003366 !important;
  }
  input:checked+.slider:before {
    -webkit-transform: translateX(13px);
    -ms-transform: translateX(13px);
    transform: translateX(13px);
  }
  .slider.round {
    border-radius: 14px;
  }
  .slider.round:before {
    border-radius: 50%;
  }
</style>
  