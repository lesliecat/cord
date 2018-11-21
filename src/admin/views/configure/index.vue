<template>
  <div class="configure">
    <div class="configure__module">
      <module-list></module-list>
    </div>
    <div class="configure__preview">
      <module-preview></module-preview>
    </div>
    <div class="configure__edit">
      <module-edit></module-edit>
    </div>
  </div>
</template>

<script>
import ModuleList from './components/module-list'
import ModulePreview from './components/module-preview'
import ModuleEdit from './components/module-edit'

export default {
  name: 'Configure',
  components: {
    ModuleList,
    ModulePreview,
    ModuleEdit
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables';

.configure {
  display: flex;
  height: 100%;

  &__module,
  &__preview,
  &__edit {
    padding: 10px;
    overflow: auto;
  }

  &__module {
    flex: 1;
  }

  &__preview {
    flex: 2;
    border-left: 1px solid $border-color-base;
    border-right: 1px solid $border-color-base;
  }

  &__edit {
    width: 300px;
    flex: 0 0 1;
  }
}
</style>
