export const SESSION_TYPES = [
  { type: 'Consult', dur: 45 },
  { type: 'Regular', dur: 90 },
  { type: 'Team', dur: 240 },
]

// CALENDLY
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
