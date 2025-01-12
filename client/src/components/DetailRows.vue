<template>
  <div class="detail-rows container card">
    <div class="header-row card">
      <h5
        :class="[data.headers[0].class || 'col-1']"
      >
        <fa-icon
          :icon="[allExpanded ? 'fas' : 'fas', allExpanded ? 'caret-down' : 'caret-right']"
          class="fa-fw"
          @click="toggleAll"
        />

        <span @click="setSort(0)">
          {{ data.headers[0].value }}
        </span>
      </h5>
      <h5
        v-for="(header, index) in data.headers.slice(1)"
        :key="index"
        :class="header.class"
        @click="setSort(index + 1)"
      >
        {{ header.value }}
      </h5>
    </div>
    <detail-row
      v-for="(row, index) in sortedData.rows"
      :key="index"
      :cols="row.cols"
      :details="row.details"
      :isExpanded="row.isExpanded"
      :lastRow="index === sortedData.rows.length - 1"
      @toggle="onToggle(row)"
    />
  </div>
</template>



<script>
import { ref, nextTick, computed } from "vue";

export default {
  name: "DetailRows",
  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({ rows: [], headers: [], class: "" }),
    },
    onToggleAll: {
      type: Function,
      required: false,
      default: null,
    },
  },

  setup(props, { emit }) {
    const sortedColumn = ref(null); // Tracks currently sorted column index
    const sortOrder = ref("asc");   // Tracks sort order (asc/desc)
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

    const setSort = (index) => {
      if (sortedColumn.value === index) {
        sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
      } else {
        sortedColumn.value = index;
        sortOrder.value = "asc"; 
      }
    };

    const sortedData = computed(() => {
      if (sortedColumn.value === null) return props.data;

      const compare = (a, b) => {
        const valueA = (a.cols[sortedColumn.value].value || "").toString().toLowerCase();
        const valueB = (b.cols[sortedColumn.value].value || "").toString().toLowerCase();

        if (valueA < valueB) return sortOrder.value === "asc" ? -1 : 1;
        if (valueA > valueB) return sortOrder.value === "asc" ? 1 : -1;
        return 0;
      };

      const sortedRows = [...props.data.rows].sort(compare);

      return {
        ...props.data,
        rows: sortedRows,
      };
    });

    return {
      allExpanded,
      toggleAll,
      onToggle,
      setSort,
      sortedData,
    };
  },
};
</script>

<style>
.detail-rows.container.card,
.detail-rows .container {
  padding:0px;
  margin:0px;
}
.header-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    text-align: left;
    -webkit-user-select: none;
    user-select: none;
}
.header-row .col-1, 
.header-row .col-2, 
.header-row .col-3 {
    width: 33%;
}

.header-row .col-1 {
    margin-left: 10px;
}
.projects a {
    display: inline-block;
    color: inherit;
    background-color: transparent;
    text-decoration: none;
    cursor: pointer;
    transition: .3s;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    line-height: di;
}

details.container {
  margin: 0px 0px 0px 0px;
  padding: 0px 0px 0px 0px;
}


.projects .header-row .col-1 span:hover, 
.projects .header-row .col-2:hover, 
.projects .header-row .col-3:hover, 
.about .header-row .col-1 span:hover, 
.about .header-row .col-2:hover, 
.about .header-row .col-3:hover {
    color: var(--hover-text);
    cursor: pointer;
}


.projects .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
    box-shadow: 0 2px 5px 0 var(--box-shadow-light),0 2px 10px 0 var(--box-shadow-light2);
    background-color: var(--menu-background);
}
.projects .header-row .col-1 {
    padding-left: 10px;
}
.projects .header-row h5.col-3 {
    padding-right: 20px;
}

.header-row.card svg.svg-inline--fa.fa-fw:hover {
    color: var(--hover-text);
}

</style>
