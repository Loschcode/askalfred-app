<template>
  <div class="legal-notice">
    <!-- Title -->
    <div class="row center-xs">
      <div class="col-xs-10">
        <div class="title">
          <h1>Legal notice</h1>
        </div>
      </div>
    </div>

    <!-- Can I get your email? -->
    <div class="row center-xs">
      <div class="col-xs-10 col-md-8">
        <div class="form">
          <div class="page">
            <h3>1. Legal information</h3>

            <p>We hereby inform you that:</p>

            <p>AskAlfred is published by the french company 753-806-413-00013 (“AskAlfred,” “we,” or “us”)</p>

            <p>The organisation providing direct and ongoing storage is: DigitalOcean LLC</p>

            <h3>2. Limitations to liability</h3>

            <p>User acknowledges that he/she has read these Terms of Use and agrees to comply with them.</p>

            <p>The user of the AskAlfred acknowledges that he/she has the competence and ability required to access and utilise this site.</p>

            <p>The user of the AskAlfred acknowledges that he/she has verified that the computer equipment being utilised does not contain any virus and that it is in perfect working order.</p>

            <p>Information supplied by AskAlfred is only a guideline and does not give user any additional personalised analysis.</p>

            <p>AskAlfred does not guarantee that the information disseminated through its Website askalfred.app is accurate, complete and up to date.</p>

            <p>Consequently, user acknowledges that he/she is exclusively responsible for the use of this information.</p>

            <h3>3. Data protection</h3>

            <p>Automatic processing of name-related data from the Web site of AskAlfred was dealt with pursuant to the requirements of the French Data Protection Acts (CNIL Act 1978 – LIL Act 2004).</p>

            <p>Specifically, pursuant to the French Data Protection Act, user is notified that any information he/she submits via the Livestorm forms is needed so that his/her request can be answered; this information is sent to AskAlfred, which is responsible for processing the data for administrative and business purposes.</p>

            <p>User is notified that he/she has the right of access, query and rectification; this right allows him/her to correct, complete, update, lock or remove any personal information that is inaccurate, incomplete, ambiguous, out-of-date, or of which the collection, use, communication or retention is prohibited.</p>

            <p>User also has the right to object, for legitimate reasons, to the processing of his/her data, as well as the right to object to the use of this information for generating sales leads.</p>

            <h3>4. Cookies</h3>

            <p>User is notified that when he/she visits the Website askalfred.app and askalfred.to, a cookie may install itself automatically on his/her browser software.</p>

            <p>A cookie is a block of data that does not allow identification of users but which enables the saving of information concerning users' browsing on the Website.</p>

            <p>The browser software's parameterisation allows detection of the presence of a cookie and the possible refusal of said cookie. In this case, certain AskAlfred features may no longer be available.</p>

            <p>User possesses all of the aforementioned rights concerning information of a personal nature that is communicated by and through cookies under the terms indicated above.</p>

            <p>Users who access, or may have access to, information of a personal nature must refrain from any collection, inappropriate usage in general, and action that may undermine a person's private life or reputation.</p>

            <h3>5. Intellectual property</h3>

            <p>The Website's overall structure, as well the software, text, animated and non-animated images, know-how and any other elements that make up the Livestorm, are the exclusive property of AskAlfred.</p>

            <p>Any total or partial reproduction of this website by any person, without the express authorisation of AskAlfred, is prohibited and constitutes an infringement penalised under French copyright law.</p>

            <p>The same holds true for databases included on the Livestorm Website and protected by provisions in the Data Protection Act of 1998, transposing the directive of March 11, 1996, concerning legal protection of databases, and of which AskAlfred is a producer.</p>

            <p>
              The symbols representing AskAlfred and its partners, as well as the logos appearing at the Livestorm Website, are registered trade/service marks.
            </p>

            <p>Therefore, any total or partial reproduction of these symbols or logos taken from elements within the Website, without the express authorisation of AskAlfred, is prohibited under the French law.</p>

            <p>AskAlfred shall not be held responsible for users' access, via hypertext links inserted into the Livestorm Internet site's framework, that point to other resources existing on the network.</p>

            <p>Any dispute concerning the use of the Web site of AskAlfred is subject to the French laws. User acknowledges that the appropriate courts in France have exclusive jurisdiction.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Back footer -->
    <div class="row center-xs">
      <div class="footer-placeholder" />
      <div class="footer">
        <a @click="goBack()">Back</a>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'LegalNotice',
  props: {
  },

  methods: {
    goBack () {
      router.go(-1) || router.push({ path: '/connect/sign-in' })
    }
  }
}
</script>

<style scoped lang="scss">
.title {
  margin-top: 4em;
  margin-bottom: 2em;
  h1 {
    font-size: sizing(8);
  }
}

.page {
  p {
    font-size: sizing(2.7);
    text-align: justify;
    margin-bottom: 1em;
  }
}

.confirm {
  padding-top: 3em;
}

.confirm__back {
  margin-top: 0.7em;
  a {
    color: $color-white;
  }
}

.footer-placeholder {
  margin: 2em;
}

.footer {
  position: absolute;
  bottom: 0;
  padding: 1em;
  color: $color-white;
  a {
    color: $color-white;
  }
}
</style>
