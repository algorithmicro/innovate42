import React from "react";
import { shallow, configure } from 'enzyme';
import LeagueTable from "../../../components/LeagueTable";
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe("LeagueTable Component", () => {
    it("should render without throwing an error", () => {
        expect(
            shallow(<LeagueTable leagueHistory={[]} />)
                .find("table.leagueTable")
                .exists()
        ).toBe(true);
    });
});

