
<template>
  <div class="modal-success">
    <div class="container-fluid content">
      <div class="row center-xs">
        <div class="col-xs-12">
          <div class="modal__icon">
            <img src="/images/modals/success.svg">
          </div>
          <h2>{{ title }}</h2>
          <p>
            {{ content }}
          </p>
          <div class="modal__call-to-action">
            <span
              class="button button__white-on-blue"
              @click="action()"
            >
              Continue
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalsCommonSuccess',
  props: {
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    action: { type: Function, default: () => {} }
  }
}
</script>

<style scoped lang="scss">
.modal-success {
  position: relative;
  margin-top: spacing(7);

  h2 {
    color: $color-green;
    font-weight: 400;
  }
  p {
    margin: spacing(2);
    font-weight: 200;
    font-size: sizing(3);
  }
}
</style>
