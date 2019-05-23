
<template>
  <div class="modal-locked">
    <div class="container-fluid content">
      <div class="row center-xs">
        <div class="col-xs-12">
          <div class="modal__icon">
            <img src="/images/modals/locked.svg">
          </div>
          <h2 v-if="title">
            {{ title }}
          </h2>
          <p>
            {{ content }}
          </p>
          <div class="modal__call-to-action">
            <span
              class="button button__white-on-blue"
              @click="action()"
            >
              {{ buttonLabel }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalsContentsLocked',
  props: {
    buttonLabel: { type: String, default: 'Back' },
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    action: { type: Function, default: () => {} }
  }
}
</script>

<style scoped lang="scss">
.modal-locked {
  position: relative;
  margin-top: spacing(7);

  h2 {
    color: $color-blue-purple;
    font-weight: 400;
  }
  p {
    margin: spacing(2);
    font-weight: 200;
    font-size: sizing(3);
  }
}
</style>
