import React from 'react'
import { render, screen } from '@testing-library/react'

// Mock TeamMemberCard since TheFreeForCharityTeam uses it
jest.mock('../../src/components/ui/TeamMemberCard', () => {
  return function MockTeamMemberCard({
    name,
    role,
  }: {
    name: string
    role: string
    linkedinUrl?: string
  }) {
    return (
      <div data-testid="team-member-card">
        <span>{name}</span>
        <span>{role}</span>
      </div>
    )
  }
})

import HomePage from '../../src/app/home-page'
import { team } from '../../src/data/team'
import { PENDING_TEXT } from '../../src/lib/site.config'

describe('HomePage (app/home-page)', () => {
  it('should render without crashing', () => {
    render(<HomePage />)
  })

  it('should render TheFreeForCharityTeam component', () => {
    render(<HomePage />)
    // One card per configured member; a roster still awaited from the charity
    // shows the team section with the placeholder instead.
    expect(screen.queryAllByTestId('team-member-card')).toHaveLength(team.length)
    if (team.length === 0) expect(screen.getByText(PENDING_TEXT)).toBeInTheDocument()
  })
})
