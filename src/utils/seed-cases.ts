import { faker } from "@faker-js/faker";

export type SeedCase = {
  caseNumber: number;
  caseTitle: string;
  description: string;
  data: {
    brandName: string;
    yearFounded: number;
    headquarters: string;
    numberOfLocations: number;
  };
};

const currentYear = new Date().getFullYear();

const randomHeadquarters = () =>
  `${faker.location.city()}, ${faker.location.country()}`;

const seedCases: SeedCase[] = [
  {
    caseNumber: 1,
    caseTitle: "yearFounded=1600",
    description: "Minimum yearFounded",
    data: {
      brandName: faker.company.name(),
      yearFounded: 1600,
      headquarters: randomHeadquarters(),
      numberOfLocations: faker.number.int({ min: 1, max: 50 }),
    },
  },
  {
    caseNumber: 2,
    caseTitle: "yearFounded=current",
    description: "Founded this year",
    data: {
      brandName: faker.company.name(),
      yearFounded: currentYear,
      headquarters: randomHeadquarters(),
      numberOfLocations: faker.number.int({ min: 1, max: 5 }),
    },
  },
  {
    caseNumber: 3,
    caseTitle: "numberOfLocations=1",
    description: "Single location",
    data: {
      brandName: faker.company.name(),
      yearFounded: faker.number.int({ min: 1600, max: currentYear }),
      headquarters: randomHeadquarters(),
      numberOfLocations: 1,
    },
  },
  {
    caseNumber: 4,
    caseTitle: "large chain",
    description: "10k–50k locations",
    data: {
      brandName: faker.company.name(),
      yearFounded: faker.number.int({ min: 1900, max: 1990 }),
      headquarters: randomHeadquarters(),
      numberOfLocations: faker.number.int({ min: 10000, max: 50000 }),
    },
  },
  {
    caseNumber: 5,
    caseTitle: "historic brand",
    description: "Founded 1600–1700",
    data: {
      brandName: faker.company.name(),
      yearFounded: faker.number.int({ min: 1600, max: 1700 }),
      headquarters: randomHeadquarters(),
      numberOfLocations: faker.number.int({ min: 1, max: 200 }),
    },
  },
  {
    caseNumber: 6,
    caseTitle: "modern startup",
    description: "Founded after 2010",
    data: {
      brandName: faker.company.name(),
      yearFounded: faker.number.int({ min: 2010, max: currentYear }),
      headquarters: randomHeadquarters(),
      numberOfLocations: faker.number.int({ min: 1, max: 20 }),
    },
  },
  {
    caseNumber: 7,
    caseTitle: "brandName with spaces",
    description: "Leading/trailing spaces",
    data: {
      brandName: `   ${faker.company.name()}   `,
      yearFounded: faker.number.int({ min: 1800, max: 2000 }),
      headquarters: randomHeadquarters(),
      numberOfLocations: faker.number.int({ min: 1, max: 500 }),
    },
  },
  {
    caseNumber: 8,
    caseTitle: "international HQ",
    description: "Non-English city names",
    data: {
      brandName: faker.company.name(),
      yearFounded: faker.number.int({ min: 1950, max: 2010 }),
      headquarters: faker.helpers.arrayElement([
        "東京, Japan",
        "São Paulo, Brazil",
        "Zürich, Switzerland",
        "Москва, Russia",
        "القاهرة, Egypt",
      ]),
      numberOfLocations: faker.number.int({ min: 5, max: 3000 }),
    },
  },
  {
    caseNumber: 9,
    caseTitle: "mid-20th-century",
    description: "Founded 1940–1970",
    data: {
      brandName: faker.company.name(),
      yearFounded: faker.number.int({ min: 1940, max: 1970 }),
      headquarters: randomHeadquarters(),
      numberOfLocations: faker.number.int({ min: 100, max: 5000 }),
    },
  },
  {
    caseNumber: 10,
    caseTitle: "random mid-size",
    description: "Fully randomised within valid ranges",
    data: {
      brandName: faker.company.name(),
      yearFounded: faker.number.int({ min: 1600, max: currentYear }),
      headquarters: randomHeadquarters(),
      numberOfLocations: faker.number.int({ min: 1, max: 10000 }),
    },
  },
];

export default seedCases;
