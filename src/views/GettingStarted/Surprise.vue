<template>
  <div class="surprise">
    <!-- Title -->
    <div class="row center-xs">
      <div class="col-xs-10">
        <div class="title">
          <h1>Surprise!</h1>
        </div>
      </div>
    </div>

    <!-- Can I get your email? -->
    <div class="row center-xs">
      <div class="col-xs-10 col-md-6">
        <div class="form">
          <div class="form__question">
            <p>I’m glad you confirmed your email [NAME].</p>
            <p>I’ll offer you 20 minutes of my time to try everything by yourself for free.</p>
            <p>Ask me anything.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row center-xs">
      <div class="col-xs-10 col-md-5">
        <div class="image">
          <img src="/images/getting-started/surprise.svg" >
        </div>
      </div>
    </div>

    <!-- Call To Action -->
    <div class="row center-xs">
      <div class="col-xs-9 col-md-4">
        <div class="confirm">
          <div class="button button--half-squared button__white-on-blue button__white-on-blue--soft">
            <a href="#">Get 20 minutes for free</a>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'Surprise',
  props: {
  }
}
</script>

<style scoped lang="scss">
.title {
  margin-top: 4em;
  margin-bottom: 2em;
}

.form {
  input {
    @include transparent-input();
  }
}

.form__question {
  p {
    font-weight: 300;
    font-size: sizing(4);
    margin-bottom: 1em;
  }
}

.image {
  padding-top: 2em;
  width: 25vh;
  text-align: center;
  margin: auto;
  img {
    margin-left: -2em;
  }
}

.confirm {
  padding-top: 3em;
}
</style>
