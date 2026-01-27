import type { Protest } from './types';

export const protests: Protest[] = [
  {
    id: 'march-for-democracy-2024',
    title: 'March for Democracy',
    description:
      'Join us for a peaceful march advocating for voting rights and electoral reform in Texas. We will march from the Capitol to City Hall, with speakers and community organizations along the route.',
    date: '2024-03-15',
    startTime: '10:00 AM',
    endTime: '2:00 PM',
    location: {
      name: 'Texas State Capitol',
      address: '1100 Congress Ave',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
    },
    organizer: 'Austin Civic Coalition',
    organizerContact: 'info@austinciviccoalition.org',
    expectedAttendance: 500,
    status: 'upcoming',
    category: 'voting-rights',
    tags: ['voting', 'democracy', 'march', 'peaceful'],
    requirements: [
      'Wear comfortable walking shoes',
      'Bring water and sunscreen',
      'Signs welcome (no wooden poles)',
    ],
    safetyInfo:
      'Legal observers will be present. Know your rights training available at 9:30 AM.',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-15T00:00:00Z',
  },
  {
    id: 'climate-action-rally',
    title: 'Climate Action Rally',
    description:
      'A rally calling for immediate climate action and environmental justice. Featured speakers include local scientists, activists, and affected community members.',
    date: '2024-03-22',
    startTime: '11:00 AM',
    endTime: '3:00 PM',
    location: {
      name: 'Republic Square Park',
      address: '422 Guadalupe St',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
    },
    organizer: 'Austin Climate Alliance',
    expectedAttendance: 300,
    status: 'upcoming',
    category: 'environmental',
    tags: ['climate', 'environment', 'rally', 'justice'],
    requirements: [
      'Bring reusable water bottle',
      'Eco-friendly signs encouraged',
    ],
    createdAt: '2024-02-10T00:00:00Z',
    updatedAt: '2024-02-10T00:00:00Z',
  },
  {
    id: 'workers-rights-march',
    title: "Workers' Rights March",
    description:
      'Stand in solidarity with Austin workers demanding fair wages, safe working conditions, and the right to organize. March from Wooldridge Square to City Hall.',
    date: '2024-04-01',
    startTime: '9:00 AM',
    endTime: '12:00 PM',
    location: {
      name: 'Wooldridge Square Park',
      address: '900 Guadalupe St',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
    },
    organizer: 'Austin Workers United',
    organizerContact: 'organize@austinworkersunited.org',
    expectedAttendance: 400,
    status: 'upcoming',
    category: 'labor',
    tags: ['workers', 'labor', 'wages', 'unions'],
    requirements: [
      'Wear comfortable shoes for walking',
      'Union members encouraged to wear union gear',
    ],
    safetyInfo: 'Water stations will be available along the route.',
    createdAt: '2024-02-20T00:00:00Z',
    updatedAt: '2024-02-20T00:00:00Z',
  },
  {
    id: 'healthcare-for-all-vigil',
    title: 'Healthcare for All Vigil',
    description:
      'A candlelight vigil honoring those who have suffered due to lack of healthcare access. Speakers will share stories and call for universal healthcare coverage.',
    date: '2024-04-10',
    startTime: '7:00 PM',
    endTime: '9:00 PM',
    location: {
      name: "Auditorium Shores at Lady Bird Lake",
      address: '800 W Riverside Dr',
      city: 'Austin',
      state: 'TX',
      zip: '78704',
    },
    organizer: 'Texas Healthcare Now',
    expectedAttendance: 200,
    status: 'upcoming',
    category: 'healthcare',
    tags: ['healthcare', 'vigil', 'access', 'universal'],
    requirements: ['Candles will be provided', 'Bring a blanket to sit on'],
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
  },
  {
    id: 'housing-justice-rally',
    title: 'Housing Justice Rally',
    description:
      'Rally against rising rents and displacement in Austin. Hear from tenants, housing advocates, and community organizations fighting for affordable housing.',
    date: '2024-04-20',
    startTime: '2:00 PM',
    endTime: '5:00 PM',
    location: {
      name: 'Austin City Hall',
      address: '301 W 2nd St',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
    },
    organizer: 'Austin Tenants Council',
    organizerContact: 'info@austintenantscouncil.org',
    expectedAttendance: 350,
    status: 'upcoming',
    category: 'housing',
    tags: ['housing', 'rent', 'tenants', 'affordable'],
    requirements: [
      'Bring signs about your housing story',
      'Wear red to show solidarity',
    ],
    createdAt: '2024-03-05T00:00:00Z',
    updatedAt: '2024-03-05T00:00:00Z',
  },
];

export function getProtestById(id: string): Protest | undefined {
  return protests.find((protest) => protest.id === id);
}

export function getUpcomingProtests(): Protest[] {
  return protests.filter((protest) => protest.status === 'upcoming');
}

export function getProtestsByCategory(category: string): Protest[] {
  return protests.filter((protest) => protest.category === category);
}
