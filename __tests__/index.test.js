import { render, screen } from '@testing-library/react'
import Home from '../pages/index'

describe('Home page', () => {


    it('renders a heading', () => {
        render(<Home />)

        const heading = screen.getByRole('heading', {
            name: /welcome to my page/i,
        })

        expect(heading).toBeInTheDocument()
    })
})