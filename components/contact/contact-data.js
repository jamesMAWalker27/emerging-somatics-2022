import { MapsIcon, TwitterIcon, LinkedInIcon } from "../_svg/business-icons";

export const CONTACT_CONTENT = {
  blurbContent: {
    header: <>
      Let's have a
      <br />
      Conversation.
    </>,
    text: `Donec maximus tellus id convallis tristique. Duis quis ex non erat mattis hendrerit eu non orci. Integer dapibus elit quis tristique placerat. `
  },
  contacts: [
    'david@emergingsomatics.com',
    '+1 213 308 7012',
  ],
  socials: [
    {
      icon: <MapsIcon />,
      url: 'maps.google.com'
    },
    {
      icon: <TwitterIcon />,
      url: 'twitter.com'
    },
    {
      icon: <LinkedInIcon />,
      url: 'linkedin.com'
    }
  ],
}
