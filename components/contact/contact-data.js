import { MapsIcon, TwitterIcon, LinkedInIcon } from "../_svg/business-icons";

export const CONTACT_CONTENT = {
  blurbContent: {
    header: (
      <>
        Let's have a
        <br />
        Conversation.
      </>
    ),
    text: (
      <>
        Unclear if somatic coaching and/or somatic bodywork is for you? That's OK, and let's have a conversation about it.
        <br />
        So far I’ve worked with movement organizers, entrepreneurs, executives, leaders, young professionals, members of the Navy, soon-to-be parents, current and former professional and olympic athletes, and many other identities people carry.
        <br />I think somatic coaching and bodywork can benefit all, and at the same time is not for everyone. I am also not the coach/bodyworker for everyone. That's OK, too.
      </>
    ),
  },
  contacts: ['david@emergingsomatics.com', '+1 213 308 7012'],
  socials: [
    {
      icon: <MapsIcon />,
      url: 'maps.google.com',
    },
    {
      icon: <TwitterIcon />,
      url: 'twitter.com',
    },
    {
      icon: <LinkedInIcon />,
      url: 'linkedin.com',
    },
  ],
}
