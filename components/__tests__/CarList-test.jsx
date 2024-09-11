import * as React from "react";
import renderer from "react-test-renderer";

import Col from "../CarList";

it(`CarList renders correctly`, () => {
  const tree = renderer.create(
      <Col style={styles.textIcon}>
        <Ionicons size={14} name={"people-outline"} color={"#8A8A8A"} />
        <Text style={styles.capacityText}>{passengers}</Text>
      </Col>

      
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
