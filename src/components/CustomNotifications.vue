<template>
  <notifications group="default">
    <template
      slot="body"
      slot-scope="props"
    >
      <!-- Notification area -->

      <div class="row center-xs">
        <div class="col-xs-12 col-sm-6 col-md-5 col-lg-4">
          <div
            class="custom-notifications"
            @click="props.close"
          >
            <div class="row middle-xs">
              <div class="col-xs-3 col-md-3 +no-padding">
                <img src="/images/notifications/error.svg">
              </div>
              <div class="col-xs-9 col-sm-9 +no-padding-left">
                <a class="title">{{ props.item.title }}</a>
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
  data () {
    return {
    }
  }
}
</script>
