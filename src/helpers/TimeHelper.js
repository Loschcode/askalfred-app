import moment from 'moment'

class TimeHelper {
  ago (date) {
    return moment(date).fromNow()
  }

  approxDisplay (timeSpent) {
    const inMinutes = timeSpent / 60
    if (inMinutes < 5) return 'Less than 5 minutes'
    if (inMinutes < 10) return 'Less than 10 minutes'
    if (inMinutes < 15) return 'Less than 15 minutes'
    if (inMinutes < 20) return 'Less than 20 minutes'
    if (inMinutes < 30) return 'Less than 30 minutes'
    if (inMinutes < 45) return 'Less than 45 minutes'
    if (inMinutes < 60) return 'Less than 1 hour'
    if (inMinutes < 120) return 'Less than 2 hours'
    if (inMinutes < 180) return 'Less than 3 hours'
    if (inMinutes >= 180) return 'More than 3 hours'
  }

  exactDisplay (timeSpent) {
    let format = null

    if (timeSpent <= 59) {
      format = 'ss\\s\\e\\c'
    } else if (timeSpent <= 59 * 60) {
      format = 'mm\\m\\i\\n ss\\s\\e\\c'
    } else if (timeSpent <= 59 * 60 * 24) {
      format = 'HH\\h mm\\m\\i\\n ss\\s\\e\\c'
    } else {
      format = 'D\\d HH\\h mm\\m ss\\s\\e\\c'
    }

    const endWorked = timeSpent * 1000

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
