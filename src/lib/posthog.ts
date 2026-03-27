import PostHog from 'posthog-react-native';

const apiKey = process.env.EXPO_PUBLIC_POSTHOG_API_KEY || 'MISSING_API_KEY';
const host = process.env.EXPO_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

// Initialize the PostHog client
export const posthog = new PostHog(apiKey, {
  host: host,
  // Optionally disable tracking in development mode:
  // enable: process.env.NODE_ENV !== 'development',
});
