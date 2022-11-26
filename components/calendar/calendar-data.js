export const SESSION_TYPES = [
  {
    type: 'Exploration Call',
    time: 20,
    url: `https://calendly.com/davidbaarsomatics/exploration-call`,
  },
  {
    type: 'Somatic Bodywork',
    time: 60,
    url: `https://calendly.com/davidbaarsomatics/60-min-somatic-bodywork`,
  },
  {
    type: 'Somatic Coaching',
    time: 60,
    url: `https://calendly.com/davidbaarsomatics/60-min-somatic-coaching`,
  },
]

// CALENDLY WIDGET CONFIG
export const pageSettings = {
  backgroundColor: 'ffffff',
  hideEventTypeDetails: false,
  hideLandingPageDetails: false,
  primaryColor: '235157',
  textColor: '4d5055',
}

export const prefill = {
  email: 'test@test.com',
  firstName: 'Jon',
  lastName: 'Snow',
  name: 'Jon Snow',
  date: new Date(Date.now() + 86400000),
}
