<template>
  <div class="configure">
    <div class="configure__module">
      <module-list></module-list>
    </div>
    <div class="configure__preview">
      <module-preview></module-preview>
      <module-preview mode="show"></module-preview>
    </div>
    <div class="configure__edit">
      <module-edit></module-edit>
    </div>
  </div>
</template>

<script>
import ModuleList from '@/components/ModuleList'
import ModulePreview from '@/components/ModulePreview'
import ModuleEdit from '@/components/ModuleEdit'

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
    flex: 1;
  }
}
</style>
