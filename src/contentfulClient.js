import { createClient } from 'contentful';

export const client = createClient({
  // From your "Space ID" field
  space: '1ainphcpxfjy', 
  
  // From your "Content Delivery API - access token" field
  accessToken: 'VI3TT5DdnOshF4F-MirmlTvbccbJcQL-UHfpS1csHrQ',
});

export const getOptimizedImage = (url) => {
  if (!url) return "";
  // Fixes the protocol and adds high-end optimization
  const secureUrl = url.startsWith('//') ? `https:${url}` : url;
  return `${secureUrl}?w=1200&q=85&fm=webp`;
};