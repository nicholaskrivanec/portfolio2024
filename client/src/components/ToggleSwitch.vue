<template>
  <div class="menu-toggle">
    <label class="switch-label" :for="id">{{ label }}</label>
    <label class="switch">
      <input type="checkbox" :id="id" :checked="checked" @change="onChange">
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'ToggleSwitch',
  // data(){
  //   return {eventName: this.onChange}
  // }
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
.menu-toggle {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.menu-toggle label {
  margin-right: 10px;
  color: var(--menu-text);
  font-size: 14px;
  cursor: pointer;
}

#icon-toggle {
  margin-left: 10px;
  font-size: 10pt;
  user-select: none;
}

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
  background-color: var(--slider-background1);
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
  background-color: var(--slider);
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked+.slider {
  background-color: var(--slider-background2) !important;
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

.light_dark_mode_btn {
  font-size: 26px;
  cursor: pointer;
  user-select: none;
  color: var(--slider-background);
}
</style>