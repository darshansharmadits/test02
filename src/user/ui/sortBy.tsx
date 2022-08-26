import { Dropdown } from "react-bootstrap";


const SortBy = (props: any) => {
    const criteria: string = props.criteria;
    return (
        <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Sort By
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Name</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Conversions</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Revenue</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    );
}

export default SortBy;