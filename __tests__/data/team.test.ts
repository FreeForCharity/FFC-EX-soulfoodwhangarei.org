import { team } from '../../src/data/team'
import { isPending } from '../../src/lib/site.config'

describe('Team data integrity', () => {
  it('has a roster, or lists the team as pending', () => {
    // The roster is this charity's own; an empty one must be shown as awaited.
    if (team.length === 0) expect(isPending('team')).toBe(true)
    else expect(isPending('team')).toBe(false)
  })

  it('every team member has the required fields', () => {
    for (const member of team) {
      expect(member.name).toBeDefined()
      expect(typeof member.name).toBe('string')
      expect(member.name.trim().length).toBeGreaterThan(0)

      expect(member.role).toBeDefined()
      expect(typeof member.role).toBe('string')
      expect(member.role.trim().length).toBeGreaterThan(0)

      // Photos were removed in favor of initials monograms — no imageUrl field.
      expect('imageUrl' in member).toBe(false)

      // linkedinUrl is optional; when set it must be an https:// URL on
      // linkedin.com (or a subdomain) — the only shape TeamMemberCard turns into
      // a link (safeLinkedInUrl). Enforcing the host here means bad data fails
      // the suite instead of silently rendering as a non-link.
      if (member.linkedinUrl !== undefined) {
        expect(member.linkedinUrl).toMatch(/^https:\/\/([a-z0-9-]+\.)*linkedin\.com(\/|$)/i)
      }
    }
  })

  it('should have no duplicate names', () => {
    const names = team.map((m) => m.name)
    expect(new Set(names).size).toBe(names.length)
  })

  it("does not list the template's Free For Charity staff", () => {
    const names = team.map((m) => m.name)
    for (const ffcName of [
      'Clarke Moyer',
      'Chris Rae',
      'Tyler Carlotto',
      'Brennan Darling',
      'Rebecca Cook',
    ]) {
      expect(names).not.toContain(ffcName)
    }
  })
})
