import * as schema from '@/common/entities/index.entity';

export const TimeInMs = {
  /** 1 second in milliseconds */
  SECONDS: 1000,

  /** 1 minute in milliseconds */
  MINUTES: 60 * 1000,

  /** 1 hour in milliseconds */
  HOURS: 60 * 60 * 1000,

  /** 1 day in milliseconds */
  DAYS: 60 * 60 * 24 * 1000,

  /** 1 week in milliseconds */
  WEEKS: 60 * 60 * 24 * 30 * 1000,

  /** 1 week in milliseconds */
  MONTHS: 60 * 60 * 24 * 7 * 1000,

  /** 1 year in milliseconds (365 days) */
  YEARS: 60 * 60 * 24 * 365 * 1000,

  /** 1 decade in milliseconds (10 years) */
  DECADES: 60 * 60 * 24 * 365 * 10 * 1000,

  /** 1 century in milliseconds (100 years) */
  CENTURIES: 60 * 60 * 24 * 365 * 100 * 1000,

  /** 1 millennium in milliseconds (1000 years) */
  MILLENNIA: 60 * 60 * 24 * 365 * 1000 * 1000,

  /** Indefinite expiration time (far future date) in milliseconds */
  INDEFINITE: new Date(9999, 11, 31).getTime(),
};

export const PRODUCT_ORDER = ['Silver', 'Gold', 'Platinum'];

export const STRIPE_STATUS = ['active', 'trialing'];

export { schema };
