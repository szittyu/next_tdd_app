import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../pages/index'

describe("Home page", () => {


    it("renders a heading", () => {
        render(<Home />)
        const heading = screen.getByRole("heading", {
            name: /welcome to my page/i,
        })
        expect(heading).toBeInTheDocument()
    })

    it("render an accessible search box", () => {
        render(<Home />)
        const searchInput = screen.getByRole("searchbox")
        expect(searchInput).toHaveAccessibleName("Search")
    })

    it("renders all products", () => {
        render(<Home products={[]} categories={[]} />)
    });
    // it("renders all categories", () => {

    // });
    // it("renders 1 product per category", () => {

    // });
    // it("show search results when search item is not empty", () => {

    // });

})