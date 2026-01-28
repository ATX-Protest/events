export interface FAQArticle {
  slug: string;
  title: string;
  description: string;
  category: 'rights' | 'safety' | 'preparation' | 'legal';
  content: string; // Markdown content
  faqs: { question: string; answer: string }[];
  keywords: string[];
  priority: number;
  createdAt: string;
  updatedAt: string;
}

export const faqArticles: FAQArticle[] = [
  {
    slug: 'know-your-rights',
    title: 'Know Your Rights: Protesting in Texas',
    description:
      'Understand your First Amendment rights when protesting in Austin and Texas. Learn what police can and cannot do, and how to protect yourself legally.',
    category: 'rights',
    keywords: [
      'protest rights Texas',
      'First Amendment Austin',
      'legal rights protesters',
      'can police arrest protesters',
      'Texas protest laws',
    ],
    priority: 1,
    content: `
## Your Constitutional Rights

The First Amendment protects your right to peaceful protest. In Texas, you have the right to:

- **Assemble peacefully** in public spaces like sidewalks, parks, and plazas
- **Speak freely** and express your views, including through signs and chants
- **Record police** and other officials in public spaces
- **Distribute literature** like flyers and pamphlets

## Where You Can Protest

**Public spaces** (generally allowed):
- Sidewalks (as long as you don't block pedestrian traffic)
- Public parks during open hours
- Plazas and public squares
- Outside government buildings

**Private property** (restrictions apply):
- You need permission from the property owner
- Shopping centers and malls can restrict speech
- Businesses can ask you to leave

## Interacting with Police

If approached by police:
- Stay calm and keep your hands visible
- You have the right to remain silent
- Ask "Am I being detained?" and "Am I free to go?"
- Do not physically resist, even if you believe the arrest is unlawful
- Remember badge numbers and officer names

## What Police Cannot Do

- Arrest you solely for peacefully protesting
- Confiscate your phone or camera without a warrant
- Delete your photos or videos
- Prevent you from recording in public
- Use excessive force against peaceful protesters

## If You Are Arrested

- Exercise your right to remain silent
- Ask for a lawyer immediately
- Do not sign anything without legal counsel
- Remember: you can be arrested and still be innocent
- Document everything after release

## Legal Resources in Austin

- **ACLU of Texas**: (713) 942-8146
- **National Lawyers Guild Austin**: austinnlg@gmail.com
- **Texas Civil Rights Project**: (512) 474-5073
    `,
    faqs: [
      {
        question: 'Can I be arrested for protesting in Texas?',
        answer:
          'You cannot be arrested solely for peaceful protest. However, you can be arrested for blocking traffic, trespassing on private property, or engaging in violence. Always follow lawful police orders to disperse.',
      },
      {
        question: 'Can police take my phone at a protest?',
        answer:
          'Police generally cannot confiscate your phone without a warrant. They cannot delete your photos or videos. If they try, clearly state that you do not consent to a search.',
      },
      {
        question: 'Do I have to show ID to police at a protest?',
        answer:
          'In Texas, you must identify yourself if lawfully arrested. However, you are not required to carry ID or show ID simply because a police officer asks, unless you are driving.',
      },
      {
        question: 'Can I record police at a protest?',
        answer:
          'Yes. You have a First Amendment right to record police in public spaces. Stay at a safe distance and do not interfere with their duties.',
      },
    ],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    slug: 'protest-preparation',
    title: 'How to Prepare for a Protest in Austin',
    description:
      'Essential preparation guide for attending protests in Austin. What to bring, what to wear, and how to stay safe at demonstrations.',
    category: 'preparation',
    keywords: [
      'what to bring to a protest',
      'protest preparation',
      'Austin protest tips',
      'how to prepare for a march',
      'protest checklist',
    ],
    priority: 2,
    content: `
## Before You Go

### Plan Ahead
- Research the event: organizer, route, expected size
- Tell someone where you're going and when you expect to return
- Set up a meeting point in case you get separated from your group
- Charge your phone fully
- Write emergency contacts on your arm in permanent marker

### Know the Route
- Study the march route if available
- Identify exit points along the way
- Note locations of nearby hospitals and police stations
- Download offline maps of the area

## What to Bring

### Essentials
- **Water** - Stay hydrated, especially in Texas heat
- **Snacks** - High-energy, non-perishable foods
- **Cash** - In case you need to get home quickly
- **ID** - Keep it secure but accessible
- **Phone charger** - Portable battery pack recommended

### Health & Safety
- **Sunscreen** - Texas sun is intense
- **Hat and sunglasses** - Protection from sun and identification
- **Comfortable shoes** - You may be walking for hours
- **First aid basics** - Band-aids, pain relievers, any personal medications
- **Hand sanitizer** and **mask** - For health protection

### Communication
- **Fully charged phone**
- **Written emergency contacts** (not just in your phone)
- **Earbuds** - To hear updates from organizers

## What to Wear

### Recommended
- Comfortable, weather-appropriate clothing
- Closed-toe shoes with good support
- Layers (weather can change)
- Nothing too valuable

### Consider
- Clothes you can run in if needed
- Minimal jewelry that could get caught
- Covering identifying tattoos (optional, for privacy)

## What NOT to Bring

- Weapons of any kind
- Drugs or alcohol
- Valuable items you'd hate to lose
- Contact lenses (wear glasses if you have them - tear gas)
- Anything that could be construed as a weapon

## Day of the Protest

### Before Leaving
- Eat a good meal
- Check social media for any updates or changes
- Review your emergency contacts
- Make sure your phone location sharing is set up with a trusted person

### At the Event
- Stay aware of your surroundings
- Stick with your group
- Follow instructions from marshals and organizers
- Know where the exits are at all times
    `,
    faqs: [
      {
        question: 'What should I bring to a protest?',
        answer:
          'Essentials include water, snacks, cash, ID, a fully charged phone, sunscreen, comfortable shoes, and basic first aid supplies. Write emergency contacts on your arm in permanent marker.',
      },
      {
        question: 'What should I wear to a protest?',
        answer:
          'Wear comfortable, weather-appropriate clothing with closed-toe shoes. Avoid wearing contact lenses (tear gas), expensive jewelry, or anything that could be mistaken for a weapon.',
      },
      {
        question: 'Should I bring my phone to a protest?',
        answer:
          'Yes, but take precautions: charge it fully, bring a portable charger, enable airplane mode when not needed, and consider using encrypted messaging apps. Write down important numbers in case your phone dies or is confiscated.',
      },
    ],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    slug: 'staying-safe',
    title: 'Staying Safe at Protests: Austin Safety Guide',
    description:
      'Safety tips for protesters in Austin. Learn de-escalation techniques, what to do in emergencies, and how to protect yourself and others.',
    category: 'safety',
    keywords: [
      'protest safety tips',
      'staying safe at protests',
      'de-escalation protest',
      'Austin protest safety',
      'tear gas protection',
    ],
    priority: 3,
    content: `
## General Safety Principles

### Stay Aware
- Keep your head up and observe your surroundings
- Know where exits and escape routes are
- Watch for signs of escalation
- Stay near the edges if you're uncomfortable with crowds

### Buddy System
- Never protest alone
- Establish a meeting point if separated
- Check in with your group regularly
- Have a signal for "we need to leave now"

## De-escalation

### If Tensions Rise
- Stay calm - your demeanor affects others
- Create physical space between groups
- Use a calm, low voice
- Do not engage with counter-protesters seeking confrontation
- Move away from conflict areas

### If Someone Is Aggressive
- Do not match their energy
- Keep hands visible and non-threatening
- Give them space to disengage
- Alert marshals or organizers if available

## Emergency Situations

### If Police Disperse the Crowd
- Move calmly but quickly
- Do not run unless necessary (can cause panic)
- Help others who may be slower
- Move perpendicular to the line of police, not toward or away
- Seek indoor shelter if possible

### If Tear Gas Is Deployed
- Move upwind and uphill
- Do not rub your eyes
- Rinse eyes with water or saline (no milk - it can cause infection)
- Remove contaminated clothing when safe
- Shower in cold water (hot water opens pores)

### If Someone Is Injured
- Call for a medic if street medics are present
- Call 911 for serious injuries
- Do not move someone with a potential spinal injury
- Apply pressure to bleeding wounds
- Stay with the person until help arrives

## After the Protest

### Physical Care
- Shower and change clothes
- Wash any exposed skin
- Monitor for delayed reactions

### Emotional Care
- Protests can be emotionally intense
- Talk to friends or loved ones about your experience
- It's normal to feel a range of emotions
- Seek professional support if needed

## Emergency Contacts

- **Austin Emergency**: 911
- **Austin Police Non-Emergency**: (512) 974-5000
- **National Lawyers Guild Legal Hotline**: Check for event-specific numbers
- **SIMS Foundation** (mental health): (512) 485-8887
    `,
    faqs: [
      {
        question: 'What should I do if tear gas is used at a protest?',
        answer:
          'Move upwind and uphill away from the gas. Do not rub your eyes. Rinse with water or saline solution - not milk. Remove contaminated clothing when safe and shower in cold water later.',
      },
      {
        question: 'How do I de-escalate a confrontation at a protest?',
        answer:
          'Stay calm and keep your voice low. Create physical distance, keep your hands visible, and do not engage with people seeking confrontation. Move away from conflict areas and alert marshals if available.',
      },
      {
        question: 'What should I do if I get separated from my group?',
        answer:
          'Go to your pre-established meeting point. If you did not set one, move to the edge of the crowd and try to contact your group. Stay calm and do not panic.',
      },
    ],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    slug: 'legal-support',
    title: 'Legal Support for Protesters in Austin',
    description:
      'Find legal resources and support for protesters in Austin. Know what to do if arrested, how to find a lawyer, and your rights during and after arrest.',
    category: 'legal',
    keywords: [
      'protest legal support Austin',
      'arrested at protest Texas',
      'legal observer Austin',
      'protest lawyer Texas',
      'NLG Austin',
    ],
    priority: 4,
    content: `
## Legal Observers

Legal observers are trained volunteers who attend protests to document police behavior and support protesters' rights.

### What Legal Observers Do
- Document police actions and any rights violations
- Witness arrests and record badge numbers
- Provide information to arrested individuals
- Do not provide legal advice (they are observers, not lawyers)

### Finding Legal Observers
- Many organized protests have legal observers present
- Look for people in bright green NLG (National Lawyers Guild) hats
- Ask organizers if legal observers will be present

## If You Are Arrested

### During Arrest
1. Stay calm and do not resist physically
2. Clearly state: "I am exercising my right to remain silent"
3. Ask: "Am I being detained?" and "What am I being charged with?"
4. Do not consent to searches
5. Remember badge numbers and officer names

### After Arrest
1. Request a lawyer immediately
2. Do not sign anything without legal counsel
3. Do not discuss your case with other detainees
4. You have the right to a phone call - call your emergency contact or a lawyer
5. You will be arraigned within 48 hours in Texas

### Posting Bail
- Bail amounts vary by charge
- Contact a bail bondsman if you cannot pay full amount
- Some organizations may help with bail funds

## Legal Resources

### Austin-Area Legal Support

**National Lawyers Guild - Austin**
- Provides legal observers for protests
- Can connect you with attorneys
- Email: austinnlg@gmail.com

**ACLU of Texas**
- Know Your Rights resources
- May take cases involving civil rights violations
- Phone: (713) 942-8146

**Texas Civil Rights Project**
- Focuses on civil rights and voting rights
- Phone: (512) 474-5073

**Texas RioGrande Legal Aid**
- Free legal services for qualifying individuals
- Phone: (512) 374-2700

### What Charges Might You Face?

Common charges at protests:
- **Disorderly conduct** (Class C misdemeanor)
- **Obstruction of highway** (Class B misdemeanor)
- **Failure to disperse** (Class B misdemeanor)
- **Criminal trespass** (Class B misdemeanor)
- **Resisting arrest** (Class A misdemeanor)

### Documenting Rights Violations

If you believe your rights were violated:
1. Write down everything you remember as soon as possible
2. Note officer badge numbers, names, and descriptions
3. Get contact information from witnesses
4. Photograph any injuries
5. Save any video or photo evidence
6. Contact a civil rights organization or attorney
    `,
    faqs: [
      {
        question: 'What should I do if I am arrested at a protest?',
        answer:
          'Stay calm and do not physically resist. Clearly state you are exercising your right to remain silent. Ask what you are being charged with. Request a lawyer immediately and do not sign anything without legal counsel.',
      },
      {
        question: 'How do I find a lawyer after being arrested at a protest?',
        answer:
          'Contact the National Lawyers Guild Austin, ACLU of Texas, or Texas Civil Rights Project. Many offer free consultations or can connect you with attorneys who handle protest-related cases.',
      },
      {
        question: 'What is a legal observer?',
        answer:
          'Legal observers are trained volunteers who document police behavior at protests. They wear bright green NLG hats, witness arrests, and record badge numbers. They do not provide legal advice but can connect you with legal resources.',
      },
    ],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
];

export function getFAQArticleBySlug(slug: string): FAQArticle | undefined {
  return faqArticles.find((article) => article.slug === slug);
}

export function getAllFAQArticles(): FAQArticle[] {
  return faqArticles.sort((a, b) => a.priority - b.priority);
}

export function getFAQArticlesByCategory(category: FAQArticle['category']): FAQArticle[] {
  return faqArticles
    .filter((article) => article.category === category)
    .sort((a, b) => a.priority - b.priority);
}
