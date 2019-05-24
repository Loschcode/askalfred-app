import moment from 'moment'

class TimeHelper {
  ago (date) {
    return moment(date).fromNow()
  }

  exactDisplay (worked) {
    let format = null

    if (worked <= 59) {
      format = 'ss\\s\\e\\c'
    } else if (worked <= 59 * 60) {
      format = 'mm\\m\\i\\n ss\\s\\e\\c'
    } else if (worked <= 59 * 60 * 24) {
      format = 'HH\\h mm\\m\\i\\n ss\\s\\e\\c'
    } else {
      format = 'D\\d HH\\h mm\\m ss\\s\\e\\c'
    }

    const endWorked = worked * 1000

    return moment.utc(moment.duration(endWorked).asMilliseconds()).format(format)
  }

  setLocales () {
    moment.updateLocale('en', {
      relativeTime: {
        future: 'in %s',
        past: '%s',
        s: 'right now',
        ss: '%ss ago',
        m: '1m ago',
        mm: '%dm ago',
        h: '1h ago',
        hh: '%dh ago',
        d: '1d ago',
        dd: '%dd ago',
        M: '1M ago',
        MM: '%dM ago',
        y: '1Y ago',
        yy: '%dY ago'
      }
    })
  }
}

export default new TimeHelper()
