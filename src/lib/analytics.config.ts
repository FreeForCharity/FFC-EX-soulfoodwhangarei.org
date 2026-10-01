/**
 * Analytics configuration for this site: the Google Tag Manager container ID.
 *
 * A plain module (not the `'use client'` GTM component) so server components
 * such as the privacy policy's SupportingOrgDisclosure can read the value at
 * render time. The GTM component imports it from here, so there is one source
 * of truth.
 *
 * The explicit `: string` keeps TypeScript from narrowing the constant to its
 * literal value, so empty-string checks against it type-check.
 */
export const GTM_ID: string = 'GTM-TQ5H8HPR'
