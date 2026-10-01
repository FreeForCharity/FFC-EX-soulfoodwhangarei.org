import { siteMetadata } from '../../src/lib/siteMetadata'
import { siteConfig, siteUrl, twitterSite } from '../../src/lib/site.config'

describe('Site metadata', () => {
  it('should have the correct metadataBase URL', () => {
    expect(siteMetadata.metadataBase?.toString()).toBe(`${siteConfig.url}/`)
  })

  it('should have a title containing the site name', () => {
    const title = siteMetadata.title as { default: string; template: string }
    expect(title.default).toContain(siteConfig.name)
    expect(title.template).toContain(siteConfig.name)
  })

  it('should have the configured description', () => {
    expect(siteMetadata.description).toBe(siteConfig.description)
    expect(siteMetadata.description!.length).toBeGreaterThan(50)
  })

  it('should have relevant keywords', () => {
    const keywords = siteMetadata.keywords as string[]
    expect(keywords).toContain('nonprofit')
    expect(keywords).toContain('charity')
    expect(keywords).toContain('volunteer')
  })

  it('should define OpenGraph fields', () => {
    const og = siteMetadata.openGraph as Record<string, unknown>
    expect(og.type).toBe('website')
    expect(og.siteName).toBe(siteConfig.name)
    expect(og.url).toBe(siteUrl('/'))
    expect(og.images).toBeDefined()
  })

  it("uses the site's own 1200x630 social card, not the template's app icon", () => {
    const og = siteMetadata.openGraph as {
      images: { url: string; width: number; height: number }[]
    }
    expect(og.images[0].url).toMatch(/\/og-card\.png$/)
    expect(og.images[0].width).toBe(1200)
    expect(og.images[0].height).toBe(630)
    const twitter = siteMetadata.twitter as { images: string[] }
    expect(twitter.images[0]).toBe(og.images[0].url)
  })

  it('should define Twitter card fields', () => {
    const twitter = siteMetadata.twitter as Record<string, unknown>
    expect(twitter.card).toBe('summary_large_image')
    // No handle configured -> no twitter:site (never FFC's).
    expect(twitter.site).toBe(twitterSite())
  })

  it('should allow indexing and following', () => {
    const robots = siteMetadata.robots as Record<string, unknown>
    expect(robots.index).toBe(true)
    expect(robots.follow).toBe(true)
  })

  it('should define icon and manifest paths', () => {
    expect(siteMetadata.manifest).toBeDefined()
    expect(siteMetadata.icons).toBeDefined()
  })
})
