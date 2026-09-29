import { Destination, TravelPackage, Hotel, Experience, Booking, Customer, GalleryItem } from '../types';

export const mockDestinations: Destination[] = [
  {
    id: 'dest-1',
    slug: 'turkey',
    name: 'Turkey',
    country: 'Turkey',
    region: 'Europe',
    tagline: 'Where Continents and Epochs Collide',
    description: 'From the minarets of Istanbul and hot air balloons drifting over fairy chimneys in Cappadocia, to the turquoise coves of the Aegean Riviera, Turkey offers an intoxicating tapestry of history, hospitality, and natural wonder.',
    heroImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80'
    ],
    startingPrice: 899,
    packageCount: 6,
    hotelCount: 14,
    bestTimeToVisit: 'April - May & September - November',
    averageTripDuration: '7 to 10 Days',
    popularCities: ['Istanbul', 'Cappadocia', 'Antalya', 'Bodrum', 'Izmir'],
    coordinates: { lat: 38.9637, lng: 35.2433 },
    highlights: [
      'Sunrise hot air balloon flight over Göreme valleys',
      'Private sunset Bosphorus cruise aboard an executive yacht',
      'Underground cities of Derinkuyu and open-air museums',
      'Thermal mineral springs of Pamukkale travertines'
    ],
    travelTips: [
      'Visa available electronically for most nationalities',
      'Modest attire recommended when visiting sacred historic mosques',
      'Currency: Turkish Lira (TRY); card acceptance is widespread in major cities'
    ],
    featured: true
  },
  {
    id: 'dest-2',
    slug: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Middle East',
    tagline: 'Futuristic Architecture Meets Arabian Opulence',
    description: 'A global pinnacle of architectural audacity, Michelin-starred gastronomy, secluded desert sanctuaries, and pristine shoreline cabanas against a backdrop of soaring golden skylines.',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=1200&q=80'
    ],
    startingPrice: 799,
    packageCount: 5,
    hotelCount: 22,
    bestTimeToVisit: 'November - March',
    averageTripDuration: '5 to 7 Days',
    popularCities: ['Downtown Dubai', 'Palm Jumeirah', 'Dubai Marina', 'Al Marmoom'],
    coordinates: { lat: 25.2048, lng: 55.2708 },
    highlights: [
      'Burj Khalifa At The Top SKY VIP access',
      'Dune buggy expeditions across the Rub al Khali',
      'Ultra-luxury superyacht marina charter',
      'Museum of the Future private curator tour'
    ],
    travelTips: [
      'Dress code is cosmopolitan yet mindful of cultural norms in civic centers',
      'Pre-booking reservations for high-end dining is essential',
      'Currency: UAE Dirham (AED)'
    ],
    featured: true
  },
  {
    id: 'dest-3',
    slug: 'maldives',
    name: 'Maldives',
    country: 'Maldives',
    region: 'Asia',
    tagline: 'Overwater Sanctuary in the Indian Ocean',
    description: 'Emerald atolls circled by pure white coral sand, vibrant bioluminescent waters, private villas perched above gentle lagoons, and world-class marine conservation sanctuaries.',
    heroImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1200&q=80'
    ],
    startingPrice: 1299,
    packageCount: 4,
    hotelCount: 16,
    bestTimeToVisit: 'December - April',
    averageTripDuration: '6 to 8 Days',
    popularCities: ['North Malé Atoll', 'Baa Atoll Biosphere', 'Ari Atoll'],
    coordinates: { lat: 3.2028, lng: 73.2207 },
    highlights: [
      'Private overwater villa with glass infinity pool',
      'Snorkeling alongside manta rays & whale sharks at Hanifaru Bay',
      'Undersea wine cellar and restaurant experiences',
      'Traditional Dhoni sunset dolphin cruise'
    ],
    travelTips: [
      'Complimentary 30-day visa on arrival for all tourists',
      'Transfers from Malé are conducted via scenic seaplane or speedboat',
      'US Dollars widely accepted across all private island resorts'
    ],
    featured: true
  },
  {
    id: 'dest-4',
    slug: 'switzerland',
    name: 'Switzerland',
    country: 'Switzerland',
    region: 'Europe',
    tagline: 'Alpine Grandeur & Pristine Glacial Splendor',
    description: 'Dramatic snow-crested peaks of the Matterhorn and Jungfrau, emerald alpine lakes, precision panoramic trains, and historic chalets embodying quiet European elegance.',
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80'
    ],
    startingPrice: 1499,
    packageCount: 5,
    hotelCount: 12,
    bestTimeToVisit: 'June - September (Summer) & Dec - March (Ski)',
    averageTripDuration: '8 to 12 Days',
    popularCities: ['Zermatt', 'St. Moritz', 'Lucerne', 'Interlaken', 'Zurich'],
    coordinates: { lat: 46.8182, lng: 8.2275 },
    highlights: [
      'Glacier Express first-class scenic train through Alpine valleys',
      'Private heli-skiing and snowshoeing around the Matterhorn',
      'Lucerne historic covered bridges and luxury lake steamers',
      'Artisanal chocolate ateliers and thermal spa retreats'
    ],
    travelTips: [
      'Swiss Travel Pass offers seamless transport across trains, boats, and trams',
      'Tap water in Switzerland is some of the purest mineral water in the world',
      'Currency: Swiss Franc (CHF)'
    ],
    featured: true
  },
  {
    id: 'dest-5',
    slug: 'malaysia',
    name: 'Malaysia',
    country: 'Malaysia',
    region: 'Asia',
    tagline: 'Ancient Rainforests & Iconic Tropical Archipelagos',
    description: 'Dynamic cultural harmony ranging from the futuristic Petronas Towers in Kuala Lumpur to the UNESCO heritage shophouses of Penang and the untamed rainforests and limestone peaks of Langkawi.',
    heroImage: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1200&q=80'
    ],
    startingPrice: 699,
    packageCount: 4,
    hotelCount: 11,
    bestTimeToVisit: 'December - April & June - August',
    averageTripDuration: '7 to 10 Days',
    popularCities: ['Kuala Lumpur', 'Langkawi', 'Penang', 'Borneo'],
    coordinates: { lat: 4.2105, lng: 101.9758 },
    highlights: [
      'Langkawi UNESCO Global Geopark yacht excursion',
      'Penang Michelin-recognized street gastronomy and colonial mansions',
      'Borneo rainforest orangutan and wildlife conservation tours',
      'Private infinity pool overlooking Kuala Lumpur skyline'
    ],
    travelTips: [
      'English is widely spoken across all hospitality venues',
      'Tropical climate year-round; light breathable clothing is optimal',
      'Currency: Malaysian Ringgit (MYR)'
    ],
    featured: true
  },
  {
    id: 'dest-6',
    slug: 'france',
    name: 'Paris & French Riviera',
    country: 'France',
    region: 'Europe',
    tagline: 'The Epicenter of Art, Haute Couture & Romance',
    description: 'From champagne toasts upon the Seine overlooking the Eiffel Tower to the sun-drenched private beach clubs of Cannes and Monaco, France defines bespoke European leisure.',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80'
    ],
    startingPrice: 1399,
    packageCount: 4,
    hotelCount: 15,
    bestTimeToVisit: 'April - October',
    averageTripDuration: '7 to 10 Days',
    popularCities: ['Paris', 'Nice', 'Cannes', 'Saint-Tropez', 'Bordeaux'],
    coordinates: { lat: 46.2276, lng: 2.2137 },
    highlights: [
      'After-hours VIP access to the Louvre & Musée d’Orsay',
      'Vintage open-top convertible drive along the Côte d’Azur',
      'Private Grand Cru wine tasting in Saint-Émilion',
      'Haute couture personal styling in Place Vendôme'
    ],
    travelTips: [
      'Schengen visa requirements apply for international travelers',
      'High-speed TGV connects Paris to Nice in under 6 hours',
      'Currency: Euro (EUR)'
    ],
    featured: true
  },
  {
    id: 'dest-7',
    slug: 'pakistan',
    name: 'Pakistan',
    country: 'Pakistan',
    region: 'Asia',
    tagline: 'Crown of the Karakoram & Untamed Alpine Peaks',
    description: 'Home to five of the world’s fourteen 8,000-meter peaks including K2, the legendary Hunza Valley, emerald glacial lakes, and warm legendary mountain hospitality.',
    heroImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80'
    ],
    startingPrice: 949,
    packageCount: 3,
    hotelCount: 8,
    bestTimeToVisit: 'May - October',
    averageTripDuration: '8 to 14 Days',
    popularCities: ['Hunza Valley', 'Skardu', 'Lahore', 'Islamabad'],
    coordinates: { lat: 30.3753, lng: 69.3451 },
    highlights: [
      'Scenic Karakoram Highway journey through the roof of the world',
      'Attabad Lake emerald boat cruise and Passu Cones panorama',
      'Historic Baltit and Altit Forts in Karimabad',
      'Mughal architectural masterworks in Lahore'
    ],
    travelTips: [
      'Online e-visa processing is swift and straightforward',
      'Northern valleys offer crisp, refreshing mountain climates in summer',
      'Currency: Pakistani Rupee (PKR)'
    ],
    featured: true
  },
  {
    id: 'dest-8',
    slug: 'saudi-arabia',
    name: 'Saudi Arabia',
    country: 'Saudi Arabia',
    region: 'Middle East',
    tagline: 'Ancient Wonders of AlUla & The Red Sea',
    description: 'Monumental Nabataean rock tombs carved into crimson desert sandstone, ultra-modern luxury wellness retreats, and untouched marine reefs along the Red Sea coast.',
    heroImage: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=1200&q=80'
    ],
    startingPrice: 1199,
    packageCount: 3,
    hotelCount: 9,
    bestTimeToVisit: 'October - April',
    averageTripDuration: '6 to 9 Days',
    popularCities: ['AlUla', 'Riyadh', 'Jeddah', 'Red Sea Project'],
    coordinates: { lat: 23.8859, lng: 45.0792 },
    highlights: [
      'Hegra UNESCO World Heritage site exploration with local rawis',
      'Maraya Concert Hall — the world’s largest mirrored architectural marvel',
      'Pristine Red Sea coral atoll diving experiences',
      'Historic Al Balad coral architecture in Jeddah'
    ],
    travelTips: [
      'Tourist eVisa accessible within minutes for over 60 countries',
      'Warm daytime temperatures and cool, star-filled desert nights',
      'Currency: Saudi Riyal (SAR)'
    ],
    featured: false
  }
];

export const mockPackages: TravelPackage[] = [
  {
    id: 'pkg-1',
    slug: 'turkey-explorer',
    title: 'Turkey Explorer: Empires & Bosphorus Horizons',
    destinationId: 'dest-1',
    destinationName: 'Turkey',
    country: 'Turkey',
    duration: '7 Days / 6 Nights',
    durationDays: 7,
    price: 899,
    originalPrice: 1150,
    rating: 4.95,
    reviewCount: 142,
    heroImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1000&q=80'
    ],
    hotelName: 'Ciragan Palace Kempinski & Museum Hotel Cappadocia',
    hotelRating: 5,
    overview: 'An unforgettable 7-day odyssey traversing Istanbul’s imperial splendour, the subterranean mysteries of Cappadocia, and sunrise hot air balloon flights above surreal honeycombed valleys.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Istanbul & Bosphorus Twilight',
        description: 'Private VIP airport transfer to your Bosphorus-front hotel. Enjoy an evening welcome dinner cruise along the illuminated European and Asian shorelines.',
        highlights: ['Private limousine transfer', 'Executive Bosphorus sunset cruise', 'Chef-crafted Ottoman welcome tasting'],
        accommodation: 'Ciragan Palace Kempinski (Grand Bosphorus Suite)',
        mealsIncluded: 'Dinner'
      },
      {
        day: 2,
        title: 'Imperial Monuments of the Sultans',
        description: 'Priority curator-led exploration of the Hagia Sophia, the Blue Mosque, Topkapi Palace Treasury, and the fragrant labyrinth of the Grand Bazaar.',
        highlights: ['Hagia Sophia private access', 'Hidden Topkapi Palace chambers', 'Artisanal carpet and spice atelier tasting'],
        accommodation: 'Ciragan Palace Kempinski',
        mealsIncluded: 'Breakfast, Lunch'
      },
      {
        day: 3,
        title: 'Fly to Cappadocia & Fairy Chimney Valleys',
        description: 'Short domestic business flight to Nevsehir. Check into your luxury cave suite carved directly into ancient volcanic tuff, followed by a scenic sunset hike in Rose Valley.',
        highlights: ['Domestic business flight included', 'Check-in to Luxury Cave Sanctuary', 'Sunset wine tasting in Red Valley'],
        accommodation: 'Museum Hotel Cappadocia (Imperial Cave Suite)',
        mealsIncluded: 'Breakfast, Dinner'
      },
      {
        day: 4,
        title: 'Sunrise Hot Air Balloon Flight & Underground Cities',
        description: 'Float gracefully at dawn among hundreds of colorful balloons over Göreme. In the afternoon, descend into the 8-level underground citadel of Kaymakli.',
        highlights: ['Guaranteed sunrise balloon slot', 'Champagne landing ceremony', 'Subterranean fortress exploration'],
        accommodation: 'Museum Hotel Cappadocia',
        mealsIncluded: 'Breakfast, Gourmet Lunch'
      },
      {
        day: 5,
        title: 'Pottery Ateliers & Ihlara Canyon Excursion',
        description: 'Visit master ceramicists in Avanos along the Red River, followed by a tranquil nature walk beside the Melendiz River in lush Ihlara Canyon.',
        highlights: ['Private pottery masterclass', 'Ihlara rock-cut monastic churches', 'Riverside organic Anatolian lunch'],
        accommodation: 'Museum Hotel Cappadocia',
        mealsIncluded: 'Breakfast, Lunch'
      },
      {
        day: 6,
        title: 'Return to Istanbul & Contemporary Art District',
        description: 'Flight back to Istanbul. Spend a leisure afternoon discovering the contemporary galleries of Karaköy, Galata Tower views, and high-end shopping in Nişantaşı.',
        highlights: ['Galata Tower panoramic sunset', 'Private shopping concierge', 'Farewell gala dinner at Mikla'],
        accommodation: 'Ciragan Palace Kempinski',
        mealsIncluded: 'Breakfast, Farewell Dinner'
      },
      {
        day: 7,
        title: 'Departure & Souvenir Curations',
        description: 'Enjoy a leisurely breakfast on the palace terrace before your dedicated private transfer to Istanbul International Airport.',
        highlights: ['Private airport transfer', 'Fast-track departure lounge access'],
        accommodation: 'Departure',
        mealsIncluded: 'Breakfast'
      }
    ],
    included: [
      '6 nights in 5-star & boutique luxury cave suites',
      'VIP Airport transfers in Mercedes-Benz V-Class',
      'Sunrise hot air balloon flight in Cappadocia',
      'Domestic business class flights between Istanbul and Cappadocia',
      'Private licensed art historian & English-speaking guide',
      'All gourmet breakfasts and selected Michelin-guide dinners',
      'Skip-the-line admissions to all monuments & museums'
    ],
    excluded: [
      'International flights to/from Istanbul',
      'Personal travel insurance (recommended)',
      'Discretionary gratuities for local chauffeurs & guides'
    ],
    activities: [
      'Sunrise Hot Air Ballooning',
      'Bosphorus Private Yacht Cruise',
      'Historical Walking Tours',
      'Cave Wine Tasting'
    ],
    transportation: 'Chauffeured Mercedes V-Class & Domestic Business Flights',
    featured: true,
    status: 'active'
  },
  {
    id: 'pkg-2',
    slug: 'dubai-luxury',
    title: 'Dubai Luxury: Skyline Heights & Desert Serenity',
    destinationId: 'dest-2',
    destinationName: 'Dubai',
    country: 'United Arab Emirates',
    duration: '5 Days / 4 Nights',
    durationDays: 5,
    price: 799,
    originalPrice: 999,
    rating: 4.98,
    reviewCount: 98,
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1000&q=80'
    ],
    hotelName: 'Atlantis The Royal & Al Maha Desert Resort',
    hotelRating: 5,
    overview: 'Immerse yourself in unrivaled Emirati glamour. From sky-high dining on Palm Jumeirah to private bedouin tent villas surrounded by Arabian oryx.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Dubai & The Palm Panorama',
        description: 'Chauffeured transfer to Atlantis The Royal. Unwind by the Sky Pool 90 meters above the Gulf before dinner at Dinner by Heston Blumenthal.',
        highlights: ['Rolls-Royce Ghost airport transfer', 'Cloud 22 rooftop lounge access', 'Culinary welcome tasting'],
        accommodation: 'Atlantis The Royal (Sky Terrace Suite)',
        mealsIncluded: 'Dinner'
      },
      {
        day: 2,
        title: 'Architectural Marvels & Private Yacht Cruise',
        description: 'Morning private tour of the Museum of the Future followed by an afternoon 68-foot luxury yacht charter departing from Dubai Marina.',
        highlights: ['Museum of the Future private entry', '4-hour private yacht cruise', 'Gourmet catering and champagne at sea'],
        accommodation: 'Atlantis The Royal',
        mealsIncluded: 'Breakfast, Lunch'
      },
      {
        day: 3,
        title: 'Journey to the Crimson Desert',
        description: 'Travel into the Dubai Desert Conservation Reserve. Check in to your ultra-private villa with individual infinity plunge pool overlooking sand dunes.',
        highlights: ['Desert safari in vintage Land Rovers', 'Falconry demonstration at sunset', 'Dine under desert stars with private butler'],
        accommodation: 'Al Maha, a Luxury Collection Desert Resort & Spa',
        mealsIncluded: 'Breakfast, Dinner'
      },
      {
        day: 4,
        title: 'Dune Exploration & Traditional Aromatherapy',
        description: 'Morning nature walk tracking gazelles followed by personalized spa treatments and camel trekking at sunset.',
        highlights: ['Desert nature trek', 'Timeless Spa 90-min treatment', 'Sunset camel caravan'],
        accommodation: 'Al Maha Desert Resort',
        mealsIncluded: 'Breakfast, Lunch, Dinner'
      },
      {
        day: 5,
        title: 'Old Dubai Heritage & Farewell Departure',
        description: 'Visit the historic Al Fahidi neighbourhood and cross Dubai Creek on an authentic private abra boat before departure transfer.',
        highlights: ['Al Fahidi cultural centre visit', 'Abra private crossing', 'DXB VIP departure escort'],
        accommodation: 'Departure',
        mealsIncluded: 'Breakfast'
      }
    ],
    included: [
      '2 nights at Atlantis The Royal + 2 nights at Al Maha Desert Resort',
      'All luxury vehicle transfers throughout',
      'Private 4-hour luxury yacht charter',
      'Burj Khalifa Level 148 Sky lounge VIP entry',
      'All desert reserve activities and spa access'
    ],
    excluded: [
      'International airfare',
      'Gratuities',
      'Optional helicopter transfers'
    ],
    activities: [
      'Private Yacht Charter',
      'Desert Safari & Falconry',
      'Rooftop Sky Dining',
      'Spa Wellness Treatments'
    ],
    transportation: 'Rolls-Royce & Range Rover Chauffeur',
    featured: true,
    status: 'active'
  },
  {
    id: 'pkg-3',
    slug: 'maldives-escape',
    title: 'Maldives Escape: Turquoise Sanctuary & Reef Odyssey',
    destinationId: 'dest-3',
    destinationName: 'Maldives',
    country: 'Maldives',
    duration: '6 Days / 5 Nights',
    durationDays: 6,
    price: 1299,
    originalPrice: 1650,
    rating: 4.99,
    reviewCount: 84,
    heroImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1000&q=80'
    ],
    hotelName: 'Soneva Fushi & The St. Regis Maldives Vommuli',
    hotelRating: 5,
    overview: 'The quintessential overwater sanctuary. Wake up to the soothing rhythm of azure waves, step straight from your sun deck into coral gardens, and gaze at infinite stars from overwater hammocks.',
    itinerary: [
      {
        day: 1,
        title: 'Seaplane Scenic Arrival in Malé Atoll',
        description: 'Touchdown in Malé and board your private seaplane for a breathtaking flight over turquoise atolls directly to the resort jetty.',
        highlights: ['Scenic aerial seaplane flight', 'Dedicated Mr./Ms. Friday butler greeting', 'Champagne welcome upon arrival'],
        accommodation: 'The St. Regis Maldives Vommuli Resort (Overwater Villa)',
        mealsIncluded: 'Dinner'
      },
      {
        day: 2,
        title: 'Pristine House Reef Snorkeling & Sunset Cruise',
        description: 'Guided exploration of vibrant house reefs with resident marine biologists, followed by an evening cruise spotting spinner dolphins.',
        highlights: ['Snorkeling equipment & biologist guide', 'Sunset champagne dolphin cruise', 'Overwater cinema under the stars'],
        accommodation: 'The St. Regis Maldives Vommuli Resort',
        mealsIncluded: 'Breakfast, Lunch, Dinner'
      },
      {
        day: 3,
        title: 'Private Sandbank Picnic & Wellness Rituals',
        description: 'Escape by private speedboat to a deserted sandbank for a chef-curated picnic, followed by an overwater Ayurvedic spa massage.',
        highlights: ['Castaway sandbank experience', '60-minute therapeutic massage', 'Sunset cocktail reception'],
        accommodation: 'The St. Regis Maldives Vommuli Resort',
        mealsIncluded: 'Breakfast, Picnic Lunch, Dinner'
      },
      {
        day: 4,
        title: 'Scuba Diving or Sea Turtle Encounter',
        description: 'Dive among sea turtles, reef sharks, and kaleidoscope corals, or embark on a guided underwater seabob adventure.',
        highlights: ['Certified dive master guidance', 'High-tech underwater seabob session', 'Undersea wine cellar pairing dinner'],
        accommodation: 'The St. Regis Maldives Vommuli Resort',
        mealsIncluded: 'Breakfast, Dinner'
      },
      {
        day: 5,
        title: 'Water Sports & Lagoon Leisure',
        description: 'Paddleboarding across tranquil waters, sailing catamarans, or relaxing in your private villa pool with a floating gourmet breakfast.',
        highlights: ['Signature floating breakfast', 'Complimentary non-motorized water sports', 'Stargazing astronomy session'],
        accommodation: 'The St. Regis Maldives Vommuli Resort',
        mealsIncluded: 'Breakfast, Lunch, Dinner'
      },
      {
        day: 6,
        title: 'Farewell Atoll Seaplane Flight',
        description: 'Final breakfast overlooking the lagoon before your scenic seaplane flight back to Malé for international departure.',
        highlights: ['Seaplane transfer to Malé', 'Lounge access at Velana International Airport'],
        accommodation: 'Departure',
        mealsIncluded: 'Breakfast'
      }
    ],
    included: [
      '5 nights in an Overwater Sunset Pool Villa',
      'Round-trip scenic seaplane transfers from Malé',
      'Daily lavish breakfast & multi-course dinners',
      '24/7 personalized island butler service',
      'Complimentary snorkeling gear & water sports',
      'Dolphin cruise & Sandbank excursion'
    ],
    excluded: [
      'International flights to Malé (MLE)',
      'Scuba certification courses',
      'Premium vintage wines from private cellar'
    ],
    activities: [
      'Overwater Villa Living',
      'Dolphin Sunset Cruise',
      'Coral Reef Snorkeling',
      'Private Sandbank Escape'
    ],
    transportation: 'Scenic Twin-Otter Seaplane & Luxury Speedboat',
    featured: true,
    status: 'active'
  },
  {
    id: 'pkg-4',
    slug: 'swiss-alpine-wonders',
    title: 'Swiss Alpine Wonders: Glaciers & Matterhorn Elegance',
    destinationId: 'dest-4',
    destinationName: 'Switzerland',
    country: 'Switzerland',
    duration: '8 Days / 7 Nights',
    durationDays: 8,
    price: 1499,
    originalPrice: 1850,
    rating: 4.96,
    reviewCount: 76,
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1000&q=80'
    ],
    hotelName: 'The Chedi Andermatt & Omnia Zermatt',
    hotelRating: 5,
    overview: 'Traverse the pinnacle of the Swiss Alps aboard the Glacier Express, gaze upon the sheer majesty of the Matterhorn, and unwind in world-class alpine spas.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Zurich & Transfer to Lucerne',
        description: 'First-class Swiss rail transfer from Zurich to Lucerne. Afternoon stroll across the iconic Chapel Bridge and private lake cruise.',
        highlights: ['First-class Swiss rail pass', 'Lucerne private lake cruise', 'Historic old town gourmet dinner'],
        accommodation: 'Bürgenstock Resort & Alpine Spa',
        mealsIncluded: 'Dinner'
      },
      {
        day: 2,
        title: 'Mount Pilatus Golden Round Trip',
        description: 'Ascend the world’s steepest cogwheel railway to the peak of Pilatus with panoramic views across 73 Alpine summits.',
        highlights: ['World steepest cogwheel railway', 'Panoramic cableway descent', 'Traditional Swiss fondue tasting'],
        accommodation: 'Bürgenstock Resort',
        mealsIncluded: 'Breakfast, Lunch'
      },
      {
        day: 3,
        title: 'Glacier Express to Zermatt',
        description: 'Board the legendary Glacier Express in Excellence Class, enjoying an 8-course lunch with wine pairings as snowy gorges pass by.',
        highlights: ['Glacier Express Excellence Class', 'Gourmet 8-course onboard dining', 'Arrival in car-free Zermatt'],
        accommodation: 'The Omnia Zermatt (Matterhorn Suite)',
        mealsIncluded: 'Breakfast, Lunch, Dinner'
      },
      {
        day: 4,
        title: 'Gornergrat Railway & Matterhorn Reflection',
        description: 'Travel to the Gornergrat viewing platform at 3,089 meters. Photograph the iconic Matterhorn mirrored on the surface of Riffelsee.',
        highlights: ['Gornergrat cogwheel train', 'Riffelsee alpine walk', 'Fine dining at Cervo Mountain Resort'],
        accommodation: 'The Omnia Zermatt',
        mealsIncluded: 'Breakfast, Lunch'
      },
      {
        day: 5,
        title: 'Glacier Paradise & Ice Palace',
        description: 'Europe’s highest cable car station at 3,883m. Enter the subterranean glacier palace 15 meters below the permanent ice surface.',
        highlights: ['Matterhorn Glacier Paradise', 'Glacial ice sculptures', 'Alpine wellness spa session'],
        accommodation: 'The Omnia Zermatt',
        mealsIncluded: 'Breakfast, Dinner'
      },
      {
        day: 6,
        title: 'Interlaken & Jungfraujoch — Top of Europe',
        description: 'Journey to the Bernese Oberland and ascend to the Jungfraujoch station nestled between the Mönch and Jungfrau summits.',
        highlights: ['Jungfraujoch rack railway', 'Aletsch Glacier overlook', 'Artisan Swiss watchmaking showroom visit'],
        accommodation: 'Victoria-Jungfrau Grand Hotel & Spa',
        mealsIncluded: 'Breakfast, Lunch'
      },
      {
        day: 7,
        title: 'Lake Brienz & Waterfalls of Lauterbrunnen',
        description: 'Discover the valley of 72 waterfalls in Lauterbrunnen and turquoise Lake Brienz by vintage paddle steamer.',
        highlights: ['Lauterbrunnen valley walking tour', 'Trümmelbach glacial waterfall caverns', 'Farewell gala dinner'],
        accommodation: 'Victoria-Jungfrau Grand Hotel & Spa',
        mealsIncluded: 'Breakfast, Farewell Dinner'
      },
      {
        day: 8,
        title: 'Zurich Departure',
        description: 'First-class rail to Zurich Airport. Time for Swiss chocolate curations and duty-free shopping before flight home.',
        highlights: ['Swiss Rail first-class voucher', 'Airport lounge pass'],
        accommodation: 'Departure',
        mealsIncluded: 'Breakfast'
      }
    ],
    included: [
      '7 nights in 5-star Swiss luxury alpine chalets',
      'All-inclusive First-Class Swiss Rail & Mountain Pass',
      'Glacier Express Excellence Class ticket with gourmet lunch',
      'Daily gourmet breakfasts and handpicked regional dinners',
      'Matterhorn Glacier Paradise & Gornergrat passes'
    ],
    excluded: [
      'Transcontinental flights',
      'Ski equipment rental',
      'Personal spa treatments'
    ],
    activities: [
      'Glacier Express Excellence Class',
      'Matterhorn Viewpoint Excursion',
      'Thermal Alpine Spas',
      'Lake Lucerne Yachting'
    ],
    transportation: 'Swiss Rail First Class & Panoramic Alpine Trains',
    featured: true,
    status: 'active'
  }
];

export const mockHotels: Hotel[] = [
  {
    id: 'hotel-1',
    slug: 'ciragan-palace-kempinski',
    name: 'Çırağan Palace Kempinski',
    destinationId: 'dest-1',
    destinationName: 'Turkey',
    country: 'Turkey',
    rating: 4.95,
    reviewCount: 320,
    stars: 5,
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80'
    ],
    startingPricePerNight: 420,
    description: 'The only Ottoman Imperial Palace and Hotel on the Bosphorus. Featuring opulent marble architecture, legendary Turkish hospitality, a heated infinity pool touching the strait, and lavish suites that once hosted sultans.',
    facilities: [
      'Bosphorus Infinity Pool',
      'Traditional Turkish Hammam & Spa',
      'Helipad with VIP transfers',
      'Tuğra Michelin-recommended Fine Dining',
      '24/7 Dedicated Butler Service',
      'Valet & Private Chauffeur Fleet'
    ],
    locationDetails: 'Çırağan Caddesi 32, Beşiktaş, Istanbul, Turkey',
    coordinates: { lat: 41.0425, lng: 29.0167 },
    has360Tour: true,
    rooms: [
      {
        id: 'rm-101',
        name: 'Grand Bosphorus Palace Suite',
        type: 'Palace Suite',
        capacity: '2 Guests',
        pricePerNight: 780,
        sizeSqM: 85,
        amenities: ['Bosphorus view balcony', 'Marble bathroom with jacuzzi', 'Butler service', 'Complimentary champagne'],
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'rm-102',
        name: 'Imperial Park View Room',
        type: 'Deluxe Room',
        capacity: '2 Guests',
        pricePerNight: 420,
        sizeSqM: 48,
        amenities: ['High ceilings', 'King posturepedic bed', 'L’Occitane bath amenities', 'Nespresso bar'],
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
      }
    ],
    featured: true
  },
  {
    id: 'hotel-2',
    slug: 'atlantis-the-royal',
    name: 'Atlantis The Royal',
    destinationId: 'dest-2',
    destinationName: 'Dubai',
    country: 'United Arab Emirates',
    rating: 4.97,
    reviewCount: 450,
    stars: 5,
    heroImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80'
    ],
    startingPricePerNight: 650,
    description: 'An architectural icon that redefines ultra-luxury living. 43 storeys of cantilevers, 17 celebrity chef restaurants, and the iconic Cloud 22 sky pool looking across the Arabian Gulf.',
    facilities: [
      'Cloud 22 Rooftop Infinity Pool',
      'Nobu by the Beach Cabanas',
      'Private 2km Beach Access',
      'Awaken Wellness & Hammam Spa',
      'Complimentary Aquaventure Waterpark access'
    ],
    locationDetails: 'Palm Jumeirah, Crescent Rd, Dubai, UAE',
    coordinates: { lat: 25.1378, lng: 55.1278 },
    has360Tour: true,
    rooms: [
      {
        id: 'rm-201',
        name: 'Sky Terrace Suite with Private Pool',
        type: 'Signature Suite',
        capacity: '2-3 Guests',
        pricePerNight: 1200,
        sizeSqM: 118,
        amenities: ['Private glass pool on terrace', 'Hermès bath essentials', 'VIP check-in lounge', 'Pillow menu'],
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'rm-202',
        name: 'Palm Scape King Room',
        type: 'Deluxe Room',
        capacity: '2 Guests',
        pricePerNight: 650,
        sizeSqM: 55,
        amenities: ['Floor-to-ceiling windows', 'Dressing room', 'Smart room automation', 'Deep soaking tub'],
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
      }
    ],
    featured: true
  },
  {
    id: 'hotel-3',
    slug: 'the-st-regis-maldives-vommuli',
    name: 'The St. Regis Maldives Vommuli Resort',
    destinationId: 'dest-3',
    destinationName: 'Maldives',
    country: 'Maldives',
    rating: 4.99,
    reviewCount: 280,
    stars: 5,
    heroImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80'
    ],
    startingPricePerNight: 1100,
    description: 'An idyllic private atoll sanctuary designed with contemporary organic architecture. Overwater villas shaped like manta rays, the lobster-shaped Iridium Spa, and private yacht charters.',
    facilities: [
      'Overwater Iridium Hydrotherapy Spa',
      'The Whale Bar Sunset Overwater Lounge',
      'Private Speedboats & Luxury Catamaran',
      'Subsurface Diving & Marine Discovery Centre',
      'Signature 24-hour St. Regis Butler Service'
    ],
    locationDetails: 'Vommuli Island, Dhaalu Atoll, Maldives',
    coordinates: { lat: 2.9157, lng: 72.8687 },
    has360Tour: true,
    rooms: [
      {
        id: 'rm-301',
        name: 'Overwater Sunset Pool Villa',
        type: 'Overwater Villa',
        capacity: '2 Guests',
        pricePerNight: 1450,
        sizeSqM: 182,
        amenities: ['Direct ocean access ladder', 'Private freshwater plunge pool', 'Overwater hammock nets', 'St. Regis butler'],
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80'
      }
    ],
    featured: true
  }
];

export const mockExperiences: Experience[] = [
  {
    id: 'exp-1',
    slug: 'cappadocia-sunrise-ballooning',
    title: 'Cappadocia Sunrise Hot Air Balloon Expedition',
    category: 'Mountain Adventure',
    destinationId: 'dest-1',
    destinationName: 'Turkey',
    country: 'Turkey',
    duration: '4 Hours (60 min flight)',
    price: 280,
    rating: 4.99,
    reviewCount: 310,
    heroImage: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1000&q=80',
    description: 'Drift serenely in the morning twilight as dozens of hot air balloons rise in unison over Cappadocia’s surreal volcanic fairy chimneys and hidden canyon churches.',
    highlights: [
      'VIP hotel pick-up in luxury Mercedes van',
      'Pre-flight hot breakfast and espresso service',
      'Panoramic flight over Love, Rose, and Pigeon Valleys',
      'Post-flight traditional champagne toast & certificate'
    ],
    included: ['Flight insurance', 'Champagne celebration', 'Commemorative flight medal', 'Round-trip transfers'],
    difficulty: 'Easy',
    groupSize: 'Max 12 in deluxe basket',
    featured: true
  },
  {
    id: 'exp-2',
    slug: 'dubai-superyacht-sunset-charter',
    title: 'Dubai Marina & Palm Jumeirah Private Superyacht',
    category: 'Island Cruise',
    destinationId: 'dest-2',
    destinationName: 'Dubai',
    country: 'United Arab Emirates',
    duration: '4 Hours',
    price: 520,
    rating: 4.97,
    reviewCount: 165,
    heroImage: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=1000&q=80',
    description: 'Cruise along the iconic coastline of Dubai aboard a tri-deck motor yacht with music, gourmet canapés, swimming stops in crystal lagoons, and sunset skyline views.',
    highlights: [
      '68ft Italian luxury motor yacht with professional crew',
      'Swim stop at the protected lagoon of Atlantis The Royal',
      'Unobstructed sunset photo angles of Ain Dubai and Burj Al Arab',
      'Gourmet barbecue and premium beverages included'
    ],
    included: ['Captain & 2 crew members', 'Gourmet sliders & sushi', 'Soft drinks & champagne', 'Towel service'],
    difficulty: 'Easy',
    groupSize: 'Private (Up to 10 guests)',
    featured: true
  },
  {
    id: 'exp-3',
    slug: 'arabian-desert-dune-safari',
    title: 'Conservation Desert Safari & Bedouin Dining',
    category: 'Desert Safari',
    destinationId: 'dest-2',
    destinationName: 'Dubai',
    country: 'United Arab Emirates',
    duration: '7 Hours',
    price: 210,
    rating: 4.94,
    reviewCount: 220,
    heroImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
    description: 'Traverse rolling sand dunes in open-top vintage Land Rovers, observe wild Arabian oryx and gazelles, and dine beneath lantern-lit tents in an authentic desert sanctuary.',
    highlights: [
      'Open-top 1950s museum-grade Land Rover safari',
      'Sunset falconry demonstration by royal master falconers',
      'Six-course authentic Emirati feast with shisha & oud music',
      'Star gazing with professional astronomical telescope'
    ],
    included: ['Royal desert reserve entrance', 'Gourmet dinner', 'Falconry show', 'Transfers'],
    difficulty: 'Easy',
    groupSize: 'Small group',
    featured: true
  },
  {
    id: 'exp-4',
    slug: 'maldives-manta-snorkeling',
    title: 'Baa Atoll Manta Ray & Whale Shark Snorkel',
    category: 'Wildlife Adventure',
    destinationId: 'dest-3',
    destinationName: 'Maldives',
    country: 'Maldives',
    duration: '3.5 Hours',
    price: 340,
    rating: 4.98,
    reviewCount: 140,
    heroImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    description: 'Swim alongside gentle ocean giants in the UNESCO Biosphere Reserve of Hanifaru Bay, guided by resident marine biologists.',
    highlights: [
      'Speedboat transfer to Hanifaru Bay',
      'Accompanied by certified marine biologists',
      'Complimentary underwater GoPro photo package',
      'Refreshments and fresh tropical fruits onboard'
    ],
    included: ['Biosphere access permit', 'High-end snorkel gear', 'Digital photo pack', 'Refreshments'],
    difficulty: 'Moderate',
    groupSize: 'Max 8 guests',
    featured: true
  },
  {
    id: 'exp-5',
    slug: 'paris-louvre-private-curator',
    title: 'After-Hours Private Curator Tour of The Louvre',
    category: 'Cultural Experience',
    destinationId: 'dest-6',
    destinationName: 'France',
    country: 'France',
    duration: '3 Hours',
    price: 490,
    rating: 4.99,
    reviewCount: 95,
    heroImage: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1000&q=80',
    description: 'Experience the world’s greatest art collection in total serenity after official closing hours, guided by an art historian curator.',
    highlights: [
      'Exclusive access after public museum closure',
      'Intimate contemplation of the Mona Lisa & Winged Victory',
      'Historical insights into the palace of French kings',
      'Champagne reception in a private salon overlooking the Pyramid'
    ],
    included: ['VIP after-hours entry', 'Licensed art historian guide', 'Champagne reception'],
    difficulty: 'Easy',
    groupSize: 'Private (Up to 6 guests)',
    featured: true
  }
];

export const mockBookings: Booking[] = [
  {
    id: 'bk-1001',
    bookingReference: 'VEL-2026-9812',
    packageId: 'pkg-1',
    packageName: 'Turkey Explorer: Empires & Bosphorus Horizons',
    destinationName: 'Turkey',
    travelDate: '2026-10-15',
    travelerCount: 2,
    leadTraveler: {
      firstName: 'Alexander',
      lastName: 'Sterling',
      email: 'a.sterling@vanguard.com',
      phone: '+1 (555) 349-8812',
      country: 'United States',
      dietaryRequirements: 'Pescatarian'
    },
    hotelSelected: 'Ciragan Palace Kempinski (Grand Bosphorus Suite)',
    pricePerTraveler: 899,
    subtotal: 1798,
    taxesAndFees: 144,
    totalAmount: 1942,
    specialRequests: 'Celebrating 10th wedding anniversary; requested high-floor palace room with direct sunrise view.',
    status: 'Confirmed',
    createdAt: '2026-09-21T14:22:00Z',
    paymentStatus: 'Paid in Full'
  },
  {
    id: 'bk-1002',
    bookingReference: 'VEL-2026-9813',
    packageId: 'pkg-3',
    packageName: 'Maldives Escape: Turquoise Sanctuary & Reef Odyssey',
    destinationName: 'Maldives',
    travelDate: '2026-11-04',
    travelerCount: 2,
    leadTraveler: {
      firstName: 'Elena',
      lastName: 'Rostova',
      email: 'elena.rostova@geneva-capital.ch',
      phone: '+41 79 123 4567',
      country: 'Switzerland'
    },
    hotelSelected: 'The St. Regis Maldives Vommuli Resort (Overwater Villa)',
    pricePerTraveler: 1299,
    subtotal: 2598,
    taxesAndFees: 208,
    totalAmount: 2806,
    specialRequests: 'Seaplane transfer coordination requested for late afternoon flight arrival in Malé.',
    status: 'Confirmed',
    createdAt: '2026-09-22T09:15:00Z',
    paymentStatus: 'Deposit Paid'
  },
  {
    id: 'bk-1003',
    bookingReference: 'VEL-2026-9814',
    packageId: 'pkg-2',
    packageName: 'Dubai Luxury: Skyline Heights & Desert Serenity',
    destinationName: 'Dubai',
    travelDate: '2026-12-10',
    travelerCount: 4,
    leadTraveler: {
      firstName: 'Marcus',
      lastName: 'Chen',
      email: 'marcus.chen@singaporetech.io',
      phone: '+65 9123 8890',
      country: 'Singapore'
    },
    hotelSelected: 'Atlantis The Royal & Al Maha Desert Resort',
    pricePerTraveler: 799,
    subtotal: 3196,
    taxesAndFees: 255,
    totalAmount: 3451,
    status: 'Pending',
    createdAt: '2026-09-24T18:40:00Z',
    paymentStatus: 'Pending Verification'
  },
  {
    id: 'bk-1004',
    bookingReference: 'VEL-2026-9815',
    packageId: 'pkg-4',
    packageName: 'Swiss Alpine Wonders: Glaciers & Matterhorn Elegance',
    destinationName: 'Switzerland',
    travelDate: '2026-09-12',
    travelerCount: 2,
    leadTraveler: {
      firstName: 'Sarah',
      lastName: 'Al-Mansoor',
      email: 'sarah.mansoor@qatar-advisors.qa',
      phone: '+974 5512 3499',
      country: 'Qatar'
    },
    hotelSelected: 'The Omnia Zermatt',
    pricePerTraveler: 1499,
    subtotal: 2998,
    taxesAndFees: 240,
    totalAmount: 3238,
    status: 'Completed',
    createdAt: '2026-08-10T11:00:00Z',
    paymentStatus: 'Paid in Full'
  }
];

export const mockCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'Alexander Sterling',
    email: 'a.sterling@vanguard.com',
    phone: '+1 (555) 349-8812',
    country: 'United States',
    totalBookings: 3,
    totalSpent: 8450,
    lastBookingDate: '2026-09-21',
    status: 'VIP',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'cust-2',
    name: 'Elena Rostova',
    email: 'elena.rostova@geneva-capital.ch',
    phone: '+41 79 123 4567',
    country: 'Switzerland',
    totalBookings: 2,
    totalSpent: 5900,
    lastBookingDate: '2026-09-22',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'cust-3',
    name: 'Marcus Chen',
    email: 'marcus.chen@singaporetech.io',
    phone: '+65 9123 8890',
    country: 'Singapore',
    totalBookings: 1,
    totalSpent: 3451,
    lastBookingDate: '2026-09-24',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'cust-4',
    name: 'Sarah Al-Mansoor',
    email: 'sarah.mansoor@qatar-advisors.qa',
    phone: '+974 5512 3499',
    country: 'Qatar',
    totalBookings: 4,
    totalSpent: 14200,
    lastBookingDate: '2026-08-10',
    status: 'VIP',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  }
];

export const mockGalleryItems: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Cappadocia Dawn Ascension',
    destination: 'Cappadocia',
    country: 'Turkey',
    region: 'Europe',
    imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
    category: 'Aerial',
    likes: 482
  },
  {
    id: 'gal-2',
    title: 'Palm Jumeirah Sunset Horizon',
    destination: 'Dubai',
    country: 'UAE',
    region: 'Middle East',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    category: 'Destinations',
    likes: 395
  },
  {
    id: 'gal-3',
    title: 'Overwater Lagoon Reflections',
    destination: 'Baa Atoll',
    country: 'Maldives',
    region: 'Asia',
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    category: 'Hotels',
    likes: 624
  },
  {
    id: 'gal-4',
    title: 'Matterhorn Peak Glacial Splendor',
    destination: 'Zermatt',
    country: 'Switzerland',
    region: 'Europe',
    imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    category: 'Destinations',
    likes: 512
  },
  {
    id: 'gal-5',
    title: 'Eiffel Tower Sparkling Twilight',
    destination: 'Paris',
    country: 'France',
    region: 'Europe',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    category: 'Experiences',
    likes: 740
  },
  {
    id: 'gal-6',
    title: 'Langkawi Rainforest Emerald Bay',
    destination: 'Langkawi',
    country: 'Malaysia',
    region: 'Asia',
    imageUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
    category: 'Aerial',
    likes: 298
  }
];

export const mockDashboardMetrics = {
  totalBookings: 124,
  monthlyRevenue: 184500,
  activeCustomers: 412,
  activePackages: 18,
  revenueGrowthPercent: 24.8,
  bookingGrowthPercent: 18.2,
  popularDestinations: [
    { name: 'Turkey', bookings: 42, revenue: 37758 },
    { name: 'Maldives', bookings: 36, revenue: 46764 },
    { name: 'Dubai', bookings: 28, revenue: 22372 },
    { name: 'Switzerland', bookings: 18, revenue: 26982 }
  ],
  revenueByMonth: [
    { month: 'Apr', revenue: 98000, bookings: 68 },
    { month: 'May', revenue: 112000, bookings: 79 },
    { month: 'Jun', revenue: 135000, bookings: 92 },
    { month: 'Jul', revenue: 154000, bookings: 104 },
    { month: 'Aug', revenue: 168000, bookings: 114 },
    { month: 'Sep', revenue: 184500, bookings: 124 }
  ],
  statusDistribution: [
    { status: 'Confirmed', count: 78, color: '#18C8D8' },
    { status: 'Completed', count: 32, color: '#D9A441' },
    { status: 'Pending', count: 11, color: '#086A9A' },
    { status: 'Cancelled', count: 3, color: '#EF4444' }
  ]
};
