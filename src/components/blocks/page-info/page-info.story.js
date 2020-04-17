import React from "react";
import { storiesOf } from "@storybook/react";
import { PageInfo } from ".";

storiesOf("Page Info", module).add("default", () => (
  <PageInfo
    title={"Amazing page"}
    description={
      "Custom Lorum Ipsum that eases your breath and casts away all problems."
    }
  />
));
