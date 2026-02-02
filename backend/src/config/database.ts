import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

const prisma = new PrismaClient({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'error', emit: 'event' },
    { level: 'warn', emit: 'event' },
  ],
});

// Log database queries in development
if (process.env.NODE_ENV === 'development') {
  prisma.$on('query' as never, (e: any) => {
    logger.debug('Query:', {
      query: e.query,
      params: e.params,
      duration: `${e.duration}ms`,
    });
  });
}

prisma.$on('error' as never, (e: any) => {
  logger.error('Database error:', e);
});

prisma.$on('warn' as never, (e: any) => {
  logger.warn('Database warning:', e);
});

export const connectDatabase = async () => {
  try {
    await prisma.$connect();
    logger.info('Database connection established');
  } catch (error) {
    logger.error('Database connection failed', error);
    throw error;
  }
};

connectDatabase.close = async () => {
  await prisma.$disconnect();
};

export { prisma };
export default prisma;
