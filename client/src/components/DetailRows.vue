<template>
  <div class="container">
    <!-- Header Row -->
    <div class="header-row">
      <h5 :class="[data.headers[0].class || 'col-1']" >
          <fa-icon :icon="[allExpanded ? 'fas' : 'fas', allExpanded ? 'caret-down' : 'caret-right']" class="fa-fw" @click="toggleAll" />
          {{ data.headers[0].value }}
      </h5>
      <h5 v-for="(header, index) in data.headers.slice(1)" :key="index" :class="header.class">
        {{ header.value }}
      </h5>
    </div>

    <!-- Detail Rows -->
    <detail-row
      v-for="(row, index) in data.rows"
      :key="index"
      :cols="row.cols"
      :details="row.details"
      :isExpanded="row.isExpanded"
      :lastRow="index === data.rows.length - 1"
      @toggle="onToggle(row)"
    />
  </div>
</template>

<script>
import { ref, nextTick } from "vue";
import DetailRow from "./DetailRow.vue";

export default {
  name: "DetailRows",
  components: { DetailRow },
  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({ rows: [], headers: [] }),
    },
    onToggleAll: {
      type: Function,
      required: false,
      default: null,
    },
  },
  setup(props, { emit }) {
    const allExpanded = ref(false);

    const toggleAll = () => {
      allExpanded.value = !allExpanded.value;
      props.data.rows.forEach((row) => {
        row.isExpanded = allExpanded.value;
      });
      if (props.onToggleAll) {
        nextTick(() => props.onToggleAll(allExpanded.value)); // Invoke parent's callback
      }
    };

    const onToggle = (row) => {
      if (row.onToggle) {
        nextTick(() => row.onToggle(row.isExpanded)); // Ensure parent's function gets called
      }
    };

    return {
      allExpanded,
      toggleAll,
      onToggle,
    };
  },
};
</script>

<style scoped>
.detail-rows .header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: var(--card-background);
  border-bottom: 1px solid var(--card-border);
}

.detail-rows .header-row h5 {
  margin: 0;
  text-align: center;
}

.detail-rows .toggle-all {
  margin-right: 10px;
}
.header-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    text-align: left;
    padding: 0 8px;
    -webkit-user-select: none;
    user-select: none;
    border-bottom: 1px solid;
}
.header-row .col-1, .header-row .col-2, .header-row .col-3 {
    width: 33%;
}
.code-icons span {

    background-size: 33px;

}
</style>
