import React from "react";
import { storiesOf } from "@storybook/react";
import { Partners } from ".";

storiesOf("Partners", module).add("default", () => (
  <Partners title={"Loved by developers. Trusted by businesses"} />
));
