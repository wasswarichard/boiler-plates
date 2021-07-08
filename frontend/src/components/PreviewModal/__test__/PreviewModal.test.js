import React from "react";
import ReactDOM from "react-dom";
import PreviewModal from "../PreviewModal";
import { render, cleanup} from "@testing-library/react";
import TestRenderer from 'react-test-renderer';

afterEach(cleanup)
const modelInfo = {
    block_index: 76859
}
it('should render without crashing', function () {
    const div = document.createElement("div")
    ReactDOM.render(<PreviewModal modelInfo={modelInfo}></PreviewModal>, div)
});

it('should render the blocks correctly', function () {

});

it('should match snapshot', function () {
    const tree = TestRenderer.create(<PreviewModal modelInfo={modelInfo}></PreviewModal>).toJSON();
    expect(tree).toMatchSnapshot();

});
