/**
 * ============================================================================
 * [ITE 387: Lab 01 - Arrays & Objects as Single Source of Truth]
 * File: js/modules/data.js
 * Description: Centralized immutable data collections for Barangay Tablon.
 * Replaces hardcoded HTML markup with structured data objects.
 * ============================================================================
 */

/**
 * Statistics overview dataset for landing page metric counters
 */
export const STATISTICS_DATA = Object.freeze([
  {
    icon: '👥',
    number: '24,578',
    label: 'Population (2020)',
  },
  {
    icon: '🗺️',
    number: '22.08',
    label: 'Square Kilometers',
  },
  {
    icon: '🏭',
    number: '2nd',
    label: 'Industrial Hub in CDO',
  },
]);

/**
 * Official Barangay Council dataset
 */
export const OFFICIALS_DATA = Object.freeze({
  punongBarangay: {
    title: 'Punong Barangay',
    name: 'ROMEO R. BACARRO',
    term: 'Current',
  },
  kagawads: [
    'ALLAN C. MAGSAYO',
    'ROLLIN C. JACUTIN',
    'GILES S. DINGAL',
    'NORA S. AUZA',
    'VIRGILIO P. AGUS',
    'JENNIFER D. LEONARDO',
    'EDEN FE HUNG',
  ],
  administrativeStaff: [
    { role: 'SK. Chairman', name: 'Wyn Edward Sinomio' },
    { role: 'Brgy. Secretary', name: 'Mirasol Ravidas' },
    { role: 'Brgy. Treasurer', name: 'Jessie Ann Dadap' },
    { role: 'Brgy. Administrator', name: 'Roel Tan' },
  ],
});

/**
 * Attractions and local points of interest dataset
 */
export const ATTRACTIONS_DATA = Object.freeze([
  {
    id: 'attraction-1',
    category: 'landmark',
    badge: 'Landmark',
    title: 'Nestlé Philippines Factory',
    image: 'images/nestle industrial hub.jfif',
    description:
      "A major industrial landmark in Tablon, this 25.6-hectare facility has been operating since 1984, serving as Nestlé's only factory outside Luzon and producing primarily Nescafé.",
  },
  {
    id: 'attraction-2',
    category: 'landmark',
    badge: 'Landmark',
    title: 'Sto. Niño Chapel',
    image: 'images/sto.nino chapel.jfif',
    description:
      'A local Roman Catholic chapel under the Archdiocese of Cagayan de Oro. It serves as the spiritual center for many residents in the barangay.',
  },
  {
    id: 'attraction-3',
    category: 'landmark',
    badge: 'Landmark',
    title: 'Our Lady of Guadalupe Pilgrimage Site',
    image: 'images/Our Lady of Guadalupe Pilgrimage Site (1).jfif',
    description:
      'A sacred pilgrimage destination in Barangay Tablon, this site draws devotees seeking spiritual solace and blessings from Our Lady of Guadalupe, offering a peaceful sanctuary for prayer and reflection.',
  },
]);

/**
 * Annual festivals and community events dataset
 */
export const EVENTS_DATA = Object.freeze([
  {
    id: 'event-1',
    month: 'JAN',
    icon: '🎊',
    title: 'Feast of Sr. Sto. Niño',
    tag: 'Religious Festival',
    description:
      'A major religious celebration featuring street dancing, float competitions, and colorful parades in honor of the Holy Child, heavily inspired by Sinulog traditions.',
  },
  {
    id: 'event-2',
    month: 'AUG',
    icon: '🌟',
    title: 'Higalaay Festival',
    tag: 'City-wide Festival',
    description:
      'While a city-wide celebration honoring St. Augustine, Barangay Tablon actively participates in core events, pageants, and trade fairs as part of the "City of Golden Friendship."',
  },
  {
    id: 'event-3',
    month: 'DEC',
    icon: '🎄',
    title: 'Christmas Village Competition',
    tag: 'Community Event',
    description:
      'Tablon actively joins this annual city-wide competition, where community members collaborate to build and display extravagant, themed Christmas villages and lights.',
  },
  {
    id: 'event-4',
    month: 'VAR',
    icon: '🎉',
    title: 'Barangay Fiesta',
    tag: 'Local Celebration',
    description:
      'The annual barangay fiesta is a time of thanksgiving, community feasts, local sports tournaments (liga), and cultural presentations organized by the local government.',
  },
]);
