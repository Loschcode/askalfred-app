<template>
  <notifications
    group="default"
    :max="2"
  >
    <template
      slot="body"
      slot-scope="props"
    >
      <!-- Notification area -->

      <div class="row center-xs">
        <div class="col-xs-12 col-sm-8 col-md-9 col-lg-8">
          <div
            class="custom-notifications"
            @click="props.close"
          >
            <div class="row middle-xs">
              <div
                v-if="props.item.type === 'error'"
                class="col-xs-3 col-md-3 +no-padding"
              >
                <img src="/images/notifications/error.svg">
              </div>

              <div
                v-if="props.item.type === 'success'"
                class="col-xs-3 col-md-3 +no-padding"
              >
                <img src="/images/notifications/success.svg">
              </div>

              <div class="col-xs-9 col-sm-9 +no-padding-left">
                <a class="title">{{ props.item.title }}</a>
                <!-- eslint-disable-next-line -->
                <div v-html="props.item.text" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </notifications>
</template>

<script>
export default {
  name: 'CustomNotifications',

  data () {
    return {
    }
  }

}
</script>

<style lang="scss" scoped>
.custom-notifications {
  color: $color-soft-grey;
}
</style>
