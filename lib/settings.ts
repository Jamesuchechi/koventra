import prisma from './prisma';

export const DEFAULT_SETTINGS = {
  heroEyebrow: 'Koventra Systems',
  heroTitle: 'Building the intelligence layer for modern industry',
  heroSubtitle: 'We design, build, and scale technology products that solve hard problems — across AI, legal tech, SaaS, and enterprise software.',
  missionEyebrow: 'Who We Are',
  missionTitle: 'A systems company that builds to last',
  missionParagraph1: "Koventra Systems is the parent organization behind a growing portfolio of technology ventures. We don't build features — we build companies. Each product under our umbrella is designed with a singular focus, long-term capital, and a mandate to lead its category.",
  missionParagraph2: 'From legal intelligence to enterprise cloud infrastructure, our ventures share a common foundation: precision engineering, deep domain expertise, and the conviction that great software changes how industries operate.',
  stat1Num: '$400M+',
  stat1Label: 'Venture Value',
  stat2Num: '04',
  stat2Label: 'Active Ventures',
  stat3Num: '2024',
  stat3Label: 'Founded',
  stat4Num: '100%',
  stat4Label: 'Private Capital',
  ogImageUrl: '/images/default-og.jpg',
  metaDescription: 'Parent company of a portfolio of industry leading software companies.'
};

export type SiteSettings = typeof DEFAULT_SETTINGS;

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const settings = await prisma.siteSetting.findMany();
    
    // Map list to key-value
    const dbSettingsObj = settings.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {} as Record<string, string>);

    // Merge with defaults
    return {
      ...DEFAULT_SETTINGS,
      ...dbSettingsObj,
    } as SiteSettings;
  } catch (error) {
    console.error('Error fetching site settings from database:', error);
    return DEFAULT_SETTINGS;
  }
}
