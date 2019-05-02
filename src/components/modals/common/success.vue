
<template>
  <div class="modal-success">
    <div class="wrap container">
      <div class="row center-xs">
        <div class="col-md-12">
          <div class="modal-success__icon">
            <img src="/modals/check.svg" />
          </div>
          <h2>{{ title }}</h2>
          <p>
            {{ content }}
          </p>
          <div class="modal-success__call-to-action">
            <span
              @click="action()"
              class="button button__white-on-blue"
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
    title: '',
    content: '',
    action: { type: Function }
  }
}
</script>

<style scoped lang="scss">
.modal-success {
  position: relative;
  margin-top: spacing(7);

  h1 {
  }
  p {
    margin: spacing(2);
    color: $text-modal-color;
    font-weight: 400;
    font-size: sizing(3);
  }
}

.modal-success__call-to-action {
  position: absolute;
  font-weight: bold;
  @include absolute-center();
  bottom: big-spacing(-1.3);
}

.modal-success__icon {
  position: absolute;
  @include absolute-center();
  top: big-spacing(-2);
  img {
    width: spacing(17);
  }
}
</style>
