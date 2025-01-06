<template>
    <div class="grid">
      <div class="grid-header">
        <div 
          v-for="(header, index) in headers" 
          :key="index" 
          class="grid-header-cell"
          :style="{ width: columnWidths[index] || 'auto' }"
          @click="onSort(index)"
          :class="{ sortable: isSortable }">
          {{ header }}
          <span v-if="isSortable">{{ getSortIndicator(index) }}</span>
        </div>
      </div>
      <div class="grid-body">
        <div 
          v-for="(row, rowIndex) in sortedRows" 
          :key="rowIndex" 
          class="grid-row-wrapper">
          <div 
            class="grid-row"
            @click="toggleExpand(rowIndex)">
            <div 
              v-for="(cell, cellIndex) in row" 
              :key="cellIndex" 
              class="grid-cell"
              :style="{ width: columnWidths[cellIndex] || 'auto' }">
              {{ cell }}
            </div>
          </div>
          <div v-if="expandedRows.includes(rowIndex)" class="grid-row-details">
            <slot name="details" :row="row"></slot>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  
  export default {
    name: 'Grid',
    props: {
      headers: {
        type: Array,
        required: true,
      },
      rows: {
        type: Array,
        required: true,
      },
      columnWidths: {
        type: Array,
        default: () => [],
      },
      selectable: {
        type: Boolean,
        default: false,
      },
      isSortable: {
        type: Boolean,
        default: true,
      },
    },
    setup(props, { emit }) {
      const selectedRowIndex = ref(null);
      const sortColumnIndex = ref(null);
      const sortDirection = ref('asc'); // 'asc' or 'desc'
      const expandedRows = ref([]);
  
      const onRowClick = (row, index) => {
        if (props.selectable) {
          selectedRowIndex.value = index;
          emit('row-selected', { row, index });
        }
      };
  
      const onSort = (index) => {
        if (!props.isSortable) return;
        if (sortColumnIndex.value === index) {
          sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
        } else {
          sortColumnIndex.value = index;
          sortDirection.value = 'asc';
        }
      };
  
      const getSortIndicator = (index) => {
        if (sortColumnIndex.value === index) {
          return sortDirection.value === 'asc' ? '▲' : '▼';
        }
        return '';
      };
  
      const sortedRows = computed(() => {
        if (sortColumnIndex.value === null) return props.rows;
  
        return [...props.rows].sort((a, b) => {
          const valA = a[sortColumnIndex.value];
          const valB = b[sortColumnIndex.value];
  
          if (valA < valB) return sortDirection.value === 'asc' ? -1 : 1;
          if (valA > valB) return sortDirection.value === 'asc' ? 1 : -1;
          return 0;
        });
      });
  
      const toggleExpand = (rowIndex) => {
        if (expandedRows.value.includes(rowIndex)) {
          expandedRows.value = expandedRows.value.filter((i) => i !== rowIndex);
        } else {
          expandedRows.value.push(rowIndex);
        }
      };
  
      return {
        selectedRowIndex,
        onRowClick,
        sortedRows,
        onSort,
        getSortIndicator,
        expandedRows,
        toggleExpand,
      };
    },
  };
  </script>
  
  <style>
  .grid {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    overflow: hidden;
    /* background-color:var(--container);
    color: var(--container-text); */
  }
  
  .grid-header {
    display: flex;

    /* background-color:var(--container);
    color: var(--container-text); */
  }
  
  .grid-header-cell {
    padding: 0.5rem;
    font-weight: bold;
    text-align: left;

    cursor: pointer;
    user-select: none;
    background-color:var(--container);
    color: var(--container-text);
  }
  
  .grid-header-cell.sortable:hover {
    background-color: #e9f5ff;
  }
  
  .grid-body {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    background-color:var(--container);
    color: var(--container-text);
  }
  
  .grid-row-wrapper {
    display: flex;
    flex-direction: column;
    background-color:var(--container);
    color: var(--container-text);
  }
  
  .grid-row {
    display: flex;
    cursor: pointer;
    background-color:var(--container);
    color: var(--container-text);
  }
  
  .grid-row:hover {
    background-color: var(--hover-background);
    color: var(--hover-text);
  }
  
  .grid-row-details {
    padding: 0.5rem;
    background-color:var(--container);
    color: var(--container-text);
  }
  
  .grid-cell {
    padding: 0.5rem;
    border-right: 1px solid #ddd;
    background-color:var(--container);
    color: var(--container-text);
  }
  
  .grid-row:nth-child(odd) {
    background-color:var(--container);
    color: var(--container-text);
    opacity: 0.8;
  }
  </style>
  